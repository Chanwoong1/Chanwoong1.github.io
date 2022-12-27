---
title: '[42seoul] CPP Module 06'
date: '2022-12-21'
tags: ['4th_circle', 'C++', 'OOP', 'cast', '42seoul']
draft: false
summary: C++ casts
layout: PostSimple
---

# Cpp Module 05

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
  - [Ex03](#ex03)
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

</div>
</details>

### Ex01

#### 문제

이제 bureaucrat가 생겼으니, 무언가 할 일을 주자. 양식 더미를 채우는 것보다 더 좋은 활동이 어디 있겠는가 ?

그렇다면, Form 클래스를 만들어보자. 그것은 :

- const name
- 사인 여부를 포함하는 boolean (생성자에서는 하지 않음으로)
- 사인 권한 등급
- 실행 권한 등급

이 모든것은 **private** 속성이다. protected가 아니다.

Form의 등급은 Bureaucrat에 적용되는 동일한 규칙을 따른다. 따라서 Form의 등급이 범위를 벗어나면 다음 예외가 발생한다.

**Form::GradeTooHighException**, **Form::GradeTooLowException**

전과 동일하게, 모든 속성에 대한 getter와 모든 양식의 정보를 출력하는 (\<\<) 연산자의 오버로드를 작성한다.

또한 Form에서 Bureaucrat을 인자로 받는 **beSigned()** 멤버 함수를 추가한다. 이것은 bureaucrat의 등급이 충분히 높을 경우(요구 등급보다 높거나 같음)에 form의 사인 상태를 바꾼다. 1등급이 2등급보다 높다는것을 기억해라. 등급이 너무 낮다면 Form::GradeTooLowException을 통해 예외를 발생해라.

마지막으로, **signForm()** 멤버 함수를 Bureaucrat에 추가하자. 만약 사인을 받았다면, 이것은 다음과 같이 출력할 것이다.

**\<bureaucrat> signed \<form>**

받지 않았다면, 다음을 출력할 것이다.

**\<bureaucrat> couldn't sign \<form> because \<reason>.**

모든 것이 예상대로 작동하는지 확인하기 위해 몇 가지 테스트를 구현하고 제출하자.

#### 구현

<details>
<summary>구현 펼치기</summary>
<div markdown="1">

Form 클래스에 대해서는 과제에서 요구한 대로 구현을 했다.

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/cpp_module/04/ex01_00.png?raw=true)

어려운 구현을 요구하는 것이 아니라 난이도 자체는 괜찮았는데, Bureaucrat.hpp 에서는 Form.hpp를 불러오고, Form.hpp에서는 Bureaucrat.hpp를 불러오면서 오류가 발생했다. 한참 고민하다가 Bureaucrat.hpp에서 class Form을 먼저 선언해주는 것으로 해결했다.

</div>
</details>

### Ex02

#### 문제

기초 양식을 가지고 있으므로, 실제 작업을 수행하는 몇 가지 양식을 더 만들어 볼 차례이다.

모든 상황에서, 기본 클래스 Form은 추상 클래스가 되어야 하기 때문에, AForm으로 이름을 변경해야한다. Form의 속성은 private로 유지되어야 하며 기본 클래스에 남아있어야 함을 명심하자.

다음의 구체적인 클래스들을 추가하자.

- ShrubberyCreationForm: 요구 등급: sign 145, exec 137

  \<target>\_shrubbery 파일을 작업 디렉토리에 만들고, ASCII 트리를 파일 내부에 작성한다.

- RobotomyRequestForm: 요구 등급: sign 72, exec 45

  약간의 드릴 소리를 낸다. 그리고, \<target>은 50%의 시간 동안 성공적으로 로봇화되었음을 알린다. 그렇지 않다면, 로봇공학은 실패했음을 알린다.

- PresidentialPardonForm: 요구 등급: sign 25, exec 5

  \<target>이 Zaphod Beeblebrox에 의해 사면되었음을 알린다.

그들 모두는 생성자에서 Form의 대상인 하나의 매개변수만 사용한다. 예를들어 shrubbery를 집에 심고 싶다면 "집"이라고 입력한다.

이제, **execute(Bureaucrat const & executer) const** 멤버 함수를 기본 form에 추가하고, 구체적인 클래스의 양식 동작을 실행하는 함수를 구현한다. 양식에 서명이 되어있고 양식을 실행하려는 bureaucrat의 등급이 충분히 높은지 확인해야한다. 그렇지 않다면 적절한 예외를 발생시킨다.

모든 구체적인 클래스 또는 기본 클래스에서 요구 사항을 확인하고 싶은지(그리고 다른 함수를 호출해 양식을 실행한다)는 사용자에게 달려있다. 그러나 한 가지 방법은 다른 방법보다 이쁘다.

마지막으로, Bureaucrat에 \*\*executeForm(Form const & form) 멤버 함수를 추가한다. 이것은 form의 실행을 시도해야 한다. 성공한다면 다음과 같이 입력한다.

**\<bureaucrat> executed \<form>**

아니라면, 명시적인 에러메세지를 출력해라.

모든 것이 예상대로 작동하는지 확인하기 위해 몇 가지 테스트를 구현하고 제출해라.

#### 구현

<details>
<summary>구현 펼치기</summary>
<div markdown="1">

먼저, Form 클래스를 추상 클래스로 바꿔주어야 한다. 별로 달라지는건 없고, 새로 추가되는 AForm을 상속받는 세개의 클래스들에서 재정의해줄 execute 함수를 순수 가상 함수로 만들어주었다.

또한, 실행 권한 등급을 통한 실행 여부를 판단하는 멤버 함수를 만들어주어야 했기 때문에, 실행 권한 등급에 따른 예외처리 클래스도 만들어주었다.

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/cpp_module/04/ex02_00.png?raw=true)

그리고, Bureaucrat 클래스에서 Form의 실행을 담당하는 executeForm 멤버 함수를 만들어 주었는데, 이 함수 내부에서 execute 함수를 사용할 수 있도록 만들어, try-catch 문을 사용해 에러가 발생하면 에러를 출력할 수 있도록 만들어 주었다.

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/cpp_module/04/ex02_01.png?raw=true)

executeForm은 Form을 인자로 받는 함수이기 때문에, AForm을 상속받는 세개의 클래스를 모두 받아줄 수 있다. 하나의 executeForm 함수로 세 자식 클래스의 execute를 실행할 수 있게 되는 것이다.

3개의 클래스는 각각 실행했을 때의 결과가 달라야한다. 과제에 구체적으로 명시되어 있는데, 여럽지 않게 구현해줄 수 있다.

**ShrubberyCreationForm**은 권한을 만족했을 때, 작업 디렉토리 안에 ascii로 만들어진 나무를 \<target>\_shrubbery라는 파일에 저장해주어야 한다. 파일 저장은 module 01에서 해보았으니 쉽게 구현할 수 있을 것이고, 나무는 간단하게 직접 만들어주었다.

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/cpp_module/04/ex02_02.png?raw=true)

곧 다가오는 크리스마스에 대비해서, 눈오는 날의 나무를 만들어보았다.

**RobotomyRequestForm**은 로봇화의 성공률이 50퍼센트가 되도록 멤버 함수를 만들어주어야 한다. 이 때, 성공률은 시간의 50%라고 되어있으므로, 현재 시각을 불러와서 2로 나누었을 때의 나머지를 통해 성공과 실패를 나누어 주었다.

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/cpp_module/04/ex02_03.png?raw=true)

시간은 \<ctime> 라이브러리에서 std::time_t 객체의 time 함수를 통해 구할 수 있다. 이때 반환되는 시간은 흔히 [유닉스시간(혹은 Epoch 시간)](http://pubs.opengroup.org/onlinepubs/9699919799/basedefs/V1_chap04.html#tag_04_16) 이라고 하는 시간이 반환된다. 우리는 어차피 초단위만 사용하면 되기때문에 반환 받은 값을 별다른 변환 없이 2로 나누어 주기만 하면 된다.

마지막으로 **PresidentialPardonForm**은 가장 쉽다. 그냥 등급에 맞는지 확인하고, 맞다면 적절한 메세지를 출력하면 된다.

</div>
</details>

### Ex03

#### 문제

우리의 양식들을 채우는것이 충분히 화가나기 때문에, 우리 관료들에게 하루 종일 이걸 하라고 하는것은 잔인할 것이다. 운좋게도, 인턴이 존재한다. 이번 예제에서는 **인턴**클래스를 구현해야한다. 인턴은 이름도 등급도 고유한 특성도 가지고 있지 않다. 관료들이 신경쓰는 유일한 것은 그들이 일을 하는것이다.

그러나, 인턴은 makeForm 함수라는 중요한 것을 하나 가진다. 이것은 두개의 문자열이 필요하다. 첫 문자열은 양식의 이름이고, 두번째는 양식의 타겟 이름이다. 이것은 두번째 인자로 초기화될 **양식 객체**(이름은 매개변수로 전달된 이름이다.)에 대한 포인터를 반환한다.

다음과 같이 출력될 것이다.

**Intern creates \<form>**

만약 양식 이름이 인자로써 존재하지 않는다면, 명시적인 에러 메세지를 출력해야한다.

너는 if/elseif/else 숲처럼 가독성이 떨어지고 못생긴 해법을 피해야만 한다. 이것들은 평가 과정에서 허용되지 않는다. 너는 더이상 피신 속에 있지 않다. 평소와 같이, 모든것이 예상대로 동작하는지 테스트를 해야한다.

예를 들어, 다음 코드는 "Bender" 라는 타겟으로 **RobotomyRequestForm**을 생성한다.

```C++
{
  Intern someRandomIntern;
  Form* rrf;

  rrf = someRandomIntern.makeForm("robotomy request", "Bender");
}
```

#### 구현

인턴 클래스의 구현은 굉장히 쉬웠다. 일단, 이름, 등급, 등등의 것들이 존재하지 않는다는 언급이 클래스에서 변수를 가지고 있지 않다고 해석했고, 따라서 기본 OCCF 형식의 클래스로만 만들고난 뒤, 구현을 따로 해주지 않았다.

makeForm 멤버 함수를 만들어주기만 하면 되었는데, module 01의 ex06에서 사용했던 **switch-case** 문으로 if/elseif/else의 사용 없이 문제를 해결할 수 있었다.

인턴을 통해 AForm 형식을 반환받도록 구현하면 되기 때문에, 테스트는 ex02에서 사용했던 테스트를 변형하는 형식으로 확인해볼 수 있었다.

## 느낀 점

이번 과제는 예외처리에 대해 조금 더 명확한 예외 처리를 해보는 것을 요구하는 과제였는데, try-catch문을 처음 사용해보는 것은 아니어서 해볼만 했다. 하지만, 귀찮다는 이유로 혹은 norminette나 과제의 요구 사항을 이유로 사실 잘 사용하지 않았었는데, 이번 과제를 계기로 사용 빈도를 늘릴 수 있도록 노력 할 것이다. 확실히 더 가독성 있는 코딩과 유지보수 측면에서 조건문을 통한 예외처리보다 더 낫다는 장점이 있기 때문에 안할 이유 또한 없다.
