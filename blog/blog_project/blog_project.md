---
title: 'next.js로 개인 블로그 만들기'
date: '2022-09-21'
tags: ['next.js', 'blog']
draft: false
layout: PostSimple
summary: 'next.js로 개인 블로그 만들기'
---

깃허브에 내가 했던 것들을 조금씩 올리는 동안, 너무 무분별하게 쌓여가는 것들이 아까워 블로그를 통해 정리하기로 하였다.

먼저, 부끄럽지만 깃허브에 레포지토리가 늘어나면서 점점 나조차도 어떤 정보가 어디에 있는지 헷갈리는 경우가 생기곤 했다.

# Next.js

next.js는 서버 사이트 렌더링, 정적 웹 페이지 생성 등 리엑트 기반 프레임워크이다. [공식 홈페이지](https://nextjs.org/learn/basics/create-nextjs-app)에서 learn course를 제공하고 있어서 쉽게 개념을 알아갈 수 있다.

next.js는 기존 리엑트 기반 웹 사이트의 한계인 Pre-rendering을 하지 않는다는 단점을 보완한 프레임워크로, 웹 사이트, 블로그 등에 많이 사용되고 있다.

여기서 Pre-rendering이란, 웹 사이트를 요청했을 때, 빈 html을 가져와 script들을 로딩하는 기존의 방법과 달리, 미리 데이터가 렌더링된 페이지를 가져오기 때문에 사용자에게 더 좋은 경험과 정적 사이트 생성도 가능하게 해준다.

# create-next-app

기본적으로 next.js를 사용하기 위해서는 node.js 설치가 필요하다. node.js는 간편하게 설치할 수 있다.

```zsh
npx create-next-app --typescript
# --typescript를 입력하지 않으면 javascript로 스크립트가 생성된다.
```

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/blog_project/nextjs_create_next_app.png?raw=true)

이런 식으로 폴더가 구성된다. 파일이 많이 생성되지만, 웬만하면 pages에서 코딩을 하게 되니 걱정하지 말자.

```zsh
npm run build

npm start
//or
npm run dev
```

위의 명령어를 통해 로컬 환경에서 웹 페이지를 띄워볼 수 있다.
![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/blog_project/blog_project00.png?raw=true)

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/blog_project/blog_project01.png?raw=true)

여기서 https://localhost:3000 링크로 들어가면 /pages/index.js에서 설정된 화면이 띄워지게 된다.

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/blog_project/blog_project02.png?raw=true)

이 화면이 뜨면 로컬 환경에서 웹 페이지가 제대로 실행되고 있다는 뜻이고, 실시간으로 수정을 하며 자신만의 블로그를 만들 수 있다.

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/blog_project/blog_project01.png?raw=true)

/pages/index.js을 수정하면 바로바로 바뀌는걸 볼 수 있다.

[github에 개인 페이지 배포하기](https://chanwoong1.github.io/blog/blog_project/github_pages)
