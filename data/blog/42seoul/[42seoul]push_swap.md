---
title: '[42seoul] push_swap'
date: '2022-08-26'
tags: ['2nd_circle', 'C', '42seoul', 'greedy', 'stack']
draft: false
summary: 두개의 스택을 이용하여 정렬을 해보자!
layout: PostSimple
---

# push_swap

- [Chapter 1](#chapter-1)
  - [Introduction](#introduction)
- [Chapter 2](#chapter-2)
  - [Goals](#goals)
- [Chapter 3](#chapter-3)
  - [General Instructions](#general-instructions)
- [Chapter 4](#chapter-4)
  - [Mandatory part](#mandatory-part)
    - [Gamerules](#game-rules)
    - [Example](#example)
    - [Push_swap program](#push_swap-program)
  - [진행 과정](#진행-과정)
    - [스택 구현](#스택-구현)
  - [알고리즘](#알고리즘)
- [Chapter 5](#chapter-5)
  - [Bonus part](#bonus-part)
- [느낀 점](#느낀-점)

## Chapter 1

### Introduction

push_swap 과제는 정렬해야하는 int값들과 두개의 스택, 스택을 조작하는 명령어 집합이 주어진다.

이 때, 최소한의 명령어들을 이용하여 int형 인자들을 정렬하는 방법을 계산하고, 사용된 명령어들을 표준 출력해야 한다.

## Chapter 2

정렬 알고리즘을 사용하면 복잡도라는 개념을 마주하게 된다. 여기서 [복잡도](https://en.wikipedia.org/wiki/Analysis_of_algorithms)란 문제를 해결하는데 걸리는 시간과 입력의 함수 관계를 가리킨다.

알고리즘에서의 [시간복잡도](https://ko.wikipedia.org/wiki/%EC%8B%9C%EA%B0%84_%EB%B3%B5%EC%9E%A1%EB%8F%84)는 주로 빅-오(Big-O) 표기법을 사용하는데, 이 표기법은 낮은 차수의 항을 제외시키는 방법이다. 예를 들면 크기 n의 모든 입력에 대한 알고리즘에 필요한 시간이 최대 5n^3 + 3n이라면 이 알고리즘의 시간복잡도는 O(n^3)이라고 할 수 있다.

시간복잡도는 어떤 입력값이 들어와서 어떤 알고리즘을 거치느냐에 따라 달라질 수 있기 때문에, 최악의 입력값이 들어왔을 때의 시간복잡도를 토대로 T(n)이라고 정의할 수 있다.

이 T(n)의 특성에 의해 시간복잡도를 분류할 수 있는데, 예를들어 T(n) = O(n)인 알고리즘은 **선형 시간 알고리즘**이라고 부르며, 몇몇 M >= n > 1에 대해 T(n) = O(M^n)이고 M^n = O(T(n))인 알고리즘은 **지수 시간 알고리즘**이라고 한다.

## Chapter 3

### General Instructions

mandatory part에서의 허용 함수는 다음과 같다.

- write
- read
- malloc
- free
- exit

그리고 만일 libft를 사용한다면 libft먼저 컴파일 하고, push_swap 프로젝트를 컴파일 해야한다.

## Chapter 4

### Mandatory part

#### Game rules

이 프로그램은 두 개의 [스택](<https://en.wikipedia.org/wiki/Stack_(abstract_data_type)>)을 사용한다.

- 스택 a는 양의 정수들과 음의 정수들을 포함한 중복되지 않은 값들이 들어있다.
- 스택 b는 비어있다.

목표는 스택 a에 정수들을 오름차순으로 정렬하는 것이다.

다음과 같은 명령어들을 사용할 수 있다.

- sa : swap a - 스택 a의 top에 위치한 두 개의 원소의 순서를 맞바꿉니다. 스택 a가 비어있거나 원소가 1개만 있을 때는 아무 동작도 하지 않습니다.
- sb : swap b - 스택 b의 top에 위치한 두 개의 원소의 순서를 맞바꿉니다. 스택 b가 비어있거나 원소가 1개만 있을 때는 아무 동작도 하지 않습니다.
- ss - sa와 sb를 동시에 수행합니다.

- pa : push a - 스택 b의 top에 위치한 원소 한 개를 스택 a의 top으로 옮깁니다. 스택 b가 비어있을 경우에는 아무 동작도 하지 않습니다.
- pb : push b - 스택 a의 top에 위치한 원소 한 개를 스택 b의 top으로 옮깁니다. 스택 a가 비어있을 경우에는 아무 동작도 하지 않습니다.

- ra : rotate a - 스택 a의 원소를 한 칸씩 위로 옮깁니다. 스택의 첫 번째 원소는 맨 마지막 원소가 됩니다.
- rb : rotate b - 스택 b의 원소를 한 칸씩 위로 옮깁니다. 스택의 첫 번째 원소는 맨 마지막 원소가 됩니다.
- rr : ra와 rb를 동시에 수행합니다.

- rra : reverse rotate a - 스택 a의 원소를 한 칸씩 아래로 옮깁니다. 스택의 마지막 원소는 맨 첫 번째 원소가 됩니다.
- rrb : reverse rotate b - 스택 b의 원소를 한 칸씩 아래로 옮깁니다. 스택의 마지막 원소는 맨 첫 번째 원소가 됩니다.
- rrr : rra와 rrb를 동시에 수행합니다.

#### Example

```
----------------------------------------------------------------------------------------------------------
Init a and b:
2
1
3
6
5
8
_ _
a b
----------------------------------------------------------------------------------------------------------
Exec sa:
1
2
3
6
5
8
_ _
a b
----------------------------------------------------------------------------------------------------------
Exec pb pb pb:
6 3
5 2
8 1
_ _
a b
----------------------------------------------------------------------------------------------------------
Exec ra rb (equiv. to rr):
5 2
8 1
6 3
_ _
a b
----------------------------------------------------------------------------------------------------------
Exec rra rrb (equiv. to rrr):
6 3
5 2
8 1
_ _
a b
----------------------------------------------------------------------------------------------------------
Exec sa:
5 3
6 2
8 1
_ _
a b
----------------------------------------------------------------------------------------------------------
Exec pa pa pa:
1
2
3
5
6
8
_ _
a b
----------------------------------------------------------------------------------------------------------
```

#### Push_swap program

```
$>./push_swap 2 1 3 6 5 8
sa
pb
pb
pb
sa
pa
pa
pa
$>./push_swap 0 one 2 3
Error
$>
```

위와 같은 인자 규칙을 적용해야 한다. 또한, Checker 프로그램을 사용해 입력되는 인자의 유효성을 판단할 수 있다.

```
$>ARG="4 67 3 87 23"; ./push_swap $ARG | wc -l
6
$>ARG="4 67 3 87 23"; ./push_swap $ARG | ./checker_OS $ARG
OK
$>
```

### 진행 과정

#### 스택 구현

먼저, 스택을 구현해야 한다. 스택이란 언제나 목록의 끝에서만 접근을 할 수 있는 방식으로, LIFO(Last In First Out)으로 이루어져 있다. 하지만 push*swap 과제에서 제공하는 명령어를 보았을 때, 가장 아래에 있는 요소를 맨 위로 올리는 명령어도 있어 스택보다는 [덱(deque)](https://ko.wikipedia.org/wiki/%EB%8D%B1*(%EC%9E%90%EB%A3%8C\_%EA%B5%AC%EC%A1%B0))의 구조와 비슷하다고 느꼈다. 따라서 과제를 진행할 때 구조를 양방향 연결리스트로 구현하였고, 양쪽 끝에 더미노드를 넣어 처음과 끝을 알 수 있게 하였다.

```C
typedef struct s_node
{
	int				val;
	struct s_node	*left;
	struct s_node	*right;
}	t_node;

typedef struct s_stack
{
	struct s_node	*top;
	struct s_node	*bottom;
}	t_stack;

void	init_stack(t_var *var)
{
	var->stack_a = (t_stack *)malloc(sizeof(t_stack));
	var->stack_b = (t_stack *)malloc(sizeof(t_stack));
	var->stack_a->top = get_new_node(0);
	var->stack_a->bottom = get_new_node(0);
	var->stack_a->top->right = var->stack_a->bottom;
	var->stack_a->bottom->left = var->stack_a->top;
	var->stack_b->top = get_new_node(0);
	var->stack_b->bottom = get_new_node(0);
	var->stack_b->top->right = var->stack_b->bottom;
	var->stack_b->bottom->left = var->stack_b->top;
	var->list = (int *)malloc(sizeof(int));
	var->list_size = 0;
	var->a_size = 0;
	var->b_size = 0;
}
```

기본적인 스택의 구조를 구현했다. 탑과 바텀에 각각 값이 0인 더미노드를 생성 후 연결시켜주었다.

#### 인자 파싱

알고리즘에 적용하기 위해 무작위로 들어오는 값들을 파싱해줘야 할 필요가 있다. 후술하겠지만, 내가 사용한 알고리즘의 경우, 값들의 중간 값들을 사용하기 때문에, [-10, 2, 3, 4, 5, 1000, 100000, 1000000] 등의 값이 들어올 경우 상당히 곤란해진다. 위의 값들을 [1, 2, 3, 4, 5, 6, 7, 8]과 같이 정리해줘야 할 필요가 있다.

```C
int	find_list_max(t_var *stacks)
{
	int	max;
	int	idx;

	max = -2147483648;
	idx = 0;
	while (idx < stacks->list_size)
	{
		if (max < stacks->list[idx])
			max = stacks->list[idx];
		idx++;
	}
	idx = 0;
	while (idx < stacks->list_size)
	{
		if (max == stacks->list[idx])
		{
			stacks->list[idx] = -2147483648;
			return (idx);
		}
		idx++;
	}
	return (-1);
}

void	indexing(t_var *stacks)
{
	int	*idx_list;
	int	idx;
	int	max_idx;

	idx_list = (int *)malloc(sizeof(int) * stacks->list_size);
	if (!idx_list)
		ps_error();
	idx = stacks->list_size - 1;
	while (idx >= 0)
	{
		max_idx = find_list_max(stacks);
		idx_list[max_idx] = idx;
		idx--;
	}
	free(stacks->list);
	stacks->list = idx_list;
}
```

이 코드는 내가 인덱싱 해준 방법이다. 먼저 노드의 수를 구해서 인덱싱한 값들을 넣어줄 리스트를 만들어 준 뒤, 기존 값들 중 가장 큰 값을 찾아 그 값이 있는 위치에 노드의 수 - 1의 값을 인덱스로 넣어준다. 그리고, 가장 최대값을 int형의 최소값인 -2147483648로 바꾸어준 뒤 다시 최대값을 찾게하는 방식으로 순차적으로 인덱싱을 해준다.

#### 알고리즘

푸시스왑을 구현하기 위한 많은 알고리즘이 존재하지만, 내가 선택한 알고리즘은 그리디 알고리즘이다. 그리디 알고리즘은 "매 선택에서 지금 이 순간 당장 최적인 답을 선택하여 적합한 결과를 도출하자"라는 모토를 가진 알고리즘이다. 하지만 명심해야할 점은, 매 순간 가장 최적의 답을 선택하지만 종합적으로 보았을 때는 최적이라는 보장이 절대 없다는 점이다. 1 - 1000 - 1 - 1 이라는 선택과 1 - 500 - 500 - 500 이라는 선택이 있다면 두번째에서 1000보다 낮은 500을 선택하지만 종합적으로는 1003과 1501이라는 결과로 첫번째 선택이 더 낫다는 결론이 될 수 있기 때문이다.

그래서 이를 보정하기 위해, push_swap에서는 그리디 알고리즘을 효과적으로 사용하기 위하여 3등분으로 그룹을 나누어 준 뒤, 그리디 알고리즘을 적용하게 된다. 3등분으로 그룹을 나누는 이유는 가장 적은 명령어로 그룹을 분할 할 수 있기 때문이다.

예를들어 min 그룹과 middle 그룹, max그룹으로 나눈다면(편의상 1, 2, 3 그룹으로 후술) 세 그룹으로 나누기 위한 기준점(pivot)은 두 개가 필요하다. 1과 2그룹을 나누는 p1과 2와 3그룹을 구분짓는 p2가 있다면 p2를 기준으로 a스택에서 p2이하인 노드들을 다 b로 옮겨준다 이 때, 필요한 명령어의 수는 최대 a스택에 담긴 노드의 수이다. 그리고, b스택 내부에서 p1을 기준으로 위 아래로 나누어 준다. 이 때 소비되는 명령어의 수도 b스택에 담긴 노드의 수 정도로 적은 명령어 수를 소비한다.

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/push_swap/push_swap01.png?raw=true)

위 작업을 수행하면 다음과 같은 그룹을 형성하게 된다.
이 때, 마지막 남은 a스택의 3그룹도 3개 정도만 남기고 b로 넘겨준다. 남은 a스택의 3개는 하드코딩으로 정렬을 시킨다.

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/push_swap/push_swap02.png?raw=true)

그러면 이런식으로 스택이 쌓이게 되고, 여기서부터 b스택의 노드들을 하나씩 보면서 어떤 노드가 가장 a스택에 적은 명령어를 소모하면서 옮겨지는지 계산한다.

**b스택의 노드들을 매 순간마다 전체적으로 다 계산을 해주어야한다는 부분에서 시간복잡도 상으로는 가장 계산이 느릴 수 있다. 하지만 push_swap에서 요구하는 복잡도는 명령어를 최소화하는 방법이기 때문에 그리디 알고리즘을 사용하게 되었다.**

1, 2, 3그룹으로 나누는 정렬을 잘 수행하게 된다면, 그리디 알고리즘을 사용함에 있어 모두 같은 포멧으로 시작하기 때문에 최악의 상황을 가정한 명령어의 수가 많아지는 경우가 사라지게 된다. b스택으로 넘겨주었던 3그룹이 대부분 먼저 넘어오게 되는데, 그 때, 명령어 수를 많이 소비하지 않으면서 넘어오게 된다. 비슷한 값들의 그룹이기 때문이다.

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/push_swap/push_swap03.png?raw=true)

그렇지 않은 경우도 존재한다. 1그룹의 경우 rrb 한번으로 pb를 수행할 수 있기 때문에 위와 같이 1그룹도 같이 넘어올 수 있다.

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/push_swap/push_swap04.png?raw=true)

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/push_swap/push_swap05.png?raw=true)

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/push_swap/push_swap06.png?raw=true)

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/push_swap/push_swap07.png?raw=true)

이런 식으로 정렬이 진행되고, 마지막 노드가 b에서 a로 옮겨지게 되면 그리디 알고리즘이 끝나게 된다. 마지막으로 ra 혹은 rra를 통해 오름차순으로 만들어주면 된다.

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/push_swap/push_swap08.png?raw=true)

정렬이 완료된 모습.

#### 주의사항

들어오는 인자에 대한 파싱이 중요하다. 예를들어

```
./push_swap 5 4 3 2 1

./push_swap 5 "4 3 2" 1

./push_swap "5" 4 "   3 2    " 1
```

등 여러가지 경우가 가능하므로, checker프로그램을 적극적으로 사용하여 예외사항을 찾아보길 바란다.

## Chapter 5

### Bonus part

mandatory part를 잘 구현했다면 이번 보너스는 진짜 거저주는 점수일 것이라 생각한다. 스택 구조를 잘 짰다면 정렬이 되었는지를 판단하는 알고리즘만 짜 주면 되기 때문이다. 자세한 설명은 생략하기로 하겠다.

## 느낀 점

2서클의 벽이라고 하는 push_swap을 먼저 진행하게 되었다. 자료구조를 python으로만 다뤄봐서 C를 이용한 자료구조는 처음 다뤄보았는데, 연결리스트로 다양한 자료구조를 구현할 수 있다는 점이 인상깊었다. 또한, 그리디 알고리즘 말고도 다양한 알고리즘들이 많이 있는데, 이런 알고리즘들도 한번씩 보면서 알고리즘간의 장단점을 파악하고 자신에게 가장 적합한 알고리즘을 찾아 구현해보길 바란다.

## reference

[push_swap visualizer](https://github.com/o-reo/push_swap_visualizer)

[greedy algorithm](https://en.wikipedia.org/wiki/Greedy_algorithm)
