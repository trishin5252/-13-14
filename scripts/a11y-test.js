// Простой скрипт для проверки базовой доступности
console.log('��� A11y Audit Check');

// Проверяем основные ARIA-атрибуты
const checks = {
  skipLinks: document.querySelectorAll('.skip-link').length > 0,
  mainLandmark: document.querySelector('main[role="main"]') !== null,
  navigationLandmark: document.querySelector('nav[aria-label]') !== null,
  formLabels: document.querySelectorAll('label[for]').length > 0,
  imagesWithAlt: Array.from(document.images).every(img => img.alt !== ''),
  focusIndicators: getComputedStyle(document.body).outlineWidth !== '0px'
};

console.table(checks);

// Проверяем клавиатурную навигацию
document.addEventListener('keydown', function(e) {
  if (e.key === 'Tab') {
    console.log('��� Tab navigation active');
  }
});

console.log('✅ Basic accessibility checks completed');
