const servicesSection = document.getElementById('services');
const titles = servicesSection.querySelectorAll('.services__title');

export default function initThirdScreenInteractivity() {
  if (window.screen.width >= 1920) {
    calculateServicesScreenHeight();
    bindServicesTitlesToClick();
  }    
}

function calculateServicesScreenHeight() {
  const servicesWrap = servicesSection.querySelector('.services__wrap');
  const servicesScreen = document.getElementById('servicesScreen');
  const allArticles = servicesScreen.querySelectorAll('.services__article');
  const allArticlesHeightProps = [...allArticles].map((article) => article.offsetHeight);
  const maxArticleHeight = Math.max(...allArticlesHeightProps);

  servicesScreen.style.height = `${maxArticleHeight}px`;

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

  titles.forEach((title) => title.classList.remove('services__title_active'));
  targetTitle.classList.add('services__title_active');
}