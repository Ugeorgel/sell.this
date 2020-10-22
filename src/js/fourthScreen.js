const projectsSection = document.getElementById('projects');
const articleWraps = projectsSection.querySelectorAll('.projects__article-wrap');
const projectArticlesList = projectsSection.querySelector('#projectsArticleList');
const projectsCoverSwitcherUp = document.getElementById('projectsCoverSwitcherUp');
const projectsCoverSwitcherDown = document.getElementById('projectsCoverSwitcherDown');
const projectsCovers = projectsSection.querySelectorAll('.projects__cover-item');

let mainCoverIndex = 0;

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
        projectsCoverSwitcherUp.addEventListener('click', incrementMainCoverIndex);
        projectsCoverSwitcherDown.addEventListener('click', decrementMainCoverIndex);
    }
}

function incrementMainCoverIndex() {
    if (++mainCoverIndex > 3) {
        mainCoverIndex = 0;
    }
    switchCover();
}

function decrementMainCoverIndex() {
    if (--mainCoverIndex < 0) {
        mainCoverIndex = 3;
    }
    switchCover();
}