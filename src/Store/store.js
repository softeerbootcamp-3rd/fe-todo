import { getData } from "../services/http.js";

export class TodoStore {
    constructor() {
        this.columnList = [];
        this.cardData = [];
        this.fetchInitialData();
    }

    async fetchInitialData() {
        // 서버에서 초기 데이터를 가져오는 비동기 함수
        this.columnList = await getData();
    }

    dispatch(action) {
        // 액션을 처리하고 상태를 업데이트
        this.handleAction(action);
        // 상태가 업데이트되었을 때 뷰에게 알림
        this.renderView();
    }

    handleAction(action) {
        // 액션에 따라 상태를 업데이트
        switch (action.type) {
            case ActionTypes.ADD_CARD:
                // 추가 로직 작성
                break;
            case ActionTypes.DELETE_CARD:
                // 삭제 로직 작성
                break;
            case ActionTypes.UPDATE_CARD:
                // 업데이트 로직 작성
                break;
            default:
            // 다른 액션에 대한 처리
        }
    }

    renderView() {
        // 상태를 기반으로 뷰를 업데이트
        // DOM 엘리먼트를 업데이트하여 변경 사항을 반영
    }
}

// 액션 타입 정의
const ActionTypes = {
    ADD_CARD: "ADD_CARD",
    DELETE_CARD: "DELETE_CARD",
    UPDATE_CARD: "UPDATE_CARD",
};
