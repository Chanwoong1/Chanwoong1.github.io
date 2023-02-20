---
title: '[42seoul] philosophers'
date: '2022-10-08'
tags: ['3rd_circle', 'C', '42seoul', 'mutex', 'semaphore']
draft: false
summary: 철학자들에게 밥을 먹이자
layout: PostSimple
---

# philosophers

- [Chapter 1](#chapter-1)
  - [Introduction](#introduction)
- [Chapter 2](#chapter-2)
  - [Mandatory part](#mandatory-part)
- [Chapter 3](#chapter-3)
  - [Bonus part](#bonus-part)
- [느낀 점](#느낀-점)

## Chapter 1

### Introduction

[식사하는 철학자들 문제](https://en.wikipedia.org/wiki/Dining_philosophers_problem)는 1965년에 만들어진 문제로, 운영체제의 [교착상태](https://en.wikipedia.org/wiki/Deadlock)를 설명하기 위한 문제이다.

교착상태는 네 가지 필요 조건을 충족시켜야 한다.

- 상호배제 : 프로세스들이 필요로 하는 자원에 대해 배타적인 통제권 요구
- 점유대기 : 프로세스가 할당된 자원을 가진 상태에서 다른 자원을 기다림
- 비선점 : 프로스세가 어떤 자원의 사용을 끝낼 때 까지 그 자원을 뺏을 수 없음
- 순환대기 : 각 프로세스는 순환적으로 다음 프로세스가 요구하는 자원을 가지고 있음

이 조건 중 한 가지라도 만족하지 않으면 교착상태는 발생하지 않는다. 한번에 4가지를 동시에 만족시키기가 굉장히 힘들어 보이지만, 대부분의 현대 운영체제도 교착 상태를 막는것은 불가능하다.

따라서 교착상태를 막기 위해 4가지의 조건 중 한 가지(주로 순환대기)를 막음으로써 교착상태를 제거하려 한다.

그러나 이번 과제에서는 쓰레드와 상호배제(mutex)를 이용하여 철학자 문제를 해결하라고 한다.

## Chapter 2

### Mandatory part

먼저, 프로그램을 실행할 때 입력해야하는 인자는 5개가 있다.

- 철학자의 수
- 철학자의 수명
- 밥을 먹는데 걸리는 시간
- 잠자는 시간
- 각 철학자가 최소한 밥을 먹어야 하는 횟수(입력하지 않으면 무한히 먹어야 함)

그리고, 터미널의 출력은 다음과 같은 형식으로 출력되어야 한다.

```
timestamp_in_ms X has taken a fork
timestamp_in_ms X is eating
timestamp_in_ms X is sleeping
timestamp_in_ms X is thinking
timestamp_in_ms X died
```

쓰레드와 뮤텍스를 사용해야하므로 사용 가능한 함수들이 많이 늘었다. 그 중 많이 사용되는 함수들은 다음과 같다.

- usleep
- gettimeofday
- pthread_create
- pthread_mutex_init
- pthread_mutex_lock
- pthread_mutex_unlock

```C
int usleep(useconds_t usec);
```

지정한 마이크로초(1000마이크로초는 1초이다)동안 대기 상태가 된다. 프로그램에서 밥먹는시간과 잠자는시간을 보내게 해주는 함수이다. 필수적으로 필요하다. 주의할 점은 10000마이크로초를 대기하기 위해 usleep(10)을 1000번 하는것과 usleep(1000)을 10번 하는것은 프로그램 수행에 굉장히 큰 차이를 보이기 때문에 적절한 수치를 넣어주는 것이 중요하다.

```C
int gettimeofday(struct timeval *tv, struct timezone *tz);

struct timeval {
    time_t      tv_sec;
    suseconds_t tv_usec;
}
```

반환값이 구조체에 담기게 되는데, 1970-01-01 00:00 부터 함수가 호출된 시간까지의 마이크로초 값이 반환된다. 이것으로 프로그램 시작 이후 몇 초가 지났는지 알 수 있다.

```C
int pthread_create(pthread_t*thread, const pthread_attr_t*attr,
			void*(*start_routine)(void *), void *arg);

pthread_t	pthread;
int			thread_id;

thread_id = pthread_create(&pthread, NULL, function, &args);
```

위 함수로 쓰레드를 생성할 수 있다. 쓰레드를 생성하면 function을 수행하도록 하고, function에 필요한 인자를 args에 입력하여 보낸다.

```C
int pthread_mutex_init(pthread_mutex_t *restrict mutex,
			const pthread_mutexattr_t *restrict attr);

int pthread_mutex_lock(pthread_mutex_t *mutex);

int pthread_mutex_unlock(pthread_mutex_t *mutex);
```

mutex에 필요한 세 함수이다. 세 함수 모두 필요한 인자인 pthread_mutex_t *mutex를 이용해 상호 배제를 해줄 수 있다. 예를 들어 *mutex를 init하고, 쓰레드1이 mutex_lock로 *mutex를 점유하고 있다면, 쓰레드2는 *mutex를 점유하기위해 mutex_lock을 시도해도 대기상태에 빠지게 된다. 이 대기상태는 쓰레드1에서 mutex_unlock을 해주어야 풀리고, 풀리자마자 쓰레드2가 점유를 시작하게 된다. 과제에서 mutex는 포크가 된다.

#### logic

철학자를 죽이지 않고 밥을 먹이는 방법은 철학자 쓰레드 별로 인덱스를 달아준 뒤, 짝수번 철학자 그룹과 홀수번 철학자 그룹을 나누어 순차적으로 밥을 먹이는 방법이 대표적이다. 이 방법이 가장 효과적인 이유는 원탁에 포크가 두 철학자 사이에 하나씩 놓여있기 때문이다. 즉, 내 왼쪽 철학자가 포크를 먼저 잡으면, 나는 왼쪽 포크를 잡기위해 왼쪽 철학자가 포크를 내려놓기만을 기다려야한다는 뜻이다. 따라서 짝수번 철학자들이 밥을 먹는 동안, 홀수번 철학자들은 잠을 자는 식으로 순차적으로 밥을 먹인다면 무한히 밥을 먹일 수 있게 되는 것이다.

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/philosophers/philosophers01.png?raw=true)

철학자들이 근엄하게 밥을 먹으려 하고 있다..

쓰레드를 철학자의 수만큼 생성하게 된다면, 모두 같은 함수를 수행하기 때문에 짝수번과 홀수번을 구분해주어야 할 필요가 있다. 따라서 모두가 포크를 점유하게 하기 전에 짝수번째 철학자들에게 usleep(10)정도로 대기상태를 만들어 놓은 뒤, 그 사이에 홀수번째 철학자들이 포크를 잡을 수 있도록 해야한다.

```C
int	ph_start(t_arg *arg, t_philo *philo)
{
	int		i;

	i = 0;
	while (i < arg->philo_num)
	{
		philo[i].last_eat_time = get_time();
		if (pthread_create(&(philo[i].thread), NULL, ph_thread, &(philo[i])))
			return (1);
		i++;
	}
	ph_check_finish(arg, philo);
	i = 0;
	while (i < arg->philo_num)
		pthread_join(philo[i++].thread, NULL);
	return (0);
}
```

위 함수에서 철학자만큼 쓰레드를 생성하고, ph_thread 함수를 수행하도록 한다.

```C
void	*ph_thread(void *argv)
{
	t_arg		*arg;
	t_philo		*philo;

	philo = argv;
	arg = philo->arg;
	if (philo->id % 2 == 0)
		sleep_until_even_eat(arg);
	while (!arg->finish)
	{
		if (arg->philo_num - 1 == philo->id && philo->eat_count == 0)
			usleep(1);
		ph_action(arg, philo);
		if (arg->philo_num == 1)
			spend_time((long long)arg->time_to_sleep, arg);
		if (arg->eat_times == philo->eat_count)
		{
			arg->finished_eat++;
			break ;
		}
		ph_stat_printf(arg, philo->id, "is sleeping");
		spend_time((long long)arg->time_to_sleep, arg);
		ph_stat_printf(arg, philo->id, "is thinking");
	}
	return (0);
}
```

이 함수에서 짝수번째 철학자들을 먼저 대기시키고 홀수번째 철학자부터 포크를 들게 한다. 이를 통해 홀수번째 철학자들이 먼저 식사를 시작하고, 식사하는 시간동안 시간을 보낸 뒤, 포크를 내려놓으며 잠을 잔다. 홀수번째 철학자들이 잠에 들면 짝수번째 철학자들이 식사를 시작한다.

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/philosophers/philosophers_move01.gif?raw=true)
철학자들이 야무지게 식사를 하는 모습..

이 과정을 시각화 하면
![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/philosophers/philosophers02.png?raw=true)

이런 식이 된다.

#### monitoring

철학자 쓰레드들이 각자 잘 먹고 잘 자는 동안, 메인프로세스에서는 무엇을 할까?? 바로 철학자들을 감시하는 역할을 수행한다. 철학자들끼리는 서로 대화를 하지 못하므로, 누군가 죽기 일보 직전이어도 포크를 양보하는 경우가 없다. 이 뜻은, 다른 철학자가 죽어도 죽었다는 신호를 받지 못한다는 뜻이다.

과제에서는 철학자가 한명이라도 죽게되면 프로그램을 종료하라고 요구하기 때문에, 메인프로세스에서 다른 쓰레드들의 동작을 종료시켜줄 필요가 있다. 그것이 종료시킬 시점까지 철학자들을 감시하는 이유다.

```C
void	ph_check_finish(t_arg *arg, t_philo *philo)
{
	int			i;
	long long	now;

	while (!arg->finish)
	{
		if ((arg->eat_times != 0) && (arg->philo_num == arg->finished_eat))
		{
			arg->finish = 1;
			break ;
		}
		i = 0;
		while (i < arg->philo_num)
		{
			now = get_time();
			if ((now - philo[i].last_eat_time) >= arg->time_to_die)
			{
				ph_stat_printf(arg, i, "died");
				arg->finish = 1;
				pthread_mutex_unlock(&(arg->print));
				break ;
			}
			i++;
		}
	}
}

ph_check_finish(arg, philo);
i = 0;
while (i < arg->philo_num)
	pthread_join(philo[i++].thread, NULL);
```

이 함수를 통해 철학자들을 감시하도록 하였다. 무한루프를 돌다가 끝내야하는 상황에 직면했을 때, 함수를 종료시키고, pthread_join을 통해 다른 쓰레드들의 자원을 모두 회수하며 프로그램을 종료시킨다.

#### thinking

분명 지금까지 먹고 자고만 말했는데 코드를 보면 "is thinking"이라는 문구가 적혀있다. 이것은 너무 많은 철학자들이 밥을 먹을 경우 소수의 철학자들이 밥을 먹을 때와 동일한 작업을 수행하지만 물리적인 한계로 인해 포크를 잡고 내려놓는 시간들이 밀리게 된다. 그러면서 조금씩 식사시간이 늦어지게 되고, 끝내 식사를 마치지 못한 철학자가 수명을 다해 죽는 경우가 발생한다.

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/philosophers/philosophers03.png?raw=true)

위의 경우는 무리해서 300명에게 밥을 먹이려 했던 경우이다. 2번 철학자의 경우 거의 생각만 하고 있는것을 볼 수 있다. 이때문에 usleep을 통해 "적당히" 시간을 보내주는게 중요하다. 너무 조금씩 시간을 보내 반복문을 많이 돌릴 경우 바로 시간이 밀리게 되고, 큰 수로 시간을 보내게 하면 주어진 식사시간보다 더 많이 시간을 보낼 수도 있기 때문이다.

지금까지 대략적으로 정리한 mandatory part였다. 모든 과정을 설명한 것이 아니므로 직접 구현해보면서 문제를 파악해보길 바란다. 정 모르겠다면 [깃허브](https://github.com/Chanwoong1/42Seoul/tree/master/Circle_3/philosophers)참고...

## Chapter 3

### Bonus part

보너스 항목은 프로세스와 세마포어를 이용한 철학자 구현으로, 그 중 많이 사용되는 함수들은 다음과 같다.

- sem_open
- sem_wait
- sem_post

처음 보는 함수는 세마포어 관련 함수이다. [세마포어]()는 교착상태에 대한 하나의 해법으로 멀티프로그래밍 환경에서 공유자원에 대해 접근 제어를 하는 방식으로, mutex와 달리 하나 이상의 진입 가능한 수단을 가진다. 이를 통해 프로세스 혹은 쓰레드를 조절할 수 있다.

#### logic

세마포어를 통한 철학자 문제는 포크가 철학자 앙 옆에 존재하는게 아닌 원탁 한 가운데 모여있게 된다. 이를 세마포어라고 하고, 포크의 수가 곧 세마포어의 수가 된다. 따라서 철학자의 수 대로 포크(세마포어)관리를 하면 되는 문제이다.

mandatory와 비슷하면서도 조금 다른게 프로세스와 쓰레드의 차이일 것이다. 쓰레드 관리에서는 메인프로세스가 모니터링을 하면서 철학자 감시를 했다면, 이번에는 메인프로세스는 자식프로세스가 종료되기를 기다릴 뿐이다. 모니터링은 철학자 내부에 존재하게 된다.

따라서 세마포어에서의 철학자는 다음과 같이 행동한다.

- 메인프로세스를 복제하여 철학자 생성
- 철학자 내부에서 쓰레드를 통한 자기 자신 모니터링 시작
- 철학자 내부 자식프로세스가 동작 수행

포크가 원탁 중앙에 위치해 있지만, 짝수번 철학자들을 먼저 대기해주는것은 동일하다. 원탁에 있는 포크들을 홀수번째 철학자들부터 모두 집게 만들면 포크를 한 손만 잡고 대기하는 교착상태를 해결할 수 있기 때문이다.

동작은 다음과 같다.

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/philosophers/philosophers_move02.gif?raw=true)

번갈아 가며 식사를 하는건 동일하지만, 포크를 잡는 방식이 약간 다르다. 양 옆에 포크가 있어 양쪽만 신경쓰면 되는 mandatory와 달리 누구나 원탁에서 포크를 가져갈 수 있기 때문에 무질서하게 포크를 집어가고 있다.

## 주의사항

mandatory와 bonus 모두 출력 형식이 엉키는 상황이 발생하면 안된다. 더 늦은 시간의 메세지가 빠른 시간의 메세지보다 먼저 출력되서는 안된다는 뜻이다. 이를 [데이터레이스](https://en.wikipedia.org/wiki/Race_condition#Data_race)라고 하며, 여러 프로세스 혹은 쓰레드가 공유된 데이터를 읽고 쓰는 작업을 할 때 잘못된 값을 읽거나 쓰게 되는 상황을 말한다. 이 문제 또한 뮤텍스와 세마포어로 처리할 수 있으므로 고민해보길 바란다.
