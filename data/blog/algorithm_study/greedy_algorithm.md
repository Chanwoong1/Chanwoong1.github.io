---
title: '그리디 알고리즘'
date: '2022-12-14'
tags: ['algorithm', 'algorithm study', 'python', 'boj', 'binary search']
draft: false
summary: 알고리즘 스터디 4주차 - 그리디 알고리즘
layout: PostSimple
---

이번 주는 그리디 알고리즘에 대해 문제를 풀어보았다. 한 주간 풀어볼 문제는 다음과 같았다.

- 필수로 풀어야 하는 문제들

  - [ATM](https://www.acmicpc.net/problem/11399)
  - [게임을 만든 동준이](https://www.acmicpc.net/problem/2847)
  - [팰린드롬 만들기](https://www.acmicpc.net/problem/1213)
  - [주식](https://www.acmicpc.net/problem/11501)
  - [통나무 건너뛰기](https://www.acmicpc.net/problem/11497)

- 추가적으로 풀어볼만한 문제들
  - [가장 긴 증가하는 부분 수열 2](https://www.acmicpc.net/problem/12015)
  - [입국심사](https://www.acmicpc.net/problem/3079)

스터디원들이 모두 다 잘 풀어왔고, 각자 코드 리뷰를 하면서 서로 부족한 부분을 채워주는 시간을 가졌다.

# 그리디 알고리즘

그리디 알고리즘은 단순하지만 강력한 알고리즘이다. 현재 상황에서 지금 당장 할 수 있는 최선의 선택을하는 방법을 의미하며, 현재의 선택이 향후에 미치는 영향에 대해서는 고려하지 않는다.

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/algorithm_study/greedy/00.png?raw=true)

위의 그림을 보면, 서울에서 부산까지 갈 수 있는 최적의 경로를 찾는다고 할 때, 대구를 중간점으로 서울 - 대구의 가장 최적 경로 (200km) + 대구 - 부산의 가장 최적 경로 (80km) = 서울 - 부산 최적 경로 (280km)으로 최적의 경로를 선택할 수 있다.

이것을 통해 알 수 있는 점은, 대구를 기준으로 이전의 선택이 이후의 선택에 영향을 미치지 않는다는 점이다. 이런 식으로 현재의 선택이 향후에 미치는 영향에 대해서 고려하지 않는 그리디 알고리즘이지만, 부분적으로 최적의 해의 집합이 전체 문제의 최적 해가 되는 경우가 있다면 그리디 알고리즘을 사용하는 것에 있어 가장 이상적인 문제라고 할 수 있다.

# 사용 예제

## 거스름돈 문제

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/algorithm_study/greedy/01.png?raw=true)

거스름돈 문제는 그리디 알고리즘을 대표하는 문제이기도 하다. 손님에게 거슬러주어야 할 돈이 N원일 경우, 거슬러주어야 할 동전의 최소 개수를 구하는 문제이다.

이 문제는 간단한 아이디어를 통해 문제를 해결할 수 있는데, '가장 큰 화폐 단위부터' 돈을 거슬러 주는 것이다. 위 그림처럼 531원을 거슬러주어야 하는 상황일 때, 500원 짜리 동전을 1개 사용하면 500원 단위로 거슬러 줄 수 있는 만큼 거슬러주게 되고, 순차적으로 100원, 50원, 10원 순으로 나아가면서 사용할 수 있는 동전의 단위가 나온다면 모두 최대의 갯수로 거슬러주면 최소의 동전 갯수를 구할 수 있게 된다.

# 사용

그리디 알고리즘은 특징과 한계가 명확한 편이다. 부분적으로 최적의 해를 찾아서 결국 전체적으로 최적의 해를 찾는 것이 그리디 알고리즘인데, 대부분의 문제는 그리디 알고리즘을 통해 최적의 해를 찾을 수 없는 상황이 발생할 수 있다.

- 부분적인 최적 해를 찾을 수 있는가

그리디 알고리즘에서 가장 중요한 문제일 것이다. 앞선 거스름돈 문제나 최단 경로 구하기와 같은 문제는 명확하게 부분적으로 최적의 해를 찾는 것이 가능했다. 하지만 문제에서는 부분적으로 최적의 해를 찾을 가능성이 낮다.

따라서 문제에서 부분적으로 최적해를 찾을 수 있는 방법을 찾았을 때, 이 방법이 정당한지 검토하는 과정을 거쳐야 한다.

다른 예시의 거스름돈 문제를 보자.

- 800원을 거슬러주어야 한다.
- 동전의 단위는 500원, 400원, 100원이다.

이 경우, 그리디 알고리즘을 사용한다면, 500원으로 거슬러 줄 수 있으므로 800원을 거슬러주는데 필요한 최소 동전 갯수는 4개(500원 + 100원 + 100원 + 100원)이다.

그러나, 최적의 해는 2개(400원 + 400원)이다. 이런식으로 그리디를 통해 구했을 때의 최적의 해가 문제 전체의 최적의 해라는 보장이 없기 때문에, 검토하는 습관을 가지는 것이 중요하다.