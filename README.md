<h1>Todo-list with vanilla js </h1>
<p>이진걸, 김상민</p>

## ⛰ 페어프로그래밍 룰

- 네비게이터와 드라이버를 25분씩 번갈아 가면서 진행
- 50분 코딩 후 10분 휴식
- 점심시간 리펙토링

## ⌨️ 코드컨벤션

- 기본적으로 카멜케이스 지향
- 변수명은 명사 지향
- 함수는 동사 + 명사
- 상수는 대문자 명사, 띄어쓰기는 언더스코어
- CSS BEM 적용
- HTML semantic tag 사용(div, span 지양)

<h2>🌱 Commit Convention</h2>
<ul>
<li>
<p>커밋 메시지 규칙</p>
<ul>
<li><code>gitmoji</code>: <code>commit message</code></li>
<li>예시) <code>feat: add login fn</code></li>
</ul>
</li>
<li>
<p><code>gitmoji</code></p>

| Tag Name           | Description                             |
| ------------------ | --------------------------------------- |
| :construction:     | 빌드 관련 파일 추가 및 수정             |
| :art:              | UI, 스타일 관련 파일 추가 및 수정       |
| :seedling:         | 새로운 기능 추가, 구현                  |
| :camera_flash:     | asset 파일(이미지, 아이콘 등) 추가      |
| :memo:             | 문서 파일 추가 및 수정                  |
| :wheelchair:       | 웹 접근성 향상을 위한 코드 추가 및 수정 |
| :pencil2:          | 단순 오타 수정                          |
| :bug:              | 버그 수정                               |
| :adhesive_bandage: | 단순한, critical하지 않은 이슈 수정     |
| :truck:            | 파일, 경로, route를 옮기거나 이름 변경  |
| :recycle:          | 코드 리팩토링                           |
| :wastebasket:      | 삭제(파일, 코드)                        |
| :see_no_evil:      | gitignore 추가 및 수정                  |
| :rotating_light:   | 급하게 치명적인 버그를 고쳐야하는 경우  |

</li>
<li>
<p><code>commit message</code></p>
<a href="https://blog.ull.im/engineering/2019/03/10/logs-on-git.html">커밋 메시지 사전</a>
</li>
</ul>
<h2>🪵 Branch Convention</h2>

![Image](https://github.com/users/Sang-minKIM/projects/1/assets/87116017/442fa51c-352b-4c2b-bc5b-6c3b4947f6f5)

<ul>
<li>Issue를 생성한다. (작업의 단위, 번호 부여)</li>
<li>Issue의 Feature Branch를 생성한다.
<ul>
<li><code>{접두어}#이슈번호_{작업명}</code></li>
<li>예시: fix#12_card</li>
</ul>
</li>
<li>Add - Commit - Push - Pull Request 의 과정</li>
<li>작업이 끝나면 feature에서 dev로 PR</li>
<li>하루 마다 dev에서 upstream으로 PR</li>
<li>upstream에 PR merge되면 git fetch 후 feature에서 작업</li>
</ul>
<h2>🌳 PR Convention</h2>
<ul>
<li>기능 단위로 PR 날리기</li>
<li>PR Template 사용
<ul>
<li>타이틀</li>
<li>작업사항</li>
<li>실행 화면</li>
</ul>
</li>
</ul>  
<br>

# 기능 요구 사항

## 퍼블리싱

- [x] 메인 페이지
- [x] 사용자 활동 기록
- [x] 컴포넌트화

## 새로운 카드 등록

- [x] 카드 등록 폼 만들기
- [x] 카드 등록
- [x] 사용자 활동 기록에 반영

## 카드 삭제

- [x] 카드 삭제
- [x] 사용자 활동 기록 반영

## 카드 수정

- [x] 카드 수정 폼에 이전 내용 들어오게 만들기
- [x] 카드 수정
- [x] 사용자 활동 기록 반영

## 카드 이동

- [x] 카드 이동
- [x] 사용자 활동 기록 반영

## 비동기 통신

- json-server 이용
  - [x] 등록
  - [x] 삭제
  - [x] 수정
  - [x] 이동

# 특징

## 서비스 흐름

![](https://github.com/Sang-minKIM/softeer-fe-todo/assets/87116017/860f3665-9bb5-4e35-8e2a-47d4a1182984)

- 서비스 흐름이 한 방향이 되도록 했습니다.
- 역할에 따라 모듈을 분리하고 각 모듈이 자신의 역할에만 충실하도록 했습니다.
