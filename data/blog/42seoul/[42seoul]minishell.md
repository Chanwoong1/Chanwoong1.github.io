---
title: '[42seoul] minishell'
date: '2022-11-24'
tags: ['3rd_circle', 'C', '42seoul', 'minishell', 'bash']
draft: false
summary: 미니쉘은 초콜릿이지
layout: PostSimple
---

# minishell

- [Chapter 1](#chapter-1)
  - [Introduction](#introduction)
- [Chapter 2](#chapter-2)
  - [Common Instructions](#common-instructions)
- [Chapter 3](#chapter-3)
  - [Process](#process)
    - [prompt](#prompt)
    - [history](#history)
    - [signal](#signal)
    - [parsing](#parsing)
    - [excuting](#excuting)
- [느낀 점](#느낀-점)

## Chapter 1

### Introduction

philosopher를 저번달에 끝낸 후, 벌써 한달 반이 지났다. 그 시간 동안 많은 일들이 있었는데.. [그것은...](https://chanwoong1.github.io/blog/woowacourse/precourse_main)

어찌됐든.. 저걸 하면서 짬짬히 미니쉘을 진행했다. 다행인지 불행인지 같이 하기로 한 팀원이 2서클이어서 기한에 대한 압박없이 진행할 수 있었다.

미니쉘 과제는 흔히 사용하는 터미널 쉘을 만드는 것이다. 자세히 말하자면.. [bash](https://www.gnu.org/software/bash/)라는 쉘을 만들게 된다. 쉘은 사용자와 커널 사이에서 명령어들을 해석해 전달하는 명령어 해석기 기능을 수행하며, 많은 종류의 쉘이 존재한다. 그 중에서도 bash shell은 리눅스나 맥 OS에서 쓰이는 만큼 여러 방면에서 광범위하게 사용되고 있다.

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/minishell/minishell_chapter1_01.png?raw=true)

bash라는 명령어를 통해 bash shell을 실행해보면 저런식으로 실행이 된다. 이것과 같은 기능을 하도록 만들어보면 된다.

지난 2서클의 과제였던 [pipex](https://chanwoong1.github.io/blog/42seoul/[42seoul]pipex)의 업그레이드의 업그레이드 판이라고 할 수 있는데, pipex에서 진행했던 터미널을 통해 명령을 받아 bash의 명령을 실행하는 것이 당연하게도 미니쉘에서도 가능해야하기 때문이다.

흔히 미니쉘을 하면 파싱과 구현 부분으로 역할을 나누어서 과제를 수행한다고 들었다. 그런데 나와 팀원은 모두 pipex과제를 했기 때문에 signal 쪽으로는 아직 잘 몰라서 전반적으로 다 배워볼 겸 모든 부분을 같이 해보기로 했다.

## Chapter 2

### Common Instructions

이 과제는 libft 허용 과제이다. 따라서 Makefile을 이용한 컴파일 시, libft를 먼저 컴파일 해준 뒤, 과제 부분을 컴파일 해주면 된다.

다른 부분은 다른 과제와 비슷하다.

## Chapter 3

### Process

#### prompt

먼저, 미니쉘을 수행하기 전, prompt를 꾸며주었다. shell을 구현하라고 했지 꾸미지 말고 그대로 따라하라고 하지는 않았기에.. 구현하면서 앞으로 계속 보게 될 실행화면이 적적하면 좀 슬플것 같았다.

그리고, 명령을 받기 위한 첫 관문이다 보니, 터미널 구문을 읽어줄 준비를 해야한다. 그것 또한 만들어보았다. 이때, 구문을 받아주는 구조체의 구조를 잘 생각해봐야 한다. 다들 미니쉘은 파싱이 중요하다고 말을 하기 때문이다.

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/minishell/minishell_chapter3_01.png?raw=true)

짜잔! 프롬프트를 이런식으로 작성해보았다. 사실 이건 독창적인 아이디어는 아니고, 정보의 바다에서 흘러흘러 탐색한 포멧을 가지고 와서 변경해주었다. 테마를 주황색으로 정했는데, 그 이유는 내가 '건'이고 팀원이 '리'여서 두 코알리숑의 색을 합쳐보면 주황색이기 때문에.. ㅋㅋ 어쨌든 좀 단순하지만 막상 만들어놓고 보니 꽤 괜찮은것 같기도 했다.

여기서 써볼만한건 [Unicode box](https://www.w3.org/TR/xml-entity-names/025.html)이다. 그동안 다른 사람들이 터미널에서 멋있게 무언가를 꾸미고 있을 때, 저게 뭔가 싶었는데.. 알고보니 한땀한땀 장인정신으로 꾸미고 있었던 것이다.. 존경..

```C
printf("%s║   ██║   ██║████████║████████║██╔██╗██║██║ ████╗██████╗    ███"\
		"█████╗████████║██████╗  ██║      ██║        ║%s\n", orange, white);
```

이런식으로 한 줄씩 찍어주었다.

여기서, 환경변수를 이용해서 현재 사용자와 현재 위치를 찾을 수 있다. 이것을 readline 함수에 인자로 넣어주게 되면, shell에서 동작하는것 처럼 명령어 받는곳에 경로를 찍어줄 수 있다.

```C
typedef struct s_string {
	char		*text;
	int			*f_append(t_string *str, const char *str2);
}	t_string;

char	*get_environ_value(const char *env_key, char **envp)
{
	size_t	i;
	char	*target;

	i = 0;
	if (env_key == NULL || envp == NULL)
		return (NULL);
	target = NULL;
	while (envp[i] != NULL)
	{
		if (ft_strncmp(envp[i], env_key, ft_strlen(env_key)) == 0)
			return (ft_strchr(envp[i], '=') + 1);
		i++;
	}
	return (target);
}

char	*readline_prompt(t_shell_config *config, t_history *history)
{
	t_string	*prompt;
	char		*line;

	line = NULL;
	prompt = new_string(64);
	prompt->f_append(prompt, "\033[38;5;208m");
	prompt->f_append(prompt, get_environ_value("USER", *config->envp));
	prompt->f_append(prompt, ":");
	prompt->f_append(prompt, get_environ_value("PWD", *config->envp));
	prompt->f_replace_all(prompt, \
			get_environ_value("HOME", *config->envp), "~");
	prompt->f_append(prompt, "\033[0m");
	prompt->f_append(prompt, "$ ");
	line = readline(prompt->text);
	delete_string(&prompt);
	make_history(line, history);
	return (line);
}
```

이런식으로 readline 전에 환경변수를 찾아주는 작업을 수행한다.

### history

미니쉘의 허용함수 목록 중에서는 add_history 라는 함수가 존재한다. 이것은 터미널 명령을 실행한 뒤, 위 아래 방향키를 통해 기억해놓은 이전 명령어들을 다시 실행할 수 있도록 한다.

사용법은 매우 간단하다. 그저 readline 함수를 통해 입력받은 명령어를 넣어주면 된다.

```C
add_history(line);
```

다음은 직접 터미널에 'history'라고 입력했을 때의 경우이다.

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/minishell/minishell_chapter3_02.png?raw=true)

이런식으로 'history'입력 시, bash 실행 이후 입력한 명령어들이 나오도록 하는 기능을 만들어 보았다.

history를 위한 구조체를 따로 만들어주고, 명령어가 들어올 때마다 양식을 맞추어 저장해주었다.

```C
void	load_history(t_history	*history)
{
	history->history = ft_strdup("    ");
	history->idx = 1;
}

void	make_history(char *line, t_history *history)
{
	if (line)
	{
		if (history->idx != 1)
			history->history = ft_strjoin(history->history, "    ");
		history->history = \
			ft_strjoin(history->history, ft_itoa(history->idx));
		history->history = \
			ft_strjoin_all(4, history->history, " ", line, "\n");
		history->idx++;
	}
}
```

이런식으로 간단하게 만들어줄 수 있었다.

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/minishell/minishell_chapter3_03.png?raw=true)

### signal

signal은 말 그대로 신호를 주고 받는다는 의미이다. 이 signal은 운영체제 내부에서 미리 지정되어 사용할 수 있다. 이런 시그널은 우리가 키보드 입력을 통해 쉘에 전달할 수도 있는데, 그 중 대표적인 것들이 'ctrl + C', 'ctrl + \' 등이 있다. 이런 시그널들은 각각 'SIGINT', 'SIGQUIT'으로 미리 지정되어 있다. 더 많은 시그널들은 'kill -l' 명령어를 터미널에 입력하면 찾아볼 수 있다.

```C
void (*)(int)signal(int sig, void (*handler)(int));
```

시그널들은 C언어에서는 signal함수를 통해 처리해줄 수 있다. 이 함수는 기존 정의된 signal들을 어떤 방식으로 처리할 지 선택 가능하다. 기존 방식 그대로 처리할 지, 무시할 지, 아니면 새롭게 정의한 행동을 수행하도록 할지 정해줄 수 있다.

이 함수를 통해 shell에서 요구하는 signal의 행동을 지정해주면 된다.

예를 들어 'SIGQUIT'의 경우, 문자 그대로 종료한다는 의미인데, 프로세스를 종료시킨 뒤 코어를 덤프하는 역할을 수행한다. 하지만 bash shell에서는 빈 프롬프트에서 'SIGQUIT' 입력 시 아무 일도 일어나지 않아야 하기 때문에 아래와 같이 설정해줄 수 있다.

```C
signal(SIGQUIT, SIG_IGN);
```

'SIGQUIT'을 입력받을 때, 'SIG_IGN'의 행동을 수행하도록 변경해주었다. 'SIG_IGN'는 해당 시그널을 무시하도록 한다.

### parsing

흔히들 미니쉘의 꽃은 파싱이라고 한다. 파싱을 잘 해야 미니쉘이 수월해진다고 할 만큼 중요한 부분이다. readline을 통해 받아온 명령어를 [Lexical Analysis][https://en.wikipedia.org/wiki/lexical_analysis]를 통해 어휘를 분석하여 토큰을 생성해준다. 이 토큰을 통해 파싱을 해주는 식으로 진행하였다.

프로그래밍에서 어휘란 명령어의 구문 분석에서 'cat'이란 명령어를 입력 시, 각각 ['c', 'a', 't']로 한 문자씩 본다면 명령어로써 의미가 없지만, 합쳐주면 명령어로써의 의미를 갖는 것처럼 명령어에서 의미를 갖는 항목들을 검출해서 토큰을 생성한다.

![](https://miro.medium.com/max/4800/1*jE_mI7oipb9U-Pz5vTvIUA.webp)

위와 같은 과정을 거치게 되는데, Lexer를 통해 토큰을 생성한 뒤 구조체에 보관 후, Parser에서 Tree구조를 만들 때 사용하게 된다.

```C
typedef enum e_token_type {
	E_TYPE_DOUBLE_AMPERSAND,
	E_TYPE_DOUBLE_PIPE,
	E_TYPE_PIPE,
	E_TYPE_BRACKET,
	E_TYPE_SIMPLE_CMD,
	E_TYPE_REDIR_GREATER,
	E_TYPE_REDIR_LESS,
	E_TYPE_REDIR_APPEND,
	E_TYPE_REDIR_HEREDOC,
	E_TYPE_REDIR_ARG,
	E_TYPE_WHITESPACE,
	E_TYPE_DEFAULT,
	E_TYPE_REDIRECT,
	E_TYPE_REDIR_ARG_HEREDOC_QUOTED,
	E_TYPE_AMPERSAND
}	t_token_type;

typedef struct s_token	t_token;
```

이런 식으로 토큰을 정의해주고, 들어오는 값에 따라 토큰이 달라지도록 한다. 토큰화한 명령어는 [추상 구문 트리](https://en.wikipedia.org/wiki/Abstract_syntax_tree)를 통해 파싱을 진행한다.

전체적인 실행흐름은

- 명령어 처리를 위한 자식프로세스 생성.
- 파이프가 있는지 검사.
- 파이프가 없다면 자식 프로세스에서 트리를 순회하면서 해당 명령어에 맞는 함수를 실행.
- 파이프가 있다면 다시 fork를 하여 자식 프로세스에서 전위순회하면서 계속 파이프가 있는지 확인을 한다.

개인적으로 파싱 부분은 42에서 미니쉘까지는 무조건 해야한다고 생각하게끔 만드는 작업이었다. linked-list를 사용을 굉장히 많이 해야할텐데, 머리가 많이 아플것이다. 그래도 꼭 해보길 바란다.

### excuting

실행 단계에서는 pipex를 수행하고 와서 비교적 수월하게 진행할 수 있었다. 파싱 부분과 결합하면, 파이프가 나오는 부분마다 프로세스를 복제해서 파이프라인 다음부터 탐색을 하고, 명령어를 실행하는 식으로 진행해주었다.

실행 단계를 간략하게 보면 -> [pipex](https://chanwoong1.github.io/blog/42seoul/[42seoul]pipex) 참고

# 느낀 점

과연 말로만 들었던 엄청난 난이도의 과제다웠다. 하위 서클에서 배웠던 모든것을 써야한다고 생각해도 무방할 정도로 해야할 것이 많았고, 배울것도 많았다. 그리고 과연 42를 하지 않았다면 쉘을 만들어볼 생각을 했을까.. 싶을정도로 엄두가 안났던 과제였다.

이 과제만을 위해 42로 왔다 해도 반쯤은 납득할만한 과제라고 생각했다. 물론 상위 과제들이 난이도 면에서는 더 어려울 수 있겠지만, 본과정에서 처음 해본 팀픙이었기 때문에 끝까지 과제를 완료할 수 있었다.
