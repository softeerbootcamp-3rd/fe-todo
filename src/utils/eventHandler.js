import { addCard } from "../components/columns.js";
import {
  cancelHandler,
  registerCard,
  saveHandler,
  deleteHandler,
  editCard,
} from "../components/cards.js";

const targetIdList = {
  add: addCard,
  inputTitle: checkRegisterStatus,
  inputContent: checkRegisterStatus,
  cancelBtn: cancelHandler,
  registerBtn: registerCard,
  saveBtn: saveHandler,
  deleteBtn: deleteHandler,
  editBtn: editCard,
};

export default function customEventHandler(event) {
  const target = event.target;
  const parentTarget = event.currentTarget;

  const handleTarget = targetIdList[target.id];
  if (handleTarget) {
    handleTarget({ target, parentTarget });
  }
}

// 등록 함수 활성화 판단 함수
function checkRegisterStatus({ parentTarget }) {
  const title = parentTarget.querySelector(".title");
  const content = parentTarget.querySelector(".content");
  const register = parentTarget.querySelector(".register");
  let status = !(title.value.trim() && content.value.trim());

  register.disabled = status;
  register.style.opacity = status ? 0.3 : 1;
}
