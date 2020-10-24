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
    let secondCoverLeftOffset;

    function calculateArticleHeight() {
        const heights = [...articleWraps].map((article) => article.clientHeight);
        const maxHeight = Math.max(...heights);

        projectArticlesList.style.height = `${maxHeight}px`;
    }

    function bindCoversSwitchers() {
        if (window.screen.width >= 1000) {
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
        const prevMainCover = coverBlock.querySelector('.projects__cover-item_not-nested.projects__cover-item_mobile_not-nested');
        const futureMainCover = projectsCovers[mainCoverIndex];

        const prevMainClasses = prevMainCover.classList.value.split(' ');
        const futureMainClasses = futureMainCover.classList.value.split(' ');

        if (window.screen.width >= 1160) {
            prevMainCover.removeEventListener('mousedown', moveConfigurator.prepareForMove);
        } else {
            prevMainCover.removeEventListener('touchstart', moveConfigurator.prepareForMove);
        }

        prevMainCover.classList.remove(...prevMainClasses);
        prevMainCover.classList.add(...futureMainClasses);

        futureMainCover.classList.remove(...futureMainClasses);
        futureMainCover.classList.add(...prevMainClasses);

        moveConfigurator = new MainCoverMoveConfigurator(futureMainCover);
        moveConfigurator.run();
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

    function calculateProjectsSectionHeight() {
        if (projectsSection.firstElementChild.offsetHeight > window.screen.height) {
            projectsSection.height = 'unset';
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
            } else {
                this.cover.addEventListener('touchstart', this.prepareForMove)
            }

            this.cover.ondragstart = function () {
                return false;
            };
        }

        prepareForMove(e) {
            if (window.screen.width >= 1160) {
                this.startY = e.clientY;
                document.addEventListener('mousemove', this.onMouseMove);
                document.addEventListener('mouseup', this.onMouseUp);
            } else {
                this.startX = e.touches[0].clientX;
                document.addEventListener('touchmove', this.onMouseMove);
                document.addEventListener('touchend', this.onMouseUp);
            }
        }

        onMouseMove(e) {
            if (window.screen.width >= 1160) {
                this.yDiff = e.clientY - this.startY;

                if (e.clientY < this.startY) {
                    this.isToUp = true;
                } else {
                    this.isToUp = false;
                }
            } else {
                this.xDiff = e.touches[0].clientX - this.startX;
                if (e.touches[0].clientX < this.startX) {
                    this.isToLeft = true;
                } else {
                    this.isToLeft = false;
                }
            }

            this.moveCover();
        }

        onMouseUp() {
            if (window.screen.width >= 1160) {
                document.removeEventListener('mousemove', this.onMouseMove);
                this.cover.removeEventListener('mousedown', this.prepareForMove);
                document.removeEventListener('mouseup', this.onMouseUp);

                this.cover.style.top = null;

                if (this.isToUp) {
                    decrementMainCoverIndex();
                } else {
                    incrementMainCoverIndex();
                }
            } else {
                document.removeEventListener('touchmove', this.onMouseMove);
                this.cover.removeEventListener('touchstart', this.prepareForMove);
                document.removeEventListener('touchend', this.onMouseUp);

                this.cover.style.left = null;

                if (this.isToLeft) {
                    decrementMainCoverIndex();
                } else {
                    incrementMainCoverIndex();
                }
            }
        }

        moveCover() {
            if (window.screen.width >= 1160) {
                let newOffset = mainCoverTopOffset + this.yDiff;
                const limit = this.isToUp ? mainCoverTopOffset / 2 - 30 : mainCoverTopOffset + mainCoverTopOffset / 2 - 30;

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
            } else {
                let newOffset = this.xDiff;
                const limit = this.isToLeft ? -20 : secondCoverLeftOffset + 10;

                if (this.isToLeft) {
                    if (newOffset < limit) {
                        newOffset = limit
                    }
                } else {
                    if (newOffset > limit) {
                        newOffset = limit
                    }
                }

                this.cover.style.left = `${newOffset}px`;
            }

        }
    }


    let moveConfigurator = new MainCoverMoveConfigurator(projectsCovers[mainCoverIndex]);

    calculateArticleHeight();
    bindCoversSwitchers();
    moveConfigurator.run();

    if (window.screen.width >= 1600) {
        mainCoverTopOffset = 140;
    }

    if (window.screen.width >= 1160 && window.screen.width < 1600) {
        mainCoverTopOffset = 100;
    }

    if (window.screen.width <= 1000 && window.screen.width > 768) {
        secondCoverLeftOffset = 80;
        calculateProjectsSectionHeight();
    }

    if (window.screen.width <= 768 && window.screen.width > 480) {
        secondCoverLeftOffset = 50;
        calculateProjectsSectionHeight();
    }

    if (window.screen.width <= 480 && window.screen.width > 320) {
        secondCoverLeftOffset = 15;
        calculateProjectsSectionHeight();
    }

    if (window.screen.width <= 320) {
        secondCoverLeftOffset = 8;
        calculateProjectsSectionHeight();
    }
}