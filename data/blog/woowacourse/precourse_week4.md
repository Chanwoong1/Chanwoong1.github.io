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

[![](https://mermaid.ink/img/pako:eNp1U8tKw1AQ_ZXhrlVQdxUEbetKN7pMXFyaVAt9EVOkVKFqBbEVFRQfJLX47CKL9KGk4BflTv7BSZvUV3pXuTNzzpwzk1thqYKishgDSGcLu6ltrumwur4g54HOkrRULM4Us7wsy3msG9i8BGE57rsF-GGI1svm9PQi7AE2j-nyO0XhZUnUn8WrBa7joNkPyjYD8mXCToLGJaoX53fedQtw4EQg_a5Gy7tvY60DbreKhxaFkrMS3lyIBwuEbeCRGSLihEiMOQ2f0x008K0KocJOX9ROXMcmLtvtfYb-Anwi6DgkAKw_e422P5KmFTUVX4j0nfNuB2hWAR-PxVPjj5VkOMCwGGst78ikFgaF43-qIgzPRxv2ESuS221gs0acHbf3DnhjiQ9ybJ9Hm0zOfosZbYVW-GOAExTMTVAw959t7Gf-fy4ZdoJRThyYwYpGuxGnVyDO7LGZ4YBW2BTLqVqOZxT6hys-g8z0bTWnyixGn4qa5qWsLjM5v0-lvKQXNsr5FIvpWkmdYqWiwnU1keFbGs-xWJpndyiqKhm9oK2N3sXweex_AVSrg6o?type=png)](https://mermaid.live/edit#pako:eNp1U8tKw1AQ_ZXhrlVQdxUEbetKN7pMXFyaVAt9EVOkVKFqBbEVFRQfJLX47CKL9KGk4BflTv7BSZvUV3pXuTNzzpwzk1thqYKishgDSGcLu6ltrumwur4g54HOkrRULM4Us7wsy3msG9i8BGE57rsF-GGI1svm9PQi7AE2j-nyO0XhZUnUn8WrBa7joNkPyjYD8mXCToLGJaoX53fedQtw4EQg_a5Gy7tvY60DbreKhxaFkrMS3lyIBwuEbeCRGSLihEiMOQ2f0x008K0KocJOX9ROXMcmLtvtfYb-Anwi6DgkAKw_e422P5KmFTUVX4j0nfNuB2hWAR-PxVPjj5VkOMCwGGst78ikFgaF43-qIgzPRxv2ESuS221gs0acHbf3DnhjiQ9ybJ9Hm0zOfosZbYVW-GOAExTMTVAw959t7Gf-fy4ZdoJRThyYwYpGuxGnVyDO7LGZ4YBW2BTLqVqOZxT6hys-g8z0bTWnyixGn4qa5qWsLjM5v0-lvKQXNsr5FIvpWkmdYqWiwnU1keFbGs-xWJpndyiqKhm9oK2N3sXweex_AVSrg6o)

과정은 이런식으로 작성해보았다.
