---
title: '[42seoul] CPP Module 06'
date: '2022-12-21'
tags: ['4th_circle', 'C++', 'OOP', 'cast', '42seoul']
draft: false
summary: C++ casts
layout: PostSimple
---

# Cpp Module 06

- [Chapter 0](#chapter-0)
  - [Try - Catch](#try---catch)
- [Chapter 1](#chapter-1)
  - [Introduction](#introduction)
- [Chapter 2](#chapter-2)
  - [General Rules](#general-rules)
- [Chapter 3](#chapter-3)
  - [Additional rule](#additional-rule)
- [Chapter 4](#chapter-4)
  - [Ex00](#ex00)
  - [Ex01](#ex01)
  - [Ex02](#ex02)
- [느낀 점](#느낀-점)

## Chapter 0

이번 과제의 주제는 cast이다. cast는 형변환이라는 의미로, 흔히 int형에서 float형 등으로 형태를 변환한다는 의미를 가지고 있다.

형변환에는 명시적 형변환과 암시적 형변환이 있다. C와 C++ 모두 지원하며, 42에서 C언어 과제를 할 때, 주로 사용한 형 변환이 명시적 형변환이다.

```C++
// 명시적 형변환
float a = 1.23;
int b;

b = (int)a;   // 명시적으로 float형인 a를 int형으로 변환해준다.

std::cout << b << std::endl;  // 1
```

암시적 형변환 또한 C와 C++ 모두 지원하며 컴파일 시 자동으로 형변환이 된다.

```C++
// 암시적 형변환
float a = 1.23;
int b;

b = a;  // float형인 a값이 int형으로 변환되어 int형인 b에 저장된다.

std::cout << b << std::endl;  // 1
```

이런 암시적 형변환은 사용자가 원하지 않은 경우에도 일어날 수 있으므로 사용에 주의해야한다.

C++에서는 위의 형변환 외 추가로 4개의 형변환 연산자(static_cast, const_cast, reinterpret_cast, dynamic_cast)를 제공한다.

- static_cast

  논리적으로 변경 가능한 경우에만 형변환이 가능하다. 이미 변환할 자료가 어떤 형인지 어느정도 알 수 있을경우 사용하는것이 옳으며, C에서와는 다르게 캐스팅을 위한 타입 체크를 컴파일 타임에서 정적으로 실행하기 때문에 대부분의 경우 미리 오류를 발견할 수 있다.

  포인터를 통한 형변환이 불가능하다. 포인터 단에서 형변환이 의미가 있는 경우는 상속받은 객체에 대한 업캐스팅, 다운캐스팅의 경우가 있다.

  ```C++
  # include <iostream>

  int main() {
    int i = 4;
    double d = 8.8;

    double a = static_cast<double>(i);
    std::cout << typeid(a).name() << std::endl;
  }
  ```

- reinterpret_cast

  무조건 변환해준다.(강제 변환) 메모리 단위로 분해해서 재조립한다. 매우 위험한 방법으로, 연관성이 없는 포인터 타입을 변환하기 위해서 사용한다.

  암묵적 캐스팅이 불가능하며, 캐스팅 결과가 컴파일러마다 다를 수 있다. 정수 자료형의 경우 캐스팅 시 메모리 주소값으로 변경할 수 있다.

  다른 타입의 포인터로 변경할 시, 메모리 주소값이 유지되지 않는다.

  ```C++
  #include <iostream>

  int main() {
    int a = 123123;
    // 정수값이 메모리 주소로 변환되어 들어가 매우 위험
    int* pi = reinterpret_cast<int*>(a);

    int* b = &a;
    char* c;
    //int * -> char *로 타입캐스팅된다. 컴파일러에 따라 값이 조금씩 다르다.
    c = reinterpret_cast<char*>(b);

    return 0;
  }
  ```

- const_cast

  const를 제거할 때 사용한다.

  ```C++
  #include <iostream>

  int main() {
    char msg[] = "Hello";
    const char* cp_msg = msg;
    std::cout << cp_msg << std::endl;
    //const char 이기때문에 변경 불가 (상수인 상태)
    cp_msg[0] = 'Y';

    char* copy = const_cast<char*>(cp_msg);
    //const_cast를 통해 상수성이 제거되어서 변경 가능
    copy[0] = 'Y';
    std::cout << copy << std::endl;
    return 0;
  }

  int main() {
    int i = 100;
    const int& c_ref = i;
    std::cout << i << std::endl;

    //const int& 이기때문에 변경이 불가능하다.
    c_ref = 50;

    int& ref = const_cast<int&>(c_ref);
    ref = 50;
    std::cout << ref << std::endl;
    return 0;
  }
  ```

- dynamic_cast

  Run Time Type Information을 위한 캐스팅

  다형성을 이용해 모호한 타입 캐스팅을 시도할 경우 사용하게 된다.

  만약 캐스팅에 실패할 경우, NULL이 반환되어 형변환에 대한 예외처리가 가능해진다.

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

### Additional rule

다음 규칙은 전체 모듈에 적용되며 선택 사항이 아니다. 각 예제에서, 특정 유형의 캐스팅을 사용해서 형변환을 해결해야한다. 너의 선택은 동료 평가 동안 확인될 것이다.

## Chapter 4

### Ex00

#### 문제

가장 일반적인 형식의 C++ 리터럴의 문자열 표현을 인자로 받는 프로그램을 작성해라. 이 리터럴은 다음과 같은 스칼라 형 중 하나에 속해야 한다: char, int, float, or double. char. char 형을 제외하고 소수 표기법만 사용한다.

char 리터럴의 예: 'c', 'a', ...

간편한 것을 만들기 위해, 출력할 수 없는 문자형은 입력값으로 사용하지 않길 바란다. 만약 출력할 수 없는 문자형을 변환하려한다면, 정보 메세지를 출력한다.

int 리터럴의 예: 0, -42, 42,...

float 리터럴의 예: 0.0f, -4.2f, 4.2f...

이 의사 리터럴도 처리해야 한다(과학을 위해): -inff, +inff, and nanf.

double 리터럴의 예: 0.0, -4.2, 4.2...

이 의사 리터럴을 잘(너도 알다시피, 재미로) 다뤄야 한다: -inf, +inf and nan.

먼저 매개변수로 전달된 리터럴의 유형을 감지하고, 문자열에서 실제 유형으로 변환한 다음, 명시적으로 다른 세 가지 데이터 유형으로 변환해야 한다. 마지막으로 아래와 같이 결과를 표시한다.

만약 변환이 의미가 없거나 오버플로우되면, 사용자에게 유형 변환이 불가능함을 알리는 메세지를 표시해라. 숫자 제한 및 특수 값을 처리하기 위해 필요한 모든 헤더를 포함해라.

#### 구현

<details>
<summary>구현 펼치기</summary>
<div markdown="1">

예제 00은 string으로 들어오는 입력값을 다른 형태로 변환해서 출력하는 문제이다. 이 문제를 쉽게 접근하기 위해, 먼저 들어오는 입력값을 double 형으로 변환해주는 작업을 해 주었다. 모든 입력값이 double형으로 변환되면, 문제의 조건에 맞추어 값을 출력해주면 되기 때문에 한결 쉬워진다.

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/cpp_module/06/ex00_00.png?raw=true)

try 부분에서 double 형으로 변환을 해 주는데, 만약 형 변환이 제대로 이루어지지 않았다면 출력할 수 없는 리터럴로 판단하여 에러를 발생시키도록 구현했다.

위 부분에서 strtod함수는 문자 스트링을 해석할 수 있는 곳까지 해석해서 double형으로 표현된 값을 반환해준다. 이 함수를 통해 우리는 입력값을 double 형으로 변환해주는 작업을 해줄 수 있고, strtod에 의해 표현할 수 없는 값들은 0이 반환되어 에러를 발생시킬 수도 있다.

try부분에서 에러가 발생한다면, catch문을 통해 \_error 값을 True로 바꾸어준 뒤, 연산자 오버로딩을 통해 재정의한 함수에서 에러에 대한 출력을 구현해주었다.

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/cpp_module/06/ex00_01.png?raw=true)

에러가 아니라면, printResult 함수를 통해 결과를 출력해주었다.

</div>
</details>

### Ex01

#### 문제

다음 함수들을 구현하자:

uintptr_t serialize(Data\* ptr);

이 함수는 포인터를 받아 unsigned integer 형인 uintptr_t로 변환한다.

Data\* deserialize(uintptr_t raw);

이 함수는 unsigned integer 인자를 받아 Data형 포인터로 변환한다.

너의 함수들이 예상대로 동작하는지 테스트하는 프로그램을 작성해라.

너는 비어있지 않은(데이터 멤버를 갖고있음을 의미.) **Data** 구조체를 만들어야 한다.

Data 객체의 주소로 **serialize()**를 사용하고 반환 값을 **deseialize()**에 전달한다. 그 다음, **deserialize()**의 반환값이 원본 포인터와 동일한지 비교한다.

너의 Data 구조체의 파일을 제출하는것을 잊지 말아라.

#### 구현

<details>
<summary>구현 펼치기</summary>
<div markdown="1">

문제 자체는 00번 예제와 비교하면 굉장히 간단한 문제였다. 하지만 uintptr_t라는 타입을 처음봐서 알고 넘어가야겠다는 생각이 들었다.

- uintptr_t

  포인터를 저장하는 타입 중 하나이다. 이 타입을 통해 다른 타입으로 조금 더 안전하게 변환할 수 있다.

  시스템 내부에서 사용하는 포인터와 같은 크기이며, 포인터를 정수 표현으로 변환할 때 유용하게 사용할 수 있다.

이 문제에서는 reinterpret_cast를 사용해보는 문제였다. C++에서는 [포인터->포인터, 값->포인터, 포인터->값] 변환 모두 별도의 형변환을 명시해주어야 사용할 수 있다.

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/cpp_module/06/ex01_00.png?raw=true)

</div>
</details>

### Ex02

#### 문제

public한 가상 소멸자만 가지는 **Base** 클래스를 구현해라. Base를 상속받는 **A**, **B**, **C** 클래스를 생성해라.

> > 이 네개의 클래스들은 OCCF로 디자인하지 않아도 된다.

다음 함수들을 구현해라:

Base\* generate(void);

A, B 또는 C를 임의로 인스턴스화하고 인스턴스를 Base 포인터로 반환한다. 랜덤 추출을 구현하기 위해 원하는 것을 자유롭게 사용해라.

void identify(Base\* p);

void identify(Base& p);

p가 가리키는 객체의 실제 유형("A", "B" 또는 "C")를 출력한다.

이 함수 내에서 포인터를 사용하는 것은 금지된다. typeinfo 헤더를 포함하는것도 금지된다.

모든것이 예상대로 작동하는지 테스트하는 프로그램을 작성해라.

#### 구현

<details>
<summary>구현 펼치기</summary>
<div markdown="1">

이번 예제는 dynamic_cast를 사용하는 문제였다. 상속 구조를 만들어서 업캐스팅 후, 자신의 타입이 무엇인지 밝히는것이 목표이다.

dynamic_cast는 주로 부모를 가리키는 포인터를 자식을 가리키도록 바꾸는 다운 캐스팅에 사용되는 캐스팅이다. 만약 부모 클래스가 가상 함수가 있는 추상 클래스라면 자식의 주소를 따로 저장해두기 때문에 다운 캐스팅이 가능하다.

상속 구조를 갖는 객체들 간에는 부모 클래스를 메모리 상에 가지고 있기 때문에, 자식 클래스를 부모 클래스의 포인터로 참조하는것이 가능해, 업 캐스팅 시 아무런 문제가 없었다. 하지만, 자식 클래스가 업 캐스팅 된 부모 클래스 형태가 아니라 순수한 부모 클래스(추상 클래스가 아닌)를 이용하는 경우, 부모 클래스를 메모리 상에 유지하고 있지 않기 때문에 자식 클래스로 다운 캐스팅은 문제가 될 수 있다.

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/cpp_module/06/ex02_00.png?raw=true)

dynamic_cast를 사용한다면 형 변환 가능 여부를 확인할 수 있도록 되어있어, 위와 같이 구현해줄 수 있다. 포인터 변환은 실패했을 경우 NULL을 받을 수 있어 if문으로만 처리가 가능하다. 하지만, 레퍼런스형의 경우, 레퍼런스는 NULL값을 가질 수 없으므로 에러가 발생하게 된다. 따라서 try-catch문을 사용해 코드를 구현해주었다.

</div>
</details>

## 느낀 점

이번 과제는 형변환에 대해 알아보는것이 목표였다. 과제에서 구현하라고 하는것은 꽤나 간단했지만, C++에서는 형변환에 필요한 연산자들이 4개가 존재하고, 그 연산자들의 개념이 좀 어려웠다. 형변환 연산자들을 아직은 적절하게 사용하지는 못하지만, 계속 과제를 해나가면서 익숙해지도록 연습해야겠다.
