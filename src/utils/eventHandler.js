import Card, { handleRegisterStatus } from "../components/cards.js";

const targetList = [
  "add",
  "inputTitle",
  "inputContent",
  "cancelBtn",
  "registerBtn",
  "saveBtn",
  "deleteBtn",
  "editBtn",
];

export default function customEventHandler(target) {
  switch (target.id) {
    case targetList[0]: {
      addCard(target);
      break;
    }
    case targetList[1]: {
      break;
    }
    case targetList[2]: {
      break;
    }
    case targetList[3]: {
      break;
    }
    case targetList[4]: {
      break;
    }
    case targetList[5]: {
      break;
    }
    case targetList[6]: {
      break;
    }
    case targetList[7]: {
      break;
    }

    default:
      break;
  }
}

// '+' 버튼 클릭시 카드 추가
function addCard(target) {
  const column = target.closest(".column");
  console.log(column);
  const isExistCard = column.querySelector(".newCard");
  if (!isExistCard) {
    const card = Card();
    column.appendChild(card);
    handleRegisterStatus(column);
  } else {
    isExistCard.remove();
  }
}
