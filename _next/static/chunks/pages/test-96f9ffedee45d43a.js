(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[378],{3486:function(t,e,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/test",function(){return r(5674)}])},4094:function(t,e,r){"use strict";var n=r(7320),i=r(8100),a=r(7233);e.Z=function(t){var e=t.title,r=t.description,o=t.imgSrc,c=t.href;return(0,n.tZ)("div",{className:"md p-4 md:w-1/2",style:{maxWidth:"544px"},children:(0,n.BX)("div",{className:"".concat(o&&"h-full","  overflow-hidden rounded-md border-2 border-gray-200 border-opacity-60 dark:border-gray-700"),children:[o&&(c?(0,n.tZ)(a.Z,{href:c,"aria-label":"Link to ".concat(e),children:(0,n.tZ)(i.Z,{alt:e,src:o,className:"object-cover object-center md:h-36 lg:h-48",width:544,height:306})}):(0,n.tZ)(i.Z,{alt:e,src:o,className:"object-cover object-center md:h-36 lg:h-48",width:544,height:306})),(0,n.BX)("div",{className:"p-6",children:[(0,n.tZ)("h2",{className:"mb-3 text-2xl font-bold leading-8 tracking-tight",children:c?(0,n.tZ)(a.Z,{href:c,"aria-label":"Link to ".concat(e),children:e}):e}),(0,n.tZ)("p",{className:"prose mb-3 max-w-none text-gray-500 dark:text-gray-400",children:r}),c&&(0,n.tZ)(a.Z,{href:c,className:"text-base font-medium leading-6 text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400","aria-label":"Link to ".concat(e),children:"Learn more \u2192"})]})]})})}},8100:function(t,e,r){"use strict";var n=r(7320),i=r(5675);function a(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function o(){return o=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n])}return t},o.apply(this,arguments)}e.Z=function(t){var e=o({},t);return(0,n.tZ)(i.default,function(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{},n=Object.keys(r);"function"===typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(r).filter((function(t){return Object.getOwnPropertyDescriptor(r,t).enumerable})))),n.forEach((function(e){a(t,e,r[e])}))}return t}({},e))}},9831:function(t,e,r){"use strict";r.d(e,{TQ:function(){return s},$t:function(){return d},Uy:function(){return g}});var n=r(7320),i=r(9008),a=r(1163),o=r(1576),c=r.n(o),l=function(t){var e=t.title,r=t.description,o=t.ogType,l=t.ogImage,s=t.twImage,d=t.canonicalUrl,g=(0,a.useRouter)();return(0,n.BX)(i.default,{children:[(0,n.tZ)("title",{children:e}),(0,n.tZ)("meta",{name:"robots",content:"follow, index"}),(0,n.tZ)("meta",{name:"description",content:r}),(0,n.tZ)("meta",{property:"og:url",content:"".concat(c().siteUrl).concat(g.asPath)}),(0,n.tZ)("meta",{property:"og:type",content:o}),(0,n.tZ)("meta",{property:"og:site_name",content:c().title}),(0,n.tZ)("meta",{property:"og:description",content:r}),(0,n.tZ)("meta",{property:"og:title",content:e}),"Array"===l.constructor.name?l.map((function(t){var e=t.url;return(0,n.tZ)("meta",{property:"og:image",content:e},e)})):(0,n.tZ)("meta",{property:"og:image",content:l},l),(0,n.tZ)("meta",{name:"twitter:card",content:"summary_large_image"}),(0,n.tZ)("meta",{name:"twitter:site",content:c().twitter}),(0,n.tZ)("meta",{name:"twitter:title",content:e}),(0,n.tZ)("meta",{name:"twitter:description",content:r}),(0,n.tZ)("meta",{name:"twitter:image",content:s}),(0,n.tZ)("link",{rel:"canonical",href:d||"".concat(c().siteUrl).concat(g.asPath)})]})},s=function(t){var e=t.title,r=t.description,i=c().siteUrl+c().socialBanner,a=c().siteUrl+c().socialBanner;return(0,n.tZ)(l,{title:e,description:r,ogType:"website",ogImage:i,twImage:a})},d=function(t){var e=t.title,r=t.description,o=c().siteUrl+c().socialBanner,s=c().siteUrl+c().socialBanner,d=(0,a.useRouter)();return(0,n.BX)(n.HY,{children:[(0,n.tZ)(l,{title:e,description:r,ogType:"website",ogImage:o,twImage:s}),(0,n.tZ)(i.default,{children:(0,n.tZ)("link",{rel:"alternate",type:"application/rss+xml",title:"".concat(r," - RSS feed"),href:"".concat(c().siteUrl).concat(d.asPath,"/feed.xml")})})]})},g=function(t){var e=t.authorDetails,r=t.title,o=t.summary,s=t.date,d=t.lastmod,g=t.url,p=t.images,m=void 0===p?[]:p,u=t.canonicalUrl,h=((0,a.useRouter)(),new Date(s).toISOString()),f=new Date(d||s).toISOString(),y=(0===m.length?[c().socialBanner]:"string"===typeof m?[m]:m).map((function(t){return{"@type":"ImageObject",url:t.includes("http")?t:c().siteUrl+t}})),b={"@context":"https://schema.org","@type":"Article",mainEntityOfPage:{"@type":"WebPage","@id":g},headline:r,image:y,datePublished:h,dateModified:f,author:e?e.map((function(t){return{"@type":"Person",name:t.name}})):{"@type":"Person",name:c().author},publisher:{"@type":"Organization",name:c().author,logo:{"@type":"ImageObject",url:"".concat(c().siteUrl).concat(c().siteLogo)}},description:o},Z=y[0].url;return(0,n.BX)(n.HY,{children:[(0,n.tZ)(l,{title:r,description:o,ogType:"article",ogImage:y,twImage:Z,canonicalUrl:u}),(0,n.BX)(i.default,{children:[s&&(0,n.tZ)("meta",{property:"article:published_time",content:h}),d&&(0,n.tZ)("meta",{property:"article:modified_time",content:f}),(0,n.tZ)("script",{type:"application/ld+json",dangerouslySetInnerHTML:{__html:JSON.stringify(b,null,2)}})]})]})}},8281:function(t,e){"use strict";e.Z=[{title:"\uc6b0\ud14c\ucf54 \ud504\ub9ac\ucf54\uc2a4",description:"4\uc8fc\uac04\uc758 \ub0b4 \ubc1c\uc790\ucde8 \uae30\ub85d\ud558\uae30",imgSrc:"/static/images/blog_posts/woowacourse/woowacourse_project_img.png",href:"/blog/woowacourse/precourse_main"},{title:"\ube14\ub85c\uadf8 \ud398\uc774\uc9c0 \ub9cc\ub4e4\uae30",description:"\ub098\ub9cc\uc758 \ube14\ub85c\uadf8\ub85c \ub0b4 \uc9c0\uc2dd \uacf5\uc720\ud558\uae30",imgSrc:"/static/images/blog_posts/blog_project/nextjs.png",href:"/tags/blog"},{title:"42\uc11c\uc6b8",description:"\ubcf8 \uacfc\uc815 \uacfc\uc81c \ud0d0\uad6c",imgSrc:"/static/images/blog_posts/logo42.svg",href:"/tags/42seoul"},{title:"\uc790\ubc14\uc2a4\ud06c\ub9bd\ud2b8 leetcode",description:"\ub9ce\uc774 \ud480\uc5b4\ubcf4\uae30",imgSrc:"/static/images/blog_posts/javascript/leetcode_logo.png",href:"/tags/leetcode"},{title:"\uc790\ubc14\uc2a4\ud06c\ub9bd\ud2b8 \ub3c5\ud559",description:"\ud63c\uc790 \ubd80\ub52a\ud788\uace0 \ud568\uaed8 \uc544\ud30c\ud574\ubcf4\uae30",imgSrc:"/static/images/blog_posts/javascript/js_logo.png",href:"/blog/javascript/js_main"},{title:"\uc774\uc6a9 \uace0\uac1d \ud398\ub974\uc18c\ub098 \uc815\uc758",description:"\uc11c\ube44\uc2a4 \uc774\uc6a9 \uace0\uac1d\uc758 \uc8fc\ub41c \uc815\ubcf4\ub4e4\uc744 \ud1a0\ub300\ub85c \uace0\uac1d\uc758 \ud398\ub974\uc18c\ub098\ub97c \uc815\uc758\ud558\ub294 \ud504\ub85c\uc81d\ud2b8\uc785\ub2c8\ub2e4. \uc774\ub97c \ud1b5\ud574 \uc5b4\ub5a4 \uace0\uac1d\ub4e4\uc774 \uc11c\ube44\uc2a4\ub97c \uc774\uc6a9\ud558\ub294\uc9c0 \ud30c\uc545\ud558\uace0, \ud574\ub2f9 \uace0\uac1d\ub4e4\uc5d0 \ub300\ud55c \ud0c0\uac9f \uad11\uace0\ub97c \uc2e4\uc2dc\ud558\uc5ec \uc774\uc6a9\uac1d \uc99d\ub300\uc5d0 \ub3c4\uc6c0\uc774 \ub420 \uac83\uc774\ub77c \uc0dd\uac01\ud588\uc2b5\ub2c8\ub2e4.",imgSrc:"/static/images/blog_posts/persona_project/persona_project.png",href:"/blog/persona_project"},{title:"\ub530\ub989\uc774 \ub370\uc774\ud130\ub97c \ud65c\uc6a9\ud55c \ub370\uc774\ud130 \ubd84\uc11d",description:"\ub370\uc774\ud130 \ubd84\uc11d \uccab \uac78\uc74c",imgSrc:"/static/images/blog_posts/bicycle_predict/bicycle_project.jpeg",href:"/blog/dacon/bicycle_predict"}]},5674:function(t,e,r){"use strict";r.r(e),r.d(e,{default:function(){return c}});var n=r(7320),i=r(1576),a=r.n(i),o=(r(8281),r(4094),r(9831));function c(){return(0,n.BX)(n.HY,{children:[(0,n.tZ)(o.TQ,{title:"Week_1no - ".concat(a().author),description:a().description}),(0,n.BX)("div",{className:"divide-y divide-gray-200 dark:divide-gray-700",children:[(0,n.BX)("div",{className:"space-y-2 pt-6 pb-8 md:space-y-5",children:[(0,n.tZ)("h1",{className:"text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-4xl md:leading-14",children:"\uc6b0\ud14c\ucf54 1\uc8fc\ucc28"}),(0,n.tZ)("p",{className:"text-lg leading-7 text-gray-500 dark:text-gray-400",children:"\uc6f9 \ud398\uc774\uc9c0\uc5d0 \uacfc\uc81c \uad6c\ud604\ud574\ubcf4\uae30"})]}),(0,n.BX)("div",{className:"container py-12",children:[(0,n.tZ)("h3",{className:"text-2xl font-bold leading-8 tracking-tight",children:"Problem 1"}),(0,n.tZ)("p",{children:"\uc0ac\uc9c4\uc774\ub791 \ub9c1\ud06c \ub123\uae30"})]})]})]})}}},function(t){t.O(0,[675,888,179],(function(){return e=3486,t(t.s=e);var e}));var e=t.O();_N_E=e}]);