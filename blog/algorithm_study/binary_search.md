---
title: '이분탐색'
date: '2022-12-13'
tags: ['algorithm', 'algorithm study', 'python', 'boj', 'binary search']
draft: false
summary: 알고리즘 스터디 3주차 - 이분탐색
layout: PostSimple
---

# 이분 탐색

이분탐색은 가장 기초적인 알고리즘으로 꼽힌다. 검색 범위를 줄여 나가면서 원하는 데이터를 찾는 알고리즘이다.

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/algorithm_study/binary_search/00.png?raw=true)

위와 같은 방식으로 순차적으로 리스트를 순화하는 for문이나 while문보다 빠르게 탐색할 수 있다.
이 방식이 매우 유용한 이유는 for문을 통한 반복문으로 리스트 탐색을 수행할 경우 시간복잡도가 O(n)이라면, 이분탐색을 통해서는 O(lb n)의 복잡도를 가진다.

O(lb n)이라는 말은, int형의 크기(-2,147,483,648 ~ 2,147,483,647)에서 탐색을 한다면, 약 43억개의 원소가 담긴 리스트를 탐색해야하는 상황에서, for문을 통한 탐색은 최악의 경우 43억개를 전부 탐색하는 경우가 될 것이다.

하지만 이진탐색을 활용한다면, 탐색 범위를 반으로 나누며 범위를 줄여나가는 특성으로 인해 int형의 범위 요소의 갯수인 4,294,967,296개의 요소는 (2 \*\* 32)개로 변환할 수 있으므로, 최대 32회의 탐색으로 값을 찾을 수 있게 된다.

# 구현

이진 탐색의 구현은 재귀 혹은 반복문을 통해 구현할 수 있다.

## 반복문

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/algorithm_study/binary_search/01.png?raw=true)

## 재귀문

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/algorithm_study/binary_search/02.png?raw=true)

둘 중 더 익숙한 문법으로 구현하면 된다.

# 사용

## 언제 사용하면 좋은가?

1. 정렬이 가능한지 확인해야한다.

미리 정렬이 되어있다면 더 좋지만, 정렬이 되어있지 않은 경우 정렬을 해주어야 한다. 따라서 자료구조에 따라서 이분탐색을 사용하지 못하는 경우도 존재한다.

하지만 파이썬을 이용한 알고리즘 문제 해결에서 자주 사용하는 자료구조인 리스트의 경우, 정렬이 쉽게 가능하므로 사용할 수 있다. 하지만 정렬에도 시간복잡도가 사용되므로 주의하자. 정렬에 대한 시간복잡도가 O(N)보다 크기 때문이다.

2. 무작위 요소 접근에 대해 O(1)의 시간복잡도를 가지는지 확인해야한다.

요소를 접근할 때, 인덱스를 통해 바로 접근하지 못하는 자료구조의 경우, 사용하지 않는 것이 좋다.

파이썬에서 리스트 자료구조의 경우, 인덱스 접근이 O(1)이므로 사용 가능하다.

## 유의 사항

1. 이분탐색이 제일 좋은 탐색은 아니다.

이분탐색도 충분히 효율적이지만, 사용하는 자료구조와 문제에 따라 탐색 알고리즘의 효율이 달라질 수 있다.

따라서 다른 탐색 알고리즘도 많이 알아두는것이 좋다.

2. 시간복잡도에 대해 생각해보자.

시간복잡도는 알고리즘 문제 해결에 있어 중요한 요소 중 하나이다.

아무리 구현을 잘 해도 시간 초과로 인해 틀리는 경우가 발생하므로, 자신이 자주 사용하는 자료구조와 알고리즘에 대한 전반적인 시간 복잡도를 알아두고 있다면 문제 해결에 도움이 될 것이다.
