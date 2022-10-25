---
title: 'github에 개인 페이지 배포하기'
date: '2022-10-15'
tags: ['next.js', 'blog', 'github']
draft: false
summary: 블로그 배포
layout: PostSimple
---

[next.js로 개인 블로그 만들기](https://chanwoong1.github.io/blog/blog_project/blog_project)

이번에 만든 블로그를 포스팅하는 작업을 해볼 것이다.

뭔가 쉬운듯 어려운듯 아리송한 상태로 배웠다.

먼저, 블로그 폴더에 'package.json' 파일을 열어준다.

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/blog_project/github_pages01.png?raw=true)

위처럼 되어있을 텐데, 여기서 script를 다음과 같이 고쳐준다.

```json
	"scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
	"export": "next export"
  },
```

'export'를 추가해 주었다. 그리고 순차적으로 다음 명령어를 입력한다.

```
npm run build

npm run export
```

두 명령어가 에러 없이 정상 작동 되었다면, 아마 out폴더가 생성되었을 것이고, 배포가 가능한 상태라는 뜻이 된다.

깃허브에 페이지를 업로드하기 위해서는 "자신의 깃허브 id.github.io" 라는 이름의 레포지토리를 생성해주어야 한다.

레포지토리를 생성하면, 자기 블로그 작업 디렉토리에서 다음과 같이 명령어를 작성한다.

```git
git init

git remote add origin git@github.com:{자신의 깃허브 id}.github.io.git

git add .

git commit -m 'create github pages'

git push origin main
```

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/blog_project/github_pages02.png?raw=true)

레포지토리를 생성하면 자동으로 github-pages라는 것이 등록된다. 이를 통해 배포를 더 쉽게 할 수 있다.

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/blog_project/github_pages03.png?raw=true)

그리고 위 사진처럼 Actions에서 New workflow 선택, Node.js의 Configure을 눌러주면 문서를 작성할 수 있다. 아래와 같이 입력해준다.

```
name: Node.js CI

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout 🛎️
        uses: actions/checkout@v3
      - name: Use Node.js 16
        uses: actions/setup-node@v3
        with:
          # update the Node version to meet your needs
          node-version: [14.x, 16.x, 18.x]
          cache: npm

      - name: Install and Build 🔧
        run: |
          npm ci
          npm run build
          npm run export
          touch out/.nojekyll
      - name: Deploy 🚀
        # https://github.com/JamesIves/github-pages-deploy-action
        uses: JamesIves/github-pages-deploy-action@v4.2.5
        with:
          branch: gh-pages
          folder: out
```

위와 같이 입력해준다. 아까 보았던 build와 export를 자동화 해주는 방식이고, gh-pages라는 브런치에 아까 생성된 out폴더를 넣어준다.

입력 후 우측의 "Start commit"을 누르면 Actions에 workflow가 하나 생성되고 자동으로 실행이 된다. 조금 기다려주면

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/blog_project/github_pages04.png?raw=true)

이런식으로 완료되었다고 뜨고, 눌러보면 deploy에 url이 하나 생긴다. 그것이 이제 우리가 사용할 블로그 주소가 된다.

들어가보면 README.md의 유무에 따라 상태가 다를 것이다. 어쨌든 무언가 잘못되었다는 생각이 들텐데, 다시 setting로 들어가준다.

Settings - Pages에 들어가주면 Branch가 main으로 되어있을 것인데, gh-pages가 생성되었을 테니 gh-pages를 선택해주고 저장해준다.

그리고나서 잠시 산책도 다녀오고 스트레칭도 한번 해 주면, 블로그의 첫 화면이 뜨게 될 것이다.
