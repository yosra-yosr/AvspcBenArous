// src/components/registration/FormSteps.jsx
import { Form, Input, DatePicker, Select, InputNumber } from 'antd';
import { VALIDATION_RULES, ERROR_MESSAGES } from '../../utils/constants';
import ValidationService from '../../services/ValidationService';

const { Option } = Select;

// Step 1: Identité
export const IdentityStep = ({ formItemStyle }) => (
  <>
    <Form.Item
      name="idNumber"
      label="رقم بطاقة التعريف"
      rules={[
        { required: true, message: ERROR_MESSAGES.REQUIRED },
        { validator: (_, value) => ValidationService.validateIdNumber(value) }
      ]}
      style={formItemStyle}
    >
      <Input placeholder="01234567" maxLength={8} size="large" />
    </Form.Item>

    <Form.Item
      name="idIssueDate"
      label="تاريخ الإصدار"
      rules={[
        { required: true, message: ERROR_MESSAGES.REQUIRED },
        { validator: (_, value) => ValidationService.validateIssueDate(value) }
      ]}
      style={formItemStyle}
    >
      <DatePicker style={{ width: '100%' }} placeholder="اختر التاريخ" size="large" />
    </Form.Item>

    <Form.Item
      name="phone"
      label="رقم الهاتف الشخصي"
      rules={[
        { required: true, message: ERROR_MESSAGES.REQUIRED },
        { pattern: VALIDATION_RULES.PHONE.PATTERN, message: ERROR_MESSAGES.INVALID_PHONE }
      ]}
      style={formItemStyle}
    >
      <Input placeholder="12345678" maxLength={8} size="large" />
    </Form.Item>
     {/* ➕ NOUVEAU: Champ Email */}
    <Form.Item
      name="email"
      label="البريد الإلكتروني"
      rules={[
        { required: true, message: ERROR_MESSAGES.REQUIRED },
        { type: 'email', message: ERROR_MESSAGES.INVALID_EMAIL } // Validation de base de Ant Design
      ]}
      style={formItemStyle}
    >
      <Input placeholder="example@domain.com" size="large" />
    </Form.Item>
  </>
);

// Step 2: Données personnelles
export const PersonalDataStep = ({ formItemStyle }) => (
  <>
    <Form.Item
      name="firstName"
      label="الاسم"
      rules={[
        { required: true, message: ERROR_MESSAGES.REQUIRED },
        ValidationService.getArabicOnlyRule(),
        { min: VALIDATION_RULES.NAME.MIN_LENGTH, message: ERROR_MESSAGES.MIN_LENGTH }
      ]}
      style={formItemStyle}
    >
      <Input placeholder="محمد" size="large" />
    </Form.Item>

    <Form.Item
      name="lastName"
      label="اللقب"
      rules={[
        { required: true, message: ERROR_MESSAGES.REQUIRED },
        ValidationService.getArabicOnlyRule(),
        { min: VALIDATION_RULES.NAME.MIN_LENGTH, message: ERROR_MESSAGES.MIN_LENGTH }
      ]}
      style={formItemStyle}
    >
      <Input placeholder="بن علي" size="large" />
    </Form.Item>

    <Form.Item
      name="birthDate"
      label="تاريخ الولادة"
      rules={[
        { required: true, message: ERROR_MESSAGES.REQUIRED },
        { validator: (_, value) => ValidationService.validateAge(value) }
      ]}
      style={formItemStyle}
    >
      <DatePicker style={{ width: '100%' }} placeholder="اختر التاريخ" size="large" />
    </Form.Item>

    <Form.Item
      name="gender"
      label="الجنس"
      rules={[{ required: true, message: ERROR_MESSAGES.REQUIRED }]}
      style={formItemStyle}
    >
      <Select placeholder="اختر الجنس" size="large">
        <Option value="male">ذكر</Option>
        <Option value="female">أنثى</Option>
      </Select>
    </Form.Item>
  </>
);

// Step 3: Famille
export const FamilyStep = ({ formItemStyle }) => (
  <>
    <Form.Item
      name="fatherName"
      label="اسم الأب"
      rules={[
        { required: true, message: ERROR_MESSAGES.REQUIRED },
        ValidationService.getArabicOnlyRule()
      ]}
      style={formItemStyle}
    >
      <Input placeholder="علي" size="large" />
    </Form.Item>

    <Form.Item
      name="grandFatherName"
      label="اسم الجد"
      rules={[
        { required: true, message: ERROR_MESSAGES.REQUIRED },
        ValidationService.getArabicOnlyRule()
      ]}
      style={formItemStyle}
    >
      <Input placeholder="أحمد" size="large" />
    </Form.Item>

    <Form.Item
      name="motherFirstName"
      label="اسم الأم"
      rules={[
        { required: true, message: ERROR_MESSAGES.REQUIRED },
        ValidationService.getArabicOnlyRule()
      ]}
      style={formItemStyle}
    >
      <Input placeholder="فاطمة" size="large" />
    </Form.Item>

    <Form.Item
      name="motherLastName"
      label="لقب الأم"
      rules={[
        { required: true, message: ERROR_MESSAGES.REQUIRED },
        ValidationService.getArabicOnlyRule()
      ]}
      style={formItemStyle}
    >
      <Input placeholder="السالمي" size="large" />
    </Form.Item>

    <Form.Item
      name="maritalstatus"
      label="الحالة العائلية"
      rules={[{ required: true, message: ERROR_MESSAGES.REQUIRED }]}
      style={formItemStyle}
    >
      <Select placeholder="اختر الحالة العائلية" size="large">
        <Option value="single">أعزب</Option>
        <Option value="married">متزوج</Option>
        <Option value="divorced">مطلق</Option>
        <Option value="widowed">أرمل</Option>
      </Select>
    </Form.Item>

    <Form.Item
      name="children"
      label="عدد الأبناء"
      rules={[{ required: true, message: ERROR_MESSAGES.REQUIRED }]}
      style={formItemStyle}
    >
      <InputNumber min={0} max={20} style={{ width: '100%' }} size="large" />
    </Form.Item>

    <Form.Item
      name="profession"
      label="المهنة"
      rules={[
          { required: true, message: ERROR_MESSAGES.REQUIRED },
          ValidationService.getArabicOnlyRule(),
        { min: VALIDATION_RULES.NAME.MIN_LENGTH, message: ERROR_MESSAGES.MIN_LENGTH }
      ]}
      style={formItemStyle}
    >
      <Input placeholder="مهندس" size="large" />
    </Form.Item>

    <Form.Item
      name="fatherphone"
      label="رقم هاتف الأب"
      rules={[
        { required: true, message: ERROR_MESSAGES.REQUIRED },
        { pattern: VALIDATION_RULES.PHONE.PATTERN, message: ERROR_MESSAGES.INVALID_PHONE }
      ]}
      style={formItemStyle}
    >
      <Input placeholder="12345678" maxLength={8} size="large" />
    </Form.Item>
  </>
);

// Step 4: Résidence
export const ResidenceStep = ({ 
  formItemStyle, 
  governorates, 
  selectedGovernorate,
  availableRegions,
  handleGovernorateChange 
}) => (
  <>
    <Form.Item
      name="governorate"
      label="الولاية"
      rules={[{ required: true, message: ERROR_MESSAGES.REQUIRED }]}
      style={formItemStyle}
    >
      <Select
        placeholder="اختر الولاية"
        onChange={handleGovernorateChange}
        showSearch
        optionFilterProp="children"
        size="large"
      >
        {governorates.map(gov => (
          <Option key={gov.value} value={gov.value}>{gov.label}</Option>
        ))}
      </Select>
    </Form.Item>

    <Form.Item name="region" label="المنطقة" style={formItemStyle}>
      <Select
        placeholder={selectedGovernorate === 'ben_arous' ? 'اختر المنطقة (اختياري)' : 'لا توجد مناطق لهذه الولاية'}
        disabled={selectedGovernorate !== 'ben_arous'}
        size="large"
      >
        {availableRegions.map(region => (
          <Option key={region} value={region}>{region}</Option>
        ))}
      </Select>
    </Form.Item>

    <Form.Item
      name="address"
      label="العنوان الشخصي الكامل"
      rules={[
          { required: true, message: ERROR_MESSAGES.REQUIRED },
          ValidationService.getArabicOnlyRule(),
        { min: VALIDATION_RULES.NAME.MIN_LENGTH, message: ERROR_MESSAGES.MIN_LENGTH }
      ]}
      style={formItemStyle}
    >
      <Input.TextArea rows={3} placeholder="أدخل العنوان الكامل" size="large" />
    </Form.Item>
  </>
);

// Step 5: Éducation
export const EducationStep = ({ formItemStyle }) => (
  <>
    <Form.Item
      name="educationlevel"
      label="المستوى التعليمي"
      rules={[{ required: true, message: ERROR_MESSAGES.REQUIRED }]}
      style={formItemStyle}
    >
      <Select placeholder="اختر المستوى التعليمي" size="large">
        <Option value="primary">ابتدائي</Option>
        <Option value="secondary">إعدادي</Option>
        <Option value="highschool">ثانوي</Option>
        <Option value="bachelor">بكالوريا</Option>
        <Option value="university">جامعي</Option>
      </Select>
    </Form.Item>

    <Form.Item
      name="supportingdocument"
      label="شهائد الإثبات"
      rules={[{ required: true, message: ERROR_MESSAGES.REQUIRED }]}
      style={formItemStyle}
    >
      <Select placeholder="اختر نوع الشهادة" size="large">
        <Option value="attendance-grades">شهادة حضور وبطاقة الأعداد الأخيرة للسنة المنقضية</Option>
        <Option value="baccalaureate">شهادة البكالوريا</Option>
        <Option value="university">شهادة تعليم جامعي</Option>
        <Option value="other">شهادة أخرى</Option>
      </Select>
    </Form.Item>
  </>
);