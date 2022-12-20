---
title: '자바스크립트 콜백함수'
date: '2022-09-25'
tags: ['javascript', 'callback', 'vanilla js']
draft: false
layout: PostSimple
summary: '콜백이란 무엇인가'
---

만약 아래와 같은 코드가 있다고 한다면,

```js
function fn1(n) {
  for (let i = 0; i < n; i++) {
    console.log(i)
  }
}

fn1(5)

function fn2(n) {
  for (let i = 0; i < n; i++) {
    if (i % 2) {
      console.log(i)
    }
  }
}

fn2(5)
```

두 함수 모두 공통적으로 반복하는 작업을 하지만, 하는 일의 내용이 조금 달라 새로 정의를 해야했다. 이런 상황은 반복되는 작업이 많아지고 구현해야하는 프로그램이 커질수록 더 많이 발생할 것이다.

이것을 공통된 로직을 미리 정의하고 경우에 따라 변경되는 로직을 함수 외부에서 내부로 전달하는 방식으로 코드를 구현하면 다음과 같은 코드가 될 것이다.

```js
function fn(n, f) {
  for (let i = 0; i < n; i++) {
    f(i)
  }
}

const consoleLog1 = function (i) {
  console.log(i)
}

fn(5, consoleLog1)

const consoleLog2 = function (i) {
  if (i % 2) {
    console.log(i)
  }
}

fn(5, consoleLog2)
```

위 함수는 반복되는 작업을 함수 f로 추상화했다. 그리고 함수 f는 외부에서 전달받는다. 함수 또한 객체이므로 전달하고 전달받는데에는 아무런 문제가 없다.

이처럼 '함수의 매개변수를 통해 다른 함수의 내부로 전달되는 함수'를 '콜백함수'라고 한다. 그리고 매개변수를 통해 함수의 외부에서 콜백 함수를 전달받은 함수를 고차함수라고 한다.

이 말은 즉, 콜백함수가 고차함수에 전달되어 도와주는 역할을 하고, 고차함수는 콜백함수를 자신의 일부분으로 합성한다는 의미이다. 고차함수는 매개변수를 통해 전달받은 콜백함수의 호출 시점을 결정해서 호출한다.

그래서 콜백함수는 고차함수 내부에 호출하면서 정의하는 것이 일반적으로, 위의 코드는 아래와 같이 고칠 수 있다.

```js
fn(5, function (i) {
  if (i % 2) {
    console.log(i)
  }
})
```

콜백함수는 비동기 프로그래밍에도 활용이 된다고 한다. 따라서 다음에는 비동기 프로그래밍에 대해 알아보려 한다.

- [비동기 프로그래밍]()