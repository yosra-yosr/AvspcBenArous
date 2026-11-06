// src/config/documents.js
export const REQUIRED_DOCUMENTS = [
  { code: 'application_request', label: 'مطلب ترشح' },
  { code: 'registration_form', label: '2 نسخ من استمارة التسجيل' },
  { code: 'instructions_card', label: 'بطاقة الإرشادات' },
  { code: 'membership_fee', label: 'معلوم الانخراط في الجمعية (25 د)' },
  { code: 'photos_8', label: '8 صور شخصية' },
  { code: 'b3_card', label: 'بطاقة عدد 3 لا تتجاوز 3 أشهر من تاريخ استخراجها أو الوصل' },
  { code: 'medical_certificate', label: 'شهادة طبية' },
  { code: 'diploma_2copies', label: 'عدد 02 نسخة من الشهادة العلمية أو تكوين مهني إن وجدت' },
  { code: 'cin_8copies', label: '8 نسخ من بطاقة التعريف الوطنية' },
  { code: 'envelopes_mazmoun', label: '3 ظروف مضمون الوصول' },
  { code: 'large_envelope', label: 'ظرف كبير' },
];

export const ALL_DOCUMENT_CODES = REQUIRED_DOCUMENTS.map(d => d.code);