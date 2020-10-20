export default function initThirdScreenInteractivity() {
    let screenWidth = window.screen.width;
    const smmBlock = document.querySelectorAll('.services__title h2')[0]
    const smmFirstTab = document.querySelectorAll('.services__subparagraph-title')[0]
    if (screenWidth < 1000) {
        bindDropdownBtns()
        bindSliderSwitchers()
        document.querySelectorAll('#services__pagination li')[0].dispatchEvent(new Event('click', { bubbles: true }))
    } else {
        bindSubParagraph()
        bindTitles()
        
        smmBlock.dispatchEvent(new Event('click', { bubbles: true }))
        setTimeout(() => {
            smmFirstTab.dispatchEvent(new Event('click', { bubbles: true }))
        }, 0)
    }
}

function bindTitles() {
    const titles = document.querySelectorAll('#services__title h2');
    const contentScreens = document.querySelectorAll('#services__screen .services__block')
    titles.forEach((title, i) => {
        title.addEventListener('click', (e) => {
            titles.forEach(title => title.classList.add('services__title_default'))
            title.classList.remove('services__title_default')
            
            contentScreens.forEach((screen) => screen.style.display = 'none')
            contentScreens[i].style.display = 'block'
            contentScreens[i].querySelectorAll('.services__subparagraph-title')[0].dispatchEvent(new Event('click', { bubbles: true }))
        })
    })
}

function bindSubParagraph() {
    const titles = document.querySelectorAll('.services__subparagraph-title');
    titles.forEach((title) => {
        title.addEventListener('click', openData)
    })
}

function openData(e) {
    const initiator = e.path[3];
    const allInitiators = document.querySelectorAll('.services__block-item')
    const articles = document.querySelectorAll('.services__collapsed-article')
    const targetArticle = e.path[3].querySelector('article');

    allInitiators.forEach((item) => item.classList.add('services__block-item_disabled'))
    initiator.classList.remove('services__block-item_disabled')
    articles.forEach((article) => {
        article.style.transition = '0'
        article.style.maxHeight = '0'
    });
    setTimeout(() => {
        targetArticle.style.transition = '.2'
        targetArticle.style.maxHeight = '1000px'
    }, 200)
}

function bindDropdownBtns() {
    const dropdownBtns = document.querySelectorAll('.servicesDropdownBtn')
    dropdownBtns.forEach((btn) => {
        btn.addEventListener('click', expandServicesInfo)
    })
}

function expandServicesInfo(e) {
    const targetServicesItem = e.path[3];
    const targetArticle = targetServicesItem.querySelector('article')

    const expandButton = e.target;
    const collapseButton = targetArticle.querySelector('button');

    expandButton.removeEventListener('click', expandServicesInfo)
    targetArticle.classList.add('services__expanded-article')
    
    bindCollapseBtns(expandButton, targetArticle)
    bindCollapseBtns(collapseButton, targetArticle)
}

function bindCollapseBtns(btn, article) {
    const wrapCollapseServicesInfo = (e) => {
        collapseServicesInfo(e, article, wrapCollapseServicesInfo)
    }
    btn.addEventListener('click', wrapCollapseServicesInfo)
}

function collapseServicesInfo(e, article, bindFunc) {
    article.classList.remove('services__expanded-article')
    e.target.removeEventListener('click', bindFunc)
    bindDropdownBtns()
}

function bindSliderSwitchers() {
    const paginationBtns = document.querySelectorAll('#services__pagination li')
    paginationBtns.forEach((btn, index) => {
        btn.addEventListener('click', (e) => changeServiceInfo(e, index))
    })
}

function changeServiceInfo(e, index) {
    markEventInitiator(e)
    changeServiceHeader(e, index)
    changeServiceInfoBlock(e, index)
}

function changeServiceHeader(e, index) {
    const headerList = document.getElementById('services__title');
    const viewportWidth = window.innerWidth;
    const offset = viewportWidth * index;

    headerList.style.left = `-${offset}px`;
}

function changeServiceInfoBlock(e, index) {
    const infoBlockList = document.querySelectorAll('#services__screen .services__block');
    const targetInfoBlock = infoBlockList[index];

    infoBlockList.forEach((block) => {
        block.style.opacity = '0';
        setTimeout(() => {
            block.style.display = 'none';
        }, 300)
    })

    setTimeout(() => {
        targetInfoBlock.style.display = 'block';
        targetInfoBlock.style.opacity = '1';
    }, 300)
}

function markEventInitiator(e) {
    const eventInitiator = e.currentTarget.querySelector('div');
    const btnList = e.path[2].querySelectorAll('li div');
    
    btnList.forEach((btn) => btn.classList.remove('pagination-item__icon--active'))
    eventInitiator.classList.add('pagination-item__icon--active')
}