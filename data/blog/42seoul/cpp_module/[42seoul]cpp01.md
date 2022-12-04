---
title: '[42seoul] CPP Module 01'
date: '2022-12-01'
tags: ['4th_circle', 'C++', 'class', '42seoul']
draft: false
summary: 클래스의 동적할당과 포인터와 레퍼런스에 대해 알아보자
layout: PostSimple
---

# Preview

cpp00에서 엄청난 고난을 겪은 후, cpp01을 시작하게 되었다. 이번 과제에서는 메모리 동적할당과 포인터, 레퍼런스에 대해 배운다고 한다.

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

#### 문제

먼저, Zombie 라는 클래스를 선언해야한다. 이건 private로 되어있는 name이라는 string 변수를 가진다.

그리고 announce라는 멤버 함수를 추가해주는데, 좀비 클래스를 통해 announce를 호출하면

```
<name> : BraiiiiiiinnnzzzZ
```

라고 출력이 되어야 한다.

그리고, 두가지 함수를 선언한다.

```C++
Zombie* newZombie( std::string name );
// 좀비를 만들고, 이름을 짓고, 함수의 밖에서 사용할 수 있도록 반환을 해야한다.

void randomChump( std::string name );
// 좀비를 만들고 이름을 짓고, 좀비 자신이 announce를 호출한다.
```

이 예제에서 중요한 점은 무엇일까 ?? 바로 너가 스택 혹은 힙 영역의 좀비를 할당하는데 더 좋은 케이스를 결정한다는 것이다.

좀비들은 더 이상 필요하지 않을 경우 소멸되어야만 한다. 디버깅을 위해 소멸자는 반드시 자신의 이름과 함께 메세지를 출력해야한다.

#### 구현

이 문제는 생각보다 간단하다. 일단 문제의 조건에 부합하도록 좀비 클래스를 생성해주었다.

```C++
#ifndef ZOMBIE_H_
#define ZOMBIE_H_

#include <string>
#include <iostream>

class Zombie {
  private:
    std::string _name;

  public:
    Zombie( std::string name );
    ~Zombie();
    void announce( void );
};

void randomChump(std::string name);
Zombie *newZombie(std::string name);

#endif
```

좀비 클래스는 이런식으로 만들어 줄 수 있었다. 생성자를 통해 좀비의 이름을 설정해주고, announce를 통해 이름과 함께 대사가 출력될 수 있도록 만들어주었다. 소멸자에서는 어떤 좀비가 소멸하는지 알 수 있도록 출력문을 입력해주었다.

각각의 함수들도 용도에 맞게 만들어주면 된다.

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/cpp_module/01/ex00_00.png?raw=true)

이런식으로 출력이 되도록 했는데, newZombie 함수의 경우, Zombie클래스의 포인터를 반환받기 때문에, 할당을 해제해주어야 한다.

C++에서는 동적할당과 해제를 C에서보다 더 간편하게 해줄 수 있다. 바로 'new'와 'delete'라는 연산자로 할당과 해제가 가능한데, 이런식으로 사용이 가능하다.

```C++
// class memory allocate
newZombie = new Zombie('newZombie');

// delete memory
delete newZombie;
```

매우 간편하다. delete 연산자를 통해 전체의 메모리 블록 할당을 해제한다면, 내부에 할당된 또 다른 메모리들을 찾아 해제해줄 필요 없이 바로 해제해줄 수 있다.

delete 연산자는 두가지의 사용법이 있는데, 하나는 위처럼 단일 객체를 해제하기 위한 용도와 객체의 배열을 해제하기 위한 용도로 쓰인다. ex01이 배열 할당 해제 부분이므로 아래에서 보충하겠다.

어쨌든, newZombie 함수로 반환받은 포인터를 해제시켜주지 않으면 소멸자가 호출되지 않으니 꼭 delete를 해주도록 하자.

randomChump는 함수 내부에서 선언 및 멤버함수 호출 후, 함수 프로세스가 종료되기 때문에 따로 할당을 받지 않아서 delete를 하지 않아도 된다.

### Ex01

#### 문제

이 문제는 ex00에서 만든 좀비 객체를 가지고 와서 좀비 무리를 만들어주면 된다. 좀비 무리는 다음과 같은 함수로 만들어야 한다.

```C++
Zombie* zombieHorde( int N, std::string name );
```

N개의 좀비 객체는 한번에 할당되어야한다. 그리고, 좀비들은 초기화를 통해, 각각의 이름을 파라미터로 가져야 한다. 이 함수는 첫번째 좀비의 포인터를 반환하도록 해야한다.

zombieHorde 함수를 테스트할때, 각각의 좀비 함수에서 announce를 호출해보자.

delete로 모든 좀비를 해제해서 메모리 누수를 체크하는것을 잊지말자.

#### 구현

이 문제 또한 어렵지 않았다. 기존에 만들었던 좀비 클래스를 가지고 와서 조금 수정해주고, 좀비 무리를 반환할 수 있는 zombieHorde 함수만 만들어주면 됐다.

```C++
#ifndef ZOMBIE_H_
#define ZOMBIE_H_

#include <string>

class Zombie {
  private:
    std::string _name;

  public:
    Zombie( void );
    Zombie( std::string name );
    ~Zombie();
    void announce( void );
    void setName( std::string name );
};

Zombie* zombieHorde( int N, std::string name );

#endif

#include "Zombie.hpp"
#include <sstream>

Zombie* zombieHorde( int N, std::string name ) {
  Zombie *zHorde = new Zombie[N];
  std::stringstream	stringStream;

  for (int i = 0; i < N; i++) {
    stringStream.str(std::string());
		stringStream << i + 1;
    zHorde[i].setName(name + "_" + stringStream.str());
  }
  return zHorde;
}
```

new를 통해 좀비를 만들어줄 때, []를 이용해 배열로 할당해줄 수 있다. 이 경우, 배열의 첫번째 값이 포인터의 주소가 된다.

좀비 배열을 만들어주었다면, 각각의 배열에 담긴 좀비 클래스를 setName이라는 멤버함수를 호출해, 이름을 정해주면 된다. 나는 같은 이름의 좀비 배열보다 각각 번호를 붙여주는것이 더 보기 좋다고 생각해서 stringstream을 사용해 for문의 i를 string으로 만들어주어 name에 붙여서 함께 이름으로 만들어주었다.

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/cpp_module/01/ex01_00.png?raw=true)

이런식으로 출력을 해주면 되는데, ex00과 마찬가지로 테스트를 수행할 때 delete를 이용해 할당을 해제해주어야 한다. 이번에는 zombieHorde 함수에서 배열을 반환받았으므로 다음과 같이 할당을 해제해준다.

```C++
Zombie *zHorde = zombieHorde(N, "Bar");

delete [] zHorde;
```

이런식으로 delete에 []을 추가해주면, 배열을 할당받은 포인터의 메모리 블록을 모두 해제해줄 수 있다.

### Ex02

이번 문제는 포인터와 레퍼런스에 대해 알아보는 것이다.

main문 하나만 짜면 되는데, 굉장히 간단하다. 하지만 이것을 이해하는것이 쉽지 않을 것이다.

```C++
#include <string>
#include <iostream>

int main(void) {
  std::string str = "HI THIS IS BRAIN";
  std::string	*stringPTR = &str;
	std::string	&stringREF = str;

  std::cout << "Print memory address of string" << std::endl;
  std::cout << "string memory address : " << &str << std::endl;
  std::cout << "stringPTR memory address : " << stringPTR << std::endl;
  std::cout << "stringREF memory address : " << &stringREF << std::endl;

  std::cout << std::endl << "Print value of string" << std::endl;
  std::cout << "string value : " << str << std::endl;
  std::cout << "stringPTR value : " << *stringPTR << std::endl;
  std::cout << "stringREF value : " << stringREF << std::endl;
  return (0);
}
```

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/cpp_module/01/ex02_00.png?raw=true)

이렇게 출력을 해줄 수 있으면 된다. 하지만 포인터와 레퍼런스에 대해 이해하고 넘어갈 수 있어야 한다.

- 포인터

포인터는 C에서도 익숙한 개념이다. 모든 변수는 메모리에 값을 저장하기 때문에 메모리 공간을 구별할 수 있도록 하는것이 메모리 주소값이다. 포인터 변수는 이런 메모리 주소값을 가진다.

- 레퍼런스

레퍼런스는 참조한다는 뜻으로, 다른 객체 또는 값의 별칭으로 사용되는 타입이다. 위의 결과를 보면 string의 출력 결과와 stringREF의 출력 결과가 같은 것을 확인할 수 있다.

레퍼런스는 특별하게 선언과 동시에 초기화를 해주어야 한다. 포인터는 null값을 저장하는 null 포인터라는 개념이 있지만, 레퍼런스는 null을 참조할 수 없다. 따라서 무조건 초기화를 해주어야하고, 특히 l-value로 초기화를 해주어야 한다.

r-value는 연산자의 오른쪽에 있다고 해서 r-value이다.

```C++
int& ref = 5; // r-value는 초기화할 수 없다.

int x = 5;
int& xRef = x;  // 이건 가능하다
```

둘의 차이점을 아는것이 중요하다. 상수를 바로 레퍼런스로 참조를 시킬수는 없다. 5라는 것이 어떠한 변수에 의해 남아있지 않기 때문이다.

아래의 x = 5를 통해 x라는 변수에 5를 담아 레퍼런스로 만들어주어야 한다. x는 레퍼런스로 초기화시킨 이후에도 사라지지 않기 때문이다.

여기서 의문이 들 것인데, 레퍼런스를 사용하는 이유가 무엇인지 궁금할 것이다. 원본 값이 있는데, 굳이 참조를 한 레퍼런스 값을 따로 사용한다는 것이 의미 없는 동작이라고 생각할 수도 있다.

하지만 레퍼런스는 함수의 매개변수로 가장 많이 사용된다. 그 이유는 레퍼런스가 단순히 원본을 참조하는 것이기 때문에, 함수 내부에서 복사를 실행하지 않는다. 따라서 복사하는데 많은 비용이 소모되는 변수일 경우, 레퍼런스를 사용하는것으로 성능이 향상될 수 있다.

또한, 포인터를 통해 함수에 변수를 넘겨주는 경우, 함수 내부에서 포인터를 역참조해서 값을 변경할 수 있다. 레퍼런스도 원본의 별칭으로 사용되어, 함수 내부에서 값을 변경할 수 있다.

이 외에도 포인터와 레퍼런스를 구별해서 쓰는 이유는 여러가지 있으므로 더 고민하고 사용해보는 시간을 가지면 좋을 것이다.

### Ex03

#### 문제

Weapon 클래스를 선언한다. 이 클래스는

- private인 type을 가지며, string이어야 한다.

- getType() 멤버 함수는 type의 const reference를 반환한다.

- setType() 멤버 함수는 매개변수로 전달 된 새로운 것으로 type을 설정한다.

이제, HumanA, HumanB라는 두개의 클래스를 만든다. 이들은 둘 다 Weapon과 이름을 가지고 있디. 이들은 attack이라는 멤버함수를 가지며, 이 함수는 다음과 같이 보여준다.

```
<name> attacks with their <weapon type>
```

HumanA와 HumanB는 대부분 같지만 두가지의 작은 차이점이 있다.

- HumanA는 Weapon을 생성자로부터 가져야하지만, HumanB는 그렇지 않다.
- HumanB는 Weapon을 가지고 있지 않을 수도 있지만, HumanA는 항상 무기를 장착한다.

만약 올바르게 선언했다면, 아래 코드를 실행했을 때 처음 attack으로는 'crude spiked club'이 출력되고, 두번째 attack은 'some other type of club'이 출력될 것이다.

```C++
int main() {
  {
    Weapon club = Weapon("crude spiked club");
    HumanA bob("Bob", club);
    bob.attack();
    club.setType("some other type of club");
    bob.attack();
  }
  {
    Weapon club = Weapon("crude spiked club");
    HumanB jim("Jim");
    jim.setWeapon(club);
    jim.attack();
    club.setType("some other type of club");
    jim.attack();
  }
  return 0;
}
```

메모리 누수를 확인하는것을 잊지말자.

- 이 케이스에서 너가 생각하기에 Weapon을 포인터와 레퍼런스 중 어떤것을 사용하는것이 더 좋은 방법인지 생각해보자. 이 문제를 시작하기전에 이것에 대해 먼저 생각해보자.

#### 구현

먼저, 기본적인 Weapon, HumanA, HumanB 클래스는 주어진 main문을 참고해서 만들어줄 수 있다.

```C++
// Weapon class
#include <string>

class Weapon {
  private:
    std::string _type;

  public:
    Weapon( const std::string &type );
    ~Weapon();
    void setType( const std::string &type );
    const std::string &getType( void ) const;
};

// HumanA class
#include "Weapon.hpp"

class HumanA {
  private:
    std::string _name;
    Weapon &_type;

  public:
    HumanA( const std::string name, Weapon *type );
    ~HumanA();
    void attack( void ) const;
};

// HumanB class
#include "Weapon.hpp"

class HumanB {
  private:
    std::string _name;
    Weapon *_type;

  public:
    HumanB( const std::string &name );
    ~HumanB();
    void attack( void ) const;
    void setWeapon( Weapon *type );
};
```

이런 식으로 클래스를 만들어주었다. 클래스의 구조만 보아도 쉽게 구현할 수 있을 것이다. 여기서 HumanA와 HumanB의 가장 큰 차이점은 type 변수가 레퍼런스와 포인터로 나뉜다는 점이다. 이 점은 각 클래스의 특징때문에 나타난다.

HumanA는 생성자를 통해 Weapon을 받아야한다. 하지만 HumanB는 그렇지 않다. 이 뜻은 HumanA는 클래스가 선언됨가 동시에 Weapon이 초기화 되지만, HumanB는 그렇지 않다는 것이다.

HumanB처럼 생성자에 Weapon을 인자로 받지 않을 때 Weapon이라는 멤버 변수가 레퍼런스라면, 해당 멤버 변수를 정의하는 것이 불가능하여 컴파일 조차 되지 않는다. 따라서 HumanB 클래스의 Weapon은 포인터가 적절하고, 자연스럽게 HumanA 클래스는 포인터 혹은 참조자 중 어느 것을 사용해도 되므로 참조자가 더 적절한 것을 알 수 있다.

### Ex04

#### 문제

하나의 파일이름과 두개의 문자열인 s1과 s2 총 3개의 파라미터를 가지는 프로그램을 만들어라.

<파일이름> 을 통해 파일을 열고, 모든 s1을 s2로 대체하여 새로운 파일인 <파일이름>.replace를 만들어 복사해라.

C언어에서 사용하던 파일 함수들을 사용하는것은 금지이고, 사용한다면 치팅으로 간주될 것이다. 모든 멤버 함수들은 std::string클래스에서 허용되는 것을 사용해라. 단, replace함수는 제외하고. 함수들을 현명하게 사용하자!

물론 예상치못한 입력값이나 에러들은 조정해야한다. 너가 직접 프로그램 동작을 가능하게 하는 테스트를 만들어 제출해야한다.

#### 구현

C언어에서는 파일을 열고 읽고 쓰기 위해 파일 디스크립터(fd) 혹은 FILE이라는 구조체 들을 사용했다. 하지만 이 과제에서는 C언어에서의 함수 사용을 금지하고 있으므로, string 라이브러리를 통해 과제를 해결해야한다.

이 전에 스트림이라는 것에 대해 알고있으면 좋다. 우리가 흔히 터미널에 무언가를 출력할 경우, 표준 출력을 사용하고, 입력할 때는 표준 입력을 사용했다. 표준 입출력을 사용하기위해 별다른 코드를 입력하지 않아도 되는데, 그 이유는 컴파일러가 자동으로 표준입출력을 사용하도록 설정하기 때문이다.

스트림은 입출력을 통하는 데이터를 총칭하는 용어이다. C++에서는 파일 스트림 관련 기능을 클레스로 제공하고 있고, string 라이브러리를 통해 사용 가능하다.

```C++
#include <fstream>
#include <iostream>
#include <string>

std::ifstream _ifs;
std::ofstream _ofs;
```

이런식으로 스트림을 설정해줄 수 있다. 각각 if와 of는 입력과 출력으로 다른 스트림을 열어준다는 의미이고, 입출력을 동시에 하고 싶다면 fstream을 사용해주면 된다.

너무 투머치일수도 있겠지만.. 한번 테스트를 통해 코딩을 해보고싶어서 (TDD라고 하고싶지만 너무 초라하다..) 몇가지 작성해보았다.

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/cpp_module/01/ex04_00.png?raw=true)

이런식으로 몇가지 예외사항에 대한 처리를 테스트해봤는데, 막상 해보니 시간도 좀 걸리고 테스터를 만들만한 문제들이 아닌것 같아 그만두었다.

내가 했던 예외처리는 다음과 같다.

- 파일이 존재하지 않을 경우
- 파일은 존재하지만 권한이 없는 경우
- s1이 공백인 경우

s1만 처리를 한 이유는 s2가 공백일 경우 s1을 찾아 삭제를 해주는 remove의 기능으로 사용할 수 있다고 생각했는데, s1이 공백일 경우 함수의 기능이 제대로 동작하지 않을것 같았다.

```C++
while (1) {
  this->pos = this->_readLine.find(this->_s1, this->pos);
  if (this->pos == std::string::npos)
    break;
  this->_readLine.erase(this->pos, this->_s1.length());
  this->_readLine.insert(this->pos, this->_s2);
  this->pos += this->_s2.length();
}
```

replace는 위의 코드를 사용했다. 한 줄씩 ifs에서 읽어준 뒤, 그 줄마다 인덱스를 0부터 줄의 끝까지 증가시키면서 s1을 찾아주고, s1을 찾았다면 s1을 지워준 뒤, 그 자리에 s2를 넣고 s2의 길이만큼 pos를 증가시켜 다음부터 또 찾게 해주었다.

### Ex05

#### 문제

Harl을 알고 있니 ? 모르면 Harl이 작성한 코멘트들을 아래에서 찾으면 된다. 레벨별로 분류가 되어있다.

- "DEBUG" : 디버그 메세지들은 상황에 맞는 정보를 담고 있다. 문제 진단에 가장 많이 사용된다.

- "INFO" : 이 메세지들은 광범위한 정보를 담고있다. 생산 환경에서 프로그램 실행을 추적하는데 유용하다.

- "WARNING" : 워닝 메세지들은 시스템의 잠재적인 이슈를 나타낸다. 그러나 아직 조정하거나 무시할 수 있다.

- "ERROR" : 이 메세지들은 회복 불가능한 에러가 발생했을 경우 나타난다. 이것은 일반적으로 수동적으로 개입이 필요한 치명적인 이슈이다.

너는 이제 Harl을 자동화 할 것이다. 항상 같은 말을 하니까 어렵지 않을 것이다. 너가 만드는 Harl 클래스는 private한 멤버 함수를 가진다.

- void debug( void );
- void info( void );
- void warning( void );
- void error( void );

Harl은 또한 매개변수로 전달되는 수준에 의존하는 4개의 멤버 함수를 호출하는 public 멤버 함수를 가진다.

- void complain( std::string level );

이 예제의 목적은 멤버함수에 대한 포인터를 사용하는 것이다. 이건 제안이 아니다. Harl은 if / else if / else문의 남용 없이 컴플레인을 해야한다. 두번 생각하지 마라!

Harl이 불평을 많이 한다는 것을 보여주는 테스트를 만들고 제출해라. 예제의 메세지를 사용할 수 있다.
Harl이 불평을 많이 한다는 것을 보여주는 테스트를 만들고 제출해라. 예제의 메세지를 사용하거나 자신이 직접 메세지를 골라서 사용할 수 있다.

#### 구현

이 문제는 switch - case 문을 통해 구현할 수 있었다.

```C++
void Harl::complain(std::string level) {
  void (Harl::*f[4])(void) = {
    &Harl::debug,
    &Harl::info,
    &Harl::warning,
    &Harl::error
  };
  std::string findComplain("DEBUG,INFO,WARNING,ERROR");

  if (level.find(",") >= 0 && level.find(",") <= findComplain.length()) {
    std::cout << "It's not my complain." << std::endl;
    return ;
  }

  switch (findComplain.find(level)) {
    case 0:
      (this->*f[0])();
      break;
    case 6:
      (this->*f[1])();
      break;
    case 11:
      (this->*f[2])();
      break;
    case 19:
      (this->*f[3])();
      break;
    default:
      std::cout << "It's not my complain." << std::endl;
      break;
  }
}
```

먼저, 함수의 포인터 배열을 만들어주고, 매개변수로 들어오는 level을 판별해주는 조건문을 작성해준다. 내가 한 방법은 DEBUG부터 ERROR까지 콤마(,)를 구분자로 하여 하나의 문자열을 만들어준 뒤, find 함수를 통해 입력값과 알맞은 인덱스를 찾아 조건문으로 활용하였다.

이 경우, "DEBUG,INFO"라는 문자열도 find 함수에 들어갔을 때, 값이 0이 될 수 있으므로, 그 전에 if문을 통해 콤마가 포함된 문자열이라면 예외사항으로 처리하도록 만들어주었다.

### Ex06

#### 문제

때때로 Harl이 말하는 모든것에 주의를 기울이고 싶지 않은 경우가 있다. 듣고자 하는 level에 따라 Harl이 말하는것을 필터링하는 시스템을 구현하자.

4개의 level 중 하나를 매개변수로 받는 프로그램을 만들자. 이 프로그램은 level 이상의 모든 메세지가 표시된다.

Harl을 처리하는 여러가지가 있지만 가장 효과적인 방법 중 하나는 **"SWITCH"**를 끄는 것이다.

#### 구현

이 문제는 05번 예제를 잘 구현했다면 조금만 수정해도 되는 문제였다. 터미널에서 인자를 받는 형식으로 구현하라는 것과 매개변수로 받은 값 이상의 모든 메세지를 출력하도록 하는 것이다.

인자로 받는 형식은 쉬우므로 패스하고, 매개변수로 받은 값 이상의 모든 메세지는 05번 예제에서 약간의 수정을 거치면 된다.

```C++
std::cout << "[ " << level << " ]" << std::endl;
switch (findComplain.find(level)) {
  case 0:
    (this->*f[0])();
  case 6:
    (this->*f[1])();
  case 11:
    (this->*f[2])();
  case 19:
    (this->*f[3])();
    break;
  default:
    std::cout << "[ Probably complaining about insignificant problems ]" << std::endl;
}
```

이런식으로 case 사이의 break를 제거해주면 case가 6인 경우 case 0은 통과하고 case 6, 11, 19가 순차적으로 실행된다.

## 느낀 점

지난 cpp00을 4번이나 트라이하게 되어 과제를 꼼꼼히 읽자는 교훈과 C++ 레퍼런스를 정말 많이 봐야겠다는 생각이 들었다. 이번에는 그에 따라 한번에 통과를 하고자 했으나... 역시나 마지막에서 방심을 해버려서 터미널에서 인자로 받는 기능을 넣지 않고 메인문을 그대로 복붙하는 바람에 ... 또 리트를 할 생각이다. (06번 예제는 하지 않아도 통과를 할 수 있기 때문에 다음 과제를 할 수 있지만 100점 못잃어 ... 보너스 헌터 못잃어 ...)
