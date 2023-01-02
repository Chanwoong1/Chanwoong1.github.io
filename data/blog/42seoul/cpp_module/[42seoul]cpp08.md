---
title: '[42seoul] CPP Module 08'
date: '2022-12-31'
tags: ['4th_circle', 'C++', 'OOP', 'iterators', 'algorithm', '42seoul']
draft: false
summary: Templated containers, iterators, algorithms
layout: PostSimple
---

# Cpp Module 08

- [Chapter 1](#chapter-1)
  - [Introduction](#introduction)
- [Chapter 2](#chapter-2)
  - [General Rules](#general-rules)
- [Chapter 3](#chapter-3)
  - [Module-specific rules](#module-specific-rules)
- [Chapter 4](#chapter-4)
  - [Ex00](#ex00)
  - [Ex01](#ex01)
  - [Ex02](#ex02)
- [느낀 점](#느낀-점)

## Chapter 0

### STL Container

STL이란 Standard Template Library의 약자로 C++의 템플릿을 이용해 표준으로 정의된 라이브러리를 말한다.

여기서 컨테이너는 클래스 템플릿으로 구성되어있다. 컨테이너 변수를 선언할 때 컨테이너가 보유할 요소의 형식을 지정한다.

컨테이너는 데이터를 저장하고 잘 관리하기 위한 클래스라고 생각하면 된다. 컨테이너는 초기화리스트를 사용해 생성할 수 있으며, 요소의 추가, 제거 및 다른 작업들을 수행하기 위한 멤버 함수들을 가지고 있다.

반복기(iterator)를 사용해 컨테이너의 요소를 반복하고 개별 요소에 접근할 수 있다. 멤버 함수와 연산자 및 전역 함수를 사용해 반복기를 명시적으로 사용할 수 있다. 모든 STL 컨테이너에 대한 반복기에 공통적인 인터페이스가 있지만 각 컨테이너에서 자체적으로 특수화된 반복기를 정의한다.

#### 컨테이너의 종류

**시퀀스 컨테이너(Sequence Containers)**

정렬되지 않은 연결리스트 / 배열

- vector

  vector 컨테이너는 배열처럼 동작하지만 필요에 따라 자동으로 증가할 수 있다. 임의로 접근되고 지속적으로 저장되며 길이가 매우 유연하게 조정된다.

- array

  array 컨테이너는 vector와 비슷하지만 길이가 유연하지 않다.

- deque

  deque 컨테이너를 사용하면 컨테이너의 시작과 끝에 요소를 빠르게 삽입, 삭제가 가능하다. vector 컨테이너에서의 접근성과 유연성을 공유하지만, 연속되지는 않는다.

- list

  list 컨테이너는 양방향으로 접근 가능하고, 빠른 삽입도 가능하다. 컨테이너의 어디에서나 빠른 삭제도 가능하지만 임의의 요소에 접근할 수는 없다.

- forward_list

  list 컨테이너의 전방향 버전, 단방향 리스트.

**연관 컨테이너(Associative Containers)**

정렬 된 컨테이너

- set

자동으로 정렬이 되며, 요소가 중복되지 않는다. 삽입하려는 요소가 set 안에 이미 있다면, 삽입되지 않고 무시된다.

- multiset

set과 비슷하지만, 요소의 중복이 허용된다.

- map

Key를 기준으로 자동으로 정렬된다. Key와 Value가 존재하며 서로 대응된다.

Key로 Value에 접근할 수 있다.

Key는 중복되지 않는다.

- multimap

map과 비슷하지만 Key가 중복이 가능하다. 따라서 하나의 Key가 여러개의 Value를 가질 수 있다.

추가적으로 정렬이 되지 않은 set과 map인 **unordered_set**, **unordered_map**이 있다.

#### Container Adapter

컨테이너 어뎁터는 인터페이스를 제한하는 시퀀스 또는 연관 컨테이너의 변형이다. 컨터이너 어뎁터는 반복기를 지원하지 않는다.

- stack

  LIFO(Last In First Out) 구조이다. 가장 최근에 삽입된 요소가 가장 먼저 삭제되는 구조이다.

- queue

  FIFO(First In First Out) 구조이다. 가장 최근에 삽입된 것이 가장 늦게 삭제되는 구조이다.

- priority_queue

  queue처럼 들어온 순서대로가 아닌 높은 우선순위 요소일 수록 첫 번째에 위치하도록 구성된다.

컨테이너 어뎁터는 반복기를 지원하지 않아 STL 알고리즘과 함께 사용할 수는 없다.

### STL algorithm

STL algorithm 라이브러리는 컨테이너들을 다루는 데 필요한 함수들을 제공하고 있다. 자세한건 [이곳에..](https://en.cppreference.com/w/cpp/algorithm)

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

### Module-specific rules

이 모듈에서는 표준 컨테이너 및 표준 알고리즘 **없이** 예제를 해결할 수 있음을 알 수 있다.

그러나, **이것들을 사용하는 것이 이 모듈의 목표**이다. 너는 STL 사용이 허용된다. 그렇다, 너는 **컨테이너**(벡터/리스트/맵/등등)와 **알고리즘**(\<algorithm> 헤더에 정의된)을 사용할 수 있다. 또한, 너는 그것들을 가능한 많이 사용해야 한다. 따라서, 적절한 곳에 사용하기 위해 최선을 다 해라.

만약 그렇게 하지 않는다면, 코드가 예상대로 작동하더라도 아주 나쁜 점수를 받게 될 것이다. 게으름 피우지 말아라.

너는 너의 템플릿을 평소처럼 헤더파일에 정의할 수 있다. 또는, 만약 너가 원한다면, 너의 템플릿 선언을 헤더파일에 작성하고 구현부분을 .tpp파일에 작성할 수 있다. 어쨌든 헤더파일은 의무이고 .tpp파일은 선택적이다.

## Chapter 4

### Ex00

#### 문제

첫 번째 쉬운 운동은 오른발로 시작하는 방법이다.

타입 T를 허용하는 함수 템플릿 easyfind를 작성한다. 두개의 매개변수를 받으며, 첫 인자의 타입은 T, 두 번째 인자의 타입은 정수형이다.

T가 정수의 컨테이너라고 가정하면, 이 함수는 첫 번째 매개변수에서 두 번째 매개변수의 첫 항목을 찾아야 한다. 만약 발견되지 않았다면, 에러를 발생시키거나, 선택한 에러 값을 반환할 수 있다. 만약 영감이 필요하다면, 표준 컨테이너의 작동 방식을 분석해라.

물론, 모든 것이 예쌍대로 작동하는지 확인하기 위해 테스트를 구현하고 제출해라.

> > 연관 컨테이너를 처리할 필요는 없다.

#### 구현

<details>
<summary>구현 펼치기</summary>
<div markdown="1">

컨테이너 내부에는 포인터와 비슷한 역할을 수행할 수 있는 반복자(iterator)가 있다. 반복자를 사용하여 컨테이너에 저장되어 있는 원소들을 참조할 때 사용한다.

그럼 굳이 포인터 대신 반복자를 사용하는 이유는 무엇일까 ?

반복자는 컨테이너와 컨테이너 안에 존재하는 요소를 구별할 수 있다. 또한 요소의 값을 확인하고, 요소들 간 연산을 제공한다.

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/cpp_module/08/ex00_00.png?raw=true)

이런식으로 예제 00번을 구현해주었다. 여러 종류의 컨테이너들을 하나의 함수로 적용시킬 수 있도록 함수 템플릿을 사용해 주었고, find함수를 이용해 첫 항목을 찾아주었다.

여기서 begin() 함수는 컨테이너의 요소가 있는 시작 주소를 반환하며, 첫번째 위치를 뜻한다. end() 함수는 컨테이너의 끝 주소인데, 마지막 요소의 주소보다 한 칸 뒤의 주소를 반환하게 된다. 따라서, 함수 중간에 조건문 if(iter == container.end())는 찾고 싶은 값이 컨테이너에 없을 경우에 대한 예외처리라고 할 수 있다.

</div>
</details>

### Ex01

#### 문제

최대 N개의 정수를 담을 수 있는 **Span**클래스를 개발해라. N은 unsigned int 값이고 생성자에 전달되는 유일한 인자이다.

이 클래스는 Span에 단일 숫자를 추가하기 위한 **addNumber()**로 불리는 멤버 함수를 가질 것이다. 이것은 순서대로 채울 때 사용될 것이다. 이미 N개의 요소가 저장된 경우 새로운 값을 추가한다면 예외를 발생해야 한다.

다음으로, 두개의 멤버 함수를 구현해라: **shortestSpan()**과 **longestSpan()**

그것들은 각각 저장된 모든 숫자 사이에서 가장 짧은 범위 또는 가장 긴 범위를 찾아 반환한다. 저장된 숫자가 없거나 하나만 있다면 범위를 찾을 수 없으므로 예외를 발생시킨다.

물론, 너는 테스트를 작성할 것이고, 아래의 것보다 더 철저할 것이다. 최소 10000개의 숫자로 Span 클래스를 테스트해라. 많으면 많을수록 더 좋다.

```C++
// Running this code:
int main()
{
  Span sp = Span(5);
  sp.addNumber(6);
  sp.addNumber(3);
  sp.addNumber(17);
  sp.addNumber(9);
  sp.addNumber(11);
  std::cout << sp.shortestSpan() << std::endl;
  std::cout << sp.longestSpan() << std::endl;
  return 0;
}

// Should output:
2
14
```

마지막으로 다양한 반복자를 사용해 Span을 채우는것이 좋다. addNumber()를 수천번 호출하는것은 매우 화나는 일이다. 한번의 호출로 Span에 많은 숫자를 추가하는 멤버 함수를 구현해라.

> > 실마리가 없다면 컨테이너를 공부해라. 일부 멤버 함수는 일련의 요소를 컨테이너에 추가하기 위해 반복기 범위를 사용한다.

#### 구현

<details>
<summary>구현 펼치기</summary>
<div markdown="1">

이번 문제는 인자로 들어오는 값인 N의 값 만큼의 요소를 저장하는 클래스 Span을 만드는 것이었다. Span은 몇가지의 동작을 할 수 있도록 만들어주어야 한다.

먼저, 값의 추가를 용이하게 하기 위해 vector를 사용해주었다. 그리고 N개 만큼의 공간을 할당해주어야 하기때문에, 생성자에서 reserve라는 함수를 사용해주었다.

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/cpp_module/08/ex01_00.png?raw=true)

이 함수는 벡터의 공간을 미리 확보해두는 역할을 수행한다.

addNumber 함수는 push_back 함수를 이용하면 쉽게 구현 가능하다.

shortestSpan과 longestSpan 함수는 다음과 같이 구현해주었다.

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/cpp_module/08/ex01_01.png?raw=true)

longestSpan 함수는 임의의 두 값의 차이가 가장 큰 값을 반환해주는 것으로, 가장 작은 값과 가장 큰 값의 차이를 반환해주면 되었다.

shortestSpan은 임의의 두 값의 차이가 가장 작은 값을 반환해주는 것으로, 정렬을 통해 인접한 값들의 차이 중 가장 작은 값을 반환해주었다.

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/cpp_module/08/ex01_02.png?raw=true)

또한, addNumber 함수를 여러번 호출하는것은 굉장히 비효율적이므로, 한번에 여러개의 값을 넣을 수 있는 함수를 만들어주었다.

반복자를 사용할 수 있는 컨테이너라면 모두 입력 가능하도록 함수 템플릿으로 만들어주었다.

</div>
</details>

### Ex02

#### 문제

이제, 더 심각한 것들로 이동할 시간이다. 이상한 것을 개발하자.

std::stack 컨테이너는 엄청 훌륭하다. 운이 없게도, 그건 반복할 수 없는 STL 컨테이너들 중 하나이다. 아쉽다.

그런데 왜 우리가 이것을 받아들일까? 특히 원래 스택을 없애고 누락된 기능을 생성할 수 있는 경우 특히 그렇다.

불의를 바로잡기 위해, std::stack 컨테이너를 반복 가능하게 만들어라.

**MutantStack** 클래스를 작성해라. 이것은 std::stack**으로 구현** 될 것이다. 그것의 모든 멤버 함수가 제공된다, 추가적인 기능도 더해져서: **iterators**

물론, 모든 동작이 예상대로 작동하는지 확인하기 위해 자체 테스트를 작성하고 제출해라.

```C++
int main()
{
  MutantStack<int> mstack;

  mstack.push(5);
  mstack.push(17);

  std::cout << mstack.top() << std::endl;

  mstack.pop();

  std::cout << mstack.size() << std::endl;

  mstack.push(3);
  mstack.push(5);
  mstack.push(737);
  //[...]
  mstack.push(0);

  MutantStack<int>::iterator it = mstack.begin();
  MutantStack<int>::iterator ite = mstack.end();

  ++it;
  --it;
  while (it != ite)
  {
    std::cout << *it << std::endl;
    ++it;
  }
  std::stack<int> s(mstack);
  return 0;
}
```

MutantStack으로 처음 실행하고 두번째로 MutantStack을 예를 들어 std::list로 바꾸면, 두 출력이 동일해야 한다. 물론, 다른 컨테이너를 테스트할 때, 해당하는 멤버 함수로 아래 코드를 업데이트한다.(push()가 push_back()이 될 수 있다.)

#### 구현

<details>
<summary>구현 펼치기</summary>
<div markdown="1">

마지막 예제는 배열을 구현하는 문제이다. 이 문제를 통해 클래스 템플릿을 배우는 것이 목표이며, 모듈 07 중 가장 할 것이 많은 문제였다.

문제를 보면, Array.hpp를 만들고, 선택사항으로 Array.tpp를 만들어도 된다는 정보가 있다. 이 뜻은, 원착상 템플릿의 경우 헤더 파일에서 정의를 해주어야 하는데, 클래스 템플릿을 헤더 파일에서 정의하면 양이 꽤 많아져서 tpp 파일을 통해 cpp파일에 정의하는것 처럼 분리해도 된다는 뜻인데.. 나는 그냥 hpp파일에 모두 정의해주었다.

먼저, 과제의 요구대로 구현을 시작해주었다.

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/cpp_module/07/ex02_00.png?raw=true)

인자가 들어오지 않는 경우, 빈 배열을 만든다라고 하는데, 0의 크기를 가진 빈 배열이라면 결국 NULL 주소를 가리기는 것이 맞다고 생각했다.

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/cpp_module/07/ex02_01.png?raw=true)

인자가 들어오는 경우에는 new를 이용해 배열을 만들어주었고, 들어오는 인자가 0일 경우를 생각해 조건문을 달아주었다.

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/cpp_module/07/ex02_02.png?raw=true)

복사생성자와 할당 연산자 오버로드도 비슷하게 만들어주었다. \[ ] 연산자로 요소에 접근할 수 있도록 기능을 구현할것이기 때문에, ref[idx]라는 표현을 사용했다.

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/cpp_module/07/ex02_03.png?raw=true)

이 부분에서 \[ ] 연산자를 오버로드 해주었다. 연산자 오버로드를 통해 클래스에서 바로 인덱스만으로 요소에 접근할 수 있도록 구현해줄 수 있다. 조건 중에는 잘못된 인덱스 접근일 경우 예외를 발생시키라고 되어있어서 그 부분도 작성해주었다.

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/cpp_module/07/ex02_04.png?raw=true)

예외처리를 위한 클래스를 만들어주었다.

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/cpp_module/07/ex02_05.png?raw=true)

마지막으로 배열의 크기를 반환하는 함수를 만들어주었다.

</div>
</details>

## 느낀 점
