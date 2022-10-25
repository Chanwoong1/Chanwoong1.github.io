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
- mlx_put_image_to_window
- mlx_hook
- mlx_loop
- mlx_string_put

```C
void * mlx_init ();

#include <mlx.h>

void *mlx_ptr;

mlx_ptr = mlx_init();
```

mlx를 초기화 한다. mlx라이브러리에 관한 모든 것을 이용하기 전 실행해줘야한다.

```C
void	*mlx_new_window(void *mlx_ptr, int size_x, int size_y, char *title);

void  *win_ptr;
win_ptr = mlx_new_window(mlx_ptr, 500, 500, "so_long");
```

window를 열어준다. 너비와 높이, window의 이름을 설정할 수 있다. mlx_init()으로 반환받은 mlx 포인터를 입력해주어야한다.

창 생성 실패 시 null반환.

```C
void	*mlx_xpm_file_to_image(void *mlx_ptr, char *filename,
			       int *width, int *height);

void *img_ptr;
img_ptr = mlx_xpm_file_to_image(mlx_ptr, "char_path", width, height);
```

so_long 프로젝트를 위해 귀여운 이미지를 가져왔다면, 이미지 파일을 포인터에 저장해주어야 한다. xpm 파일을 써 주는게 png를 쓰는것보다 좋다. (png파일을 쓰면 에러가 날 수 있다고 함.)

```C
int	mlx_put_image_to_window(void *mlx_ptr, void *win_ptr, void *img_ptr,
				int x, int y);

mlx_put_image_to_window(mlx_ptr, win_ptr, img_ptr, 0, 0);
```

저장한 이미지 포인터를 창에 직접 띄워준다. 들어가는 인자가 직관적이라 설명은 패스.

```xpm
/* XPM */
static char *result[] = {
/* columns rows colors chars-per-pixel */
"32 32 25 1 ",
"  c #2E1E22",
". c gray16",
"X c gray22",
"o c #3A3A3A",
"O c #473D3C",
"+ c #534721",
"@ c #444444",
"# c #505050",
"$ c #685958",
"% c gray38",
"& c gray49",
"* c #964F00",
"= c #9D704C",
"- c #877A77",
"; c #A78D0E",
": c #D7906E",
"> c #FFD644",
", c #928A8C",
"< c #B0A39F",
"1 c #EEBE93",
"2 c #FFE1AF",
"3 c gray85",
"4 c #D9D9DD",
"5 c white",
"6 c None",
/* pixels */
"66666666666666666666666666666666",
"6666666666666OOOOOOO666666666666",
"66666666666OO$$$$$$$OO6666666666",
"666666666OO$-<-----<-$OO66666666",
"66666666O$--<-------<--$O6666666",
"6666666O$--<<<-----<<<--$O666666",
"666666O$----<<<<<<<<<----$O66666",
"666666O--$-------------$--O66666",
"66666O$-$----$--$--$----$-$O6666",
"66666O$$--$--$-$2$-$--$--$$O6666",
"66666O$$--$-$2$222$2$-$--$$O6666",
"66666O$$$-$$222222222$$-$$$O6666",
"66666O$:$$1222222222221$$:$O6666",
"666666O:$:1+++22222+++1:$:O66666",
"6666666+$=13 4222224 31=$+666666",
"66666666+=15 ,22222, 51=+6666666",
"666666666+:1**22222**1:+66666666",
"666666666o+:122222221:+o66666666",
"66666666o#o+=:11111:=+o#o6666666",
"6666666o#%%o+++++++++o%%#o666666",
"6666666o%&%##o%&#&%o##%&%o666666",
"666666o#%%o#%&o###o&%#o%%#o66666",
"666666;%%%o#&&&#>&&###o%%%;66666",
"66666o#%%#o#&&&#%&&&&#o#%%#o6666",
"66666+22=oo#&&&#>&&&&#oo=22+6666",
"66666+21+6oo%&&#%&&&%oo6+12+6666",
"666666++66o#ooooooooo#o66++66666",
"66666666666#%&%ooo%&%#6666666666",
"66666666666o%&%o6o%&%o6666666666",
"66666666666.#%#.6.#%#.6666666666",
"66666666666.@@X.6.X@@.6666666666",
"666666666666...666...66666666666"
};
```

이런 파일이

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/so_long/so_long01.png?raw=true)

이런식으로 창에 뜬다.

```C
int	mlx_hook(void *win_ptr, int x_event, int x_mask,
                 int (*funct)(), void *param);
```

이벤트 발생 시 미리 정해놓은 함수를 실행시킨다. [이곳](https://harm-smits.github.io/42docs/libs/minilibx/events.html#x11-events)을 보면 여러 이벤트들이 나오는데, 이 중 우리가 사용하는것은 KeyPress, KeyRelease, DestroyNotify 정도이다. 키보드를 누를 때 혹은 눌렀다 손을 뗄 때, 창을 종료시킬때 정도면 so_long의 움직임을 모두 구현할 수 있다.

```C
int	mlx_loop (void *mlx_ptr);
```

무한루프 함수이다. 이 함수를 마지막에 써 주어야 이벤트들을 받을 수 있고, 사용자가 정의한 종료방법에 의해서만 코드가 정상 종료되도록 설정할 수 있다.

```C
int	mlx_string_put(void *mlx_ptr, void *win_ptr, int x, int y, int color,
		       char *string);
```

보너스를 구현할 때 사용해야 하는 함수이다. 터미널에 걸음 수 출력이 아닌 화면에 걸음 수를 띄우기 위해 사용된다. 이것 또한 직관적이지만 color를 넣어주는 방식이 까다로울 수 있다.

```C
int	create_trgb(int t, int r, int g, int b)
{
	return (t << 24 | r << 16 | g << 8 | b);
}
```

위 함수를 통해 색상을 조절할 수 있다. 위 함수로 rgb 값을 조절해주면 원하는 색상을 얻을 수 있다. (0, 255, 255, 255)는 흰색, (0, 0, 0, 0)이면 검정색

## Chapter 4

### Mandatory part

#### map

so_long의 프로그램이 받아오는 인자는 '.ber'의 확장자를 가지는 맵이다. 대부분의 오류, 아니 모든 오류는 유효하지 않은 맵 형식에 의해 발생한다. 따라서 맵을 판단하는 프로그램 로직을 잘 구현하는것이 so_long프로젝트의 절반정도 비중을 차지한다고 볼 수 있다.

나의 맵 판단 로직을 나열해보자면 다음과 같다.

- '.ber'인 맵 형식이 들어오는지
- 맵의 줄 수 파악
- 첫째 줄 유효한지 검증 + 한 줄에 몇 자가 들어오는지 파악하기
- 중간 줄 유효한지 검증
- 마지막 줄 유효한지 검증
- 모든 줄이 다 유효하다는 가정하에 맵을 한 줄로 받아오기 (2차원의 맵을 1차원으로 수정)
- 맵을 전체적으로 보면서 수집품, 출구, 시작지점을 서브젝트의 요구대로 포함하고 있는지 확인

에러가 발견된다면 에러메세지를 요구사항에 맞게 출력해야한다.

#### display

맵 검증이 끝났다면 화면에 그림을 띄워야한다. 그림은 한줄로 저장한 맵을 차례대로 읽어 부분부분 창에 띄워주면 된다. 이 때, 가지고 온 이미지들이 같은 규격이면 더욱 표현하기 좋다.

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/so_long/so_long02.png?raw=true)

mlx라이브러리를 적절히 사용해줬다면 이런식으로 화면을 띄울 수 있다.

#### gameplay

이제 키보드를 통해 이벤트를 받아 함수를 실행시켜야한다. w를 입력했을 때 w가 입력된 것을 감지하여 캐릭터를 한 칸 위로 올려야 한다.

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/so_long/so_long03.png?raw=true)

한칸을 위로 올리기 위해서는 캐릭터의 윗 칸이 벽이 아닌지, 수집품을 다 모으지 않은 상태의 출구가 아닌지를 확인하고, 그 외의 상황일 경우에만 움직일 수 있다. 움직일 때 한 줄로 받아온 맵의 문자열을 바꿔가면서 움직이므로 수집품을 획득할 때는 'C'를 'P'로 바꿔주기만 하면 된다. 그리고 수집품의 수량을 확인해놓은 다음, 모두 획득했다면 출구로 갔을 때 종료할 수 있도록 해준다.

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/so_long/so_long04.png?raw=true)

터미널에 걸음 수를 출력해주면 mandatory 완료.

## Chapter 5

### Bonus part

#### sprite animation

보너스 파트는 약간 어려울 수 있다. sprite animation을 요구하는데, 이것은 한 캐릭터로 여러개의 이미지를 관리해서 마치 움직이듯이 화면에 띄워보라는 것을 의미한다.

sprite animation을 효율적으로 하기 위해선, 이미지 포인터를 배열로 관리하는 방법이 있다.

그러면 이미지를 관리하는 구조체가 살짝 달라지게 된다.

```C
# mandatory
typedef struct s_obj
{
	void	*ld;
	void	*tr;
	void	*it;
	void	*d1;
	void	*d2;
	void	*s1;
	void	*s4;
	void	*s7;
	void	*s10;
}				t_obj;

# bonus
typedef struct s_img
{
	void		*pt;
}				t_img;

typedef struct s_obj
{
	t_img		item[1];
	t_img		land[4];
	t_img		tree[4];
	t_img		door[2];
	t_img		sw[3];
	t_img		ss[3];
	t_img		sa[3];
	t_img		sd[3];
	t_img		tt[12];
}				t_obj;
```

위와 같이 이미지 포인터 배열을 가지는 구조체로 바뀌게 된다. 나의 경우 상하좌우 방향 별로 3개의 이미지를 배열로 만들어 순차적으로 이미지를 띄워주었다. 움직임을 자연스럽게 하기 위해서 배열 내부에서 픽셀단위로 체크하는 변수를 만들어 한 칸이 64픽셀 기준 8픽셀씩 움직이며 동작을 바꿔주는 형태로 구현하였다.

위의 방식이면 d 방향으로 8번 눌렀을 때, 64픽셀을 이동하여 멥의 배열을 변경해주는 식으로 구현했다.

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/so_long/so_long05.png?raw=true)
![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/so_long/so_long06.png?raw=true)
![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/so_long/so_long07.png?raw=true)
![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/so_long/so_long08.png?raw=true)

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/so_long/so_long_move01.mov?raw=true)

#### enemy

적 구현은
