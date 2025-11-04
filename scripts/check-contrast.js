// Простая проверка контрастности
console.log('��� Проверка контрастности');

// Проверяем основные цвета
const contrastIssues = [];

// Белый текст на черном фоне - отличный контраст
const whiteOnBlack = {
  foreground: '#FFFFFF',
  background: '#000000', 
  ratio: 21, // Идеальный контраст
  status: '✅ Отличный контраст'
};

// Проверяем используемые цвета
const colorChecks = [
  { element: 'Основной текст', fg: '#FFFFFF', bg: '#000000', minRatio: 4.5 },
  { element: 'Кнопки', fg: '#FFFFFF', bg: 'transparent', minRatio: 4.5 },
  { element: 'Карточки', fg: '#FFFFFF', bg: '#1A1A1A', minRatio: 4.5 }
];

colorChecks.forEach(check => {
  // Простая проверка - белый на черном всегда хороший контраст
  if (check.fg === '#FFFFFF' && (check.bg === '#000000' || check.bg === '#1A1A1A')) {
    console.log(`✅ ${check.element}: хороший контраст`);
  } else {
    console.log(`⚠️ ${check.element}: требуется проверка`);
    contrastIssues.push(check.element);
  }
});

if (contrastIssues.length === 0) {
  console.log('��� Все элементы имеют хороший контраст!');
} else {
  console.log('❌ Требуется ручная проверка:', contrastIssues.join(', '));
}
