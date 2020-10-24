const projectsSection = document.getElementById('projects');
const articleWraps = projectsSection.querySelectorAll('.projects__article-wrap');
const projectArticlesList = projectsSection.querySelector('#projectsArticleList');
const projectsCoverSwitcherUp = document.getElementById('projectsCoverSwitcherUp');
const projectsCoverSwitcherDown = document.getElementById('projectsCoverSwitcherDown');
const projectsCovers = projectsSection.querySelectorAll('.projects__cover-item');
const coverBlock = projectsSection.querySelector('.projects__cover-block');
const projectsArticles = projectArticlesList.querySelectorAll('.projects__article-wrap');
const projectsQuestion = projectsSection.querySelector('.projects__question');

export default () => {
    let mainCoverIndex = 2;
    let mainCoverTopOffset;

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
        switchQuestionColor();
    }
    
    function decrementMainCoverIndex() {
        if (--mainCoverIndex < 0) {
            mainCoverIndex = 3;
        }
    
        switchCover();
        switchArticle(1);
        switchQuestionColor();
    }
    
    function switchCover() {
        const prevMainCover = coverBlock.querySelector('.projects__cover-item_not-nested');
        const futureMainCover = projectsCovers[mainCoverIndex];
    
        const prevMainClasses = prevMainCover.classList.value.split(' ');
        const futureMainClasses = futureMainCover.classList.value.split(' ');

        prevMainCover.removeEventListener('mousedown', moveConfigurator.prepareForMove);
    
        prevMainCover.classList.remove(...prevMainClasses);
        prevMainCover.classList.add(...futureMainClasses);
    
        futureMainCover.classList.remove(...futureMainClasses);
        futureMainCover.classList.add(...prevMainClasses);
    
        if (window.screen.width >= 1160) {
            moveConfigurator = new MainCoverMoveConfigurator(futureMainCover);
            moveConfigurator.run();
        }
    }
    
    function switchArticle(fromUp) {
        const targetArticle = projectsArticles[mainCoverIndex];
    
        projectsArticles.forEach((article) => {
            if (article === targetArticle) {
                if (fromUp) {
                    article.classList.add('projects__article-wrap_active-fromUp')
                } else {
                    article.classList.add('projects__article-wrap_active-fromBottom')
                }
            } else {
                article.classList.remove('projects__article-wrap_active-fromUp', 'projects__article-wrap_active-fromBottom')
            }
        })
    }
    
    function switchQuestionColor() {
        switch (mainCoverIndex) {
            case 0:
                projectsQuestion.style.color = '#FF653D';
                break;
            case 1:
                projectsQuestion.style.color = '#00BC54';
                break;
            case 2:
                projectsQuestion.style.color = '#EA6682';
                break;
            case 3:
                projectsQuestion.style.color = '#00C2FF';
                break;
            default:
                return;
        }
    }
    
    class MainCoverMoveConfigurator {
        constructor(mainCover) {
            this.cover = mainCover;
            this.prepareForMove = this.prepareForMove.bind(this);
            this.onMouseMove = this.onMouseMove.bind(this);
            this.onMouseUp = this.onMouseUp.bind(this);
        }
    
        run() {
            if (window.screen.width >= 1160) {
                this.cover.addEventListener('mousedown', this.prepareForMove);
            }
    
            this.cover.ondragstart = function() {
                return false;
            };
        }
    
        prepareForMove(e) {
            this.startY = e.clientY;
            document.addEventListener('mousemove', this.onMouseMove);
            document.addEventListener('mouseup', this.onMouseUp)
        }
    
        onMouseMove(e) {
            this.yDiff = e.clientY - this.startY;
            if (e.clientY < this.startY) {
                this.isToUp = true;
            } else {
                this.isToUp = false;
            }
            this.moveCover();
        }
    
        onMouseUp() {    
            document.removeEventListener('mousemove', this.onMouseMove);
            this.cover.removeEventListener('mousedown', this.prepareForMove);
            document.removeEventListener('mouseup', this.onMouseUp);

            this.cover.style.top = null;

            if (this.isToUp) {
                decrementMainCoverIndex();
            } else {
                incrementMainCoverIndex();
            }
        }
    
        moveCover() {
            let newOffset = mainCoverTopOffset + this.yDiff;
            const limit = this.isToUp ? mainCoverTopOffset / 2 + 10 : mainCoverTopOffset + mainCoverTopOffset / 2 - 30;
    
            if (this.isToUp) {
                if (newOffset < limit) {
                    newOffset = limit
                }
            } else {
                if (newOffset > limit) {
                    newOffset = limit
                }
            }
    
            this.cover.style.top = `${newOffset}px`;
        }
    }


    let moveConfigurator = new MainCoverMoveConfigurator(projectsCovers[mainCoverIndex]);

    calculateArticleHeight();
    bindCoversSwitchers();
    moveConfigurator.run();

    if (window.screen.width >= 1600) {
        mainCoverTopOffset = 140;
    }
}