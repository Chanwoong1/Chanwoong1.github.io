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
  - [Mandatory part](#mandatory-part)
- [Chapter 3](#chapter-5)
  - [Bonus part](#bonus-part)
- [느낀 점](#느낀-점)

## Chapter 1

### Introduction

philosopher를 저번달에 끝낸 후, 벌써 한달 반이 지났다. 그 시간 동안 많은 일들이 있었는데.. [그것은...](https://chanwoong1.github.io/blog/woowacourse/precourse_main)

어찌됐든.. 저걸 하면서 짬짬히 미니쉘을 진행했다. 다행인지 불행인지 같이 하기로 한 팀원이 2서클이어서 기한에 대한 압박없이 진행할 수 있었다.

미니쉘 과제는 흔히 사용하는 터미널 쉘을 만드는 것이다. 자세히 말하자면.. [bash](https://www.gnu.org/software/bash/)라는 쉘을 만들게 된다. bash shell은 리눅스나 맥 OS에서 쓰이는 만큼 여러 방면에서 광범위하게 사용되고 있다.

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/minishll/minishell_chapter1_01.png?raw=true)

bash라는 명령어를 통해 bash shell을 실행해보면 저런식으로 실행이 된다. 이것과 같은 기능을 하도록 만들어보면 된다.

지난 2서클의 과제였던 [pipex](https://chanwoong1.github.io/blog/42seoul/[42seoul]pipex)의 업그레이드의 업그레이드 판이라고 할 수 있는데, pipex에서 진행했던 터미널을 통해 명령을 받아 bash의 명령을 실행하는 것이 당연하게도 미니쉘에서도 가능해야하기 때문이다.

흔히 미니쉘을 하면 파싱과 구현 부분으로 역할을 나누어서 과제를 수행한다고 들었다. 그런데 나와 팀원은 모두 pipex과제를 했기 때문에 signal 쪽으로는 아직 잘 몰라서 전반적으로 다 배워볼 겸 모든 부분을 같이 해보기로 했다.

## Chapter 2

### Common Instructions

이 과제는 libft 허용 과제이다. 따라서 Makefile을 이용한 컴파일 시, libft를 먼저 컴파일 해준 뒤, 과제 부분을 컴파일 해주면 된다.

다른 부분은 다른 과제와 비슷하다.

## Chapter 3

### Mandatory part
