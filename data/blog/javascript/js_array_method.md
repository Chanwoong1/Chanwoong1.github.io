---
title: '자바스크립트 배열의 메서드'
date: '2022-08-25'
tags: ['javascript', 'array', 'vanilla js']
draft: false
layout: PostSimple
summary: '배 열 메 서 드'
---

자바스크립트에서 배열이 매우 유용하게 사용되는 만큼, 다양한 빌트인 메서드를 제공한다. 배열 메서드는 원본 배열을 직접 변경하는 메서드와 새로운 배열을 생성해 반환하는 메서드가 있다.

```js
const arr = [1]

// push 메서드는 원본 배열을 직접 변경한다.
arr.push(2)
console.log(arr) // [1, 2]

// concat 메서드는 새로운 배열을 생성 후 반환한다.
const result = arr.concat(3)
console.log(arr) // [1, 2]
console.log(result) // [1, 2, 3]
```

이런식으로 두 가지의 반환 패턴이 배열 메서드에 존재한다.

배열 메서드들 중에서 사용 빈도가 높은 메서드는 다음과 같다.

- isArray
- indexOf
- push
- pop
- unshift
- shift
- concat
- splice
- slice
- join
- reverse
- fill
- includes
- flat

## isArray

isArray 메서드는 전달된 인수가 배열이면 true, 아니면 false를 반환한다.

```js
// true
Array.isArray([1, 2, 3])
Array.isArray(new Array())

// false
Array.isArray()
Array.isArray({})
Array.isArray(null)
Array.isArray(true)
Array.isArray(false)
```

## indexOf

indexOf 메서드는 원본 배열에서 인수로 전달된 요소를 검색하여 인덱스를 반홚나다.

```js
const arr = [1, 2, 2, 3]

arr.indexOf(2) // 1 (2는 배열에 2개 있지만, 처음 검색된 요소의 인덱스를 반환한다)
arr.indexOf(4) // -1 (배열에 요소가 존재하지 않으면 -1을 반환한다)
arr.indexOf(2, 2) // 2 (두 번째 인수는 검색을 시작할 인덱스로 2번째 인덱스부터 검색을 시작한다)
```

indexOf 메서드는 배열에 특정 요소가 존재하는지 확인할 때 유용하다.
이 메서드 대신 includes를 사용하면 더 효율적인 코드를 짤 수도 있다. [includes 참고](#includes)

## push

push 메서드는 인수로 전달받은 모든 값을 원본 배열의 마지막 요소로 추가하고 변경된 length 프로퍼티 값을 반환한다. push 메서드는 원본 배열을 직접 변경한다.

```js
const arr = [1, 2]
arr.push(3)
console.log(arr) // [1, 2, 3]
```

push 메서드는 간편하지만 성능 면에서는 좋지 않다. 마지막 요소로 추가할 요소가 하나 뿐이라면 다음 방법을 사용하는것이 더 유용하다.

```js
const arr = [1, 2]

arr[arr.length] = 3
console.log(arr)
```

## pop

pop 메서드는 원본 배열의 마지막 요소를 제거하고, 제거한 요소를 반환한다. 원본 배열이 빈 배열일 경우 undefined를 반환한다.

```js
const arr = [1]
console.log(arr.pop())
console.log(arr.pop())
```

### push와 pop을 이용한 stack 구현

스택은 데이터를 마지막에 밀어 넣고, 마지막 데이터 부터 꺼내는 LIFO 방식의 자료구조이다.

생성자 함수로 구현한 스택

```js
const Stack = (function () {
  function Stack(array = []) {
    if (!Array.isArray(array)) throw new TypeError(`${array} is not an array.`)

    this.array = array
  }

  Stack.prototype = {
    constructor: Stack,

    push(value) {
      return this.array.push(value)
    },

    pop() {
      return this.array.pop()
    },

    entries() {
      return [...this.array]
    },
  }
  return Stack
})()

const stack = new Stack([1, 2])
console.log(stack.entries())

stack.push(3)
console.log(stack.entries())

stack.pop()
console.log(stack.entries())
```

클래스로 구현한 스택

```js
class Stack {
  #array // private class member

  constructor(array = []) {
    if (!Array.isArray(array)) throw new TypeError(`${array} is not an array.`)

    this.#array = array
  }
  push(value) {
    return this.#array.push(value)
  }

  pop() {
    return this.#array.pop()
  }

  entries() {
    return [...this.#array]
  }
}

const stack = new Stack([1, 2])
console.log(stack.entries())

stack.push(3)
console.log(stack.entries())

stack.pop()
console.log(stack.entries())
```

## unshift

unshift 메서드는 인수로 전달받은 모든 값을 원본 배열의 선두에 요소로 추가하고 변경된 length 프로퍼티의 값을 반환한다. 현재는 스프레드 문법으로 대체할 수 있다.

```js
const arr = [1, 2]

let result = arr.unshift([3, 4])
console.log(result) // 4
console.log(arr) // [3, 4, 1, 2]

// 스프레드
const arr = [1, 2]
const newArr = [3, 4, ...arr]

console.log(newArr)
```

## shift

shift 메서드는 원본 배열에서 첫 번째 요소를 제거하고, 제거한 요소를 반환한다.

```js
const arr = [1, 2]

let result = arr.shift()
console.log(result) // 1
console.log(arr) // [2]
```

pop 메서드 대신 shift 메서드를 사용하면 큐 자료구조를 구현할 수 있다.

큐(queue)는 데이터를 마지막에 밀어넣고, 가장 먼저 밀어넣은 데이터를 먼저 꺼내는 FIFO방식의 자료구조이다. 위의 스택 생성자함수와 클래스로 구현한 스택에서 pop대신 shift를 넣어 큐를 구현해보자.

생성자 함수로 구현한 큐

```js
const Queue = (function () {
  function Queue(array = []) {
    if (!Array.isArray(array)) throw new TypeError(`${array} is not an array.`)

    this.array = array
  }

  Queue.prototype = {
    constructor: Queue,

    enqueue(value) {
      return this.array.push(value)
    },

    dequeue() {
      return this.array.pop()
    },

    entries() {
      return [...this.array]
    },
  }
  return Queue
})()

const queue = new Queue([1, 2])
console.log(queue.entries())

stack.enqueue(3)
console.log(queue.entries())

stack.dequeue()
console.log(queue.entries())
```

클래스로 구현한 큐

```js
class Queue {
  #array // private class member

  constructor(array = []) {
    if (!Array.isArray(array)) throw new TypeError(`${array} is not an array.`)

    this.#array = array
  }
  enqueue(value) {
    return this.#array.push(value)
  }

  dequeue() {
    return this.#array.pop()
  }

  entries() {
    return [...this.#array]
  }
}

const queue = new Queue([1, 2])
console.log(queue.entries())

stack.enqueue(3)
console.log(queue.entries())

stack.dequeue()
console.log(queue.entries())
```

## concat

concat 메서드는 인수로 전달된 값들을 원본 배열의 마지막 요소로 추가한 새로운 배열을 반환한다. 인수로 전달된 값이 배열일 경우, 배열을 해체한 뒤 새로운 배열의 요소로 추가한다. 원본 배열은 변하지 않는다.

```js
const arr1 = [1, 2]
const arr2 = [3, 4]

let result = arr1.concat(arr2)
console.log(result)

// 스프레드 문법
let result = [...[1, 2], ...[3, 4]]
console.log(result)
```

## splice

원본 배열 중간에 요소를 추가하거나 제거하는 경우 splice 메서드를 사용한다.

```js
array.splice(start[, deleteCount[, item1[, item2[, ...]]]])
```

- start : 원본 배열의 요소를 제거하기 시작할 인덱스, start가 음수일 경우 배열의 끝부터 인덱스를 나타낸다.

- deleteCount : start부터 제거할 요소의 개수. deleteCount === 0일 경우 아무런 요소도 제거되지 않는다.

- item : 제거한 위치에 삽입할 요소들의 목록. 생략할 경우 원본 배열에서 요소를 제거하기만 한다.

```js
const arr = [1, 2, 3, 4]
const result = arr.splice(1, 2, 20, 30)

console.log(arr) // [1, 20, 30, 4]
console.log(result) // [2, 3]

// 요소를 제거하지 않고 삽입할 경우
const arr = [1, 2, 3, 4, 5]
const result = arr.splice(1, 0, 100)

console.log(arr) // [1, 100, 2, 3, 4, 5]
console.log(result) // []
```

## slice

slice 메서드는 인수로 전달된 볌위의 요소들을 복사해 배열로 반환한다. 원본 배열은 변경되지 않는다.
splice는 원본 배열을 변경하므로 주의.

```js
const arr = [1, 2, 3]

arr.slice(0, 1) // [1]
console.log(arr) // [1, 2, 3]
```

slice에 아무런 인자를 넣지 않으면, 배열은 복사가 되어 반환된다. 이 때 생성된 복사본은 얕은 복사를 통해 생성되는데, 얕은 복사는 원본 배열과 복사본의 배열의 요소의 참조값이 같은 것을 의미한다.

## reverse

원본 배열의 순서를 반대로 뒤집는다. 이때 원본 배열이 변경된다.

```js
const arr = [1, 2, 3]
const result = arr.reverse()

console.log(arr) // [3, 2, 1]
console.log(result) // [3, 2, 1]
```

## fill

인수로 전달받은 값을 배열의 처음부터 끝까지 요소로 채운다.

```js
const arr = [1, 2, 3]

arr.fill(0)
console.log(arr) // [0, 0, 0]

const arr = [1, 2, 3]

arr.fill(0, 1) // 1번째 인덱스부터 값을 채운다
console.log(arr) // [1, 0, 0]

const arr = [1, 2, 3, 4, 5]
arr.fill(0, 1, 3) // 1번째 인덱스부터 3번째 인덱스까지 값을 채운다. (인덱스 3은 포함하지 않음)
console.log(arr) // [1, 0, 0, 4, 5]
```

## includes

배열 내에 특정 요소가 포함되어 있는지 확인하여 true 혹은 false를 반환한다.

```js
const arr = [1, 2, 3]

console.log(arr.includes(2)) // true
console.log(arr.includes(1, 1)) // false (1을 1번째 인덱스부터 찾는다)
```

## flat

전달받은 인자(깊이)만큼 재귀적으로 배열을 평탄화한다.

```js
console.log([1, [2, 3, 4, 5]].flat()) // [1, 2, 3, 4, 5]
console.log([1, [2, [3, [4, 5]]]].flat(2)) // [1, 2, 3, [4, 5]]
```
