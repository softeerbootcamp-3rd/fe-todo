import { ButtonView } from "../components/ButtonView.js";

export const ModalView = ({ content, btnText }) => {
    return `
        <div id='modal' class="modal__container">
            <section class="modal__content">
                <p class="modal__text">${content}</p>
                <div class="modal__btn-list">
                    ${ButtonView({
                    color: "#6e7191",
                    bgColor: "#f7f7fc",
                    text: "취소",
                    target: "modalCancel",
                    })}
                    ${ButtonView({
                    color: "#fefefe",
                    bgColor: "#ff3b30",
                    text: btnText,
                    target: "modalConfirm",
                    })}
                </div>
            </section>
        </div>
    `;
};

export const confirmHandlerInjector = (func) => {
    document.querySelector('.js-modalConfirm').addEventListener('click', confirmModalHandlerMaker(func));
}

export const confirmModalHandlerMaker = (func) => {
    return ({target}) => {
        func();
        const modal = target.closest("#modal");
        modal.remove();
    };
};

export const cancelModalHandler = (target) => {
    const modal = target.closest("#modal");
    modal.remove();
};