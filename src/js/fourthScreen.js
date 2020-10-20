export default function initFourthScreenInteractivity() {
    let orientation;
    let offsetStep;
    let portrait;
    let screenWidth;
    let interactionInterval;
    let otherCoverTimeout;
    let mainCoverTimeout;
    let incrementNumberTimeout;
    let scaleStep = 0.81;
    const brightnessStep = 0.25;
    let projectsCovers = document.querySelectorAll('.projects__cover-item');
    const projectsArticle = document.querySelectorAll('.projects__article-text');
    let currentMainCoverNumber = 0;

    clearInterval(interactionInterval);
    clearTimeout(otherCoverTimeout);
    clearTimeout(mainCoverTimeout);
    clearTimeout(incrementNumberTimeout);
    
    projectsCovers.forEach(cover => {
        cover.removeAttribute('style')
        cover.classList.remove('.cover-item__animation--toBackground_portrait')
        cover.classList.remove('.cover-item__animation--toBackground_landscape')
    })
    projectsArticle.forEach(article => article.removeAttribute('style'))

    orientation = window.screen.orientation.type;
    screenWidth = window.screen.width;

    if (orientation === 'landscape-primary') {
        portrait = false;
        offsetStep = 15;
    }
    if (orientation === 'portrait-primary' && screenWidth < 768) {
        portrait = true;
        offsetStep = 7;
    }
    if (orientation === 'portrait-primary' && screenWidth >= 768) {
        portrait = true;
        offsetStep = 50;
    }
    if (orientation === 'landscape-primary' && screenWidth >= 1000) {
        offsetStep = 80;
    }
    if (screenWidth >= 1160) {
        offsetStep = 50;
        scaleStep = 0.84;
    }
    if (screenWidth >= 1600) {
        offsetStep = 70;
    }

    setCoversFirstPosition(projectsCovers);
    setTextFirstPosition();
    bindMoveOnCover(projectsCovers[0]);
    calculateProjectsArticleHeight();
    calculateProjectCoverBlock()
    bindNextProjectButton();

    if (screenWidth >= 1160) {
      startProjectsSLider()
    }

    function bindMoveOnCover(coverElement) {
        if (screenWidth < 1160) {
            coverElement.addEventListener('touchmove', switchSliderToNextProject)
        }
    }

    function switchSliderToNextProject() {
        projectsCovers = document.querySelectorAll('.projects__cover-item');
        projectsCovers[currentMainCoverNumber].removeEventListener('touchmove', switchSliderToNextProject)
        unBindNextProjectButton()

        portrait && screenWidth < 768
            ? projectsCovers[currentMainCoverNumber].classList.add('cover-item__animation--toBackground_portrait')
            : projectsCovers[currentMainCoverNumber].classList.add('cover-item__animation--toBackground_landscape')

        switchTextArticle();

        otherCoverTimeout = setTimeout((allCovers) => {
            allCovers[currentMainCoverNumber].style.zIndex = '-4';
            allCovers.forEach((cover, index) => {
                if (index !== currentMainCoverNumber) {
                    portrait && screenWidth < 768
                        ? cover.style.right = `${parseInt(cover.style.right.split('px')[0], 10) + offsetStep}px`
                        : cover.style.left = `${parseInt(cover.style.left.split('px')[0], 10) - offsetStep}px`
                    cover.style.transform = `scale(${parseFloat(cover.style.transform.split('(')[1]) / scaleStep})`
                    cover.style.filter = `brightness(${parseFloat(cover.style.filter.split('(')[1]) + brightnessStep})`
                    cover.style.transition = '1s';
                    cover.style.zIndex = `${parseInt(cover.style.zIndex, 10) + 1}`
                } else {
                    mainCoverTimeout = setTimeout((cover) => {
                        portrait && screenWidth < 768
                            ? cover.style.right = `-${offsetStep * 3}px`
                            : cover.style.left = `${offsetStep * 3}px`;
                        cover.style.transform = `scale(${Math.pow(scaleStep, 3)})`;
                        cover.style.filter = 'brightness(0.25)';
                        cover.style.zIndex = '-3';

                        portrait && screenWidth < 768
                            ? cover.classList.remove('cover-item__animation--toBackground_portrait')
                            : cover.classList.remove('cover-item__animation--toBackground_landscape')
                    }, 900, cover)
                }
            })
        }, 600, projectsCovers)

        incrementNumberTimeout = setTimeout((allCovers) => {
            if (++currentMainCoverNumber === allCovers.length) {
                currentMainCoverNumber = 0;
            }

            bindMoveOnCover(allCovers[currentMainCoverNumber])
            bindNextProjectButton()
        }, 1500, projectsCovers)
    }

    function setCoversFirstPosition(covers) {
        if (screenWidth < 1160) {
            covers.forEach((cover, index) => {
                const offset = index * offsetStep
                const scale = Math.pow(scaleStep, index)
                const brightness = 1 / (index + 1);

                cover.style.transform = `scale(${scale})`;
                cover.style.zIndex = `-${index}`;
                cover.style.filter = `brightness(${brightness})`;

                if (
                    (orientation === 'landscape-primary')
                    || (orientation === 'portrait-primary' && screenWidth >= 768)
                ) {
                    cover.style.left = `${offset}px`;
                }

                if (orientation === 'portrait-primary') {
                    cover.style.right = `-${offset}px`;
                }
            })
        }
        if (screenWidth >= 1160) {
            covers.forEach((cover, index) => {
                const offset = index !== 3 ? index * -offsetStep : offsetStep;
                const transformOrigin = index !== 3 ? 'top' : 'bottom';
                const scale = index !== 3 ? Math.pow(scaleStep, index) : scaleStep;
                const zIndex = index !== 3 ? `-${index}` : -1;
                const brightness = !index ? 1 : 0.5;

                cover.style.top = `${offset}px`;
                cover.style.transformOrigin = transformOrigin;
                cover.style.transform = `scale(${scale})`;
                cover.style.zIndex = zIndex;
                cover.style.filter = `brightness(${brightness})`;
            })
        }
    }

    function calculateProjectsArticleHeight() {
        const articleItems = document.querySelectorAll('.projects__article-text');
        const articleList = document.querySelector('.projects__article-list');
        let articleMaxHeight;

        articleMaxHeight = [...articleItems].map(item => item.offsetHeight)
        articleList.style.height = `${Math.max(...articleMaxHeight)}px`
    }

    function setTextFirstPosition() {
        const firstArticle = projectsArticle[0];
        firstArticle.style.opacity = 1
    }

    function switchTextArticle() {
        let prevArticleNumber = currentMainCoverNumber;
        let nextArticleNumber = prevArticleNumber + 1;
        let prevArticle;
        let nextArticle;

        if (nextArticleNumber === projectsArticle.length) {
            nextArticleNumber = 0;
        }

        prevArticle = projectsArticle[prevArticleNumber]
        nextArticle = projectsArticle[nextArticleNumber]

        prevArticle.style.transform = 'scale(0.5)';
        prevArticle.style.opacity = 0;

        nextArticle.style.transition = 0;
        nextArticle.style.transform = 'scale(1)';
        nextArticle.style.opacity = 1;
    }

    function bindNextProjectButton() {
        if (screenWidth < 1160) {
            document.getElementById('projectsNextProjectBtn').addEventListener('click', switchSliderToNextProject)
        }
    }

    function unBindNextProjectButton() {
        document.getElementById('projectsNextProjectBtn').removeEventListener('click', switchSliderToNextProject)
    }

    function calculateProjectCoverBlock() {
        const projectsCoverBlock = document.getElementById('projectsCoverBlock');
        const coversWrapsList = projectsCoverBlock.querySelectorAll('.projects__cover-item');
        let coversWrapsMaxHeight = 0;

        coversWrapsMaxHeight = [...coversWrapsList].map(item => item.offsetHeight)
        projectsCoverBlock.style.height = `${Math.max(...coversWrapsMaxHeight)}px`
    }

    function startProjectsSLider() {
        interactionInterval = setInterval(() => {
            const mainCover = projectsCovers[currentMainCoverNumber]
            let coverBeforeMain;
            let coverNumberBeforeMain;

            if (!currentMainCoverNumber) {
                coverNumberBeforeMain = 3;
            } else {
                coverNumberBeforeMain = currentMainCoverNumber - 1;
            }

            coverBeforeMain = projectsCovers[coverNumberBeforeMain];

            mainCover.style.transformOrigin = 'bottom';
            mainCover.style.top = `${offsetStep}px`;
            mainCover.style.transform = `scale(${scaleStep})`;
            mainCover.style.filter = 'brightness(0.5)';
            mainCover.style.zIndex = -1;

            coverBeforeMain.style.top = `${offsetStep * -2}px`;
            coverBeforeMain.style.transformOrigin = 'top';
            coverBeforeMain.style.transform = `scale(${Math.pow(scaleStep, 2)})`
            coverBeforeMain.style.filter = 'brightness(0.5)';
            coverBeforeMain.style.zIndex = -2;

            projectsCovers.forEach((cover, index) => {
                if (index !== currentMainCoverNumber && index !== coverNumberBeforeMain) {
                    const offset = parseInt(cover.style.top, 10) + offsetStep;
                    const scale = parseFloat(cover.style.transform.split('(')[1]) / scaleStep
                    const brightness = currentMainCoverNumber + 1 === 4 && !index
                        || currentMainCoverNumber + 1 === index
                        ? 1
                        : 0.5;
                    const zIndex = parseInt(cover.style.zIndex, 10) + 1;

                    cover.style.top = `${offset}px`;
                    cover.style.transform = `scale(${scale})`;
                    cover.style.filter = `brightness(${brightness})`;
                    cover.style.zIndex = zIndex
                }
            })

            switchTextArticle();

            if (++currentMainCoverNumber === 4) {
                currentMainCoverNumber = 0;
            }

        }, 3000);
    }
}