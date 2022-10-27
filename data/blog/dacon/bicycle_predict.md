---
title: '따릉이 데이터를 활용한 데이터 분석'
date: '2021-07-30'
tags: ['python', 'scikit-learn', 'pandas', 'ml']
draft: false
summary: 각 날짜의 1시간 전의 기상상황을 가지고 1시간 후의 따릉이 대여수를 예측하세요
layout: PostSimple
---

데이콘의 기본 연습대회로 머신러닝에 대해 공부해보았다.

[대회 정보](https://www.dacon.io/competitions/open/235576/overview/description)

## 라이브러리 및 데이터 준비

```python
import numpy as np
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import matplotlib
import mglearn
import joblib
import math

from sklearn.model_selection import train_test_split, validation_curve, cross_val_score, GridSearchCV
from sklearn.neural_network import MLPClassifier
from statsmodels.graphics.tsaplots import plot_acf, acf
from sklearn.linear_model import Ridge,Lasso,ElasticNet, LinearRegression, SGDRegressor, LogisticRegression
from sklearn.preprocessing import PolynomialFeatures, StandardScaler
from sklearn.pipeline import make_pipeline, Pipeline
from sklearn.metrics import confusion_matrix, precision_score, recall_score, f1_score, roc_curve
from sklearn.naive_bayes import GaussianNB, BernoulliNB, MultinomialNB
from sklearn.svm import SVC, SVR
from sklearn.compose import make_column_transformer,ColumnTransformer
import math
from sklearn.ensemble import VotingRegressor, RandomForestRegressor, BaggingRegressor
from sklearn.tree import DecisionTreeRegressor
import sklearn.metrics as metrics
from xgboost import XGBClassifier, XGBRFRegressor, XGBRegressor
from lightgbm import LGBMRegressor

matplotlib.rcParams['font.family']='Malgun Gothic'
plt.rcParams['font.size']=14
matplotlib.rcParams['axes.unicode_minus'] = False
import warnings
warnings.simplefilter('ignore')
```

먼저 사용할 라이브러리와 기타 설정들을 불러와주었다.

```python
train = pd.read_csv('data/train.csv')
test = pd.read_csv('data/test.csv')
submission = pd.read_csv('data/submission.csv')
display(train.head().T, test.head().T)
```

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/bicycle_predict/image01.png?raw=true)

- id : 날짜와 시간별 id
- hour_bef_temperature : 1시간 전 기온
- hour_bef_precipitation : 1시간 전 비 정보, 비가 오지 않았으면 0, 비가 오면 1
- hour_bef_windspeed : 1시간 전 풍속(평균)
- hour_bef_humidity : 1시간 전 습도
- hour_bef_visibility : 1시간 전 시정(視程), 시계(視界)(특정 기상 상태에 따른 가시성을 의미)
- hour_bef_ozone : 1시간 전 오존
- hour_bef_pm10 : 1시간 전 미세먼지(머리카락 굵기의 1/5에서 1/7 크기의 미세먼지)
- hour_bef_pm2.5 : 1시간 전 미세먼지(머리카락 굵기의 1/20에서 1/30 크기의 미세먼지)
- count : 시간에 따른 따릉이 대여 수
