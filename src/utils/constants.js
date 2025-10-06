// src/utils/constants.js

export const VALIDATION_RULES = {
  ID_NUMBER: {
    LENGTH: 8,
    PATTERN: /^\d{8}$/,
    VALID_START_DIGITS: ['0', '1']
  },
  PHONE: {
    LENGTH: 8,
    PATTERN: /^\d{8}$/
  },
  AGE: {
    MIN: 18,
    MAX: 50
  },
  NAME: {
    MIN_LENGTH: 2,
    ARABIC_PATTERN: /^[\u0600-\u06FF\s]+$/
  }
};

export const ERROR_MESSAGES = {
  REQUIRED: 'هذا الحقل مطلوب',
  INVALID_ID: 'رقم بطاقة التعريف غير صحيح',
  INVALID_PHONE: 'يجب أن يحتوي على 8 أرقام فقط',
  INVALID_AGE_MIN: 'يجب أن يكون العمر 18 سنة على الأقل',
  INVALID_AGE_MAX: 'الحد الأقصى للعمر هو 50 سنة',
  ARABIC_ONLY: 'يسمح فقط بالأحرف العربية',
  MIN_LENGTH: 'يجب أن يحتوي على حرفين على الأقل',
  FUTURE_DATE: 'التاريخ لا يمكن أن يكون في المستقبل',
  BIRTH_DATE_REQUIRED: 'يرجى إدخال تاريخ الولادة',
  ISSUE_DATE_REQUIRED: 'يرجى إدخال تاريخ الإصدار'
};

export const REGIONS_DATA = {
  ben_arous: [
    'بومهل', 'الزهراء', 'حمام الأنف', 'حمام الشط', 'رادس', 'المروج',
    'فوشانة', 'مرناق', 'المحمدية', 'بن عروس', 'نعسان', 'شبدة',
    'مقرين', 'المدينة الجديدة', 'الياسمينات', 'برج السدرية', 'الخليدية'
  ]
};

export const GOVERNORATES = [
  { value: 'ariana', label: 'أريانة' },
  { value: 'beja', label: 'باجة' },
  { value: 'ben_arous', label: 'بن عروس' },
  { value: 'bizerte', label: 'بنزرت' },
  { value: 'gabes', label: 'قابس' },
  { value: 'gafsa', label: 'قفصة' },
  { value: 'jendouba', label: 'جندوبة' },
  { value: 'kairouan', label: 'القيروان' },
  { value: 'kasserine', label: 'القصرين' },
  { value: 'kebili', label: 'قبلي' },
  { value: 'kef', label: 'الكاف' },
  { value: 'mahdia', label: 'المهدية' },
  { value: 'manouba', label: 'منوبة' },
  { value: 'medenine', label: 'مدنين' },
  { value: 'monastir', label: 'المنستير' },
  { value: 'nabeul', label: 'نابل' },
  { value: 'sfax', label: 'صفاقس' },
  { value: 'sidi_bouzid', label: 'سيدي بوزيد' },
  { value: 'siliana', label: 'سليانة' },
  { value: 'sousse', label: 'سوسة' },
  { value: 'tataouine', label: 'تطاوين' },
  { value: 'tozeur', label: 'توزر' },
  { value: 'tunis', label: 'تونس' },
  { value: 'zaghouan', label: 'زغوان' }
];

export const BREADCRUMBS = [
  { name: "Accueil", url: "https://inscription-avspcbenarous.netlify.app" },
  { name: "Inscription", url: "https://inscription-avspcbenarous.netlify.app/register" }
];

export const OFFICE_INFO = {
  phone: '71 234 567',
  workingHours: 'من الاثنين إلى الجمعة (9:00 - 17:00)',
  address: 'مقر الجمعية، بن عروس',
  deadline: 7 // jours
};