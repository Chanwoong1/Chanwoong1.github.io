---
title: '[42seoul] pipex'
date: '2022-09-10'
tags: ['2nd_circle', 'C', '42seoul', 'pipe', 'bash']
draft: false
summary: c로 bash에서의 명령을 해보자!
layout: PostSimple
---

# pipex

- [Chapter 1](#chapter-1)
  - [Foreword](#foreword)
- [Chapter 2](#chapter-2)
  - [Common Instructions](#common-instructions)
- [Chapter 3](#chapter-3)
  - [Objectives](#objectives)
  - [진행 과정](#진행-과정)
- [Chapter 4](#chapter-4)
  - [Mandatory part](#mandatory-part)
    - [Gamerules](#game-rules)
    - [Example](#example)
    - [Push_swap program](#push_swap-program)
  - [진행 과정](#진행-과정)
    - [parsing](#parsing)
  - [fork](#fork)
- [Chapter 5](#chapter-5)
  - [Bonus part](#bonus-part)
- [느낀 점](#느낀-점)

## chapter 1

### Foreword

**UNIX**

대화식, 시분할처리 시스템용 운영체제이다. 오늘날의 유닉스 시스템은 다양한 운영체제를 만드는 데 활용되고 있다. 현재는 많이 줄어들었지만, 대표적으로 macOS가 남아있다.

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/pipex/unix01.svg?raw=true)

유닉스는 C언어로 작성되어, 다양한 플랫폼에 이식이 가능하고, 오픈 소스로 누구나 사용할 수 있다.

그리고 여러 사용자가 동시에 사용 가능하며, 여러 프로그램도 동시에 실행될 수 있고, 이를 관리하는 su(super user)가 존재한다.

유닉스의 구조는 **커널**, **쉘** 등으로 구분할 수 있다.

**커널(Kernel)**

- 유닉스 운영체제의 핵심
- 컴퓨터의 모든 자원을 관리하는 핵심 프로그램
- 파일 시스템 관리
- 장치 관리
- 프로세스 관리
- 메모리 관리

**쉘(Shell)**

- 사용자 인터페이스
- 사용자와 커널 사이의 중간자 역할을 담당함
- 명령어를 처리함
- 사용자가 입력한 명령어를 이해하여 실행함

## Chapter 2

### Common Instructions

다음과 같은 허용함수들이 주어진다.

- access
- open
- unlink
- close
- read
- write
- malloc
- waitpid
- wait
- free
- pipe
- dup
- dup2
- execve
- fork
- perror
- strerror
- exit

여러 함수들을 사용할 수 있는데 몇 가지 중요 함수들을 살펴보자면,

```C
#include <unistd.h>

int access(const char *path, int mode);
```

위 함수는 path가 mode옵션이 가능한지를 알려주는 함수이다. 가능하다면 0을 반환하고 아니라면 -1을 반환하게 된다. 이 함수는 pipex에서 중요하게 사용되는데, 그 이유는 우리가 흔히 사용하는 'ls' 'cat' 'cd'와 같은 쉘 명령어들은 어떤 경로 내에 파일로써 존재하고 있다. 우리는 c프로그램으로 쉘의 명령을 수행하기 위해 이 프로그램이 적합한 프로그램인지를 access로 판단해야한다.

```C
#include <sys/wait.h>

pid_t wait(int *stat_loc);

pid_t waitpid(pid_t pid, int *stat_loc, int options);
```

위 두 함수는 프로세스를 복제해서 자식 프로세스를 생성했을 때, 자식프로세스의 종료상태를 얻기 위해 사용되는 함수이다.

wait()함수는 아래와 같이 동작한다.

- 자식프로세스가 동작 중이면 호출 반환이 차단되기 때문에 상태를 얻어올 때 까지 대기
- wait() 함수 호출자가 시그널을 받을 때 까지 대기
- 자식프로세스가 종료된 상태라면 즉시 호출이 반환되어 상태를 얻음, 이 때 wait()함수는 자식프로세스의 프로세스id(pid_t)를 반환
- 자식프로세스가 없다면 호출이 즉시 반환되며, 에러값을 반환

stat_loc값에는 자식프로세스가 정상 종료되었을 때와 비정상 종료되었을 때의 반환값이 다르게 채워지기 때문에 상태를 알 수 있게 된다.

waitpid()함수는 pid에 따라 기다릴 자식프로세스에 대해 상세히 지정할 수 있다.

- pid == 1 : 임의의 자식 프로세스를 기다림
- pid > 0 : 프로세스 id가 pid인 자식 프로세스를 기다림
- pid < -1 : 프로세스 그룹 id가 pid의 절댓값과 같은 자식 프로세스를 기다림
- pid == 0 : waitpid를 호출한 프로세스의 프로세스 그룹 pid와 같은 프로세스 그룹 id를 가진 프로세스를 기다림

```C
#include <unistd.h>

int pipe(int fd[2]);
```

pipex 과제이기 때문에 pipe 함수는 굉장히 중요하다. 이 파이프를 통해 우리가 표준 입력이 아닌 다른 fd로 입력을 받은 것을 처리하여 다시 표준 출력이 아닌 또 다른 fd로 출력해줄 수 있게 된다.

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/pipex/pipe01.jpg?raw=true)

그럼 이런식의 파이프 활용을 할 수 있게 된다. (글씨 주의...)

```C
#include <unistd.h>

int dup(int fd);
int dup2(int fd, int fd2);
```

위 함수를 이용하여 다른 fd를 표준 입력과 표준 출력을 사용하는 것 처럼 사용할 수 있다. dup 함수는 fd로 전달받은 file descriptor를 복제하여 반환한다. dup이 반환하는 file descriptor는 가장 낮은 fd값이 되고, 오류 발생 시 -1을 반환한다.

dup2는 fd의 값을 fd2로 지정한다. 만약 fd2가 열려있다면 fd2를 닫은 후 복제가 된다. 오류 발생시 -1을 반환한다.

```C
#include <unistd.h>

int execve(const char *filename, char *const argv[], char *const envp[]);
```

살행가능한 파일인 filename의 실행코드를 현재 프로세스에 적재하여 기존의 실행코드와 교체 후 새로운 기능으로 실행된다. 즉 현재 실행되는 프로그램의 기능은 없어지고 filename프로그램을 메모리에 로딩해서 처음부터 실행한다.

execve 함수 호출 후에 일어나는 프로세스의 변화는 다음과 같다.

- signal 설정이 default로 변경됩니다.
- mmap(2)으로 생성 memory mapping이 보존되지 않습니다.
- shared memory 영역에 대한 access가 해제됩니다.
- message queue descriptor가 close됩니다.
- named semaphore가 close됩니다.
- timer가 보존되지 않습니다.
- opendir로 open된 directory stream이 close됩니다.
- memory lock이 보존되지 않습니다.
- atexit(3), on_exit(3)로 등록된 exit handler가 해제됩니다.
- 모든 thread가 사라집니다.
- aio_read(3)/aio_write(3)과 같은 async I/O 동작이 취소됩니다.
- 일반 file descriptor는 close되지 않습니다.

성공했을때의 반환값은 정상적으로 지정된 프로그램이 실행되기 때문에 받을 수 없다. 실패했을 경우에만 -1이 반환되며 상세한 오류는 errno 전역변수에 설정된다. 하지만 pipex 프로그램에서는 전역변수를 설정할 수 없기때문에 임의로 오류를 구분해주어야 한다.

```C
#include <unistd.h>

pid_t fork(void);
```

이 함수로 프로세스를 복제할 수 있다. fork 함수 이후로는 부모프로세스와 자식프로세스가 각자의 코드를 실행하게 된다. 그렇기때문에 자식프로세스를 구분해서 자식프로세스에서만 코드를 실행하도록 해야한다.

## Chapter 3

### Objectives

프로그램은 다음과 같이 실행될 것이다.

```
./pipex file1 cmd1 cmd2 file2
```

이 명령어는 다음과 같은 명령을 수행해야 한다

```
< file1 cmd1 | cmd2 > file2
```

### 진행 과정

#### parsing

먼저, execve에 들어갈 수 있도록 들어오는 인자를 파싱하는 것이 중요하다. 다행히 들어와야하는 인자들의 형태가 정의되어 있어 수고를 조금은 덜 수 있다.

파싱할 때 주의할 점은 execve에 명령어가 어떤 형식으로 들어가는지를 아는 것과, 환경변수를 사용해야한다는 점이다.

환경변수를 사용해서 'ls' 'cd' 'cat'과 같은 쉘 명령어들의 위치를 알아내야하기 때문에 중요한 과정이 될 것이다.

```C
int	main(int argc, char **argv, char **envp)
```

환경 변수는 이런식으로 받아오는 인자 뒤로 받을 수 있다.

```C
// test.c
#include <stdio.h>

int main(int argc, char **argv, char **envp)
{
	int	i;

	(void)argv;
	i = 0;
	while (envp[i])
	{
		printf("envp[%d] : %s\n", i, envp[i]);
		i++;
	}
}
```

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/pipex/pipex01.png?raw=true)

이런식으로 환경변수를 확인할 수 있는 간단한 프로그램을 실행해보면 개인별로 조금씩은 다르지만, "PATH="라고 시작하는 변수가 하나 보일 것이다. 우리는 이 변수를 찾아, ':'로 구분되어있는 것을 분리해주어 저장해야한다.

저장한 후, access함수를 이용해 입력된 인자의 cmd가 유효한 명령어인지 확인하는 과정을 거쳐야한다.

```C
char	*find_path(char **envp)
{
	int		i;
	char	*ret_path;

	i = 0;
	while (envp[i] != NULL)
	{
		if (ft_strncmp("PATH=", envp[i], 5) == 0)
		{
			ret_path = ft_strdup(envp[i] + 5);
			return (ret_path);
		}
		i++;
	}
	return (NULL);
}

char	*get_cmd_argv(char **path, char *cmd)
{
	int		i;
	int		fd;
	char	*path_cmd;
	char	*tmp;

	fd = access(cmd, X_OK);
	if (fd != -1)
		return (cmd);
	path_cmd = ft_strjoin("/", cmd);
	i = 0;
	while (path[i])
	{
		tmp = ft_strjoin(path[i], path_cmd);
		fd = access(tmp, X_OK);
		if (fd != -1)
		{
			free(path_cmd);
			return (tmp);
		}
		close(fd);
		free(tmp);
		i++;
	}
	free(path_cmd);
	return (NULL);
}
```

첫 번째의 함수를 통해 "PATH="를 찾아준 뒤, ':'로 분할 해준 다음 두번째 함수를 실행한다. ':'로 분할된 각각의 경로에 '/'와 cmd를 붙여주어 그 경로로 갔을때 파일이 존재하는지, 존재한다면 실행 가능한지를 access를 통해 확인하게 된다.

예를 들어 cmd에 'ls'가 들어온 경우, 환경변수 중 하나인 "/usr/bin"과 합쳐주어 "/usr/bin/ls"를 만들어 준 다음 access에 인자로 넣어주면 저 경로가 실행 가능한 파일인지 확인해주는 형식이다.

#### fork

파싱을 다 끝냈다면, 명령어를 처리하는 pipe 구조를 만들어 주어야 한다. 명령어 두개를 이어주기 위해서는 파이프 하나가 필요하게 된다. (위의 그림 참고)

```C
static void	sub_dup2(int zero, int first)
{
	dup2(zero, 0);
	dup2(first, 1);
}

void	child(t_env p)
{
	p.pid = fork();
	if (!p.pid)
	{
		if (p.idx == 0)
			sub_dup2(p.i_fd, p.pipe_fd[1]);
		else if (p.idx == 1)
			sub_dup2(p.pipe_fd[0], p.o_fd);
		close_pipes(&p);
		if (execve(p.cmd[p.idx].path, p.cmd[p.idx].cmd, p.envp) < 0)
			exit_perror(ERR_CMD, p.result);
	}
}

int	main(int argc, char **argv, char **envp)
{
	t_env	info;

	if (argc != 5)
		usage();
	init_info(&info, argc, argv, envp);
	parse_cmd(&info, argc, argv);
	info.idx = -1;
	while (++(info.idx) < 2)
		child(info);
	close_pipes(&info);
	waitpid(-1, NULL, 0);
	parent_free(&info);
	return (info.result);
}
```

이것이 pipex의 구조가 된다. 명령어를 두번 실행해주어야 하기 때문에 chile함수를 두번 실행한다. 유닉스 터미널에서 명령어를 실행하면 프로세스가 하나 실행되는 것 처럼, c 프로그램에서도 프로세스가 하나 실행되더라도 자식 프로세스를 복제해서 실행하는 것으로 구현했다. 이런식으로 구현하게 되면, bonus part의 다중 파이프 구현이 한 층 더 쉬워진다.

child 함수 내부에서는 프로세스를 복제해서 자식프로세스를 만들어주게 된다. 자식프로세스는 pid가 0이 되어 if문을 실행하게 되고, if문 안에서 execve를 실행하게 된다. 여기서 주의할 점은 dup2를 사용할 때, 헷갈리지 않도록 복제를 해주어야 한다.

if문 내부의 조건문을 이용해 idx별로 dup2를 수행해야 하는 부분을 나누어 주었다. cmd1을 실행할 때는 infile_fd와 pipe[1]의 fd를 사용해서 명령을 처리하지만, cmd2를 실행할 때는 pipe[0]의 fd와 outfile_fd를 사용해서 명령을 처리하기 때문이다.

### 주의사항

- 에러로 인해 프로그램이 종료되어야 한다면, 에러 상황에 맞는 에러메세지를 출력하고, exit함수에 입력값을 달리 하여 쉘 명령어를 수행할 때와 같은 에러코드를 반환하게 해야한다.

- 'sed', 'awk'와 같은 명령어는 명령어 중간에 ' 혹은 "가 들어있다. 이 때문에 공백으로만 split을 한다면 이 부분에서 틀리게 될 것이다. 이 부분을 처리하는 방법을 생각해보길 바란다.

## Chapter 4

### Bonus part

보너스 부분은 here_doc의 구현과 다중 커멘드의 처리다. 다중 커멘드는 mandatory part에서의 구조를 약간만 변형하면 쉽게 구현할 수 있기 때문에 설명을 생략한다. here_doc의 경우 기존에 구현해야했던 쉘 명령어인

```
< infile cmd1 | cmd2 > outfile
```

이 아닌

```
./pipex here_doc LIMITER cmd cmd1 file

cmd << heredoc_limiter | cmd1 >> outfile
```

로 구현해야 한다.

여기서 here_doc이란 먼저 infile이 주어지지 않은 상태에서 직접 터미널에서 입력을 받아야한다. 입력이 끝나면 미리 정의한 LIMITER를 입력하여 끝났다는 메시지를 보내야한다. heredoc을 구현할 경우, 리다이렉션인 '>' 가 아닌 '>>'임을 볼 수 있는데, 이것은 outfile이라는 파일이 이미 존재할 경우, 새로 만들지 않고 기존의 outfile에 이어서 쓰겠다는 뜻이다.

```C
void	here_doc(char *argv, t_env *info)
{
	int		file;
	char	*line;

	unlink(".heredoc_tmp");
	file = open(".heredoc_tmp", O_CREAT | O_WRONLY | O_TRUNC, 0000644);
	if (file < 0)
		exit_perror(ERR_HEREDOC, info->result);
	while (1)
	{
		write(1, "heredoc> ", 9);
		line = get_next_line(0);
		if (!line)
			exit(info->result);
		if (!ft_strncmp(argv, line, ft_strlen(argv)) \
			&& ft_strlen(argv) == (ft_strlen(line) - 1))
			break ;
		write(file, line, ft_strlen(line));
		free(line);
	}
	free(line);
	close(file);
}

void	get_fd(t_env *info, int argc, char **argv)
{
	if (!ft_strncmp(argv[1], "here_doc", 8))
	{
		info->here_doc = 1;
		here_doc(argv[2], info);
		info->i_fd = open(".heredoc_tmp", O_RDONLY);
		if (info->i_fd < 0)
		{
			unlink(".heredoc_tmp");
			exit_perror(ERR_HEREDOC, info->result);
		}
	}
	else
	{
		info->i_fd = open(argv[1], O_RDONLY);
		if (info->i_fd < 0)
			perror("not valid infile");
	}
	if (info->here_doc)
		info->o_fd = open(argv[argc - 1], O_RDWR | O_APPEND | O_CREAT, 0644);
	else
		info->o_fd = open(argv[argc - 1], O_RDWR | O_CREAT | O_TRUNC, 0644);
	if (info->o_fd < 0)
		exit_perror("not valid outfile", 1);
}
```

먼저, "here_doc"이 인자에 포함되어 있는지 확인해야한다. 만약 있다면 표준입력을 받는 문서를 만들어야하고 아니라면 mandatory part처럼 진행하면 된다. "here_doc"이 발견되었다면, 따로 처리를 하는 함수를 만들어주어야 한다. 함수는 get_next_line을 사용해서 표준입력을 받는 형식으로 쉽게 구현할 수 있다. 마지막으로 "here_doc"의 유무에 따라 outfile의 open형식이 달라지므로 그 부분을 처리해주면 된다.

## 느낀 점

pipex 과제는 처음 진행할 때 감이 잘 잡히지 않고 매우 어렵게만 느껴졌다. 처음 보는 함수들도 많았고, 프로세스에 대한 개념이 부족한 상태여서 더 어렵게 느껴졌던것 같다. 그래도 C언어와 shell에 대해 한층 더 알아갈 수 있는 시간이 된 것 같다. (하지만 다시 과제를 한다면 minitalk을 고를것이다...)
