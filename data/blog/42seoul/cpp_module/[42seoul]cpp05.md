---
title: '[42seoul] CPP Module 05'
date: '2022-12-18'
tags: ['4th_circle', 'C++', 'OOP', '42seoul']
draft: false
summary: Repetition and Exceptions
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
  - [New Rules](#new-rules)
- [Chapter 4](#chapter-4)
  - [Ex00](#ex00)
  - [Ex01](#ex01)
  - [Ex02](#ex02)
  - [Ex03](#ex03)
- [느낀 점](#느낀-점)

## Chapter 0

이번 과제의 주제는 반복과 예외이다. 지금까지는 예외가 발생하면 그 상태로 에러를 반환하는 형태로 프로그램을 구현했다. 즉, **"예외 -> 프로그램 종료"** 라는 형식으로 코드를 작성했는데, 이번 과제에서는 예외가 발생한다면 다시 입력을 받거나, 예외가 발생한 구간부터 사용자가 작성한 코드를 동작하도록 만들어야 하는 것으로 보인다.

먼저, 이번 과제에서 자주 쓰일 try - catch 문에 대해 알아보도록 하자.

### Try - Catch

우리가 주로 사용하던 if문을 통한 예외처리 방식은 if 조건문이 굉장히 많이 쓰이고, 다방면으로 쓰이기 때문에 예외 처리를 위해 사용하는 것인지 한눈에 알아보기 힘들다. 이런 불편한 점 때문에, 가독성과 유지보수성을 위해 try-catch문을 사용하게 된다.

기본적으로 try-catch문은 다음과 같이 사용할 수 있다.

```C++
int main() {
  try {
    // 예외가 발생할것을 예상할 수 있는 코드들
  } catch {
    // 예외가 발생했다면 동작해야하는 코드들
  }
  // try - catch 문이 정상적으로 동작했다면 실행되어야 하는 코드들
}
```

이런식으로 사용할 수 있는데, try-catch문의 장점은 가독성을 높일 뿐만 아니라 예외 처리를 **프로그램의 일반적인 흐름에서 독립**시킬 수 있다는 점이 있다.

그럼 예외가 발생하는것을 어떻게 전달해야하는가 ?

그동안 프로그램에서 예외가 발생한다면 프로그램을 종료시키는 것이 일반적이었다. 그렇다면 try문에 예외가 발생했을 때 종료하는 코드를 작성한다면 catch문으로 넘어가는것일까 ??

그렇지 않다. try-catch문에서는 예외가 발생했음을 알리기 위해 **throw**를 사용한다.

```C++
if (조건문)
  throw "에러메세지";
```

이런식으로 try문 내부에 예외를 발생시키도록 throw를 배치한다면 throw문에서 그 즉시 예외를 발생했음을 알리고, catch문이 예외 발생을 감지한다.

throw문은 사용자의 구현 방식에 따라 여러가지 예외상황을 담은 데이터를 전달할 수 있다.
단순한 에러메세지를 전달하고자 한다면 다음과 같이 사용할 수 있다.

```C++
int main() {
  int num;

  while (1) {
    std::cout << "10 미만의 수 입력 : ";
    std::cin >> num;
    try {
      if (num >= 10)
        throw "잘못된 수를 입력했습니다. 다시 입력해주세요.";
      break;
    } catch (const char* message) {
      std::cout << message << std::endl;
    }
  }
  std::cout << "10 미만의 수 " << num << " 입력 완료 !";
  return 0;
}
```

이런식으로 throw에 데이터를 담아 전달해주면 catch에서 message라는 변수에 데이터를 받아서 사용할 수 있다.

만약 throw로 전달되는 타입을 모른다면 "catch(...)"으로 작성하면 어떤 타입의 예외든 처리를 해줄 수 있다.

#### std::exception

위처럼 if문을 통해 예외를 인지하고 throw를 통해 예외를 발생시키는 방법도 있지만, 시스템 내부에서 std::exception 클래스를 통해 예외를 발생시켜줄 수 있다.

이 exception 클래스는 **what()**이라는 가상 함수가 존재한다. exception 클래스를 상속받는 자식클래스인 runtime_error, logic_error 등에서 what 함수를 오버라이딩 해서 예외 발생 시 사용한다.

그렇다면 우리도 exception 클래스를 상속받아 what 함수를 오버라이딩 해서 새로운 예외 처리 클래스를 만들어줄 수 있겠다.

이걸 해보라고 하는것이 이번 과제의 목적이기 때문에 예제에서 후술하려 한다.

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

> 예외 클래스들은 OCCF로 작성하지 않아도 됨을 알아두자. 그렇지만 다른 모든 클래스들은 OCCF로 작성해야한다.

사무실, 복도, 양식 및 대기열의 인공적인 악몽을 설계해보자. 재밌겟다 ? 아니 ? 너무 나빠.

먼저, Bureaucrat이라는 이 방대한 관료적 기계의 가장 작은 톱니바퀴부터 시작하자.

Bureaucrat은 다음을 가지고 있다.

- const name
- 1부터 150까지 범위의 등급 (1이 제일 높고, 150이 가장 낮은 등급)

유효하지 않은 등급을 사용하여 Bureaucrat을 인스턴스화하려는 모든 시도는 예외를 발생시켜야 한다.

예외 : **Bureaucrat::GradeTooHighException**, **Bureaucrat::GradeTooLowException**

**getName()**, **getGrade()**로 두 속성 모두 getter를 제공할 것이다. 또한 등급의 증가와 감소를 위한 두 멤버 함수를 구현해라. 등급이 범위를 벗어나면, 둘 다 생성자와 동일한 예외를 발생해야한다.

> 기억해라. 1등급이 가장 높고, 150이 가장 낮기 때문에, 3등급을 증가시키면 2등급이 되어야 한다.

에러 발생은 try - catch를 사용해서 발생해야만 한다.

```C++
try
{
  /* do some stuff with bureaucrats */
}
catch (std::exception & e)
{
  /* handle exception */
}
```

(\<\<) 연산자 오버로드를 통해 다음과 같은 출력을 구현할 것이다. (괄호 빼고)

**\<name>, bureaucrat grade \<grade>.**

평소처럼, 모든 것이 예상대로 작동하는지 확인하기 위해 몇 가지 테스트를 실행하자.

#### 구현

<details>
<summary>구현 펼치기</summary>
<div markdown="1">

지금까지 해왔던 대로 클래스를 구현한다면 쉽게 Bureaucrat 클래스를 구현할 수 있을 것이다.

여기서 추가되는 점은, 예외 클래스를 정의해주어야 한다는 것이다. 과제에서는 Bureaucrat::GradeTooHighException과 같은 형식으로 예외를 발생시켜야 한다고 적혀있으므로, Bureaucrat 클래스 내부에 예외 발생 클래스를 정의해준다.

이 때, std::exception 클래스를 상속받아 what 함수를 오버라이딩해주는 형식으로 클래스를 구현하면 된다.

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/cpp_module/04/ex00_00.png?raw=true)

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/cpp_module/04/ex00_01.png?raw=true)

예외 처리 클래스를 보면, std::exception을 상속받은 GradeTooHighException 클래스를 만들어주고 있다.

이 중, 우리는 가상함수인 what 함수에 대해 오버라이딩을 해주면 된다.

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/cpp_module/04/ex00_02.png?raw=true)

메인문에 적절하게 테스트 작성 후 동작시켜보면 된다.

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/cpp_module/04/ex00_03.png?raw=true)

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

1

</div>
</details>

### Ex03

#### 문제

#### 구현

## 느낀 점
