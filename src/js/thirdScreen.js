const servicesSection = document.getElementById('services');
const titles = servicesSection.querySelectorAll('.services__title');
const servicesScreen = document.getElementById('servicesScreen');
const servicesBlocks = servicesSection.querySelectorAll('.services__block');
const expandBtns = servicesSection.querySelectorAll('.services__article-height-control__expand');
const collapseBtns = servicesSection.querySelectorAll('.services__article-height-control__collapse');
const paginationItems = servicesSection.querySelectorAll('.services__pagination-item');

const servicesScreenDefaultHeight1920 = 520;

let currentServicesScreenIndex = 0;
let xDown;
let xUp;

export default function initThirdScreenInteractivity() {

  if (window.screen.width >= 1000) {
    calculateServicesScreenHeight();
    bindServicesTitlesToClick();
    bindSubmenuToClick();
  }    

  if (window.screen.width < 1000) {
    bindServicesScreen();
    bindExpandBtn();
    bindCollapseBtn();
    collapseBtns[0].click();
    collapseBtns[4].click();
    collapseBtns[8].click();
  }
}

function calculateServicesScreenHeight() {
  const servicesWrap = servicesSection.querySelector('.services__wrap');
  const allArticles = servicesScreen.querySelectorAll('.services__article');
  const allArticlesHeightProps = [...allArticles].map((article) => article.offsetHeight);
  const maxArticleHeight = Math.max(...allArticlesHeightProps);

  if (window.screen.width >= 1000) {
    servicesScreen.style.height = `${maxArticleHeight >= servicesScreenDefaultHeight1920 || servicesScreenDefaultHeight1920}px`;

    if (servicesWrap.offsetHeight >= window.screen.height) {
      servicesSection.style.height = 'unset';
    } else {
      servicesSection.style.height = '100vh';
    }
  }
}

function bindServicesTitlesToClick() {
  titles.forEach((title) => title.addEventListener('click', handleTitleClick))
}

function handleTitleClick(e) {
  const targetTitle = e.currentTarget;
  const targetTitleIndex = [...titles].indexOf(targetTitle);
  const targetBlock = servicesBlocks[targetTitleIndex];

  markTitle(targetTitle);
  hideAllServicesBlocks();
  showTargetServicesBlock(targetBlock);
}

function markTitle(targetTitle) {
  titles.forEach((title) => title.classList.remove('services__title_active'));
  targetTitle.classList.add('services__title_active');
}

function hideAllServicesBlocks() {
  servicesBlocks.forEach((block) => {
    block.classList.remove('services__block_active')
  })
}

function showTargetServicesBlock(targetBlock) {
  targetBlock.classList.add('services__block_active')
}

function bindSubmenuToClick() {
  const submenu = servicesSection.querySelectorAll('.services__item-header');
  submenu.forEach((item) => item.addEventListener('click', handleSubmenuClick)) 
}

function handleSubmenuClick(e) {
  const target = e.currentTarget.parentElement;
  const parentWrap = target.offsetParent;
  const otherSubmenuInParentWrap = parentWrap.querySelectorAll('.services__block-item');

  otherSubmenuInParentWrap.forEach((submenu) => submenu.classList.remove('services__block-item_active'));
  target.classList.add('services__block-item_active');
}

function bindExpandBtn() {
  expandBtns.forEach((btn) => btn.addEventListener('click', expandArticle));
}

function bindCollapseBtn() {
  collapseBtns.forEach((btn) => btn.addEventListener('click', collapseArticle));
}

function expandArticle(e) {
  const target = e.currentTarget.parentElement.parentElement.parentElement;
  const targetArticle = target.querySelector('article');
  const parentWrap = target.offsetParent;
  const otherSubmenuInParentWrap = parentWrap.querySelectorAll('.services__block-item');

  otherSubmenuInParentWrap.forEach((submenu) => submenu.classList.remove('services__block-item_active'));
  target.classList.add('services__block-item_active');
}

function collapseArticle(e) {
  e.currentTarget.parentElement.parentElement.classList.remove('services__block-item_active');
}

function bindServicesScreen() {
  servicesScreen.addEventListener('touchstart', handleTouchStart);
  servicesScreen.addEventListener('touchmove', handleTouchMove);
}

function handleTouchStart(e) {
  servicesScreen.removeEventListener('touchstart', handleTouchStart);

  const [firstTouch] = e.touches;
  xDown = firstTouch.clientX;
}

function handleTouchMove(e) {
  servicesScreen.removeEventListener('touchmove', handleTouchMove);  

  const [firstTouch] = e.touches;
  let xDiff;

  xUp = firstTouch.clientX;
  xDiff = xDown - xUp;

  if (xDiff > 0) {
    if (++currentServicesScreenIndex > 2) {
      currentServicesScreenIndex = 0;
    }
  } else {
    if (--currentServicesScreenIndex < 0) {
      currentServicesScreenIndex = 2;
    }
  }

  showTargetService()
}

function markPagination() {
  const index = currentServicesScreenIndex;
  paginationItems.forEach((item) => item.classList.remove('services__pagination-item_active'));
  paginationItems[index].classList.add('services__pagination-item_active');
}

function showTargetService() {
  const index = currentServicesScreenIndex;
  const targetTitle = titles[index];
  const targetBlock = servicesBlocks[index];

  markTitle(targetTitle);
  hideAllServicesBlocks();
  showTargetServicesBlock(targetBlock);
  markPagination();

  setTimeout(bindServicesScreen, 500)
}