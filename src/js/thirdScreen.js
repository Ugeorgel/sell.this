const servicesSection = document.getElementById('services');
const titles = servicesSection.querySelectorAll('.services__title');
const servicesBlocks = servicesSection.querySelectorAll('.services__block');

const servicesScreenDefaultHeight1920 = 520;

export default function initThirdScreenInteractivity() {
  if (window.screen.width >= 1920) {
    calculateServicesScreenHeight();
    bindServicesTitlesToClick();
    bindSubmenuToClick();
  }    
}

function calculateServicesScreenHeight() {
  const servicesWrap = servicesSection.querySelector('.services__wrap');
  const servicesScreen = document.getElementById('servicesScreen');
  const allArticles = servicesScreen.querySelectorAll('.services__article');
  const allArticlesHeightProps = [...allArticles].map((article) => article.offsetHeight);
  const maxArticleHeight = Math.max(...allArticlesHeightProps);

  servicesScreen.style.height = `${maxArticleHeight >= servicesScreenDefaultHeight1920 || servicesScreenDefaultHeight1920}px`;

  if (servicesWrap.offsetHeight >= window.screen.height) {
    servicesSection.style.height = 'unset';
  } else {
    servicesSection.style.height = '100vh';
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