---
title: '[42seoul] CPP Module 02'
date: '2022-12-12'
tags: ['4th_circle', 'C++', 'oop', 'class', '42seoul']
draft: false
summary: Ad-hoc polymorphism, operator overloading and Orthodox Canonical class form
layout: PostSimple
---

# Cpp Module 02

- [Chapter 1](#chapter-1)
  - [Introduction](#introduction)
- [Chapter 2](#chapter-2)
  - [General Rules](#general-rules)
- [Chapter 3](#chapter-3)
  - [New Rules](#new-rules)
- [Chapter 4](#chapter-4)
  - [Ex00](#ex00)
  - [Ex01](#ex01)
  - [Ex02](#ex02)
  - [Ex03](#ex03)
- [느낀 점](#느낀-점)

## Chapter 1

### Introduction

이 과제는 내가 걸어가야할 C++이라는 여행길에 시작점에 객체지향프로그래밍이 어떤건지를 설명해주는것이 목적이라고 한다.

객체지향은 많은 언어들이 사용하는데, 왜 C++을 배우게 되느냐.. 하면 나의 오랜 친구(42에서만)인 C에서 파생된 언어이기 때문이라고 한다.

C++은 복잡한 언어이기 때문에, 단순하게 유지하기 위해 내 코드를 C++ 98 standard로 컴파일 할것이라고 한다.

## Chapter 2

### General Rules

#### 컴파일

- 너의 C++ 코드는 "-Wall -Wextra -Werror" 플래그와 함께 컴파일 한다.
- 너의 코드는 "-std=c++98"를 플래그로 추가하고도 컴파일이 되어야 한다.

##### 포멧과 네임 컨벤션

- 모든 문제의 디렉토리는 다음의 방식을 따른다 : ex00, ex01, ex02 ... exn
- 너의 파일, 클래스, 함수, 멤버함수, 속성들은 가이드라인의 요구에 맞추어야 한다.
- 클래스 이름은 UpperCamelCase 형식을 사용한다. 클래스를 담은 파일의 이름은 클래스 이름을 따라야 한다.

  얘를 들어, ClassName.hpp/ClassName.h, ClassName.cpp, ClassName.tpp 와 같은 형식이다. 그렇다면 "BrickWall"이라는 클래스를 담고있는 헤더의 이름은 BrickWall.hpp가 되어야 하는 것이다.

- 달리 명시하지 않았을 경우, 모든 출력 메세지는 개행문자로 끝나야 하며 표준 출력으로 보여주어야 한다.

- **Goodbye Norminette!** C++ 모듈에서는 코딩 스타일을 강요하지 않는다. 너가 좋아하는 것을 따라 할 수 있다. 하지만 동료평가시, 이해할 수 없는 코드를 사용할 경우, 동료들이 점수를 줄 수 없다는 것을 명심해라. 최선을 다해 클린하고 가독성 있는 코드를 작성하길 바란다.

##### 허용되는 사항 / 금지되는 사항

너는 이제부터 C로 코딩하지 않는다. C++의 시간이다 ! 그러므로:

- 너는 표준 라이브러리에서의 거의 모든 것들을 사용할 수 있다. 따라서, 이미 알고 있는 것을 고수하는 대신, 익숙한 C함수의 C++ 버전을 최대한 많이 사용해보는 것이 현명할 것이다.

- 그러나, 너는 다른 외부 라이브러리를 사용할 수 없다. 이 말의 의미는 C++ 11과 Boost 라이브러리가 금지된다는 것이다. 다음 함수도 금지된다. printf(), alloc() and free(). 이걸 쓰면 너의 점수는 0점이 될 것이다.

- 달리 명시하지 않는 이상, namespace 및 friend 키워드의 사용은 금지된다. 사용하면 -42점이므로 주의하자.

- 오직 모듈 08에서만 STL의 사용이 허용된다. 이 뜻은, 컨테이너(vector, list, map and forth)와 알고리즘(\<algorithm> 헤더가 포함된 어떠한 것들)이 허용되지 않는다는 것이다. 이 또한 사용하면 -42점이다.

##### 몇 가지 디자인 요구사항

- 메모리 누수가 발생하는것은 C++도 동일하다. 만약 너가 메모리를 할당(new 키워드 사용으로)하면, 메모리 누수를 반드시 피해야한다.

- 모듈 02부터 08까지는 달리 명시된 경우를 제외하고, 클래스를 Orthodox Canonical Form으로 설계해야만 한다.

- 헤더파일에 선언되지 않은 함수들을 사용하는 경우 0점을 받는다.

- 각 헤더를 다른 헤더와 독립적으로 사용할 수 있어야 한다. 따라서 필요한 모든 종속성을 포함해야한다. 그러나 헤더가드를 사용해 이중으로 포함되는 것은 피해야만 한다. 그렇지 않으면 0점을 받을 것이다.

##### Read me

- 너는 필요(즉, 코드를 분할하기 위해)에 의해 파일을 추가할 수 있다. 이런 할당은 프로그램에서 확인하지 않으므로, 필수 파일을 제출하는 한 자유롭게 추가하면 된다.

- 때때로 과제의 가이드라인이 짧아보이지만, 명시적으로 작성되지 않은 요구사항들을 example에서 보여줄 수 있다.

- 시작 전에 꼭 모듈의 과제를 읽어야만 한다. 정말이다 !

## Chapter 3

### New rules

이제부터, 모든 너의 클래스들은 달리 명시하지 않는 한, Orthodox Canonical Form으로 디자인 되어야한다. 그런 다음, 아래의 4개의 필수 멤버 함수를 구현한다.

- 기본 생성자
- 복사 생성자
- 복사 할당 연산자
- 소멸자

클래스 코드를 두개의 파일로 나눈다. 헤더파일(.hpp/.h)은 클래스 정의가 포함되고, 소스 파일(.cpp)에는 구현이 포함된다.

## Chapter 4

### Ex00

#### 문제

너는 정수와 부동 소수점을 알고 있다고 생각한다. 귀엽네.

이 3페이지 분량의 기사([1](https://www.cprogramming.com/tutorial/floating_point/understanding_floating_point.html), [2](https://www.cprogramming.com/tutorial/floating_point/understanding_floating_point_representation.html), [3](https://www.cprogramming.com/tutorial/floating_point/understanding_floating_point_printing.html))를 읽으면 그렇지 않다는 것을 알 수 있다. 계속해서 읽어보자.

오늘날까지, 너의 코드의 너가 사용하던 모든 수는 기본적으로 정수형 또는 부동 소수점 숫자이거나 그 변형(short, char, long, double, and so forth)이었다. 이 기사를 읽은 후, 정수형과 부동 소수점 숫자가 반대의 특성을 가지고 있다고 가정하는 것이 안전하다.

그러나 오늘, 바뀔것이다. 너는 새롭고 멋진 숫자 타입인 **fixed-point numbers(고정 소수점)**을 발견 할 것이다. 대부분의 언어의 스칼라 유형에서 영원히 누락된 고정 소수점은 성능, 정확도, 범위 및 정밀도 간의 중요한 균형을 제공한다. 이것은 왜 고정 소수점이 특히 컴퓨터 그래픽스, 음향 처리 혹은 과학적인 프로그래밍에 적용되는 이유를 설명한다.

C++에는 고정 소수점 숫자가 없기 때문에 추가할 것이다. [Berkeley의 기사](http://inst.eecs.berkeley.edu/~cs61c/sp06/handout/fixedpt.html)는 좋은 시작이다. 만약 Berkeley University가 무엇인지 모른다면, [Wikipedia 페이지의 섹션](http://en.wikipedia.org/wiki/University_of_California,_Berkeley#Notable_alumni.2C_faculty.2C_and_staff)을 읽어보아라.

고정 소수점 숫자를 나타내는 Orthodox Canonical Form인 클래스를 생성해라.

- Private members

  - 고정 소수점 숫자를 저장할 정수
  - 소수 비트 수를 저장하는 정적 상수 정수. 이 값은 항상 정수 리터럴 8이 될 것이다.

- Public members
  - 고정 소수점 숫자를 0으로 초기화시키는 기본 생성자
  - 복사 생성자
  - 복사 할당 연산자 오버로드
  - 소멸자
  - getRawBit 멤버 함수. 이것은 고정 소수점 값의 원시 값을 반환한다.
  - setRawBit 멤버 함수. 이것은 고정 소수점 수의 원시 값을 설정한다.

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/cpp_module/02/ex00_00.png?raw=true)

#### 구현

일단, 우리가 이제부터 지켜야할 Orthodox Canonical class form에 대해 알고 넘어가야 한다.

말 그대로 "규정대로" 프로그래밍을 하는 것을 의미하며, 클래스를 정의할 때 정해진 규칙을 따라야 한다는 것이다.

- 기본 생성자
  ![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/cpp_module/02/ex00_01.png?raw=true)

  기본 생성자에서는 고정 소수점 숫자를 0으로 초기화를 시켜주었다.

- 복사 생성자
  ![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/cpp_module/02/ex00_02.png?raw=true)

  복사 생성자에서는 인자로 들어오는 fixed 클래스를 현재의 클래스에 복사를 해 주었다. 이 때, 기본적인 복사 생성자는 얕은 복사를 한다. 이것을 레퍼런스 변수를 인자로 받아 복사를 수행하게 해줌으로써 원본 객체와 같은 값을 가지면서 독립성을 지닌 객체를 만드는 데 사용했다.

- 복사 할당 연산자 오버로드
  ![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/cpp_module/02/ex00_03.png?raw=true)

  할당 연산자 오버로드는 기존에 정의된 연산자의 기능을 사용자가 새로운 기능을 정의하여 사용하도록 하는 기능이다.

  직접 구현을 하지 않아도 컴파일러에서 a = b의 기능을 동작할 수 있도록 하지만, 자신이 의도한대로 동작이 되지 않을 수 있기 때문에 직접 구현하는 것이 좋다.

- 소멸자
  ![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/cpp_module/02/ex00_04.png?raw=true)

  클래스가 소멸될 때 동작하는 함수이다. 출력을 제외하고 따로 정의해주지 않았다.

- getRawBit
  ![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/cpp_module/02/ex00_05.png?raw=true)

- setRawBit
  ![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/cpp_module/02/ex00_06.png?raw=true)

## 느낀 점
