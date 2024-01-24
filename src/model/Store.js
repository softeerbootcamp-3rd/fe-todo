export class Store {
  constructor(createState) {
    this.state = undefined;
    this.listeners = new Set();
    this.createState = createState;
    this.initializeState();
  }

  /**
   * 상태 업데이트 함수
   * @param {*} partial
   * 다음 상태의 일부를 나타내는 값 또는 함수
   * @param {*} replace
   * 선택적 매개변수 불리언 값, true: partial이 아닌 nextState를 새로운 상태로 설정. false or 생략된 경우: partial이나 함수로부터 계산된 nextState가 현재 상태(this.state)에 병합
   */
  setState(partial, replace) {
    const nextState = typeof partial === "function" ? partial(this.state) : partial;

    if (Object.is(nextState, this.state)) {
      console.log("state 형식이 다릅니다");
      return;
    }

    const previousState = this.state;

    this.state =
      replace || typeof nextState !== "object" || nextState === null
        ? nextState
        : Object.assign({}, this.state, nextState);

    this.listeners.forEach((listener) => listener(this.state));
  }

  getState() {
    return this.state;
  }

  getInitialState() {
    return this.initialState;
  }

  /**
   * 리스너를 등록하는 함수
   * @param {*} listener
   * 구독하고 있는 핸들러에서 넘겨줄 렌더 함수
   * @returns
   * 리스너를 제거하는 함수 반환 (구독 취소에 사용)
   */
  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  initializeState() {
    // 상태 생성 함수에 상태 업데이트 메서드와 상태 반환 메서드, 현재 인스턴스를 전달하여 초기 상태 설정
    this.initialState = this.createState(this.setState.bind(this), this.getState.bind(this), this);
    this.state = this.initialState;
  }
}

// 비동기 작업 대비
export class AsyncStore extends Store {
  constructor(createState, apiEndpoint) {
    super(createState);
    this.apiEndpoint = apiEndpoint;
  }

  async fetchData() {
    try {
      const response = await fetch(this.apiEndpoint);
      const data = await response.json();

      this.setState({ data });
    } catch (error) {
      console.error("데이터 가져오기 오류:", error);
    }
  }

  async updateServer() {
    // 서버 업데이트 로직을 구현 (예: await fetch('서버/api', { method: 'POST', body: JSON.stringify(this.getState()) });)
  }
}
