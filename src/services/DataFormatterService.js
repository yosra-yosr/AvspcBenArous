// src/services/DataFormatterService.js
import dayjs from 'dayjs';

class DataFormatterService {
  static formatForAPI(formData, governorates) {
    const governorateLabel = governorates.find(g => g.value === formData.governorate)?.label || formData.governorate;
    
    return {
      idNumber: formData.idNumber,
      idIssueDate: formData.idIssueDate ? dayjs(formData.idIssueDate).format('YYYY-MM-DD') : null,
      phone: formData.phone,
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      birthDate: formData.birthDate ? dayjs(formData.birthDate).format('YYYY-MM-DD') : null,
      gender: formData.gender,
      fatherName: formData.fatherName,
      grandFatherName: formData.grandFatherName,
      motherFirstName: formData.motherFirstName,
      motherLastName: formData.motherLastName,
      
      // ✅ CORRECTIONS: Utiliser les noms sans majuscules comme attendu par le backend
      maritalstatus: formData.maritalstatus,      // ← Changé: maritalStatus → maritalstatus
      children: parseInt(formData.children) || 0,
      profession: formData.profession,
      fatherphone: formData.fatherphone,          // ← Changé: fatherPhone → fatherphone
      governorate: formData.governorate,
      governorateLabel: governorateLabel,
      region: formData.region || null,
      address: formData.address,
      educationlevel: formData.educationlevel,    // ← Changé: educationLevel → educationlevel
      supportingdocument: formData.supportingdocument, // ← Changé: supportingDocument → supportingdocument
      registrationDate: dayjs().format('YYYY-MM-DD HH:mm:ss')
    };
  }

  static getDisplayLabels() {
    return {
      gender: {
        'male': 'ذكر',
        'female': 'أنثى'
      },
      maritalstatus: {
        'single': 'أعزب',
        'married': 'متزوج',
        'divorced': 'مطلق',
        'widowed': 'أرمل'
      },
      education: {
        'primary': 'ابتدائي',
        'secondary': 'إعدادي',
        'highschool': 'ثانوي',
        'bachelor': 'بكالوريا',
        'formation':'تكوين مهني',
        'university': 'جامعي'
      },
      supportingDoc: {
        'attendance-grades': 'شهادة حضور وبطاقة الأعداد الأخيرة للسنة المنقضية',
        'baccalaureate': 'شهادة البكالوريا',
        'university': 'شهادة تعليم جامعي',
        'other': 'شهادة أخرى'
      }
    };
  }
}

export default DataFormatterService;