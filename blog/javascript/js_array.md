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
const arr = ['a', 'b', 'c']
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

자료구조상 배열은 동일한 크기의 메모리 공간이 빈틈없이 연속적으로 나열된 자료구조를 말한다. 즉 배열의 요소는 하나의 데이터 타입이며 서로 연속적으로 인접해 있다. 이 구조는 인덱스를 통해 단 한 번의 연산으로 임의의 요소에 접근할 수 있다. 이 때, 시간복잡도는 O(1)로 매우 효율적이고, 고속으로 동작한다. 이 배열을 **밀집 배열**이라고 한다.

하지만 자바스크립트에서의 배열은 **희소 배열**로 밀집되어 있지 않다. 따라서 요소 검색 시, 처음부터 순차적으로 검색을 해야해서 시간복잡도는 O(N)으로 효율적으로 보이지는 않는다.

```js
function linearSearch(array, target) {
  const length = array.length

  for (let i = 0; i < length; i++) {
    if (array[i] === target) return i
  }

  return -1
}

console.log(linearSearch([1, 2, 3, 4, 5, 6], 3)) // 2
console.log(linearSearch([1, 2, 3, 4, 5, 6], 0)) // -1
```

그러나 이런 단점을 극복할 수 있는 장점이 존재하는데, 연속적인 배열이 아니기 때문에, 같은 데이터 타입이 아니어도 된다. 연속적인 배열의 데이터 타입이 같은 이유는 데이터 타입 별로 메모리 크기가 다르기 때문에 연속으로 서로 다른 크기의 메모리를 할당하기 힘들기 때문이다.

그래서 자바스크립트의 배열은 **어떤 타입의 값**이라도 배열의 요소가 될 수 있다!

```js
// 서로 다른 타입을 가지는 배열의 극단적인 예시
const arr = ['string', 1, true, null, undefined, NaN, Infinity, [], {}, function () {}]
```

배열의 선언은 다음과 같이 한다.

```js
const size = 10
const arr = new Array(size)

console.log(arr) // [empty * 10]
console.log(arr.length) // 10
```

배열의 크기를 정해줄 수 있고, 정하지 않으면 빈 배열이 생성된다. 배열은 0개부터 최대 4,294,967,295개의 요소를 가질 수 있다. 이 범위를 넘어서면 RangeError가 발생한다.

배열에 요소를 추가, 삭제하는 방법은 다음과 같다.

```js
const arr = [1, 2, 3]
console.log(arr)

arr.push(4)
console.log(arr)

arr.pop() // 요소 삭제 (마지막 요소)
console.log(arr)

delete arr[1] // 인덱스를 사용한 요소 삭제
console.log(arr[1])

console.log(arr[1]) // 배열 요소 참조
```
