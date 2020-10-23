const projectsSection = document.getElementById('projects');
const articleWraps = projectsSection.querySelectorAll('.projects__article-wrap');
const projectArticlesList = projectsSection.querySelector('#projectsArticleList');
const projectsCoverSwitcherUp = document.getElementById('projectsCoverSwitcherUp');
const projectsCoverSwitcherDown = document.getElementById('projectsCoverSwitcherDown');
const projectsCovers = projectsSection.querySelectorAll('.projects__cover-item');
const coverBlock = projectsSection.querySelector('.projects__cover-block');
const projectsArticles = projectArticlesList.querySelectorAll('.projects__article-wrap');

let mainCoverIndex = 2;

export default () => {
    calculateArticleHeight();
    bindCoversSwitchers();
}

function calculateArticleHeight() {
    const heights = [...articleWraps].map((article) => article.clientHeight);
    const maxHeight = Math.max(...heights);

    projectArticlesList.style.height = `${maxHeight}px`;
}

function bindCoversSwitchers() {
    if (window.screen.width >= 1160) {
        projectsCoverSwitcherUp.addEventListener('click', decrementMainCoverIndex);
        projectsCoverSwitcherDown.addEventListener('click', incrementMainCoverIndex);
    }
}

function incrementMainCoverIndex() {
    if (++mainCoverIndex > 3) {
        mainCoverIndex = 0;
    }

    switchCover();
    switchArticle(0);
}

function decrementMainCoverIndex() {
    if (--mainCoverIndex < 0) {
        mainCoverIndex = 3;
    }

    switchCover();
    switchArticle(1);
}

function switchCover() {
    const prevMainCover = coverBlock.querySelector('.projects__cover-item_not-nested');
    const futureMainCover = projectsCovers[mainCoverIndex];

    const prevMainClasses = prevMainCover.classList.value.split(' ');
    const futureMainClasses = futureMainCover.classList.value.split(' ');

    prevMainCover.classList.remove(...prevMainClasses);
    prevMainCover.classList.add(...futureMainClasses);

    futureMainCover.classList.remove(...futureMainClasses);
    futureMainCover.classList.add(...prevMainClasses);
}

function switchArticle(fromUp) {
    const targetArticle = projectsArticles[mainCoverIndex];
    console.log(targetArticle);
}