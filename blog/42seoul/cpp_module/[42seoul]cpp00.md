---
title: '[42seoul] CPP Module 00'
date: '2022-11-26'
tags: ['4th_circle', 'C++', '42seoul']
draft: false
summary: Goodbye Norminette!
layout: PostSimple
---

# Preview

저번 미니쉘을 끝으로 42서울의 과제 중 반정도를 끝냈다고 할 수 있을 것이다. 이제부터는 c++을 사용할 수 있고, norminette를 신경쓰지 않고 코딩을 할 수 있게 되었다 !!

잘가라 norminette, 어서와라 삼항연산자, tab_size: 2, camel case 등등... ㅎㅎ

이무쪼록 현재 42에서 points sale이 시작하기도 했고 평가도 잘 잡힌다고 하니... 여러모로 c++을 하기 제일 좋은 시기가 아닐까 싶었다. c++ 왕초보인 나한테는 더더욱 평가를 받기 수월한 시기이기에 너무 좋았다.

그럼 00부터 시작 !

# Cpp Module 00

- [Chapter 1](#chapter-1)
  - [Introduction](#introduction)
- [Chapter 2](#chapter-2)
  - [General Rules](#general-rules)
- [Chapter 3](#chapter-3)
  - [Ex00](#ex00)
  - [Ex01](#ex01)
  - [Ex02](#ex02)
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

### Ex00

단지 모두가 깨어 있는지 확인하기 위해 다음과 같이 동작하는 프로그램을 작성하라고 한다.

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/cpp_module/00/ex00_00.png?raw=true)

이 과제는 megaphone이라는 프로그램을 통해 소문자인 경우 대문자로 변환해 출력해주는 프로그램을 작성해야 한다.

대문자로 변환하는 방법은 C에서도 할 수 있었는데, 그때는 아스키코드를 통해 소문자에 해당하는 아스키코드일 경우, 32를 더해 대문자로 만들어줄 수 있었다.

이번에는 C++에서 대문자로 변환하는 함수인 toupper를 사용해주어 해결했다.

```C++
#include <iostream>

int main(int ac, char **av) {
  if (ac == 1)
    std::cout << "* LOUD AND UNBEARABLE FEEDBACK NOISE *" << std::endl;
  else {
    for (int i = 1; i < ac; i++) {
      for (int j = 0; av[i][j]; j++)
        std::cout << static_cast<char>(toupper(av[i][j]));
    }
    std::cout << std::endl;
  }
}
```

추가적으로, 출력을 마쳤다면 마지막에 개행문자를 넣어주는걸 잊지말도록 하자.. General Rules를 숙지하고 과제를 하자 .... (나도 알고싶지 않았다..)

### Ex01

이번 문제는 전화번호부를 만들어주는 문제이다. 그리고 C++과제에서 처음으로 클래스를 만들게 된다.

클래스는 C에서 주로 쓰던 구조체를 더 향상시킨것이라고 생각하면 좋다. 구조체에서 변수들을 요소로 가지고 있었다면, 클래스에서는 변수는 물론 함수들도 함께 요소로 가질 수 있기 때문이다.

문제에서는 2개의 클래스를 선언해야 한다고 말한다.

- PhoneBook 클래스

  - 연락처를 배열로 가지고 있는다.

  - 최대 8개의 연락처를 저장할 수 있으며, 9번째 연락처부터는 가장 오래된 연락처를 새로운 연락처가 대체한다.

  - 동적할당은 금지된다.

- Contact 클래스

  - 전화번호부의 연락처를 나타낸다.

이 뜻은, PhoneBook이라는 클래스를 만들고, 그 안에 들어가는 연락처 요소는 Contact 클래스로 만들라는 의미이다.

구현은 어렵지 않으므로 패스하도록 하고, 클래스에 대해 조금 더 말해보자면,

C++의 클래스에서는 선언부와 구현부로 클래스를 나눌 수 있다. C언어로 보자면 h파일이 선언부이고, c파일이 구현부가 될 것이다.

```C++
#ifndef CONTACT_H_
# define CONTACT_H_

#include <iostream>

class Contact {
  private:
    std::string firstName;
    std::string lastName;
    std::string nickName;
    std::string phoneNumber;
    std::string darkestSecret;

  public:
  Contact();
  ~Contact();
	Contact(
    std::string firstName,
    std::string lastName,
    std::string nickName,
    std::string phoneNumber,
    std::string darkestSecret
  );
	std::string GetFirstName();
	std::string GetLastName();
	std::string GetNickName();
  std::string GetPhoneNumber();
  std::string GetDarkestSecret();
};

#endif
```

이런식으로 선언부를 만들어줄 수 있다.

먼저, private와 public이라는 접근 제한자가 있다. 여기에 protect라는 것도 있지만, 나중에 보도록 하고 두 개만 먼저 보자.

- private

  클래서 내부에서만 접근 가능한 요소

- public

  클래스 외부에서도 접근 가능한 요소

딱 이것이다. 처음에 나는 이런식으로 왜 막아야하는지 잘 이해되지 않았다. 왜냐하면, 내가 밖에서는 잘 안쓰도록 조심하면 되는게 아닌가 ?? 하는 생각이 있었기 때문이다.

하지만 코드가 늘어날수록, 프로젝트가 커질수록, 클래스를 라이브러리처럼 사용하게 된다면, 다른 사람들도 내가 만든 클래스에 접근할 수도 있고, 내가 다른 사람이 만든 클래스에 접근할 수 있기 때문에, 의도치 않은 변경으로 인해 에러가 발생할 가능성이 생기게 된다.

이런저런 이유로 객체 내부에서만 사용하는 변수로 private라는 접근 제한자를 사용하는것이 아닐까 하고 생각했다.

다음은 구현부이다.

선언부가 h파일이라면, 구현부는 c파일이라고 했다.

따라서 구현부에서는 클래스 내부의 함수(멤버함수)들을 정의해주면 된다.

```C++
#include "Contact.hpp"

Contact::Contact(
  std::string firstName,
	std::string lastName,
	std::string nickName,
	std::string phoneNumber,
	std::string darkestSecret
  ) {
	this->firstName = firstName;
	this->lastName = lastName;
	this->nickName = nickName;
	this->phoneNumber = phoneNumber;
	this->darkestSecret = darkestSecret;
}

Contact::Contact() {
	Contact("", "", "", "", "");
}

Contact::~Contact() {
}

std::string	Contact::GetFirstName() {
	return this->firstName;
}

std::string	Contact::GetLastName() {
	return this->lastName;
}

std::string	Contact::GetNickName() {
	return this->nickName;
}

std::string	Contact::GetPhoneNumber() {
	return this->phoneNumber;
}

std::string	Contact::GetDarkestSecret() {
	return this->darkestSecret;
}
```

Contact 클래스의 구현부이다. 나는 별 다른 기능을 넣지는 않았고, private 변수를 반환시키는 멤버 함수들을 넣어주었다.

#### 기능 구현

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/cpp_module/00/ex01_00.png?raw=true)

이런식으로 기본적인 기능을 할 수 있도록 만들었다. 서브젝트를 꼼꼼히 봐야한다... 안그러면 ... 휴 ...

### Ex02

이 문제는 자신이 꿈의 회사에 입사를 한 뒤 일어난 문제를 해결해야한다. 이 회사에서는 git을 사용하지 않고 USB를 사용해 코드를 공유한다고 한다.(이게 꿈의 회사..? 이건 꿈일거야..의 꿈일것 같다.)

어쨌든 USB를 사용해 코드를 공유하다가 코드가 유실이 된 것이다... 그래서 과거의 기록과 남겨진 코드를 참고하여 유실된 코드를 복원해야하는것이 문제이다.

하나하나 순차적으로 출력을 해보면 되는 것이기 때문에 한번 풀어보기를 바란다.

## 느낀 점

norminette의 굴레에서 벗어나서 기분은 좋았으나.. 그것도 한 순간이었다.

norminette 없이 자유롭게 코딩을 할 수 있다는 것은 그만큼 다양한 곳에서 프로그램이 문제가 발생할 수도 있다는 뜻이고, 이유있는 사용을 요구하기 때문이다.

따라서 다 했다고 생각하고 평가를 받았는데 틀린부분이 평가에서 계속 발견되었다. 그리고 앞서 말했던 서브젝트를 꼼꼼히 읽어야한다는 부분도 그래서 나온 말이다.

하지만 새로운 언어를 배울수 있다는 부분에서 굉장히 즐거웠고, 객체지향 프로그래밍에 대해 확실하게 알고갈 수 있는 기회가 온것 같아 좋다.
