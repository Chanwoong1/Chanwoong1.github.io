---
title: '자바스크립트에서 객체란 무엇일까'
date: '2022-08-21'
tags: ['javascript', 'object', 'vanilla js']
draft: false
layout: PostSimple
summary: '객 체'
---

자바스크립트는 객체 기반의 프로그래밍 언어라고 한다. 이 말은, 자바스크립트를 구성하는 거의 '모든 것'이 객체라는 의미이다. 원시 값들을 제외한 나머지 값들이 모두 객체를 뜻한다.

여기서 다시 [원시 값](https://developer.mozilla.org/ko/docs/Glossary/Primitive)들에 대해 간단하게 짚고 넘어가자면,

- string
- number
- bigint
- boolean
- undefined
- symbol
- null
  로 총 7가지의 타입이 있다. 이 값들은 객체가 아니면서 메서드도 가지지 않는 데이터이고, 모든 원시 값은 불변하다고 한다. 원시값과 변수를 혼동하지 않는것이 중요하다.

다시 객체로 돌아와서, 객체는 0개 이상의 프로퍼티로 구성된 집합이며, 프로퍼티는 키와 값으로 구성된다. 자바스크립트에서 사용할 수 있는 모든 값은 프로퍼티 값이 될 수 있다. 따라서 함수도 프로퍼티 값이 될 수 있는데, 이 경우 일반 함수와 구분하기 위해 메서드라고 부른다.

```javascript
var person = {
  name: 'Chanwoong',
  sayHello: function () {
    console.log(`Hello! My name is ${this.name}.`)
  },
}

console.log(typeof person) // object
console.log(person) // {name: "Chanwoong", sayHello: f}
```

만약 person이라는 객체의 중괄호 내에 프로퍼티를 정의하지 않으면 빈 객체가 생성된다.

자바스크립트의 식별자 네이밍 규칙인 camelcase에 익숙해지도록 하자. 그렇지 않으면 키값에도 따옴표를 사용하는 불편함이 발생할 수 있다.

```javascript
var person = {
  firstName: 'Chanwoong',
  'last-name': 'Jeong',
}

console.log(person) // {firstName: "Chanwoong", last-name: "Jeong"}
```

위와 같이 두 프로퍼티 모두 가능하지만, 사용하기에 불편할 것이다.

다음은 객체를 사용하기 위한 가장 기본적인 동작들이다.

```javascript
var obj = {}
var key = 'hello'

obj[key] = 'world' // 이런식으로 obj의 프로퍼티 키를 생성할 수 있다.

var foo = {
  name: 'Kim',
  name: 'Lee',
  name: 'Park',
}

console.log(foo) // 중복 선언하면 가장 나중에 선언한 'Park'이 이전 선언된 값들을 덮어쓴다.

console.log(foo.name) // 'Park'
console.log(foo.age) //undefined

foo.name = 'Jeong'
console.log(foo) // {name: "Jeong"}

foo.age = 20 // 프로퍼티 동적 생성
console.log(foo) // {name: "Jeong", age: 20}

delete foo.age // 프로퍼티 삭제
console.log(foo) // {name: "Jeong"}
```
