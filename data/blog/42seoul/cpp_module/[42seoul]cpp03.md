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

먼저, ClapTrap을 상속해주기 위해 ClapTrap의 몇 가지를 수정해주어야 한다. 자식 클래스에서 ClapTrap의 변수에 대해 접근하는것을 허용하기 위해 'private'를 'protected'로 변경해준다.

또, 생성자와 소멸자, 그리고 attack()함수가 ClapTrap과 다른 메세지를 출력해야하므로 재정의가 필요하다. 자식 클래스에서 부모 클래스의 멤버함수를 변경하기 위해서는 부모 클래스 내부에서 'virtual' 키워드를 사용하여 가상 함수를 만들어주어야 한다.

가상 함수에는 몇 가지 규칙이 존재하는데,

- 클래스의 public 제한자 섹션에서 선언해야 한다.
- 가상 함수는 static일 수 없으며, friend 키워드도 사용할 수 없다.
- 가상 함수는 부모 클래스의 포인터 또는 참조를 통해 접근해야 한다.
- 가상 함수의 프로토타입은 부모 클래스와 자식 클래스에서 동일해야한다.
- 클래스는 가상 소멸자를 가질 수 있지만, 가상 생성자는 가질 수 없다.

가상 함수를 사용하지 않으면 함수가 컴파일 하는 동안 이미 부모 클래스의 함수를 호출하는 것으로 결정(정적 바인딩)하기 때문에 재정의된 함수를 실행할 수 없다.

따라서, 가상 함수를 사용해서 런타임 동안 값이 결정(동적 바인딩)되는 특성으로 포인터가 가리키는 위치에 따라 자식 클래스의 함수를 호출할 수 있도록 구현 해야한다.

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/cpp_module/03/ex01_00.png?raw=true)

문제에서 요구한 대로 생성자와 소멸자, attack 함수에 대해 ScavTrap에서 재정의를 해줬다. 또한, 새로 추가되는 void guardGate()에 대해서도 정의해주었다.

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/cpp_module/03/ex01_01.png?raw=true)

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/cpp_module/03/ex01_02.png?raw=true)

</div>
</details>

### Ex02

#### 문제

ClapTrap을 만드는 것은 아마 너의 신경을 건드리기 시작했을 것이다.

이제부터, ClapTrap을 상속받은 FragTrap을 구현하자. ScavTrap과 굉장히 비슷하다. 그러나, 생성자와 소멸자의 메세지는 달라야한다. 생성자와 소멸자의 연계가 적절한지 너의 테스트로 보여주어야 한다. FragTrap이 생성되었을 때, ClapTrap을 구축해서 프로그램이 시작된다. 소멸자는 역순이다.

속성에 대해 동일하지만, 이번에는 값이 다르다.

- Name, 생성자의 매개변수로 전달됨
- Hit points(100), ClapTrap의 체력을 나타냄
- Energy points(100)
- Attack damage(30)

FragTrap은 특별한 능력도 가지고 있다.

void highFivesGuys(void);

이 멤버 함수는 표준 출력 상에서 긍정적인 하이파이브 요청을 표시한다.

다시 말하지만, 프로그램에 더 많은 테스트를 추가해라.

#### 구현

<details>
<summary>구현 펼치기</summary>
<div markdown="1">

전 예제인 ScavTrap을 만드는 것과 매우 유사하다. ClapTrap을 상속받아 자식 클래스인 FragTrap을 만들어주는 것인데, 이번에는 생성자와 소멸자만 재정의해주고, 새로운 멤버함수만 설정해주면 된다.

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/cpp_module/03/ex02_00.png?raw=true)

</div>
</details>

### Ex03

#### 문제

이번 예제에서는 너는 FragTrap의 반쪽과 ScavTrap의 반쪽짜리인 ClapTrap과 같은 괴물을 만들 것이다. 이것을 **DiamondTrap**이라고 이름짓고, FragTrap과 ScavTrap 둘 다 상속될 것이다. 이건 너무 위험하다 !

DiamondTrap은 private 속성으로 이름을 가질 것이다. 이 속성에 ClapTrap 기본 클래스의 변수 이름과 정확히 동일한 변수 이름(여기서는 로봇 이름에 대해 말하지 않음)을 지정한다.

더 명확하게 하기 위해, 여기 두가지 예제가 있다.
ClapTrap의 변수가 **name**이라면, DiamondTrap 중 하나에 **name**이라는 이름을 준다.
ClapTrap의 변수가 **\_name**이라면, DiamondTrap 중 하나에 **\_name**이라는 이름을 준다.

이 속성들과 멤버 함수들은 부모 클래스 중 하나에서 선택된다.

- Name, 생정자의 매개변수로 전달됨
- ClapTrap::name (생성자의 매개변수 + "\_clap_name" 접미사)
- Hit points (FragTrap)
- Energy points (ScavTrap)
- Attack damage (FragTrap)
- attack() (ScavTrap)

게다가 두 부모 클래스의 특별한 함수들 외에도, DiamondTrap은 특별한 기능을 가질 것이다.

void whoAmI();

이 멤버 함수는 이것의 이름과 ClapTrap의 이름을 보여줄 것이다.

물론, DiamondTrap의 ClapTrap 서브객체는 한 번만 생성될 것이다. 그렇다. 트릭이 있다.

다시 말하지만, 너의 프로그램에서 더 많은 테스트를 해라.

-Wshadow, -Wno-shadow 컴파일러 플래그를 알고 있니 ?

#### 구현

<details>
<summary>구현 펼치기</summary>
<div markdown="1">

DiamondTrap은 ScavTrap과 FragTrap에게 동시에 상속을 받아야 한다. 이렇게 하기 위해서는 앞선 예제인 ex01에서 ScavTrap의 attack()을 구현했을 때 처럼 virtual을 사용해주어야 한다. ClapTrap에서의 attack()과 ScavTrap에서의 attack()때문에 ClapTrap의 attack()에 virtual을 붙여준 것 처럼, 이번에는 클래스 자체에 virtual을 붙여주어야 한다. 다음 그림을 보면 이해가 조금 더 쉬울 것이다.

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/cpp_module/03/ex03_00.png?raw=true)

우리는 ClapTrap과 ScavTrap, FragTrap의 관계가 왼쪽의 관계라고 생각하고 코드를 구현할 것이다. 그러나 컴파일러에서는 오른쪽과 같이 ClapTrap이 메모리에 2개 존재하게 된다.

이 경우가 앞서 가상함수를 처리했던 ex01과 동일하게 ScavTrap의 헤더와 FragTrap의 헤더에서 ClapTrap 상속 부분에 virtual을 추가해주면 된다.

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/cpp_module/03/ex03_01.png?raw=true)

그런 다음, 과제의 요구대로 상속을 받아준다. 이 때, 먼저 입력한 부모 클래스의 순서대로 상속이 진행이 된다는 점을 알아두면 좋다. 이렇게 되면 문제가 발생하게 된다.

DiamondTrap은 ScavTrap -> FragTrap 순으로 상속을 받게 되는데, 이 경우, ScavTrap을 통해 설정해주었던 ClapTrap의 멤버 변수들이 FragTrap을 통해 다시한번 모두 변경되게 된다. 이것 때문에 다음과 같은 코드가 동작하지 않는 현상이 발생한다.

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/cpp_module/03/ex03_02.png?raw=true)

위처럼 코드를 작성하고 테스트를 해보면, ScavTrap의 energy points로 설정해주었던 값 50이 아닌, FragTrap으로 설정해주었던 값 100으로 설정된 것을 확인할 수 있다. ScavTrap -> FragTrap으로 상속을 받았기 때문에 모든 값이 FragTrap에 의해 초기화가 되었음을 알 수 있다.

이 부분을 해결하기 위해 여러가지 방법을 찾아보았으나 .. 아쉽게도 ScavTrap 내부에서 protected로 변수를 설정해주는 것 외에 별 다른 방법을 찾아볼 수는 없었다. ClapTrap의 변수를 사용하는 과제이기 때문에, ScavTrap에서 다시 변수를 설정해주는 방식이 크게 매력적이지 않아서 그냥 상수를 입력해주는 형식으로 마무리하고, 다이아몬드 상속의 한계에 대해서 알고 넘어가는 방법을 택하게 되었다.

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/cpp_module/03/ex03_03.png?raw=true)

</div>
</details>

## 느낀 점

클래스의 상속에 대해 배워봤는데, 생각보다 간단하게 구현 가능하지만 강력한 기능이라 이번 기회에 잘 알고 넘어갈 수 있도록 시간을 들인것같다. 마지막 예제에서의 다이아몬드 상속은 웬만하면 그렇게 하지 말라고 하는 것 같았다. 사실 그렇게 할 이유도 딱히 없을 뿐더러, 멤버 변수와 함수들이 여러번 재정의 됨에 있어서 원하는 동작이 일어나지 않을 수 있기 때문이다.

평가를 받으면서 상속을 할 때의 접근제한자에 대해 질문을 받았다. 사실 깊이 생각해보지 않고 사용했던 부분이라 굉장히 당황했는데, 부모 클래스를 어떤 접근제한자 형식으로 상속을 받겠다 라는 의미이다.

- public으로 상속 : 부모 클래스의 접근 제한자에 영향 없이 그대로 작동한다. 자식 클래스 입장에서는 public은 그대로 public이고, protected는 그대로 protected, private는 private이다.

- protected로 상속 : public은 protected로 바뀌고, 나머지는 그대로 상속된다.

- private로 상속 : 모든 자식 클래스 입장에서 모든 접근 제한자들이 private가 된다.
