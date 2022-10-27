---
title: '자바스크립트에서 배열이란 무엇일까'
date: '2022-08-23'
tags: ['javascript', 'array', 'vanilla js']
draft: false
layout: PostSimple
summary: '배 열'
---

자바스크립트에서 배열은 여러 개의 값을 순차적으로 나열한 자료구조이다. 배열은 사용 빈도가 매우 높은 가장 기본적인 자료구조로, 이를 사용하기 위한 유용한 메서드를 제공한다.

```js
const arr = ['a', 'b', 'c]
```

간단한 배열을 만들어 보았다. 배열이 가지고 있는 값은 요소라고 부르며, 자바스크립트의 모든 값은 요소가 될 수 있다. 심지어 객체, 함수 조차도 가능하다. 배열의 인덱스는 0부터 시작한다.

```js
arr.length // 3
```

또한 배열은 length 프로퍼티를 가지고 있어, 인덱스와 함께 순차적으로 요소에 접근 할 수 있다.

```js
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i])
}
```
