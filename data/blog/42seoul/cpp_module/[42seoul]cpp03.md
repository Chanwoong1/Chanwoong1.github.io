---
title: '[42seoul] CPP Module 03'
date: '2022-12-13'
tags: ['4th_circle', 'C++', 'inheritance', 'class', '42seoul']
draft: false
summary: Inheritance
layout: PostSimple
---

# Cpp Module 03

- [Chapter 0](#chapter-0)
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

### Inheritance

이번 과제는 클래스 상속에 관한 과제이다.

상속이란 객체지향 언어에서 사용하는 정말 중요한 개념이다. 클래스 상속을 통해 기존에 정의해놓은 클래스를 용도에 맞게 재사용할 수 있으며, 수정하거나 새로운 기능을 추가하기 용이하다.

상속을 해주는 클래스를 '부모 클래스', 상속을 받는 클래스를 '자식 클래스' 라고 하는데, 다른 표현으로 '베이스 클래스', '파생 클래스'라고도 한다.

클래스에는 접근 제한자라는 개념을 통해, 클래스 내부에서만 접근 가능한 'private' 변수와 클래스 외부에서도 접근 가능한 'public' 변수로 나눌 수 있다. 상속 받은 클래스 또한 이 개념이 적용되어 'private' 변수는 접근할 수 없다.

이 부분에서, 'private' 영역은 외부와 자식 클래스 모두 접근 불가하다. 'public' 영역은 외부와 자식 클래스 모두 접근 가능하다. 그렇다면 외부는 접근할 수 없지만 자식 클래스에서는 접근 가능하게 하는 제한자도 있어야 상속하는 의미가 더 생길 것이다.

이것을 가능하게 하는 접근 제한자가 'protected'이다. 이 접근 제한자를 통해 외부에서의 접근은 제한하고 자식 클래스의 접근은 허용할 수 있다.

#### Constructor & Destructor

부모 클래스를 통해 자식 클래스를 상속 받는다면, 먼저 부모 클래스가 생성이 되어야 할 것이다. 그 이후 자식 클래스가 생성이 되어야 하므로 '부모 -> 자식' 순으로 생성자가 호출이 된다.

소멸은 반대로 '자식 -> 부모' 순으로 소멸자가 호출되게 된다.

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

#### 문제

첫째로, 클래스를 구현해야한다.

이 클래스는 'ClapTrap'으로 불릴 것이며 괄호 안의 지정된 값으로 초기화 되는 private attributes를 가질 것이다.

- Name, 생성자를 통해 인자를 받음
- Hit points(10), 'ClapTrap'의 체력을 나타냄
- Energy points(10)
- Attack damage

ClapTrap이 더 현실적으로 보이기 위해 public 멤버 함수들을 추가한다.

- void attack(const std::string& target);
- void takeDamage(unsigned int amount);
- void beRepaired(unsigned int amount);

ClapTrap이 공격할 때, 타겟이 \<attack damage> 만큼의 체력를 잃게 만든다.

ClapTrap이 자가치유 할 때, \<amount> 만큼의 체력을 돌려받는다. 공격과 치유는 각각 1만큼의 energy point를 사용한다.

물론, 체력 혹은 energy points가 남아있지 않다면 ClapTrap은 아무것도 할 수 없다.

모든 멤버 함수들은 일어난 일들을 설명하는 메세지를 출력해야한다. 예를 들어, attack() 함수는 이와 같이 표시될 수 있다.

**ClapTrap \<name> attacks \<target>, causing \<damage> points of damage!**

생성자와 소멸자도 메세지를 보여줘야 한다. 그래야 동료평가에서 쉽게 그들이 호출되는 것을 볼 수 있다.

코드가 예상대로 작동하는지 확인하기 위해 자체 테스트를 구현하고 제출해라.

#### 구현

<details>
<summary>구현 펼치기</summary>
<div markdown="1">

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/cpp_module/03/ex00_00.png?raw=true)

나는 이런식으로 구현했다. 서브젝트를 충실하게 읽으면서 구현하면 되는 부분이었다. ex00은 다음 문제들에서 상속을 하기 위해 부모 클래스를 미리 만들어주는 문제였기 때문에, 특별히 어려운 부분 없이 끝낼 수 있었다.

</div>
</details>

### Ex01

#### 문제

충분한 ClapTrap을 가질 수 없기 때문에, 이제부터 파생 로봇을 생성할 것이다. ScavTrap이라는 이름이 될 것이고 생성자와 소멸자는 ClapTrap에서 상속받을 것이다. 그러나, 생성자, 소멸자, attack()은 다른 메세지가 출력될 것이다. 결국, ClapTrap은 그들의 개성을 알 것이다.

테스트에서 적절하게 생성과 소멸 연계를 보여야 한다. ScavTrap이 생성될 때, ClapTrap을 구축해서 프로그램이 시작된다. 소멸자는 역순이다.

ScavTrap은 ClapTrap의 속성을 사용하고(결과적으로는 ClapTrap을 업데이트) 다음과 같이 초기화해야 한다.

- Name, 생성자를 통해 인자를 받음
- Hit points(100), 'ClapTrap'의 체력을 나타낸다.
- Energe points(50)
- Attack damage(20)

ScavTrap은 다음과 같은 고유한 특수 기능이 있다.

void guardGate();

이 멤버 함수는 ScavTrap이 현재 Gatekeeper 모드라는 것을 알려주는 메세지를 보여줄 것이다.

너의 프로그램에 더 많은 테스트를 추가하는 것을 잊지 말아라.

#### 구현

<details>
<summary>구현 펼치기</summary>
<div markdown="1">

먼저, ScavTrap이라는 것을 만들어주어야 한다. ScavTrap은 ClapTrap을 상속받은 클래스이므로 다음과 같이 작성해준다.

</div>
</details>

### Ex02

#### 문제

다음 연산자를 오버로드하려면 public 멤버 함수를 클래스에 추가해라.

- 6개의 비교 연산자: \>, \<, \>=, \<=, ==, !=
- 4개의 산술 연산자: +, -, \*, /
- 4개의 증감(전위 증가, 후위 증가, 전위 감소, 후위 감소) 연산자, 1 + ϵ > 1 과 같이 표현할 수 있는 가장 작은 ϵ에서 고정 소수점 값을 늘리거나 줄인다.

다음 네가지 public 오버로드 멤버 함수들을 클래스에 추가해라.

- 정적 멤버 함수 min은 고정 소수점 숫자에 대한 두 개의 참조를 매개변수로 취하고 가장 작은 참조를 반환해야 한다.
- 정적 멤버 함수 min은 상수 고정 소수점 숫자에 대한 두 개의 참조를 매개변수로 취하고 가장 작은 참조를 반환해야 한다.
- 정적 멤버 함수 max는 고정 소수점 숫자에 대한 두 개의 참조를 매개변수로 취하고 가장 큰 참조를 반환해야 한다.
- 정적 멤버 함수 max은 상수 고정 소수점 숫자에 대한 두 개의 참조를 매개변수로 취하고 가장 큰 참조를 반환해야 한다.

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/cpp_module/02/ex02_00.png?raw=true)

#### 구현

<details>
<summary>구현 펼치기</summary>
<div markdown="1">

비교 연산자 오버로딩은 비교 연산자의 기존 기능인 bool 타입을 반환하는 방식을 구현하는 것을 권장한다.
![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/cpp_module/02/ex02_01.png?raw=true)

산술 연산자 또한 간단하다.
![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/cpp_module/02/ex02_02.png?raw=true)

증감 연산자는 전위와 후위의 형태가 다르다.
![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/cpp_module/02/ex02_03.png?raw=true)

C++에서는 전위와 후위 연산자 오버로딩을 구별하기 위해 인자에 void형과 int형으로 나누어 작성해야한다.

전위 연산자 오버로딩은 this의 값을 증가시킨 후, *this의 레퍼런스를 반환한다. 여기서 그냥 'this'를 반환하려 하면, 임시 객체의 레퍼런스를 만들려고 하는 것이기 때문에 오류가 발생한다. '*this'를 반환해야 포인터의 원본 값을 반환하기 때문에 레퍼런스를 반환할 수 있다.

후위 연산자 오버로딩은 임시로 만들어진 객체를 반환하는 것이기 때문에, 반환 받은 값을 다시 증감 연산을 했을 경우 임시 객체의 값이 증감할 수 있다. 따라서 const를 붙여준다.

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/cpp_module/02/ex02_04.png?raw=true)

간단하게 구현할 수 있다.

</div>
</details>

### Ex03

#### 문제

이제 기능적인 Fixed 클래스가 있으므로 사용하면 좋을 것이다.

점이 삼각형 안에 있는지 여부를 나타내는 함수를 구현해보자. 매우 유용할 것 같다. 그렇지 ?

BSP는 이진 분할을 나타낸다.

2D 포인트를 나타내는 OCCF 형식의 Point 클래스를 생성하여 시작하자.

- Private members

  - Fixed const x
  - Fixed const y
  - 기타 유용한 것들

- Public members
  - x및 y를 0으로 초기화 하는 기본 생성자
  - 두 개의 상수 부동 소수점 수를 매개변수로 사용하는 생성자. 해당 매개변수로 x, y를 초기화 해야한다.
  - 복사 생성자
  - 복사 할당 연산자 오버로드
  - 소멸자
  - 기타 유용한 것들

결론적으로, 적절한 파일에서 다음 함수를 구현해야 한다.

- bool bsp(Point const a, Point const b, Point const c, Point const point);
  - a, b, c: 삼각형의 정점
  - point: 확인할 점
  - Returns: 점이 삼각형 안에 있으면 True, 아니라면 False를 반환한다.

클래스가 예상대로 작동하는지 확인하기 위해 자체 테스트를 구현하고 제출해라.

#### 구현

<details>
<summary>구현 펼치기</summary>
<div markdown="1">

Point 클래스는 다음과 같이 구현했다.

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/cpp_module/02/ex03_00.png?raw=true)

Point 클래스는 OCCF에 맞게 구현해주면 되는 부분이라 수월했다.

bsq 함수는 삼각형 내부에 점이 위치해있는지 외부에 점이 위치해있는지 분별하는 함수이다. 이 함수에서는 Fixed 클래스에 대한 연산자 오버로딩과 Point 클래스에 대한 연산자 오버로딩을 추가적으로 해주었다.
![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/cpp_module/02/ex03_01.png?raw=true)

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/cpp_module/02/ex03_02.png?raw=true)

벡터의 외적을 이용해 점의 위치를 판단할 수 있다.

- 외적을 구하는 공식은 점 a와 b의 (x, y, z) 좌표를 통해 구할 수 있는데, 이 문제에서는 2차원 평면이므로 계산이 굉장히 간결해진다.
- 점 a의 (x, y, z) 좌표를 (ax, ay, az)라고 하고, 점 b도 마찬가지로 적용해 (bx, by, bz)라고 한다면 외적의 공식은 (ay\*bz - az\*by, az\*bx - ax\*bz, ax\*by - ay\*bx)이다.
- bsp에 주어지는 4개의 점은 모두 2차원 평면에 위치하므로 z = 0으로 대입해주면 (0, 0, ax\*by - ay\*bx)가 외적이 되고, ax\*by - ay\*bx를 이 함수의 주요 값으로 활용한다.
- bsp 내부의 선언을 통해 총 6개의 Point 클래스를 선언해준다. 이것은 각각 평면에서 벡터로 활용된다.
- 벡터를 구했다면, \* 연산자 오버로딩을 통해 외적을 구해줄 수 있다.
- 밑의 조건문을 만족한다면 3개의 벡터의 한쪽 방향에 점이 위치한다는 뜻으로, 삼각형 내부에 점이 위치함을 알 수 있다.
- 이 조건을 만족하지 않으면 삼각형 내부에 점이 위치하는 것이다.

</div>
</details>

## 느낀 점

부동 소수점과 고정 소수점에 대해 어렴풋이 들어보았는데, 이번 과제를 계기로 조금 더 알 수 있게 된것 같다.

또한, 평가를 다니면서 꽤나 많이 들어왔던 OCCF에 대해 처음 경험해볼 수 있었는데, 지난 cpp00과 cpp01에서 구현했던 내 클래스가 굉장히 권장되지 않는 구현이라는 느낌이 들었다. 이제부터 모든 cpp과제는 OCCF를 통해 클래스 구현을 해야한다고 하니, 익숙해지도록 많이 사용해봐야겠다.
