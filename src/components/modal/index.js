import { modalTemplate } from "./template";

export default function modal(parent, props) {
  parent.innerHTML = modalTemplate(props);

  const modalSection = parent.querySelector('[todo-section="modalSection"]');
  modalSection.addEventListener("click", (e) => {
    //app/index.js에서 선언해준 modal전체 영역을 눌렀을 때, 모달이 꺼지는 함수를 방지
    e.stopPropagation();
  });

  const cancelBtn = parent.querySelector('[todo-data="cancelBtn"]');
  cancelBtn.addEventListener("click", () => {
    //밖에 클릭하면 나가는 함수를 취소 버튼에도 적용
    parent.click();
  });

  const deleteBtn = parent.querySelector('[todo-data="deleteBtn"]');
  deleteBtn.addEventListener("click", () => {
    parent.click();
    props.onDelete();
  });
}
