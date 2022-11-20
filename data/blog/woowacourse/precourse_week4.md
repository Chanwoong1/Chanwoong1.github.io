---
title: '우테코 프리코스 4주차'
date: '2022-11-20'
tags: ['javascript', 'woowacourse']
draft: false
summary: 오 징 어 게 임
layout: PostSimple
---

이전 글

- [우테코 시작](https://chanwoong1.github.io/blog/woowacourse/precourse_main)
- [1주차](https://chanwoong1.github.io/blog/woowacourse/precourse_week1)
- [2주차](https://chanwoong1.github.io/blog/woowacourse/precourse_week2)
- [3주차](https://chanwoong1.github.io/blog/woowacourse/precourse_week3)

이번주 과제는 다리 건너기 게임이다. 이 게임은 다리를 건너는 데, 위, 아래라는 두가지 선택을 통해 다리의 끝에 도달하면 되는 게임이다. 오징어 게임에 나오는 징검다리 게임과 같다.

이번 과제는 기능 구현 목록 문서를 최대한 자세하게 작성하는 것을 목표로 하였다. 기능 구현 목록만 작성하는 것이 아닌, 각 클래스 별 메서드의 의도와 테스트, 구현 과정 등을 상세히 적었다.

```mermaid
  flowchart LR;
    A[App.play()]-->B[다리 길이 입력 문구출력\n다리 길이 입력];
    B-->E1[다리 길이에 대한 유효성 검사 및 에러 발생];
    B-->C[이동할 칸 입력 문구 출력\n이동할 칸 입력];
    C-->E2[이동할 칸에 대한 유효성 검사 및 에러 발생];
    C-->D[이동한 칸까지 다리 건너기 결과 출력];
    D-->E[틀렸을 경우, 재시작 문구 출력\n재시작 혹은 종료 입력];
    E-->C;
    E-->E3[재시작 여부 입력값에 대한 유효성 검사 및 에러 발생];
    E-->F[게임 성공 여부 및 결과 출력];
    E1-->B;
    E2-->C;
    E3-->E;
    D-->F;
```

과정은 이런식으로 작성해보았다.
