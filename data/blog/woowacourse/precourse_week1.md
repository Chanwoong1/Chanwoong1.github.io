---
title: '우테코 프리코스 1주차'
date: '2022-10-27'
tags: ['javascript', 'woowacourse']
draft: false
summary: 4주간 열심히 해보겠습니다.
layout: PostSimple
---

이전 글

- [우테코 시작](https://chanwoong1.github.io/blog/woowacourse/precourse_main)

1주차의 과제를 받아보니, 굉장히 친절한 시스템으로 과제 채점과 제출을 할 수 있도록 하였다.

```
function validateArg(arg) {
if (arg.length !== 2) return 0;
if (typeof arg[0] !== "number" || typeof arg[1] !== "number") return 0;
if (arg[1] % 2 !== 0 || arg[1] <= 3 || arg[1] >= 399) return 0;
if (arg[1] - arg[0] !== 1) return 0;
return 1;
}

function findMaxValue(arg) {
console.log(pobi[0][0]);
}

function problem1(pobi, crong) {
console.log(typeof pobi[0]);
if (validateArg(pobi) === 0 || validateArg(crong) === 0) return -1;
// console.log(findMaxValue(pobi))
findMaxValue(pobi);
return 0;
}

module.exports = problem1;
// success
console.log(problem1([97, 98], [197, 198]));
console.log(problem1([131, 132], [211, 212]));

// failure
console.log(problem1([99, 102], [211, 212])); // #1
console.log(problem1([99, 100, 101], [211, 212])); // #2
console.log(problem1([99, '100'], [211, 212])); // #3
console.log(problem1([99, 100], [211, '212'])); // #4
console.log(problem1([2, 3], [211, 212])); // #5
console.log(problem1([101, 102], [399, 400])); // #6
console.log(problem1([99, 102], [398, 399])); // #7
```
