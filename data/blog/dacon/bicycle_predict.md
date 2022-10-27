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
