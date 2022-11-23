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

저번주 과제랑 이번주 과제의 큰 차이점은 에러를 발생시킨 뒤 다시 입력값을 받도록 하는 부분이었다. 이로 인해 try-catch 구문을 사용해야 했고, 입력값을 받는 메소드가 3개가 있어서 try-catch 구문도 3번을 써야했다. 중복되는 기능을 하나로 합치고자 함수를 하나 더 만들어 사용했고, 다음과 같이 줄일 수 있었다.

```js
class InputErrorProcess {
  inputErrorProcess(validClass, inputValue, objectCode) {
    try {
      GameInfo[objectCode] = new validClass(inputValue)[objectCode]
    } catch (error) {
      OutputView.printMessage(error)
      return false
    }
    return true
  }
}

const InputView = {
  inputErrorProcess: new InputErrorProcess(),

  bridgeGame: new BridgeGame(),

  /**
   * 다리의 길이를 입력받는다.
   */
  readBridgeSize() {
    Console.readLine(GAME_MESSAGES.messageOfInputSize, (bridgeSize) => {
      if (!this.inputErrorProcess.inputErrorProcess(ValidateBridgeSize, bridgeSize, 'bridgeSize'))
        return this.readBridgeSize()
      GameInfo.bridge = BridgeMaker.makeBridge(
        GameInfo.bridgeSize,
        BridgeRandomNumberGenerator.generate
      )
      UseGameInfo.initializeGameInfo()

      return this.readMoving()
    })
  },

  /**
   * 사용자가 이동할 칸을 입력받는다.
   */
  readMoving() {
    Console.readLine(GAME_MESSAGES.messageOfInputMoving, (moving) => {
      if (!this.inputErrorProcess.inputErrorProcess(ValidateMoving, moving, 'moving'))
        return this.readMoving()

      return this.moveBridge()
    })
  },

  moveBridge() {
    this.bridgeGame.move()
    OutputView.printMap()
    if (UseGameInfo.isFailure()) return this.readGameCommand()

    return UseGameInfo.isLastTurn() ? this.readMoving() : OutputView.printSuccess()
  },

  /**
   * 사용자가 게임을 다시 시도할지 종료할지 여부를 입력받는다.
   */
  readGameCommand() {
    Console.readLine(GAME_MESSAGES.messageOfInputGameCommand, (gameCommand) => {
      if (
        !this.inputErrorProcess.inputErrorProcess(ValidateGameCommand, gameCommand, 'gameCommand')
      )
        return this.readGameCommand()

      return this.bridgeGame.retry(gameCommand) && UseGameInfo.initializeGameInfo()
        ? this.readMoving()
        : OutputView.printResult()
    })
  },
}
```

각각의 메서드에서 중복되는 기능을 골라 새로 함수를 만들어주는 과정에서 같은 기능을 수행하지만 표현 방식이 많이 달라질 수 있다는 점과, 코드의 가독성 또한 올라갈 수 있다는 점이 코드 리팩토링의 필요성을 말해주는 것 같았다.

그리고 이런 과정이 나에게는 즐거움으로 다가와서 더욱 열심히 할 수 있었던 것 같다.

## 프리코스를 마치며

프리코스를 하는 4주간의 시간이 생각보다 빠르게 지나가서 놀랐다. 주마다 과제를 제출하며 다른 분과 리뷰로 소통하며 느꼈던 점은 내 코딩 실력이 출중한 편이 아니라는 점이었다. 최선을 다해 과제를 수행하고 리팩토링 했다고 생각했지만, 리뷰를 받고나서 다시 한번 들여다보니 아쉬운 점이 남기도 했다. 하지만 4주 동안의 시간이 엄청 빠르게 지나간 만큼, 그 동안 내가 프리코스에 몰입해서 과제를 해냈다는 것과, 자바스크립트 입문 단계에서 프리코스를 시작했지만 나름 빠르게 실력이 향상되는 것을 느낄 수 있었고, 보람찼던 4주로 기억될 것이다.

향후 결과가 어떻게 될지 모르겠지만, 내가 할 수 있는것들을 하며 프리코스를 통해 배웠던 구현목록 삭성, 깃 커밋 메세지 작성법, 기능별 구현 및 테스트 등을 사용하여 코딩을 할 것이다.
