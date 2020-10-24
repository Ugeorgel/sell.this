const popup = document.getElementById('feedbackSendFormPopup');
const sendBtn = document.getElementById('feedbackSendFormBtn');
const sendBtnSmall = document.getElementById('feedbackSendFormBtnSmallScreen');
const closeBtn = document.getElementById('sendFormPopupClose');

export default () => {
    bindFormPopup();
}

function bindFormPopup() {
    sendBtn.addEventListener('click', shopPopup);
    sendBtnSmall.addEventListener('click', shopPopup);
    closeBtn.addEventListener('click', closePopup);
}

function shopPopup() {
    setTimeout(() => {
        popup.classList.add('feedback__send-form__popup_active');
        setTimeout(() => {
            popup.classList.remove('feedback__send-form__popup_active');
        }, 5000)
    }, 700)
}

function closePopup() {
    popup.classList.remove('feedback__send-form__popup_active');
}