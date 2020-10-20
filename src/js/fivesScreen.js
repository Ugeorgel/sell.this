export default () => {
    bindFormPopup()
}

const popup = document.getElementById('feedbackSendFormPopup');

function bindFormPopup() {
    const sendBtn = document.getElementById('feedbackSendFormBtn');
    const sendBtnDbl = document.getElementById('feedbackSendFormBtnLarge');
    const close = document.getElementById('sendFormPopupClose');

    sendBtn.addEventListener('click', shopPopup)
    sendBtnDbl.addEventListener('click', shopPopup)

    close.addEventListener('click', () => {
        popup.style.display = 'none';
    })
}

function shopPopup() {
    setTimeout(() => {
        popup.style.display = 'block';
        setTimeout(() => {
            popup.style.display = 'none';
        }, 5000)
    }, 700)
}