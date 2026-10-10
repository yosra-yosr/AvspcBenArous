// src/components/registration/FormSteps.jsx
import { 
  Form, 
  Input, 
  DatePicker, 
  Select, 
  InputNumber, 
  Upload, 
  Button, 
  message 
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { VALIDATION_RULES, ERROR_MESSAGES } from '../../utils/constants';
import ValidationService from '../../services/ValidationService';

const { Option } = Select;
const { TextArea } = Input;

// ═══════════════════════════════════════════════════════════
// STEP 1: Identité
// ═══════════════════════════════════════════════════════════
export const IdentityStep = ({ 
  formItemStyle, 
  onCvUpload,
  cvUploadUrl = `${process.env.REACT_APP_API_URL || 'https://avspcbenarous-api.netlify.app/api'}/upload/cv`
}) => {
  const handleCvChange = (info) => {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} تم تحميل السيرة الذاتية بنجاح`);
      const cvUrl = info.file.response?.url || info.file.response?.data?.url;
      if (onCvUpload) onCvUpload(cvUrl);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} فشل تحميل السيرة الذاتية`);
    }
  };

  const beforeUpload = (file) => {
    const allowedTypes = ['application/pdf', 'application/msword', 
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const isAllowed = allowedTypes.includes(file.type);
    
    if (!isAllowed) {
      message.error('يُسمح فقط بملفات PDF أو DOC أو DOCX');
      return Upload.LIST_IGNORE;
    }
    
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      message.error('حجم الملف يجب أن يكون أقل من 5 ميغابايت');
      return Upload.LIST_IGNORE;
    }
    
    return true;
  };

  return (
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
        <DatePicker 
          style={{ width: '100%' }} 
          placeholder="اختر التاريخ" 
          size="large" 
        />
      </Form.Item>

      <Form.Item
        name="phone"
        label="رقم الهاتف الشخصي"
        rules={[
          { required: true, message: ERROR_MESSAGES.REQUIRED },
          { 
            pattern: VALIDATION_RULES.PHONE.PATTERN, 
            message: ERROR_MESSAGES.INVALID_PHONE 
          }
        ]}
        style={formItemStyle}
      >
        <Input placeholder="12345678" maxLength={8} size="large" />
      </Form.Item>

      {/* ✅ NOUVEAU: Champ Email */}
      <Form.Item
        name="email"
        label="البريد الإلكتروني"
        rules={[
          { required: true, message: ERROR_MESSAGES.REQUIRED },
          { type: 'email', message: ERROR_MESSAGES.INVALID_EMAIL }
        ]}
        style={formItemStyle}
      >
        <Input placeholder="example@domain.com" size="large" />
      </Form.Item>

      {/* ✅ NOUVEAU: Upload CV (optionnel) */}
      <Form.Item
        name="cvUrl"
        label="السيرة الذاتية (اختياري)"
        style={formItemStyle}
        tooltip="يمكنك تحميل سيرتك الذاتية بصيغة PDF أو DOC (الحجم الأقصى: 5 ميغابايت)"
      >
        <Upload
          name="cv"
          action={cvUploadUrl}
          accept=".pdf,.doc,.docx"
          maxCount={1}
          beforeUpload={beforeUpload}
          onChange={handleCvChange}
          showUploadList={{
            showPreviewIcon: false,
            showRemoveIcon: true
          }}
        >
          <Button 
            icon={<UploadOutlined />} 
            size="large"
            style={{ width: '100%' }}
          >
            تحميل السيرة الذاتية
          </Button>
        </Upload>
      </Form.Item>
    </>
  );
};

// ═══════════════════════════════════════════════════════════
// STEP 2: Données personnelles
// ═══════════════════════════════════════════════════════════
export const PersonalDataStep = ({ formItemStyle }) => (
  <>
    <Form.Item
      name="firstName"
      label="الاسم"
      rules={[
        { required: true, message: ERROR_MESSAGES.REQUIRED },
        ValidationService.getArabicOnlyRule(),
        { 
          min: VALIDATION_RULES.NAME.MIN_LENGTH, 
          message: ERROR_MESSAGES.MIN_LENGTH 
        }
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
        { 
          min: VALIDATION_RULES.NAME.MIN_LENGTH, 
          message: ERROR_MESSAGES.MIN_LENGTH 
        }
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
      <DatePicker 
        style={{ width: '100%' }} 
        placeholder="اختر التاريخ" 
        size="large" 
      />
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

// ═══════════════════════════════════════════════════════════
// STEP 3: Famille
// ═══════════════════════════════════════════════════════════
export const FamilyStep = ({ formItemStyle, form }) => (
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
      label="الحالة العائلية للمترشح"
      rules={[{ required: true, message: ERROR_MESSAGES.REQUIRED }]}
      style={formItemStyle}
    >
      <Select
        placeholder="اختر الحالة العائلية"
        size="large"
        onChange={() => {
          // Réinitialiser 'children' à 0 à chaque changement
          form.setFieldsValue({ children: 0 });
        }}
      >
        <Option value="single">أعزب</Option>
        <Option value="married">متزوج</Option>
        <Option value="divorced">مطلق</Option>
        <Option value="widowed">أرمل</Option>
      </Select>
    </Form.Item>

    <Form.Item noStyle dependencies={['maritalstatus']}>
      {({ getFieldValue }) => {
        const status = getFieldValue('maritalstatus');
        const isSingle = status === 'single';

        if (isSingle) {
          return null;
        }

        return (
          <Form.Item
            name="children"
            label="عدد أبناء المترشح"
            rules={[{ required: true, message: ERROR_MESSAGES.REQUIRED }]}
            style={formItemStyle}
          >
            <InputNumber 
              min={0} 
              max={20} 
              style={{ width: '100%' }} 
              size="large" 
            />
          </Form.Item>
        );
      }}
    </Form.Item>

    <Form.Item
      name="profession"
      label="المهنة"
      rules={[
        { required: true, message: ERROR_MESSAGES.REQUIRED },
        ValidationService.getArabicOnlyRule(),
        { 
          min: VALIDATION_RULES.NAME.MIN_LENGTH, 
          message: ERROR_MESSAGES.MIN_LENGTH 
        }
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
        { 
          pattern: VALIDATION_RULES.PHONE.PATTERN, 
          message: ERROR_MESSAGES.INVALID_PHONE 
        }
      ]}
      style={formItemStyle}
    >
      <Input placeholder="12345678" maxLength={8} size="large" />
    </Form.Item>
  </>
);

// ═══════════════════════════════════════════════════════════
// STEP 4: Résidence (avec birthAddress)
// ═══════════════════════════════════════════════════════════
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
          <Option key={gov.value} value={gov.value}>
            {gov.label}
          </Option>
        ))}
      </Select>
    </Form.Item>

    <Form.Item
      name="region"
      label="المنطقة"
      dependencies={['governorate']}
      rules={[
        ({ getFieldValue }) => ({
          required: getFieldValue('governorate') === 'ben_arous',
          message: ERROR_MESSAGES.REQUIRED,
        }),
      ]}
      style={formItemStyle}
    >
      <Select
        placeholder={
          selectedGovernorate === 'ben_arous' 
            ? 'اختر المنطقة (إجباري)' 
            : 'لا توجد مناطق لهذه الولاية'
        }
        disabled={selectedGovernorate !== 'ben_arous'}
        size="large"
      >
        {availableRegions.map(region => (
          <Option key={region} value={region}>
            {region}
          </Option>
        ))}
      </Select>
    </Form.Item>

    {/* ✅ NOUVEAU: Adresse sur la carte CIN (originelle) */}
    <Form.Item
      name="birthaddress"
      label="مقر السكن الأصلي (كما في بطاقة التعريف)"
      rules={[
        ValidationService.getArabicOnlyRule(),
      ]}
      style={formItemStyle}
    >
      <TextArea 
        rows={2} 
        placeholder="العنوان كما هو مسجل في بطاقة التعريف الوطنية" 
        size="large"
        maxLength={255}
        showCount
      />
    </Form.Item>

    {/* Adresse actuelle (renommée pour clarté) */}
    <Form.Item
      name="address"
      label="مقر السكن الحالي (العنوان الكامل)"
      rules={[
        { required: true, message: ERROR_MESSAGES.REQUIRED },
        ValidationService.getArabicOnlyRule(),
        { 
          min: VALIDATION_RULES.NAME.MIN_LENGTH, 
          message: ERROR_MESSAGES.MIN_LENGTH 
        }
      ]}
      style={formItemStyle}
    >
      <TextArea 
        rows={3} 
        placeholder="أدخل العنوان الكامل الحالي" 
        size="large"
        maxLength={500}
        showCount
      />
    </Form.Item>
  </>
);

// ═══════════════════════════════════════════════════════════
// STEP 5: Éducation
// ═══════════════════════════════════════════════════════════
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
        <Option value="formation">تكوين مهني</Option>
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
        <Option value="attendance-grades">
          شهادة حضور وبطاقة الأعداد الأخيرة للسنة المنقضية
        </Option>
        <Option value="baccalaureate">شهادة البكالوريا</Option>
        <Option value="university">شهادة تعليم جامعي</Option>
        <Option value="other">شهادة أخرى</Option>
      </Select>
    </Form.Item>
  </>
);