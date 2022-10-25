---
title: '[42seoul] philosophers'
date: '2022-10-08'
tags: ['3rd_circle', 'C', '42seoul', 'mutex', 'semaphore']
draft: false
summary: 철학자들에게 밥을 먹이자
layout: PostSimple
---

# philosophers

- [Chapter 1](#chapter-1)
  - [Introduction](#introduction)
- [Chapter 2](#chapter-2)
  - [Mandatory part](#mandatory-part)
- [Chapter 5](#chapter-5)
  - [Bonus part](#bonus-part)
- [느낀 점](#느낀-점)

## Chapter 1

### Introduction

[식사하는 철학자들 문제](https://en.wikipedia.org/wiki/Dining_philosophers_problem)는 1965년에 만들어진 문제로, 운영체제의 [교착상태](https://en.wikipedia.org/wiki/Deadlock)를 설명하기 위한 문제이다.

교착상태는 네 가지 필요 조건을 충족시켜야 한다.

- 상호배제 : 프로세스들이 필요로 하는 자원에 대해 배타적인 통제권 요구
- 점유대기 : 프로세스가 할당된 자원을 가진 상태에서 다른 자원을 기다림
- 비선점 : 프로스세가 어떤 자원의 사용을 끝낼 때 까지 그 자원을 뺏을 수 없음
- 순환대기 : 각 프로세스는 순환적으로 다음 프로세스가 요구하는 자원을 가지고 있음

이 조건 중 한 가지라도 만족하지 않으면 교착상태는 발생하지 않는다. 한번에 4가지를 동시에 만족시키기가 굉장히 힘들어 보이지만, 대부분의 현대 운영체제도 교착 상태를 막는것은 불가능하다.

따라서 교착상태를 막기 위해 4가지의 조건 중 한 가지(주로 순환대기)를 막음으로써 교착상태를 제거하려 한다.

그러나 이번 과제에서는 쓰레드와 상호배제(mutex)를 이용하여 철학자 문제를 해결하라고 한다.

## Chapter 2

### Mandatory part

먼저, 프로그램을 실행할 때 입력해야하는 인자는 5개가 있다.

- 철학자의 수
- 철학자의 수명
- 밥을 먹는데 걸리는 시간
- 잠자는 시간
- 각 철학자가 최소한 밥을 먹어야 하는 횟수(입력하지 않으면 무한히 먹어야 함)
