---
title: '[42seoul] so_long'
date: '2022-09-20'
tags: ['2nd_circle', 'C', '42seoul', 'MLX']
draft: false
summary: 귀여운 게임 만들기
layout: PostSimple
---

# so_long

- [Chapter 1](#chapter-1)
  - [Foreword](#foreword)
- [Chapter 2](#chapter-2)
  - [Goals](#goals)
- [Chapter 3](#chapter-3)
  - [Common Instructions](#common-instructions)
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

## Chapter 1

### Foreword

우리는 간단한 2D게임을 mlx라이브러리를 활용하여 만들어야 한다.

2D게임을 만들기 위해선, 맵 타일, 타일셋, 스프라이트, 스프라이트 시트 등이 필요하다.

[이곳](https://itch.io/game-assets/free/tag-sprites)에 그런게 있으니 참고하면 좋다. 다른 픽셀아트 사이트도 둘러보길 바란다.

## Chapter 2

### Goals

so_long을 통해 그래픽 디자인 프로젝트를 해볼 수 있고, 창 띄우기, 색상, 이벤트 설정하기, 모양 채우기 등과 같은 분야에서 능력이 향상 될 것이다.

## Chapter 3

### Common Instructions

mlx 라이브러리에 대해 알아야한다.

so_long에서 주로 사용하는 mlx라이브러리 함수는 다음과 같다.

- mlx_init
- mlx_new_window
- mlx_xpm_file_to_image
- mlx_hook
- mlx_loop
- mlx_string_put
