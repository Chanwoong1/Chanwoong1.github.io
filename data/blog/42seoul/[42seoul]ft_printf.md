---
title: '[42seoul] ft_printf'
date: '2022-08-09'
tags: ['1st_circle', 'C', '42seoul', 'printf']
draft: false
summary: write만 쓰기엔 표현해야할 것이 많다.
layout: PostSimple
---

# ft_printf

- [Chapter 1](#chapter-1)
  - [가변 인자 함수](#가변-인자-함수)
- [Chapter 2](#chapter-2)
- [Chapter 3](#chapter-3)
  - [Mandatory Part](#mandatory-part)
    - [1. 서식 지정자 탐색](#1.-서식-지정자-탐색)
    - [2. 함수 포인터를 활용한 지정자 별 출력](#2.-함수-포인터를-활용한-지정자-별-출력)
    - [3. 과정](#3.-과정)
- [Chapter 4](#chapter-4)
  - [Bonus Part](#bonus-part)
    - [1. 과정](#1.-과정)
- [Chapter 5](#chapter-5)
  - [느낀 점](#느낀-점)

## Chapter 1

그 동안 사용할 수 없었던 printf를 직접 구현하여 사용하게 된다.

printf 구현 시 가변 인자 함수를 배울 수 있다.

### 가변 인자 함수

함수를 만들 때 인자가 몇 개가 들어올 지 모를 때 사용한다. 기본적으로 하나의 인자는 포함되어야 사용할 수 있다.

```C
int	ft_printf(const char *format, ...)
```

### stdarg.h

가변 인자를 사용하기 위해서는 위와 같은 헤더를 포함시켜준다.

**va_list**

    현재 매개인자의 주소를 저장하는 타입
    1바이트 단위로 이동하기 위해서 va_list의 실제 타입은 char * 으로 사용되며 이는 va_arg에서의 포인터 연산에 활용된다. (__GNUC__ && __GNUC__ >= 3 에서는 컴파일러 별도의 타입을 사용..)
    보통 해당 자료형을 사용하는 변수명을 ap라고 작성하는데, 이는 arguments pointer를 뜻한다.

**va_start**

    va_list의 값을 가변인자의 첫 번째 매개변수의 값으로 초기화시킨다.
    매크로 함수의 인자로 들어오는 pN은 함수의 가변 인수 이전 마지막 매개인자이다.(... 이전의 마지막 인자) 가변인자를 사용할 때, (arg1, ...) 과 같이 활용하므로 ... 의 첫 번째 인자를 가리키기 위해서 pN의 다음 데이터를 가리키도록 인자를 변경해주고있다.

**va_end**

    가변인자를 모두 사용하고 난 후, ap의 값을 NULL로 변경한다.

**va_arg**

    va_list에 저장된 값을 바탕으로 현재 매개인자를 반환하고, va_list의 주소를 다음으로 이동시킨다.

## Chapter 2

### Common Instructions

**Makefile**

이제부터 libft의 함수들을 사용할 수 있다. 사용하기 위해서는 libft의 makefile로 먼저 libft의 라이브러리를 컴파일 한 다음, printf 프로그램을 컴파일 해야 한다.

## Chapter 3

### Mandatory Part

#### 1. 서식 지정자 탐색

인자의 유효함은 미리 지정해놓은 지정자 문자열을 통해 탐색해서 지정자가 맞다면 해당하는 문자열의 인덱스를 반환하는 식으로 작성했다.

```C
static void	set_f_pt(int (*f[256])(va_list ap), char *val_f)
{
	ft_memset(f, 0, 256);
	ft_memset(val_f, 0, 256);
	f['d'] = print_id;
	f['i'] = print_id;
	f['c'] = print_c;
	f['p'] = print_p;
	f['s'] = print_s;
	f['u'] = print_u;
	f['x'] = print_x;
	f['X'] = print_xx;
	f['%'] = print_percent;
	val_f['d'] = 1;
	val_f['i'] = 1;
	val_f['c'] = 1;
	val_f['p'] = 1;
	val_f['s'] = 1;
	val_f['u'] = 1;
	val_f['x'] = 1;
	val_f['X'] = 1;
	val_f['%'] = 1;
}
```

함수 포인터와 서식 지정자 유효성을 한번에 체크해주는 함수이다. ascii 상의 범위를 배열의 크기로 지정하고, 서식 지정자인 경우만 값을 넣어주면 자연스럽게 지정자가 아닌 값은 거를 수 있게 된다.

#### 2. 함수 포인터를 활용한 지정자 별 출력

함수 포인터를 사용하여 코드의 길이를 효과적으로 줄일 수 있다. 기존 if else 문을 쓰게 되면, if를 통해 맞는 서식 지정자를 받아오고, 그에 따라 return 값이 달라지기 때문에 코드의 길이가 매우 길어지게 된다. 이 것을 함수의 포인터를 이용하여 미리 함수를 배열에 저장해놓고, 서식 지정자가 들어올 때마다 대응하는 값의 함수를 반환시켜줄 수 있다.

```C
if ((unsigned char)(*form) == '%' && val_f[(unsigned char)(*(++form))])
				cnt = f[(unsigned char)(*form++)](ap);
```

그러면, 서식 지정자 별 2 ~ 3줄가량 적어주어야 할 코드의 길이가 단 2줄로 9개의 서식 지정자를 모두 포함할 수 있게 된다.

#### 3. 과정

처음엔 입력값에 오류가 있을 수도 있다는 가정 하, 한 문자씩 읽으면서 동적할당을 계속 해 주었다. 그리고, 지정자 함수를 거쳐 온 가변 인자들은 strjoin을 통해 붙여주는 식으로 구상했었는데, 매우 큰 문자열이 오게 되면 시간이 오래 걸리겠다는 생각이 들어서 받아오는 대로 출력하는 방식으로 바꾸어 보았다.

이러면, 도중에 오류가 발생하면 기존 printf와 달리 우리가 만든 ft_printf는 출력 도중 오류를 출력하게 된다. 반환 값은 -1로 동일하지만, 출력메세지가 달라지게 되는데, subject에서 명시하길 "실제 printf 처럼 버퍼 관리를 수행해서는 안 된다."고 되어 있어서 이 또한 의도된 것이라고 생각했다.

## Chapter 4

### Bonus Part

보너스 부분은 printf함수의 부가적인 기능들을 수행할 수 있도록 해야한다.

주어진 플래그들을 조합하는 것인데, 굉장히 많은 경우의 수가 발생해서 플래그들의 조합을 정리하기가 까다로웠다.

내가 정리한 서식 지정자 별 플래그는 다음과 같다.

**%**

- flag : '-', '0', ' '
- width

**i, d, u**

- flag : '-', '0', ' ', '+'
- width
- precision

**c**

- flag : '-'
- width

**s**

- flag : '-'
- width
- precision

**p**

- flag : '-'
- width

**x, X**

- flag : '-' '0' '#'
- width
- precision

플래그들과 너비, 정밀도를 정리한 후, 구현을 시작했다. 구현이 거의 다 끝날 때 부터 printf tester들을 사용하기 시작했다. 플래그 조합들을 제대로 정리하지 않으면 막바지에 수정하는 작업이 상상 이상으로 길어지므로 최대한 깔끔하게 정리한 뒤 코드를 짜는 것을 추천한다.

#### 1. 과정

bonus part의 플래그들을 제대로 사용하기 위해서는 구조체가 필요하다. 구조체를 통해 각각의 플래그들을 담아주고, 서식 지정자 별 플래그를 적용시켜 출력시키면 된다. 말은 간단한데 코드는 간단하지 않다 ... 웬만하면 보너스 코드는 보지 않길 바람 ...

## Chapter 5

### 느낀 점

mandatory part만 구현하는 것은 생각보다 시간이 오래 걸리지 않고 할 만 했다. 대략 2일정도 걸린것 같고, 바로 bonus part를 시작했다. subject에 나와있듯이 bonus를 구현하려면 mandatory를 구현하는 것 부터 신경을 써야한다. 나는 그걸 간과하고 코드를 짜서, mandatory를 구현한 코드를 엄청 많이 수정해야 했다.

bonus part는 구현하는 데 7일정도 걸린 것 같다. 생각보다 완성은 빨랐으나, 수정 사항이 굉장히 많았고, 작업 또한 굉장히 오래걸렸다. 자칫 잘못해서 플래그가 꼬이기 시작하면, 하나를 고치면 다른 하나가 터지는 불상사가 발생하기도 한다.

다음 과제부터는 과제 파악과 이해를 조금 더 깊게 한 뒤 과제를 수행하고, 의사코드를 짜는 연습을 해서 코드 작성 중 뒤엎는 일을 최소화 할 수 있도록 해야겠다.

과제를 진행하면서 사용한 메인 파일이다 .. 만약 사용할 경우 700줄 가량 되므로 주석처리하고 부분적으로 실행해보길 바란다.
[ft_printf_bonus_main.c](https://github.com/chanwoong1/42Seoul/blob/master/Circle_1/ft_printf/main_tester/main_bonus.c)

## reference

[printf manual](https://man7.org/linux/man-pages/man3/printf.3.html)

[va_start manual](https://man.archlinux.org/man/va_start.3.en)