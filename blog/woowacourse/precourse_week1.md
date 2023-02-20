---
title: '우테코 프리코스 1주차'
date: '2022-10-31'
tags: ['javascript', 'woowacourse']
draft: false
summary: 요구 사항 및 제한사항 숙지 후 여러가지 과제 풀어보기
layout: PostSimple
---

이전 글

- [우테코 시작](https://chanwoong1.github.io/blog/woowacourse/precourse_main)

1주차의 과제를 받아보니, 굉장히 친절한 시스템으로 과제 채점과 제출을 할 수 있도록 하였다.

일단, 과제를 제출하기 위해서는 깃 사용법을 알고 있어야 한다.

먼저, 각 주별 과제를 자신의 깃허브 계정으로 fork를 해준다. 내가 제출하려는 과제는 우테코 저장소에 쓰기 권한이 없기 때문에 내 저장소로 먼저 복사해주어야 하기 때문이다.

그리고나서 브랜치를 만들어준 후, 과제를 진행하였다.

과제를 진행하면서 시도해본 것은 깃 브랜치 관리에 관한 것이었다. 깃 브랜치 전략은 여러 방법으로 나뉘는데, 1주차 과제에서는 메인 브랜치를 기준으로 문제 별 브랜치를 만들어주어 각 문제마다 각기 다른 브랜치를 이용해주었다.

그리고나서 문제를 다 풀고, 메인에 병합해주는 식으로 과제를 진행하였다.

과제를 진행하면서 느꼈던 점을 쭉 적어보려 한다.

프론트엔드 개발에 관심이 생겨 자바스크립트를 공부해왔는데, 지금까지 코드컨벤션에 대한 숙지 없이 코딩을 해온것에 부끄러움을 느꼈다. 이 경우 팀단위로 개발할 때, 가독성이 떨어지는 코드 구현으로 이어질 수 있어 이번 프리코스를 통해 코드 컨벤션을 숙지하는것을 목표로 하였다.

또한, 깃허브 사용도 그동안 브랜치 사용을 거의 하지 않고 바로 main 브랜치에 커밋하는 식으로 코딩을 해왔는데, 이번 기회에 깃허브 브랜치 사용 요령과 깃 브랜치 전략 중 깃 플로우 방식을 가지고 프리코스와 블로그 운영을 하기로 다짐했다.

깃 플로우 전략에 대해 간단하게 말하면 5가지의 깃허브 브랜치를 운영하는 전략이다. 5가지 브랜치는 다음과 같다.

- master : 라이브 서버에 배포하는 브랜치
- develop : 다음 출시 버전을 대비해 개발하는 브랜치
- feature : 기능개발 브랜치. 개발이 완료되면 develop 브랜치에 합병한다.
- release : 다음 버전 배포를 준비하는 브랜치. develop 브랜치에서 다음 버전 개발이 완료되면 release로 합병해서 여러가지 테스트를 진행하고 통과하면 master브랜치에 합병한다.
- hotfix : master 브랜치에서 발견된 버그를 수정하는 브랜치

![git-flow](https://techblog.woowahan.com/wp-content/uploads/img/2017-10-30/git-flow_overall_graph.png)

총 5개의 브랜치 운영으로 목적에 따른 코딩을 할 수 있어 타인과 협업하기에도 좋다. 이번 과제는 7문제로 이루어져 있어 문제단위의 브랜치를 생성하고 운영해보았는데, 다음 과제부터는 깃 플로우 전략을 사용해볼 것이다.

7개의 문제를 푸는데에는 큰 어려움이 없었다. 그러나 지금까지 C 스타일의 코딩을 해오고, 삼항연산자의 사용을 제한하는 코딩을 했었다. 내가 봐도 나는 자바스크립트 스타일로 코딩하고 있지 않았다. 코드를 재구성해보는 시간을 가졌고, 이 시간이 문제를 푸는 시간보다 오래걸렸다.

문제를 해결하는 것에만 집중해서 구현한 코드는 아래와 같다. 같은 표현이 반복되었고, 인덱스 사용이 많아 헷갈리기도 했으며, else문 사용도 고치고 싶었다.

```js
function getFriendList(user, friends) {
  const friendList = {}
  for (let i = 0; i < friends.length; i++) {
    if (Object.keys(friendList).includes(friends[i][0]))
      friendList[friends[i][0]].push(friends[i][1])
    else friendList[friends[i][0]] = [friends[i][1]]
    if (Object.keys(friendList).includes(friends[i][1]))
      friendList[friends[i][1]].push(friends[i][0])
    else friendList[friends[i][1]] = [friends[i][0]]
  }
  if (!Object.keys(friendList).includes(user)) {
    friendList[user] = []
  }
  return friendList
}
```

위와 같은 코드를 다음과 같이 고쳐보았다.

```js
function pushFriendList(friendList, friend) {
  for (let i = 0; i < 2; i++) {
    if (!isObjectKeys(friendList, friend[i])) {
      friendList[friend[i]] = []
    }
    friendList[friend[i]].push(friend[(i + 1) % 2])
  }
}

function getFriendList(user, friends) {
  const friendList = {}
  for (let i = 0; i < friends.length; i++) {
    pushFriendList(friendList, friends[i])
  }
  if (!Object.keys(friendList).includes(user)) {
    friendList[user] = []
  }
  return friendList
}
```

먼저, 불필요한 else문을 없애는 것에 초점을 두었다. if문을 만족하지 않으면 자동적으로 else의 기능을 수행하는것을 목표로 코딩을 했다. 이렇게 하기 위해서 true, false를 반환하는 함수들을 더 많이 사용하였다.

true, false 반환값 사용으로 삼항연산자를 활용할 수 있었다. 삼항연산자의 사용을 늘린 이유는 반응형 웹 개발을 할 때, 삼항연산자의 사용이 코드의 가독성을 높인다고 하기 때문에 사용 빈도를 늘릴 수 있도록 코딩하였다.

```js
function isAlpha(char) {
  if ((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z')) return true;
  return false;

function isAlpha(char) {
  return (
	(char >= 'a' && char <= 'z') ||
	(char >= 'A' && char <= 'Z')
  ) ? true : false;
}
```

위 코드처럼 else문 사용을 제한하는 코드에서, 삼항연산자를 사용하여 더 간결하게 코딩하였다.

또한, 코드 가독성 증대 목적과 더불어 한줄짜리 블록으로 중괄호를 생략할 수 있는 상황이어도 명확하게 줄바꿈하여 사용해주었다. 지금 당장 코드가 더욱 간결해져 보이는 효과가 있겠지만, 오류 발생 확률도 높아 잠재적인 위험 요소가 될 수 있고, 향후 코드 수정에 있어 더 용이하게 코딩할 수 있도록 명확하게 중괄호를 사용해주었다.

### 11/2 추가)

1주차 과제가 끝난 뒤 공통 피드백을 받았다. 나에게 해당이 되는 말들도 있고 아닌 말들도 있었겠지만, 괜히 다 내 코드에 해당되는 말인것같아 조금 많이 찔렸다....

2주차부터는 피드백 받은 것들을 생각하며 코드 작성을 해봐야겠다.
