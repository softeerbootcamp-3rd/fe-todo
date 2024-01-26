# 현대 소프티어부트캠프 3기 웹 프론트엔드 투두리스트 만들기
`현대 소프티어부트캠프 3기 웹 프론트엔드` 에서 진행했던 `투두리스트 만들기` 입니다. 

관련 요구사항과 개발 과정을 담았습니다. 

# 💻 프로젝트 기술스택 💻
## 개발 스택
![HTML5](https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Sass](https://img.shields.io/badge/Sass-CC6699.svg?style=for-the-badge&logo=Sass&logoColor=white)

## ETC
![GIT](https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white)
![GITHUB](https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white)



<br/><br/>

# ✍ Convention ✍
## Branch Strategy

Github flow 전략을 사용합니다.

## Commit Massage Convention

```
type(file name): commit message
```

모든 `commit message`는 최대한 간략하게 작성합니다. `file name`의 경우, 특정 파일만을 수정한 경우에는 해당 파일 이름을 포함하지만, 여러 파일인 경우에는 미포함하여 작성합니다.

모든 `commit message` 앞에는 다음의 `type`을 작성합니다.

- `feat` : 새로운 기능을 추가한 경우
- `fix` : 버그를 고친 경우
- `design` : CSS 등 사용자 UI 디자인을 변경한 경우
- `refactor` : 프로덕션 코드 리팩토링의 경우 (새로운 기능이나 버그 수정 없이 현재 구현을 개선)
- `docs` : 문서를 수정한 경우
- `comment` : 필요한 주석 추가 및 변경의 경우
- `chore` : 위의 경우에 포함되지 않는 경우


## CLASS NAME FOR CSS
`BEM` 방법론 적용



<br/><br/>


# 👋 구현 요구 사항 👋  
### 레이아웃
  <img width="1185" alt="image" src="https://github.com/sean2337/fe-todo/assets/100525337/e571370f-6bd6-44de-94e0-b4740edcb3d5">

### 메뉴(활동 기록)
  <img width="1434" alt="image" src="https://github.com/sean2337/fe-todo/assets/100525337/4047e991-f2c9-46eb-a3c0-5009ae01cf2b">

### 새로운 카드 등록
<img width="1426" alt="image" src="https://github.com/sean2337/fe-todo/assets/100525337/172cd575-28d0-4cdf-975a-0d04a5708593">


### 카드 이동
<img width="1440" alt="image" src="https://github.com/sean2337/fe-todo/assets/100525337/841a93d2-e860-47bc-b43c-e58b73169008">


### 카드 삭제
<img width="1422" alt="image" src="https://github.com/sean2337/fe-todo/assets/100525337/a874843e-527c-460f-9e84-110648c5e862">

### 카드 수정
<img width="1399" alt="image" src="https://github.com/sean2337/fe-todo/assets/100525337/0179bddf-a9c4-463e-b2fd-0ee08734ace3">






<br/><br/>

# 👏 프로젝트 아키텍처 👏
![image](https://github.com/sean2337/fe-todo/assets/100525337/9a94fe03-98e8-4949-983d-67e3d4ba230f)

## 1. 프로젝트 구조
프로젝트 구조를 우선 component, Store, Utils, Assets로 잡았습니다.
이를통해 프로젝트의 메인 구조 자체를 컴포넌트 단위로 개발을 했습니다.
컴포넌트의 경우 최상위 함수인 index.js의 크기를 줄이기 위해 먼저 앱 컴포넌트가 존재하며 다른 컴포넌트를 포함합니다.
이후에 그 안에서 헤더 영역, 투두리스트 아이템 영역, 히스토리 영역, 모달 영역으로 크게 존재합니다. 
각각의 영역은 관련된 컴포넌트를 렌더링하게 됩니다.
또한 투드리스트 영역을 보시면 테이블 안에 컬럼, 컬럼 안에 아이템이 있듯이 큰 컴포넌트도 단위별로 쪼개서 컴포넌트 안에 관련 컴포넌트가 있게 개발을 진행했습니다.

## 2. Store 객체의 낙관적 업데이트 방식 적용
Store의 경우 플럭스 구조로 개발했습니다. 
여기서 기본 방법과 다르게 한 부분이 있는데 State에 변화를 줄때, Client State, Server State 변화 함수를 각각 실행시켰습니다. 그리고 Server 응답과는 관계없이 Client State로 구독되어있는 렌더링 함수를 실행시켜 구현하였습니다. 
이번 프로젝트에서 Store를 사용하면서 얻을 수 있는 강점을 가장 잘 살릴 수 있을지에 대한 고민해보았고, 이를 적용하려 한 시도입니다.
제가 생각한 Store객체를 통해 얻을 수 있는 점은 다음과 같습니다.
- Store의 강점
    1. 데이터에 흐름을 단방향으로 제어를 하고 서버를 통해 받은 데이터를 한 곳에서 조작함으로써 관리를 쉽게 합니다.. 
    2. 여러 컴포넌들이 하나의 저장소를 공유하게 됩니다. 이를 따라서 React로 개발을 진행할때 생길 수 있는 문제인 깊은 depth에 props를 계속 전달하는 복잡한 과정을 건너뛸 수 있게 됩니다.
    3. 마지막으로 Store객체를 통해 낙관적 업데이트로 구현이 가능한데 이를 통해 서버에 송수신을 기다리지 않고 사용자에게 빠른 응답을 줄 수 있습니다.
  
저는 1,2번은 Store를 만들면 자연스럽게 이루어지는 이점이라고 생각했고, 3번에 대한 고민을 많이 했었습니다.
3번 같은 경우는 제가 어떻게 개발하냐에 따라 얻을 수도 있고 못얻을수도 있는 장점이었습니다. 낙관적 업데이트를 하게 될 경우, Client State와 Server State가 다를 수 있다는 부정확도 단점이 존재하긴 하지만 스토어에 강점을 보다 가장 잘 살릴 수 있는 방법이라는 생각이 들어서 이렇게 개발을 시도했습니다. 

하지만 이를 위해서 서버 송수신이 끝나고 Client State와 Server State가 다를 경우 이를 개선해줄 어떠한 로직이 추가되어져야 된다고 생각합니다.


<br/><br/>

# 👏 관련 영상 👏
https://youtu.be/4QDlIh_Menc
