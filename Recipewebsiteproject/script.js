// ===== מרכזי: ניהול משתמשים, הגדרות, מתכונים, ניווט ו־speech synthesis =====

// ----- מפתחות לשימוש ב־localStorage -----
const LS = {
  USERS: 'lr_users',
  AUTH: 'lr_auth_user',
  SETTINGS_PREFIX: 'lr_settings_',
  RECIPES: 'lr_recipes'
};

// ----- טעינת מתכוני דוגמה אם אין -----
function seedRecipes() {
  if (localStorage.getItem(LS.RECIPES)) return;
  const sample = [
    {
      id: 'r1',
      title: 'מרק בצל צרפתי',
      category: 'starters',
      image: 'https://images.unsplash.com/photo-1543353071-087092ec393a?auto=format&fit=crop&w=800&q=60',
      instructions: '1. פרוס את הבצל...\n2. הקפץ עד להזהבה...\n3. הוסף מרק ועשבי תיבול...'
    },
    {
      id: 'r2',
      title: 'עוף בתנור עם עשבי תיבול',
      category: 'mains',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=60',
      instructions: '1. המרינדה...\n2. חמם תנור ל־200C...\n3. אפה 50 דקות...'
    },
    {
      id: 'r3',
      title: "סלט קינואה וצ'ירי",
      category: 'sides',
      image: 'https://images.unsplash.com/photo-1604908177522-6b6d7b3b8c3a?auto=format&fit=crop&w=800&q=60',
      instructions: '1. בישול קינואה...\n2. ערבוב עם ירקות טריים...\n3. תיבול בשמן זית ולימון...'
    },
    {
      id: 'r4',
      title: 'עוגת שוקולד עשירה',
      category: 'desserts',
      image: 'https://images.unsplash.com/photo-1542831371-d531d36971e6?auto=format&fit=crop&w=800&q=60',
      instructions: '1. ערבב קמח, סוכר וקקאו...\n2. הוסף ביצים ושמן...\n3. אפה בתנור 35 דקות...'
    }
  ];

  localStorage.setItem(LS.RECIPES, JSON.stringify(sample));
}

// ----- החלת ההגדרות האישיות של המשתמש המחובר -----
function applyUserSettings() {
  const authUser = JSON.parse(localStorage.getItem(LS.AUTH));
  if (!authUser) return; // אם אין משתמש מחובר, לא נטען הגדרות

  const settingsKey = LS.SETTINGS_PREFIX + authUser.username;
  const settings = JSON.parse(localStorage.getItem(settingsKey) || '{}');

  // ערכת נושא
  if (settings.theme === 'dark') {
    document.body.style.background = 'linear-gradient(135deg, #1c1c1c, #2d2d2d)';
    document.body.style.color = '#f0f0f0';
  } else {
    document.body.style.background = 'linear-gradient(135deg, #fff4da, #fffaf4)';
    document.body.style.color = '#2b2b2b';
  }

  // צבע טקסט מותאם אישית
  if (settings.color) {
    document.body.style.color = settings.color;
  }

  // גופן
  switch (settings.font) {
    case 'serif':
      document.body.style.fontFamily = 'serif';
      break;
    case 'sans':
      document.body.style.fontFamily = 'sans-serif';
      break;
    default:
      document.body.style.fontFamily = "'Rubik', sans-serif";
  }

  // תמונת פרופיל
  const header = document.querySelector('header');
  if (header && settings.profile) {
    let img = header.querySelector('.profile-img');
    if (!img) {
      img = document.createElement('img');
      img.className = 'profile-img';
      img.style.width = '38px';
      img.style.height = '38px';
      img.style.borderRadius = '50%';
      img.style.marginRight = '10px';
      header.prepend(img);
    }
    img.src = settings.profile;
  }

  // ניתן להוסיף כאן יישום נוסף (כמו קצב דיבור וכו’)
}

// ----- הפעלת ההגדרות עם טעינת הדף -----
window.addEventListener('DOMContentLoaded', () => {
  seedRecipes();
  applyUserSettings();
});
