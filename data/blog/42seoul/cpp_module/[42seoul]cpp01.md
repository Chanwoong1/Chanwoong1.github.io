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

이 문제는 자신이 꿈의 회사에 입사를 한 뒤 일어난 문제를 해결해야한다. 이 회사에서는 git을 사용하지 않고 USB를 사용해 코드를 공유한다고 한다.(이게 꿈의 회사..? 이건 꿈일거야..의 꿈일것 같다.)

어쨌든 USB를 사용해 코드를 공유하다가 코드가 유실이 된 것이다... 그래서 과거의 기록과 남겨진 코드를 참고하여 유실된 코드를 복원해야하는것이 문제이다.

하나하나 순차적으로 출력을 해보면 되는 것이기 때문에 한번 풀어보기를 바란다.

## 느낀 점

norminette의 굴레에서 벗어나서 기분은 좋았으나.. 그것도 한 순간이었다.

norminette 없이 자유롭게 코딩을 할 수 있다는 것은 그만큼 다양한 곳에서 프로그램이 문제가 발생할 수도 있다는 뜻이고, 이유있는 사용을 요구하기 때문이다.

따라서 다 했다고 생각하고 평가를 받았는데 틀린부분이 평가에서 계속 발견되었다. 그리고 앞서 말했던 서브젝트를 꼼꼼히 읽어야한다는 부분도 그래서 나온 말이다.

하지만 새로운 언어를 배울수 있다는 부분에서 굉장히 즐거웠고, 객체지향 프로그래밍에 대해 확실하게 알고갈 수 있는 기회가 온것 같아 좋다.
