# 바닐라 JS로 투두 리스트 만들기

## 개발 기간
2024.01.15 ~ 2024.01.19 (페어 프로그래밍)

2024.01.22 ~ 2024.01.26

## 사용해 보기
### client
```bash
npm install
npm run start
```
### mock server 실행
```bash
npm run server
```

## 기능
- 투두 아이템 추가/수정/삭제
- 드래그 & 드롭
- 투두 아이템 변경 기록

## 구조
### 컴포넌트 구조
각 컴포넌트는 함수 형태이며 넘겨준 renderTarget(dom element)에 내용을 렌더링 해주고, 삭제시 실행시켜줘야 하는 clean up 함수를 반환합니다.
![image](https://github.com/junhea/fe-todo/assets/97426534/cf150e17-0306-4960-8742-3f4b3482ee67)

### 상태 관리 방식
store를 구현하여 데이터가 단방향으로 흐르도록 했습니다. (zustand 참고) 
![image](https://github.com/junhea/fe-todo/assets/97426534/b07c0a0e-0f75-4a6d-8a93-08b4ab9f51fd)

### 흐름도
TodoListTable 컴포넌트를 보았을때, 데이터의 흐름은 다음과 같습니다.
![image](https://github.com/junhea/fe-todo/assets/97426534/f5318943-5d7f-4a14-ad31-df48128be810)

## 기타
### 고민했던 점
- 바닐라 JS 개발이 처음이라 구조를 어떻게 잡아야 할지 오랜시간 고민했습니다.
  - UI를 기능 단위로 쪼개어 이를 (컴포넌트)함수로 만들어, 실행하면 해당 컴포넌트가 렌더링 되도록 하였습니다.
  - 자식 컴포넌트가 있을 경우, 함수 내에서 호출하도록 하여 차례대로 렌더링 되도록 설계하였습니다.
- 상태 관리 방식
  - 개발 초기에는 변경사항이 생기면 이를 DOM에 바로 반영하고, 따로 상태를 관리하지 않았습니다.
  - 하지만 자식 컴포넌트의 변경사항이 상위 컴포넌트에 영향을 미치는 경우 콜백 함수를 직접 전달해야 한다는 단점이 있었고, 이는 코드의 가독성을 저하시키는 원인이었습니다
  - 따라서 상태 변화가 단방향으로 전파될 수 있도록 간단한 store를 구현했습니다
    - 컴포넌트는 필요한 데이터(상태)가 있는 store에 구독합니다
    - 컴포넌트에서 유저 상호작용이 발생할 경우 store에 action을 보냅니다
    - action는 store의 state를 변경하고, 구독한 컴포넌트의 콜백을 호출하여 뷰를 업데이트 시켜줍니다
- 컴포넌트의 구조 및 life cycle
  - 구독/발행 방식을 사용한 store의 도입으로 인해 컴포넌트가 삭제되는 순간을 감지해야 했습니다
  - 기존에는 함수를 한번만 실행한후 이후 변경 사항은 핸들러가 처리해주었기에(DOM에서 삭제시 GC가 자동으로 삭제), 컴포넌트의 인스턴스들을 따로 관리하지 않았습니다.
  - 이를 해결하기 위해 closure를 활용하여, 컴포넌트를 생성/삭제하는 핸들러/콜백 함수 바깥에 컴포넌트의 clean up 함수들을 저장해 두어, 삭제시 불필요한 컴포넌트들의 clean up을 제대로 진행하도록 하였습니다.
