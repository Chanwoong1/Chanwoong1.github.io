---
title: 'STL Containers'
date: '2023-01-09'
tags: ['Containers', 'STL', 'C++']
draft: false
summary: 알고리즘 스터디 7주차 - 자료구조
layout: PostSimple
---

스터디에서 자료구조에 관해 문제를 풀었다. 겸사겸사 요즘 슬슬 시작하려하는 42 과제인 ft_containers를 위해 STL 라이브러리에 대해 공부하고있어 정리해보고 싶었다.

# STL Containers

- [STL](#stl)
- [Containers](#containers)

## STL

STL이란 표준 템플릿 라이브러리(Standard Template Library)로, C++을 위한 라이브러리이다. STL은 Algorithm, Container, Functor, Iterator로 불리는 네 가지 구성요소를 제공한다.

이름 그대로, 템플릿의 사용을 통해 런타임 다형성보다 효과적인 컴파일 타임 다형성을 제공한다.

- Algorithm

Algorithm 라이브러리는 STL의 자료구조를 다루는 데 필요한 메서드들을 제공한다. (정렬, 원소 제거, 람다 함수 등)

- Container

임의의 타입의 원소들을 위한 보관소를 만든다. (아래에서 후술)

- Iterator

Iterator, 반복자라고 불리는 이것은 컨테이너에 저장된 원소를 순회하면서 접근하는 방법을 제공한다. 또한, 컨테이너와 알고리즘을 하나로 동작할 수 있도록 중간 지점에서 인터페이스 역할을 수행한다.

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/algorithm_study/stl_container/00.png?raw=true)

- Functor

함수를 객체로 사용할 수 있도록 해준다.

## Containers

컨테이너라는것은 다른 객체들(요소라고 한다)을 저장할 수 있는 객체이다. 컨테이너는 클래스 템플릿으로 구현되어, 다양한 타입을 요소로 받을 수 있다.

이것을 쉽게 구현할 수 있도록 하는것으로 C++에서는 컨테이너 라이브러리로 제공되고 있다. 이 라이브러리는 공통적으로 컨테이너 자료구조에 필요한 대기열, 목록 및 스택 등과 같은 데이터 구조를 쉽게 구현할 수 있도록 컬렉션을 제공한다.

컨테이너는 해당 요소에 할당된 저장 공간을 관리하고 직접 또는 반복자(포인터와 유사한 속성을 가진 객체)를 통해 접근할 수 있는 멤버 함수를 제공한다.

대부분의 컨테이너는 여러개의 공통 멤버 함수를 가지며 기능을 공유한다. 여러가지의 컨테이너들이 다양한 작업환경에 따라 그 효율성이 달라진다.

- 시퀀스 컨테이너(Sequence Container)

순차적으로 접근할 수 있는 데이터 구조를 말한다.

**array, vector, deque, forward_list, list**

- 연관 컨테이너(Associative Container)

객체들을 연관된 키와 함께 저장한다. 키를 이용해서 연관 컨테이너에서 객체를 가져오며, 반복자를 사용해서 객체를 가지고 올 수도 있다.

**set, map, multiset, multimap**

- 컨테이너 어댑터(Container Adaptor)

컨테이너 어뎁터는 인터페이스를 제한하는 시퀀스 또는 연관 컨테이너의 변형이다. 컨터이너 어뎁터는 반복기를 지원하지 않는다.

**stack, queue, priority_queue**
