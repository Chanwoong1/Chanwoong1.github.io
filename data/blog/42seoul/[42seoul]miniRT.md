---
title: '[42seoul] miniRT'
date: '2023-01-10'
tags: ['4th_circle', 'graphics', 'RayTracer', 'mlx']
draft: false
summary: My first RayTracer with miniLibX
layout: PostSimple
---

# miniRT

이 프로젝트는 Raytracing의 아름다운 세계를 소개한다. 완료된다면 간단한 Computer-General-Images를 렌더링할 수 있고 다시는 수학 공식을 구현하는 것을 두려워하지 않을 것이다.

- [Chapter 1](#chapter-1)
- [Chapter 2](#chapter-2)
- [Chapter 3](#chapter-3)
- [Chapter 4](#chapter-4)
- [Chapter 5](#chapter-5)

## Chapter 1

### Introduction

3차원의 컴퓨터 생성 이미지를 렌더링할 때 가능한 접근 방식은 두 가지가 있다: 효율성 때문에 거의 모든 그래픽 엔진에서 사용하는 **Rasterization**과 **Ray Tracing**이다.

1968년에 처음 개발되었던 **Ray Tracing**은 오늘날에도 **Rasterizaion**보다 계산 비용이 더 많이 든다. 결과적으로, 아직 실시간 사용 사례에 완전히 적용되지는 않았지만 훨씬 더 높은 수준의 시각적 사실성을 생성한다.

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/minirt/01_00.png?raw=true)

이 그림들은 레이트레이싱 기술로 렌더링된다. 인상적이지 않은가 ??

이런 고퀄리티의 그래픽 제작을 시작하기 전에, 너는 기초적인 부분을 마스터해야한다: **miniRT**는 너의 C로 코딩된 최초의 광선 추적이며, 규범적이고 소박하지만 **기능적이다.**

**miniRT**의 주요한 목표는 수학자 없이도 모든 수학 혹은 물리 공식들을 구현할 수 있음을 스스로에게 증명하는 것이다. 여기서는 가장 기본적인 레이 트레이싱 기능만 구현할 것이므로 침착하고 심호흡을 하고 당황하지 않아야한다 ! 이 프로젝트가 끝나면 멋진 사진을 자랑하여 학교에서 보내는 시간을 정당화할 수 있다...

## Chapter 2

### Common Instructions

- 너의 프로젝트는 C로 작성되어야 한다.
- 너의 프로젝트는 Norm을 따르며 작성되어야 한다. 만약 보너스 파일이나 함수를 가지고 있다면, 그들도 norm 검사에 포함되어야 하고 이 중에서 norm 에러가 있다면 0점을 받게 될 것이다.
- 너의 함수들은 정의되지 않은 동작(segmentation fault, bus error, double free, etc)을 제외하고 예상치 않게 종료되지 않아야한다. 이 경우 프로젝트가 작동하지 않는것으로 간주되며 평가중 0점을 받게된다.
- 필요할 경우 모든 힙 메모리 공간을 적절하게 해제해야 한다. 메모리 누수는 용납되지 않는다.
- 주체가 요구하는 경우, -Wall -Wextra -Werror 플래그를 사용해 소스 파일을 필요한 결과로 컴파일하는 Makefile을 제출하고 cc를 사용하고 리링크가 되면 안된다.
- Makefile은 최소한 $(NAME), all, clean, fclean, re 규칙을 포함해야한다.
- 보너스 제출을 위해, Makefile에서 **bonus** 규칙을 포함시켜야 한다. 그러면 프로젝트의 주요 부분에서 금지된 모든 다양한 헤더, 라이브러리 또는 기능이 추가된다. 보너스는 파일에 **\_bonus.\{c/h\}**로 달라야한다. mandatory와 bonus는 개별적으로 진행된다.
- 만약 libft 사용이 허가된다면, libft 폴더에 해당 소스 및 관련 Makefile을 복사해야한다. 프로젝트의 Makefile은 libft의 Makefile을 사용해 라이브러리를 컴파일한 뒤 프로젝트를 컴파일해야한다.
- 이 작업을 제출할 필요가 없고 채점되지 않더라도 프로젝트에 대한 테스트 프로그램을 만드는것이 좋다. 자신의 작업과 동료의 작업을 쉽게 테스트할 수 있는 기회를 제공한다. 실제로 디펜스하는 동안 테스트 또는 평가중인 동료의 테스트를 자유롭게 사용할 수 있다.
- 할당된 git 저장소에 제출한다. git 저장소에 있는 내용만 채점이 된다. Deepthought가 내용을 채점한다면, 동료 평가 이후에 수행될 것이다. Deepthought의 채점 중에 작업의 어느 부분에서든 오류가 발생하면 평가가 중지된다.

## Chapter 3

### Mandatory part - miniRT

- Program name : miniRT
- Turn in files : All your files
- Makefile : all, clean, fclean, re, bonus
- Arguments : a scene in format \*.rt
- External functs.
  - open, close, read, write, printf, malloc, free, perror, strerror, exit
  - All functions of the math
  - All functions of the MinilibX
- Libft authorized : Yes
- Description : 너의 프로그램의 목표는 레이트레이싱 프로토콜을 사용하는 이미지들을 생성하는 것이다. 이런 컴퓨터 생성 이미지는 각각 고유한 조명 시스템이 있는 간단한 기하학적 개체로 정의된 특정 각도와 위치에서 본 장면을 나타낸다.

제약 조건은 다음과 같다.

- 너는 **miniLibX**를 사용해야 한다. 운영체제 또는 해당 소스에서 사용 가능한 버전이다. 소스로 작업하기로 한 경우, 위의 **Common Instructions** 부분에 작성된 것과 libft와 동일한 규칙을 적용해야 한다.
- 창 관리는 원할하게 유지되어야 한다: 다른 창으로 변경, 최소화 등
- 최소한 3개의 간단한 기하학적 객체가 필요하다: 평면, 구, 원통
- 해당되는 경우, 가능한 모든 교차점과 개체 내부를 올바르게 처리해야 한다.
- 프로그램은 개체의 고유 속성인 구의 지름과 원통의 너비와 높이의 크기를 조정할 수 있어야 한다.
- 프로그램은 개체, 조명 및 카메라에 변환 및 회전 변환을 적용할 수 있어야 한다.(회전할 수 없는 구 및 조명 제외)
- 조명 관리: 지점 밝기, 강한 그림자, 주변 조명(객체가 완전히 어두워지지 않음). 주변 및 확산 조명을 구현해야 한다.
- 프로그램은 창에 이미지를 표시하고 다음 규칙을 준수한다.
  - ESC를 누르면 창을 닫고 프로그램을 완전히 종료해야 한다.
  - 창 테두리의 적십자 표시를 클릭하면 창이 닫히고 프로그램이 완전히 종료된다.
  - minilibX의 이미지 사용을 적극적으로 권장한다.
- 프로그램은 확장자가 .rt인 장면 설명 파일을 첫 번째 인수로 취해야 한다.

  - 각 유형의 요소는 하나 이상의 줄바꿈으로 구분할 수 있다.
  - 요소의 각 정보 유형은 하나 이상의 공백으로 구분할 수 있다.
  - 각 요소 유형은 파일에서 임의의 순서로 설정할 수 있다.
  - 대문자로 정의된 요소는 장면에서 한 번만 설정할 수 있다.
  - 각 요소의 첫번째 정보는 유형 식별자(하나 또는 두 개의 문자로 구성됨)이며, 다음과 같이 엄격한 순서로 각 객체에 대한 모든 특정 정보가 온다:
  - **주변 조명**

  ```
  A 0.2 255,255,255
  ```

  \* identifier: **A**\
  \* ambient lighting ratio in range [0.0, 1.0]: **0.2**\
  \* R, G, B colors in range [0-255]: **255, 255, 255**

  - **카메라**

  ```
  C -50.0,0,20  0,0,1 70
  ```

  \* identifier: **C**\
  \* x, y, z coordinates of the view point: **-50.0,0.0,20.0**\
  \* 3d normalized orientation vector. In range[-1, 1] for each x, y, z axis: **0.0, 0.0, 1.0**\
  \* FOV: Horizontal field of view in degrees in range [0, 180]: **70**

  - **빛**

  ```
  L  -40.0,50.0,0.0  0.6   10,0,255
  ```

  \* identifier: **L**\
  \* x, y, z coordinates of the view point: **-40.0,50.0,0.0**\
  \* the light brightness ratio in range [0.0, 1.0]: **0.6**\
  \* (unused in mandatory part)R, G, B colors in range [0-255]: **10, 0, 255**

  - **구체**

  ```
  sp 0.0,0.0,20.6  12.6  10,0,255
  ```

  \* identifier: **sp**\
  \* x, y, z coordinates of the sphere center: **0.0,0.0,20.6**\
  \* the sphere diameter: **12.6**\
  \* R, G, B colors in range [0-255]: **10, 0, 255**

  - **평면**

  ```
  cy 50.0,0.0,20.6  0.0,0.0,1.0, 14.2  21.42  10,0,255
  ```

  \* identifier: **cy**\
  \* x, y, z coordinates: **50.0, 0.0, 20.6**\
  \* 3d normalized orientation vector. In range [-1, 1] for each x, y, z axis: **0.0,0.0,1.0**\
  \* the cylinder diameter: **14.2**\
  \* the cylinder height: **21.42**\
  \* R, G, B colors in range [0, 255]: 10, 0, 255

- 최소한의 .rt 장면이 있는 mandatory part의 예

```
A     0.2                                         255,255,255

C     -50,0,20      0,0,0         70
L     -40,0,30                    0.7             255,255,255

pl    0,0,0         0,1.0,0                       255,0,225
sp    0,0,20                      20              255,0,0
cy    50.0,0.0,20.6 0,0,1.0       14.2   21.42    10,0,255
```

- 파일에 잘못된 구성이 있다면 프로그램은 적절하게 종료되어야 하고 "Error\\n" 다음에 명시적인 에러 메세지를 반환해야 한다.
- 디펜스의 경우, 생성할 요소의 제어를 용이하게 하기 위해 기능적인 것에 초점을 맞춘 전체적인 장면 세트를 갖는것이 이상적이다.

## Chapter 4

### Bonus part

**Ray-Tracing** 기술은 반사, 투명도, 더 복잡한 물체, 부드러운 그림자, 화선, 전역 조명, 범프 매핑, .obj 파일 렌더링 등과 같은 더 많은 것을 처리할 수 있다.

하지만 **miniRT** 프로젝트의 경우 첫 번째 레이트레이서와 CGI의 첫 번째 단계를 간단하게 유지하려 한다.

따라서 여기에 구현할 수 있는 몇 가지 간단한 보너스 목록이 있다. 더 큰 보너스를 원할 경우 이 작은 것이 완료되고 완전히 작동한 후 너의 개발자 인생 후반에 새로운 레이 트레이서를 다시 코딩하는 것이 좋다.

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/minirt/04_00.png?raw=true)

스폿, 우주 스카이박스 및 범프 매핑이 있는 반짝이는 지구 질감 구체

> 보너스는 너의 mandatory part가 완벽할 경우에만 평가될 것이다. PERFECT는 당연히 완전해야 하며 잘못된 사용 등과 같은 불쾌한 실수의 경우에도 실패할 수 없음을 의미한다. 즉, 필수 부분이 채점 중에 모든 포인트를 얻지 못하면 보너스는 완전히 무시될 것이다.

보너스 목록:

- 전체 Phong 반사 모델을 갖도록 정반사 추가
- 색상 혼란: 바둑판
- 색상 및 멀티 스포트 라이트
- 다른 2nd degree 객체: Cone, Hyperboloid, Paraboloid..
- 범프 맵 텍스쳐 처리

> 평가 중 사용이 정당한 다른 기능을 사용하고 장면 설명에 기능을 추가해서 보너스를 완성할 수 있다. 필요에 맞게 예상 장면 파일 형식을 수정할 수 있다. 머리를 쓰자 !

## Chapter 5

### Examples

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/minirt/05_00.png?raw=true)

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/minirt/05_01.png?raw=true)

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/minirt/05_02.png?raw=true)

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/minirt/05_03.png?raw=true)

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/minirt/05_04.png?raw=true)

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/minirt/05_05.png?raw=true)

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/minirt/05_06.png?raw=true)

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/minirt/05_07.png?raw=true)

## Chapter 6

이번 과제는 팀 과제이기도 하지만, 다른 사람들과 함께 협업할 때 사용하는 깃허브 전략에 대해 조금 더 많이 사용해보고 싶어서 스터디를 진행하게 되었다. 스터디는 3주정도로 계획하고 있고, git flow 전략에 따른 branch 관리를 중점으로 진행하고자 한다.

### Parse

파싱은 서브젝트에 있는 양식들을 그대로 따르면서, 편의성과 기능적인 부분을 향상시킬 수 있도록 주석도 처리할 수 있도록 하였다. 기본적인 규칙은 맨 앞의 **Identifier**에 따라 함수가 나뉘면서 파싱이 되는 형식을 취했다.

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/minirt/06_00.png?raw=true)

식별자에 따라 다른 처리를 해줬고, 각각의 요소에서 적절하게 처리를 해주었다.

### MLX

파싱이 제대로 되었다면, MLX 라이브러리를 통해 그림을 그려줄 준비를 해야한다. miniRT 과제는 한 픽셀마다 빛이 뻗어나가면서 물체에 충돌한다면 충돌한 물체의 색을 그려주는 형식으로 진행된다. 따라서 픽셀 하나하나를 그려줄 수 있도록 mlx함수를 사용해주어야 한다.

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/minirt/06_01.png?raw=true)

사실 쓰레드를 통해 더욱 빠르게 렌더링을 하려했으나.. mlx라이브러리 내부의 문제로 인해 쓰레드를 사용했을 때, 적절하게 렌더링되지 않는 현상이 발견되었다. 함수 이름에 'thread'가 들어있는 이유가 바로 그것... 이 mlx 라이브러리에서 이미지 생성을 해주고, 그 이미지에 픽셀 하나하나의 색을 계산해서 그려주게 된다.

### RayTracing

픽셀마다 색을 계산해주기 위해 이번 과제의 핵심인 [RayTracing](https://en.wikipedia.org/wiki/Ray_tracing_(graphics)) 기술이 들어가게 된다. 엄청나게 설명이 잘 되어있는 레퍼런스들이 많으므로 참고하길 바란다.. 사실 그래픽에 대해 문외한인 필자의 설명보다 전 세계 유수한 석학들의 레퍼런스를 참고하는것이 더 좋을....

[Ray Tracing in One Weekend Series](https://raytracing.github.io/)

[Phong Reflection Model](https://en.wikipedia.org/wiki/Phong_reflection_model)

[Texture Mapping](http://raytracerchallenge.com/bonus/texture-mapping.html)

[Normal Mapping](https://en.wikipedia.org/wiki/Normal_mapping)

[Line Cone Intersection(원뿔 경계면 구하기)](http://illusioncatalyst.com/notes_files/mathematics/line_cone_intersection.php)

[sham 님의 miniRT 시리즈](https://velog.io/@sham/series/miniRT)

[3차원 벡터 회전 변환](https://m.blog.naver.com/kimjw1218/70178629876)

위의 자료들을 참고해서 구현했다.

#### 구현

RayTracing을 구현하기 위해서는 카메라(원점)로부터 각각의 모니터(픽셀단위)로 뻗어나가는 빛들에 대한 방향벡터를 구해주어야 한다. 이 방식을 쉽게 구현하기 위해 우리는 입력받은 카메라 위치를 무조건 원점( [0, 0, 0] )으로, 카메라 방향은 ( [0, 0, 1] )로 설정했다.

또, 모니터 픽셀에 대한 좌표를 알아야하는데, 이것은 가상의 모니터 (우리는 mlx window의 width와 height으로 설정했다)와 [fov(시야각)](https://ko.wikipedia.org/wiki/%ED%99%94%EA%B0%81_(%EC%82%AC%EC%A7%84%EC%88%A0))을 통해 구해주었다.

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/minirt/06_02.png?raw=true)

예를들면 fov = 90이고, wid, hei가 각각 600이라면 모니터와 카메라간의 거리는 삼각함수로 구할 수 있다.

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/minirt/06_03.png?raw=true)

아래의 함수를 통해 거리를 구한다면 300이라는 값이 나올 것이다.

그렇게 해서 600x600의 해상도에서 한 픽셀 ([x, y])에 대한 3차원 좌표는 ([x, y, 300])이 되고, 카메라의 원점과 [x, y, 300]으로 방향벡터를 구해주면 빛의 방향이 계산된다.

#### 충돌 판정

우리는 학창시절에 2차원 평면에서 원과 직선이 만나는 점의 갯수를 구했던 적이 있었다. (기억 안나거나 없었다면 miniRT 하지말고 cub3d 하길 바람..) 점의 갯수를 구하기 위해서는 근의공식을 사용했었는데, 근의공식 값이 양수(2개), 0(1개), 음수(만나지않음)로 점의 갯수를 판단했다.

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/minirt/06_04.png?raw=true)

Ray Tracing에서는 3차원에 대해 점의 갯수를 구하는것과 같다. 구, 원기둥, 평면과 같은 모든 객체들은 충돌 유무를 판단하기 위한 각각의 판별식이 존재하는데, 우리는 그 판별식을 이용해 값이 0 이상이라면 도형의 색을 반환해주는 방식으로 3차원 그림을 그려줄 수 있는 것이다 !

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/minirt/06_05.png?raw=true)

여러 판별식 중, 가장 간단한 구체에 대한 판별식이다. [레퍼런스](https://www.scratchapixel.com/lessons/3d-basic-rendering/minimal-ray-tracer-rendering-simple-shapes/ray-sphere-intersection.html)를 먼저 봐도 좋다. 우리가 파싱을 통해 모든 객체의 값을 올바르게 가져왔다면, 거기서부터는 판별식에 따라 값을 대입해주기만 하면 되므로, 가장 쉬운 구체를 그릴 수 있게 된다면 다른 객체들도 모두 쉽게 그릴 수 있을 것이다.

#### 물체가 겹치는 경우

한 줄기의 빛이 두 개 이상의 객체에 충돌한다면, 가장 가까운 객체만 반영해야 한다. 그러기 위해서는 광선이 물체에 닿는 좌표와 원점의 거리를 각 객체마다 구해주어야 한다. 그 후, 가장 가까운 객체를 찾아 그 객체에 대한 정보만을 반환하도록 해준다.

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/minirt/06_06.png?raw=true)

이를 위해 hit라는 구조체를 만들어주었고, 각 객체마다 hit구조체에 충돌에 대한 정보가 담기게 된다. 만약 충돌하지 않았다면, 임의로 설정한 큰 값이 유지되고, 충돌했다면 더 가까운 값이 들어올 때 마다 값을 업데이트 해준다. 모든 객체를 다 탐색했을 때, 가장 가까운 객체의 정보가 closest_hit 구조체에 담기게 된다.

#### 조명 설정

조명에 대한 처리는 [Phong Reflection Model](https://en.wikipedia.org/wiki/Phong_reflection_model)을 구현하면 된다. 이 부분은 [Ray Tracing in One Weekend Series](https://raytracing.github.io/)에 잘 설명되어있고, 코드도 참고할 수 있어서 한번 따라가보길 바란다.

정말 간단한 요약은 물체가 부딪힌 거리가 같은 객체라도 조금씩 다르기 때문에(구체라면 면이 둥글기 때문에 부딪히는 거리가 다 다르다), 그 거리에 따라 빛의 세기를 조절해주면 거리가 더 멀수록 물체가 어둡게 처리되어 원근감이 나타나게 된다.

그림자에 대한 처리는 광선이 객체에 부딪힌 후, 반사된 빛이 다른 객체에 부딪히게 된다면, 원래 표현되어야 할 객체의 색보다 더욱 어두운 색(혹은 아예 까만색으로 처리하기도 한다)을 반환하게 하여 처리할 수 있다.

## Chapter 7

### 결과

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/minirt/07_00.png?raw=true)

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/minirt/07_01.png?raw=true)

같은 맵을 mlx 라이브러리를 통해 키보드 입력을 받아 시점을 변환할 수 있도록 만들어주었다.

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/minirt/07_02.png?raw=true)

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/minirt/07_03.png?raw=true)

범프 맵과 normal 처리 유무. 둘 다 같은 벽돌 이미지이다. 왼쪽은 normal map까지 적용시켰고, 하나는 적용시키지 않았는데, normal의 적용으로 인해 빛이 난반사가 일어나서 벽돌의 굴곡에 따라 빛이 반사되는 현상을 구현할 수 있었다.

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/minirt/07_04.png?raw=true)

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/minirt/07_05.png?raw=true)

체크보드를 적용시켜 평면과 구체에 바둑판 모양이 나타날 수 있도록 구현하였다. 또한, 각각의 객체들 또한 키보드 입력을 통해 회전하거나 이동시킬 수 있도록 구현했다.

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/minirt/07_06.gif?raw=true)

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/42seoul/minirt/07_07.gif?raw=true)

이런 방식으로 회전시킬 수 있다.

### 느낀 점

이번 과제는 그래픽에 대해 많이 알지 못한 상태로 시작하기도 했고, 수학 공식들을 많이 사용해야 했던 과제여서 생각보다 예상보다 시간이 더 걸렸다. 그래도 git flow 전략을 통해 적절한 브랜치 사용으로 기능별 구현을 통해 동시 작업을 하더라도 깃이 꼬이지 않게 진행할 수 있었다. 일단은 그래픽쪽으로 관심이 크게 없던지라.. 이론적인 부분보다 협업을 위주로 과제를 진행했는데, 결과물도 만족스럽게 나와서 뿌듯했다.
