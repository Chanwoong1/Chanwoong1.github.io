---
title: '[42seoul] Netpractice'
date: '2022-11-27'
tags: ['4th_circle', 'Network', 'ip', '42seoul']
draft: false
summary: 네트워크 하나도 모르는 사람의 넷프랙티스 도전기
layout: PostSimple
---

# Netpractice

- [Chapter 1](#chapter-1)
  - [Introduction](#introduction)
- [Chapter 2](#chapter-2)
  - [Network](#network)
- [Chapter 3](#chapter-3)
  - [Process](#process)
    - [prompt](#prompt)
    - [history](#history)
    - [signal](#signal)
    - [parsing](#parsing)
    - [excuting](#excuting)
- [느낀 점](#느낀-점)

## Chapter 1

### Introduce

4서클 과제 중 Netpractice라는 과제를 마주했다. 주변에서 들리는 소문에 의하면 빡세게 한다면 2~3일 정도면 충분하다는 말을 듣고 호기롭게 도전해보았으나... 아차차.. 내가 네트워크에 대해 아무것도 모르고 있었다는 것을 다시금 깨닫게 되었다.
과제를 등록하면, 첨부파일이 하나 있는데 압축해제해서 index.html을 실행하면 다음과 같은 화면들이 나온다.

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/netpractice/netpractice_chapter1_00.png?raw=true)

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/netpractice/netpractice_chapter1_01.png?raw=true)

도대체 이게 무엇인가... 싶었다. 보아하니 연결을 하라고는 하는데, ip 주소에 대한 기본적인 이해가 없어서 어떤식으로 풀어야하는지 잘 몰랐다. 그래서 네트워크에 대한 기초 개념을 ip주소에 관한 내용들 위주로 먼저 정리했다.

## Chapter2

### Network

- 네트워크? 인터넷?
  
  먼저, 컴퓨터 네트워크라고하면 이게 무엇인지 다들 대략적으로 알고는 있을것이다. 하지만 네트워크에 대해 설명해보라 하면 어떤 식으로 설명해야할지 모르는 경우가 있는데, 내가 그런 경우였다.

  컴퓨터 네트워크란 **컴퓨터 간의 연결**로, '2'개의 컴퓨터만 연결되어 있어도 그것을 네트워크라고 부를 수 있다.

  이런 네트워크를 모두 연결해서 하나의 거대한 네트워크로 만들어 놓은것이 **인터넷**이다.

- 패킷

  네트워크나 인터넷에서 데이터를 주고받는 규칙에 사용한다.

  패킷은 네트워크를 통해 전송되는 데이터의 작은 조각을 의미하는데, 데이터를 작은 조각으로 나누는 데에는 그만한 이유가 있다.

  데이터가 크면 네트워크에서 대역폭을 너무 많이 차지해서 다른 패킷의 흐름을 막을 수 있기 때문에 데이터를 작은 조각으로 나누어 전송한다. 좁은 통로로 트럭이 들어가는 것과 오토바이가 들어가는 것을 생각해보면 된다.

  패킷에는 번호가 존재해서, 작은 조각이 순서에 상관없이 재각각 발송되어도, 받았을 때 번호를 통해 결합하여 원래의 모습이 되게한다.

- 비트 (0과 1로 나타내는 최소 단위)
  
  비트는 네트워크에 데이터를 전송하는 경우 전자신호로 변환되어 전송된다.

- 네트워크의 범위
  - LAN - 특정 지역이나 건물 등을 범위로 하는 네트워크
  - WAN - 지리적으로 넓은 범위에 구축되는 네트워크

