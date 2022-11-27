---
title: '[42seoul] Netpractice'
date: '2022-11-27'
tags: ['4th_circle', 'Network', 'ip', '42seoul']
draft: false
summary: 네트워크 하나도 모르는 사람의 Netpractice 도전기
layout: PostSimple
---

# Netpractice

- [Chapter 1](#chapter-1)
  - [Introduction](#introduction)
- [Chapter 2](#chapter-2)
  - [Network](#network)
  - [IP](#ip)
  - [서브넷](#서브넷)
  - [서브넷 마스크](#서브넷-마스크)
- [Chapter 3](#chapter-3)
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

  ![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/netpractice/netpractice01.drawio.png?raw=true)

  WAN에 SK, KT, U+ 등 인터넷 사업자들이 존재하고, LAN으로 인터넷을 제공하는 형식이다.

- 소규모 네트워크 구성

  ![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/netpractice/netpractice02.drawio.png?raw=true)

  - DMZ (외부에 공개하기 위한 네트워크)
    - 웹 사이트를 불특정 다수에게 -> 웹 서버 공개
    - 외부 사용자와 메일 송/수신 -> 메일 서버 공개
    - 외부에서 도메인 이름으로 회사서버 접속 -> DNS 서버 공개

- protocol

  통신하기 위한 규칙으로, OSI 모델과 TCP/IP 모델이 있다.

  ![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/netpractice/netpractice02.drawio.png?raw=true)

  각 계층에는 프로토콜이 존재한다

### IP

어떤 네트워크의 어떤 컴퓨터인지 구분할 수 있도록 하는 주소.

IP주소를 목적지로 데이터 통신을 하려면 라우팅(어떤 경로로 보낼지 결정)을 해야한다. -> 라우터 사용

- IPv4

  IP의 한 버전으로 32비트로 구성된다. 약 43억개의 주소를 생성할 수 있다.

- IPv6

  기존 사용하던 IPv4의 주소가 인터넷 보급의 증대로 인해 부족해지면서, 새로 개발된 IP 주소이다.

  128비트로 구성되어 대략 340간(340조의 1조배의 1조배 - 사실상 무한...)개의 주소를 생성할 수 있다.

넷프랙티스에서는 IPv4만 다루고 있다. 따라서 아래의 글도 IPv4를 기본으로 서술한다.

IP주소는 8비트씩 쪼개서 표현할 수 있다. - [ xxxxxxxx. xxxxxxxx. xxxxxxxx. xxxxxxxx ] 이 경우, 8비트씩 쪼갠 주소를 옥텟이라고 부르며, 첫 8자리가 1옥텟, 마지막 8자리가 4옥텟이 된다.

또한, IP주소는 비트로 나타내므로, 10진수로 고쳐서 표현할 수 있다.

따라서 [ 00000001.11111111.11111111.11111111 ] 과 [ 1.255.255.255 ]는 같은 IP이다

- IP 주소 클래스

  네트워크 ID를 크게 만들거나 호스트 ID를 작게 만들어서 네트워크의 크기를 조절할 수 있다. A ~ E 클래스가 있으며, 일반적으로 A ~ C 클래스만 사용할 수 있다.

  네트워크 ID를 나타내는 주솟값을 N, 호스트 ID를 나타내는 주솟값을 H라고 한다면, A ~ C 클래스의 주솟값은 다음과 같이 표현할 수 있다.

  - A 클래스 - [ NNNNNNNN. HHHHHHHH. HHHHHHHH. HHHHHHHH ]

    - A 클래스의 IP 주솟값 범위

    [1.0.0.0 ~ 9.255.255.255], [11.0.0.0 ~ 126.255.255.255]

  - B 클래스 - [ NNNNNNNN. NNNNNNNN. HHHHHHHH. HHHHHHHH ]

    - B 클래스의 IP 주솟값 범위

    [128.0.0.0 ~ 172.15.255.255], [172.32.0.0 ~ 191.167.255.255]

  - C 클래스 - [ NNNNNNNN. NNNNNNNN. NNNNNNNN. HHHHHHHH ]

    - C 클래스의 IP 주솟값 범위

    [192.0.0.0 ~ 192.167.255.255], [192.169.0.0 ~ 223.255.255.255]

- 사설 IP

  가상 IP라고도 불린다.

  와이파이, 학교 공용 컴퓨터 등을 보면 아이피가 거의 사설 아이피인것을 확인 할 수 있다. 그 외에도 공유기를 사용하는 가정용 컴퓨터에서도 심심치 않게 볼 수 있다. 이 사설 IP는 국제 표준에 의해 특수목적으로 예약된 IP이므로 내부 충돌을 빼고는 충돌할 염려는 안해도 된다.

  과제에서는 사설 IP로 연결을 시도할 경우, 오답으로 처리한다. 그러므로 사설 IP의 범위도 알고가자.

  - [10.0.0.0 ~ 10.255.255.255] (A 클래스 사설 IP 대역)
  - [172.16.0.0 ~ 172.31.255.255] (B 클래스 사설 IP 대역)
  - [192.168.0.0 ~ 192.168.255.255] (C 클래스 사설 IP 대역)

- 네트워크 주소 & 브로드캐스트 주소

  - 네트워크 주소 - 4옥텟(호스트ID)가 10진수로 0인 경우
  - 브로드캐스트 주소 - 호스트ID가 10진수로 255인 경우

  네트워크에 있는 컴퓨터나 장비 모두에게 한번에 데이터를 전송하는데 사용하는 IP주소이다.

  예를 들어, [192.168.1.1 ~ 192.168.1.6] 범위의 IP주소는 192.168.1.0(네트워크 주소)의 네트워크에 있다고 할 수 있다.

  네트워크 주소와 브로드캐스트 주소는 자신의 IP주소로 사용할 수 없다.

### 서브넷

서브넷은 네트워크를 분할해서 새로운 네트워크를 만드는 것을 말한다.

앞서 말했던 IPv4의 주소는 43억개로 현재 부족한 상태이다. 그런데, A클래스의 경우 1옥텟만 네트워크 ID를 사용하고 나머지 옥텟은 호스트 ID로 사용하므로 1677만 7214개의 네트워크가 하나의 브로드캐스트 주솟값을 사용하게 된다. 이 경우 수많은 컴퓨터가 한번에 패킷을 전송하게 된다면, 네트워크가 정체되어 지연될 수 있다. 따라서 서브넷을 사용하여 더 많은 네트워크를 만들어 IP주소를 더 효과적으로 사용할 수 있도록 하는것이다.

그렇다면 서브넷을 통해 네트워크가 세분화된다면, 어떻게 표현할 것인지 알아야만 한다.

현재 클래스는 옥텟별로 네트워크와 호스트 ID가 나뉘어 있다. 서브넷은 이 네트워크와 호스트 ID를 늘리거나 줄이는 방식으로 사용하게 된다.

따라서 네트워크 ID를 나타내는 주솟값을 N, 호스트 ID를 나타내는 주솟값을 H, 서브넷을 S라고 한다면 아래와 같이 네트워크를 나눌 수 있게 된다.

C클래스의 경우, 호스트 ID를 사용하여 하나의 네트워크에 255개의 주소를 포함할 수 있다. 그런데, 서브넷을 활용한다면 이것을 반으로 나누어 각각 [127, 127]개의 주소를 가지는 두 개의 네트워크로 나눌 수 있다.

- 서브넷 사용전 C 클래스 [NNNNNNNN. NNNNNNNN. NNNNNNNN. HHHHHHHH]

- 서브넷 사용 후 C 클래스 [NNNNNNNN. NNNNNNNN. NNNNNNNN. SHHHHHHH]

두 IP 주소의 차이를 보면, 4옥텟 첫 부분의 H가 S로 바뀐것을 알 수 있다. 이렇게 서브넷으로 변환하면 S까지 네트워크 ID에 포함되어 나머지 7개의 호스트 ID만으로 주소를 구성하게 된다.

그럼 변환된 호스트 ID의 범위는 [0000000 ~ 1111111] 로, 10진수로 변환 시 [0 ~ 127] 이 된다.

이제 대략 감이 오는 사람들도 있을것이다. S기 0 또는 1이므로 네트워크가 2개가 되고, 두개의 네트워크는 각각 [0 ~ 127] 범위의 주소를 가지게 된다.

이런식으로 상황에 맞게 서브넷을 사용하여 네트워크를 더 많이 보유할 수 있게 된다.

#### 서브넷 마스크

앞서 서브넷에 대해 알게 되었다면, 한가지 궁금증이 생길 것이다. 서브넷을 어떻게 구분해야하는지 모른다는 것이다. 서브넷을 안한 IP와 서브넷을 한 IP는 기본적으로 똑같이 생겼기 때문에 이것을 구분시켜줄 수 있도록 하나의 장치를 고안해야만 했다. 그것이 바로 서브넷 마스크이다.

앞서 C 클래스에 서브넷을 만들어주었다. 그러면 네트워크 ID는 총 25개의 비트를 사용하게 되고, 호스트 ID는 7개의 비트를 사용하게 된다.

이것을 서브넷 마스크로 표현하면 [ 11111111.11111111.11111111.10000000 ]으로 표현하여, 값이 1인 자리가 네트워크 ID, 0인 자리는 호스트 ID가 되는 것이다. 이번 과제의 문제를 해결하려면 꼭 알아야만 하는 부분이다.

서브넷 마스크는 표현법이 여러가지 존재한다. 2진법으로도 표현가능하고, 10진법 및 CIDR 표기법이 있다.

아래의 표현들은 모두 같은 서브넷 마스크이다.

- 2진법 : [ 11111111.11111111.11111111.10000000 ]
- 10진법 : [ 255.255.255.128 ]
- CIDR : /25

여기서 CIDR은 앞의 네트워크 ID인 1의 갯수를 말한다.

## Chapter 3

이제 문제를 풀어보자. 그전에 하나만 더 알고 넘어가자. 바로 스위치와 라우터라는 것이다. 스위치는 컴퓨터가 로컬로 연결되도록 돕는 기계이다. 라우터는 네트워크와 네트워크간 연결을 볻는 기계이다. 이 과제에서는 딱 이정도만 알면 될 것이다.

### Level 1

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/netpractice/netpractice_chapter1_01.png?raw=true)

앞서 보았던 문제이다. 이제는 네트워크에 대해 기초는 알고 있으니 한번 시도해보자.

<details>
<summary>1번 해설</summary>
<div markdown="1">

1번은 기기와 기기간의 연결이다. 기기는 같은 네트워크 주소를 사용해야하므로 고정되어있는 값의 근처 값으로 연결시켜준다.

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/netpractice/netpractice_chapter3_00.png?raw=true)

A1과 B1은 B1의 ip가 고정되어 있으므로 B1의 네트워크를 입력해야한다.

따라서 104.95.23을 입력해 B1과 네트워크를 맞춰주고, 아래 서브넷 마스크가 [255.255.255.0]이므로 0 ~ 255 값 중 임의의 값을 4옥텟에 넣어주면 된다.

단, 0, 255, 12는 입력하면 안된다.

- 0 : 네트워크 주소
- 255 : 브로드캐스트 주소
- 12 : B1의 주소 (중복되면 안됨)

C1과 D1도 같은 방식으로 연결한다.

</div>
</details>

### Level 2

2번도 기기와 기기간의 연결이다. 하지만 이번에는 서브넷 마스크를 맞춰주어야 한다.

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/netpractice/netpractice_chapter3_01.png?raw=true)

<details>
<summary>2번 해설</summary>
<div markdown="1">

A1의 IP 주소는 B1과 같은 네트워크로 맞춰주고, B1의 서브넷 마스크는 A1의 서브넷 마스크와 동일하게 설정해준다.

C1과 D1의 주소는 /30인 서브넷 마스크 내에서 같은 네트워크 주소값을 찾아 넣어주어야 한다.
이 때, /30이면 서브넷 당 IP 주소값이 4개정도로 굉장히 적다. (호스트 ID가 두자리로 [00, 01, 10, 11]이 하나의 네트워크이다.)

그렇기 때문에, C1과 D1의 주솟값을 1차이로 넣어주어야한다. 왜냐면 네개의 주소 중 맨 처음은 네트워크이고, 맨 마지막은 브로드캐스트 주소이기 때문에 사용할 수 없기 때문이다.

따라서 계산하기 쉬운 [0, 1, 2, 3]중 [1, 2]를 주소로 넣어주면 된다. 이때, 1 ~ 3옥텟은 C클래스의 서브넷이기 때문에, C클래스 주소값 중 사설IP를 제외한 값을 넣어주면 된다.

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/netpractice/netpractice_chapter3_02.png?raw=true)

</div>
</details>

### Level 3

3번은 스위치를 통한 기기의 연결이다. 스위치 내의 기기는 같은 네트워크로 연결되어야 한다.

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/netpractice/netpractice_chapter3_level3_00.png?raw=true)

<details>
<summary>3번 해설</summary>
<div markdown="1">

client A ~ C는 A의 고정된 IP를 기준으로 주변 값들을 넣어준다. 서브넷 마스크는 C의 고정된 값을 사용한다.

서브넷이 /25이기 때문에, [0 ~ 127, 128 ~ 255]범위인 두 네트워크가 만들어지게 되고, A의 고정된 값이 125이므로 B, C의 주소를 0 ~ 127 범위 내에서 입력해주면 된다. 이것도 마찬가지로 [0, 125, 127]은 입력 불가.

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/netpractice/netpractice_chapter3_level3_01.png?raw=true)

</div>
</details>

### Level 4

4번은 스위치 연결과 라우터 연결이 함께 있다. 이 문제는 라우터의 IP주소를 3개 모두 다르게 설정해주어야 한다.

그 뒤, 스위치와 기기들을 라우터의 R1 네트워크에 맞춰주면 된다. A1의 주소를 먼저 참고하자.

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/netpractice/netpractice_chapter3_level4_00.png?raw=true)

<details>
<summary>4번 해설</summary>
<div markdown="1">

A1의 주소를 보면, R2의 주소와 비슷해보인다. 하지만 라우터의 IP주소는 모두 달라야만 하므로, 서브넷을 통해 분리를 시켜주어야 한다.

R2의 주소가 /25인 서브넷 마스크에 102.216.113.1 이므로, 0 ~ 127 까지의 범위는 사용할 수 없다.

따라서 128 ~ 255범위에서 기기와 라우터의 주소값을 입력해주면 된다.

서브넷 마스크는 네트워크 주소가 다 분리되어 있으므로 기기들의 네트워크를 하나로 포함할만한 값만 넣어주면 된다. (극단적인 /29 ~ /31 류의 값은 진법계산하기 힘들 수 있으므로 되도록이면 피하는것이 좋을것이다.)

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/netpractice/netpractice_chapter3_level4_01.png?raw=true)

</div>
</details>

### Level 5

5번은 라우터를 통해 다른 네트워크들 끼리 연결을 시켜주는 문제이다. R1과 A를 연결시켜주고, R2와 B를 연결시켜주면 된다.

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/netpractice/netpractice_chapter3_level5_00.png?raw=true)

<details>
<summary>5번 해설</summary>
<div markdown="1">

먼저, 지금까지 해왔던 것 처럼 각 라우터와 기기를 같은 네트워크로 만들어준다. 고정된 값들을 이용하면 된다.

기기 옆에 있는 route는 라우터의 IP 주소를 적어주면 된다. 왼쪽 칸이 목적지, 오른쪽 칸이 경로이므로 오른쪽 칸에 적어준다.

왼쪽 칸은 목적지로 B의 주소를 적어주면 되지만, 목적지를 알 수 없다는 의미의 default나 0.0.0.0/0을 적어주어도 정답이 된다.

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/netpractice/netpractice_chapter3_level5_01.png?raw=true)

</div>
</details>

### Level 6

6번부터는 평가 때 무작위로 나오는 문제들이다. 점점 어려워지기 시작한다. 기기는 스위치와 라우터를 통해 인터넷으로 연결되어야 한다.

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/netpractice/netpractice_chapter3_level6_00.png?raw=true)

<details>
<summary>6번 해설</summary>
<div markdown="1">

먼저 기기와 라우터를 연결시켜주어야 한다. 고정된 IP주소와 서브넷 마스크를 사용하여 연결할 수 있다.

인터넷에서는 오른쪽 경로를 통해 왼쪽 목적지로 연결이 되어야 하므로, 오른쪽에는 라우터 주소, 왼쪽에는 기기 주소의 네트워크 주소를 입력해준다.

서브넷마스크를 통해 /25인 서브넷이 되었으므로 4옥텟의 네트워크 주소는 0이 아닌 128이 된다. 나머지 박스들의 경로는 default 혹은 인터넷의 주소값을 적어주면 된다.

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/netpractice/netpractice_chapter3_level6_01.png?raw=true)

</div>
</details>
