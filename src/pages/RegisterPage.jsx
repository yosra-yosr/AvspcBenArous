// src/pages/RegisterPage.jsx
import { useState, useRef, useEffect } from 'react';
import {
  Form,
  Input,
  Button,
  Steps,
  Select,
  DatePicker,
  InputNumber,
  Card,
  Typography,
  message,
  Alert,
  Spin,
  Modal,
  Space,
} from 'antd';
import {
  IdcardOutlined,
  UserOutlined,
  TeamOutlined,
  EnvironmentOutlined,
  SafetyCertificateOutlined,
  ArrowRightOutlined,
  ArrowLeftOutlined,
  SendOutlined,
  ExclamationCircleOutlined,
  CheckCircleOutlined,
  EditOutlined,
  SaveOutlined,
  DownloadOutlined,
  CheckOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';
import 'dayjs/locale/ar';
import volunteerApi from '../services/volunteerApi';
import SchemaOrg from '../components/common/SchemaOrg';
import { getRegisterActionSchema, getBreadcrumbSchema } from '../utils/schemas';

const { Title, Text } = Typography;
const { Option } = Select;

// بيانات المناطق
const regionsData = {
  ben_arous: [
    'بومهل', 'الزهراء', 'حمام الأنف', 'حمام الشط', 'رادس', 'المروج',
    'فوشانة', 'مرناق', 'المحمدية', 'بن عروس', 'نعسان', 'شبدة',
    'مقرين', 'المدينة الجديدة', 'الياسمينات', 'برج السدرية', 'الخليدية'
  ]
};

const governorates = [
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

const breadcrumbs = [
  { name: "Accueil", url: "https://inscription-avspcbenarous.netlify.app" },
  { name: "Inscription", url: "https://inscription-avspcbenarous.netlify.app/register" }
];

const RegisterPage = () => {
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [availableRegions, setAvailableRegions] = useState([]);
  const [selectedGovernorate, setSelectedGovernorate] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formData, setFormData] = useState({});
  const [completedSteps, setCompletedSteps] = useState([]);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const stepsContainerRef = useRef(null);

  // Auto-scroll pour centrer l'étape active
  useEffect(() => {
    if (stepsContainerRef.current) {
      const container = stepsContainerRef.current;
      const stepWidth = container.scrollWidth / steps.length;
      const scrollPosition = stepWidth * currentStep - (container.clientWidth / 2) + (stepWidth / 2);
      
      container.scrollTo({
        left: Math.max(0, scrollPosition),
        behavior: 'smooth'
      });
    }
  });
  const [reviewData, setReviewData] = useState(null);
  const printRef = useRef();

  // خطوات النموذج
  const steps = [
    { title: 'الهوية', icon: <IdcardOutlined /> },
    { title: 'البيانات', icon: <UserOutlined /> },
    { title: 'العائلة', icon: <TeamOutlined /> },
    { title: 'الإقامة', icon: <EnvironmentOutlined /> },
    { title: 'التعليم', icon: <SafetyCertificateOutlined /> }
  ];

  // التحقق من الأحرف العربية فقط
  const arabicOnlyRule = {
    pattern: /^[\u0600-\u06FF\s]+$/,
    message: 'يسمح فقط بالأحرف العربية'
  };

  // التحقق من رقم بطاقة التعريف
  const validateIdNumber = (_, value) => {
    if (!value) return Promise.reject('هذا الحقل مطلوب');
    if (!/^\d{8}$/.test(value)) return Promise.reject('يجب أن يحتوي على 8 أرقام فقط');
    const firstDigit = value.charAt(0);
    if (firstDigit !== '0' && firstDigit !== '1') {
      return Promise.reject('رقم بطاقة التعريف غير صالح. يجب أن يبدأ بـ 0 أو 1');
    }
    return Promise.resolve();
  };

  // التحقق من العمر
  const validateAge = (_, value) => {
    if (!value) return Promise.reject('يرجى إدخال تاريخ الولادة');
    const age = dayjs().diff(value, 'year');
    if (age < 18) return Promise.reject('يجب أن يكون العمر 18 سنة على الأقل');
    if (age > 50) return Promise.reject('الحد الأقصى للعمر هو 50 سنة');
    return Promise.resolve();
  };

  // التحقق من تاريخ الإصدار
  const validateIssueDate = (_, value) => {
    if (!value) return Promise.reject('يرجى إدخال تاريخ الإصدار');
    if (value.isAfter(dayjs())) return Promise.reject('تاريخ الإصدار لا يمكن أن يكون في المستقبل');
    return Promise.resolve();
  };

  // التعامل مع تغيير الولاية
  const handleGovernorateChange = (value) => {
    setSelectedGovernorate(value);
    form.setFieldValue('region', undefined);
    
    if (value === 'ben_arous') {
      setAvailableRegions(regionsData.ben_arous);
      message.success('تم فتح قائمة المناطق لولاية بن عروس');
    } else {
      setAvailableRegions([]);
    }
  };

  // الانتقال للخطوة التالية
  const next = async () => {
    try {
      const fieldsToValidate = getFieldsForStep(currentStep);
      await form.validateFields(fieldsToValidate);
      
      const currentValues = form.getFieldsValue(fieldsToValidate);
      setFormData(prev => ({ ...prev, ...currentValues }));
      
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps([...completedSteps, currentStep]);
      }
      
      setCurrentStep(currentStep + 1);
      message.success(`تم الانتقال إلى الخطوة ${currentStep + 2}`);
    } catch (error) {
      message.error('يرجى ملء جميع الحقول المطلوبة بشكل صحيح');
    }
  };

  // العودة للخطوة السابقة
  const prev = () => {
    setCurrentStep(currentStep - 1);
  };

  // الحصول على الحقول لكل خطوة
  const getFieldsForStep = (step) => {
    const fieldsMap = {
      0: ['idNumber', 'idIssueDate', 'phone'],
      1: ['firstName', 'lastName', 'birthDate', 'gender'],
      2: ['fatherName', 'grandFatherName', 'motherFirstName', 'motherLastName', 'maritalstatus', 'children', 'profession', 'fatherphone'],
      3: ['governorate', 'address'],
      4: ['educationlevel', 'supportingdocument']
    };
    return fieldsMap[step] || [];
  };

  // تنسيق البيانات قبل الإرسال
  const formatDataForAPI = (values) => {
    const governorateLabel = governorates.find(g => g.value === values.governorate)?.label || values.governorate;
    
    return {
      idNumber: values.idNumber,
      idIssueDate: values.idIssueDate ? values.idIssueDate.format('YYYY-MM-DD') : null,
      phone: values.phone,
      firstName: values.firstName,
      lastName: values.lastName,
      birthDate: values.birthDate ? values.birthDate.format('YYYY-MM-DD') : null,
      gender: values.gender,
      fatherName: values.fatherName,
      grandFatherName: values.grandFatherName,
      motherFirstName: values.motherFirstName,
      motherLastName: values.motherLastName,
      maritalstatus: values.maritalstatus,
      children: Number(values.children) || 0,
      profession: values.profession,
      fatherphone: values.fatherphone,
      governorate: governorateLabel,
      region: values.region || null,
      address: values.address,
      educationlevel: values.educationlevel,
      supportingdocument: values.supportingdocument
    };
  };

  // عرض البيانات للمراجعة
  const handleReview = async () => {
    try {
      const fieldsToValidate = getFieldsForStep(currentStep);
      await form.validateFields(fieldsToValidate);
      
      const currentValues = form.getFieldsValue(fieldsToValidate);
      const allValues = { ...formData, ...currentValues };
      
      setReviewData(allValues);
      setShowReviewModal(true);
    } catch (error) {
      message.error('يرجى ملء جميع الحقول المطلوبة بشكل صحيح');
    }
  };

  // تنزيل PDF
  const handleDownloadPDF = () => {
    const printContent = printRef.current;
    const WinPrint = window.open('', '', 'width=900,height=650');
    
    WinPrint.document.write(`
      <html dir="rtl">
        <head>
          <title>فيشة التسجيل</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; direction: rtl; }
            h1 { text-align: center; color: #1890ff; margin-bottom: 30px; }
            .header { text-align: center; margin-bottom: 30px; border-bottom: 3px solid #1890ff; padding-bottom: 20px; }
            .section { margin-bottom: 25px; page-break-inside: avoid; }
            .section-title { background: #1890ff; color: white; padding: 10px; font-size: 16px; font-weight: bold; margin-bottom: 15px; }
            .field { display: flex; margin-bottom: 12px; padding: 8px; background: #f5f5f5; }
            .field-label { font-weight: bold; width: 200px; color: #333; }
            .field-value { flex: 1; color: #666; }
            @media print {
              body { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
            }
          </style>
        </head>
        <body>
          ${printContent.innerHTML}
        </body>
      </html>
    `);
    
    WinPrint.document.close();
    WinPrint.focus();
    setTimeout(() => {
      WinPrint.print();
      WinPrint.close();
    }, 250);
  };

  // إرسال النموذج
  const onFinish = async (values) => {
    setLoading(true);
    
    try {
      const allValues = reviewData || { ...formData, ...values };
      const formattedData = formatDataForAPI(allValues);
      
      const response = await volunteerApi.create(formattedData);

      if (response.success) {
        setSubmitSuccess(true);
        setShowReviewModal(false);
        message.success({
          content: response.message || 'تم تسجيل المتطوع بنجاح',
          duration: 5,
          icon: <CheckCircleOutlined style={{ color: '#52c41a' }} />
        });
        
        setTimeout(() => {
          form.resetFields();
          setCurrentStep(0);
          setSubmitSuccess(false);
          setSelectedGovernorate('');
          setAvailableRegions([]);
          setFormData({});
          setCompletedSteps([]);
          setReviewData(null);
        }, 3000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      
      if (error.response) {
        const errorData = error.response.data;
        const errorMessage = errorData.message;
        
        if (errorData.errors && Array.isArray(errorData.errors)) {
          const errorMessages = errorData.errors.slice(0, 3).map(err => err.msg || err.message).join('\n');
          message.error({
            content: `خطأ في التحقق:\n${errorMessages}`,
            duration: 7
          });
        } else if (error.response.status === 409) {
          message.error({
            content: errorMessage || 'البيانات مسجلة مسبقاً',
            duration: 5
          });
        } else if (error.response.status === 400) {
          message.error({
            content: errorMessage || 'بيانات غير صالحة، يرجى التحقق من المعلومات',
            duration: 5
          });
        } else {
          message.error({
            content: 'حدث خطأ أثناء التسجيل، يرجى المحاولة مرة أخرى',
            duration: 5
          });
        }
      } else {
        message.error({
          content: 'لا يمكن الاتصال بالخادم، يرجى التحقق من الاتصال بالإنترنت',
          duration: 5
        });
      }
    } finally {
      setLoading(false);
    }
  };

  // محتوى كل خطوة
  const renderStepContent = () => {
    const formItemStyle = { marginBottom: 16 };
    
    switch (currentStep) {
      case 0:
        return (
          <>
            <Form.Item
              name="idNumber"
              label="رقم بطاقة التعريف"
              rules={[
                { required: true, message: 'هذا الحقل مطلوب' },
                { validator: validateIdNumber }
              ]}
              style={formItemStyle}
            >
              <Input placeholder="01234567" maxLength={8} size="large" />
            </Form.Item>

            <Form.Item
              name="idIssueDate"
              label="تاريخ الإصدار"
              rules={[
                { required: true, message: 'هذا الحقل مطلوب' },
                { validator: validateIssueDate }
              ]}
              style={formItemStyle}
            >
              <DatePicker style={{ width: '100%' }} placeholder="اختر التاريخ" size="large" />
            </Form.Item>

            <Form.Item
              name="phone"
              label="رقم الهاتف الشخصي"
              rules={[
                { required: true, message: 'هذا الحقل مطلوب' },
                { pattern: /^\d{8}$/, message: 'يجب أن يحتوي على 8 أرقام فقط' }
              ]}
              style={formItemStyle}
            >
              <Input placeholder="12345678" maxLength={8} size="large" />
            </Form.Item>
          </>
        );

      case 1:
        return (
          <>
            <Form.Item
              name="firstName"
              label="الاسم"
              rules={[
                { required: true, message: 'هذا الحقل مطلوب' },
                arabicOnlyRule,
                { min: 2, message: 'يجب أن يحتوي على حرفين على الأقل' }
              ]}
              style={formItemStyle}
            >
              <Input placeholder="محمد" size="large" />
            </Form.Item>

            <Form.Item
              name="lastName"
              label="اللقب"
              rules={[
                { required: true, message: 'هذا الحقل مطلوب' },
                arabicOnlyRule,
                { min: 2, message: 'يجب أن يحتوي على حرفين على الأقل' }
              ]}
              style={formItemStyle}
            >
              <Input placeholder="بن علي" size="large" />
            </Form.Item>

            <Form.Item
              name="birthDate"
              label="تاريخ الولادة"
              rules={[
                { required: true, message: 'هذا الحقل مطلوب' },
                { validator: validateAge }
              ]}
              style={formItemStyle}
            >
              <DatePicker style={{ width: '100%' }} placeholder="اختر التاريخ" size="large" />
            </Form.Item>

            <Form.Item
              name="gender"
              label="الجنس"
              rules={[{ required: true, message: 'هذا الحقل مطلوب' }]}
              style={formItemStyle}
            >
              <Select placeholder="اختر الجنس" size="large">
                <Option value="male">ذكر</Option>
                <Option value="female">أنثى</Option>
              </Select>
            </Form.Item>
          </>
        );

      case 2:
        return (
          <>
            <Form.Item
              name="fatherName"
              label="اسم الأب"
              rules={[{ required: true, message: 'هذا الحقل مطلوب' }, arabicOnlyRule]}
              style={formItemStyle}
            >
              <Input placeholder="علي" size="large" />
            </Form.Item>

            <Form.Item
              name="grandFatherName"
              label="اسم الجد"
              rules={[{ required: true, message: 'هذا الحقل مطلوب' }, arabicOnlyRule]}
              style={formItemStyle}
            >
              <Input placeholder="أحمد" size="large" />
            </Form.Item>

            <Form.Item
              name="motherFirstName"
              label="اسم الأم"
              rules={[{ required: true, message: 'هذا الحقل مطلوب' }, arabicOnlyRule]}
              style={formItemStyle}
            >
              <Input placeholder="فاطمة" size="large" />
            </Form.Item>

            <Form.Item
              name="motherLastName"
              label="لقب الأم"
              rules={[{ required: true, message: 'هذا الحقل مطلوب' }, arabicOnlyRule]}
              style={formItemStyle}
            >
              <Input placeholder="السالمي" size="large" />
            </Form.Item>

            <Form.Item
              name="maritalstatus"
              label="الحالة العائلية"
              rules={[{ required: true, message: 'هذا الحقل مطلوب' }]}
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
              rules={[{ required: true, message: 'هذا الحقل مطلوب' }]}
              style={formItemStyle}
            >
              <InputNumber min={0} max={20} style={{ width: '100%' }} size="large" />
            </Form.Item>

            <Form.Item
              name="profession"
              label="المهنة"
              rules={[{ required: true, message: 'هذا الحقل مطلوب' }]}
              style={formItemStyle}
            >
              <Input placeholder="مهندس" size="large" />
            </Form.Item>

            <Form.Item
              name="fatherphone"
              label="رقم هاتف الأب"
              rules={[
                { required: true, message: 'هذا الحقل مطلوب' },
                { pattern: /^\d{8}$/, message: 'يجب أن يحتوي على 8 أرقام فقط' }
              ]}
              style={formItemStyle}
            >
              <Input placeholder="12345678" maxLength={8} size="large" />
            </Form.Item>
          </>
        );

      case 3:
        return (
          <>
            <Form.Item
              name="governorate"
              label="الولاية"
              rules={[{ required: true, message: 'هذا الحقل مطلوب' }]}
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
              rules={[{ required: true, message: 'هذا الحقل مطلوب' }]}
              style={formItemStyle}
            >
              <Input.TextArea rows={3} placeholder="أدخل العنوان الكامل" size="large" />
            </Form.Item>
          </>
        );

      case 4:
        return (
          <>
            <Form.Item
              name="educationlevel"
              label="المستوى التعليمي"
              rules={[{ required: true, message: 'هذا الحقل مطلوب' }]}
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
              rules={[{ required: true, message: 'هذا الحقل مطلوب' }]}
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

      default:
        return null;
    }
  };

  // عرض البيانات في المودال
  const renderReviewContent = () => {
    if (!reviewData) return null;

    const genderLabel = reviewData.gender === 'male' ? 'ذكر' : 'أنثى';
    const maritalStatusLabels = {
      single: 'أعزب',
      married: 'متزوج',
      divorced: 'مطلق',
      widowed: 'أرمل'
    };
    const educationLabels = {
      primary: 'ابتدائي',
      secondary: 'إعدادي',
      highschool: 'ثانوي',
      bachelor: 'بكالوريا',
      university: 'جامعي'
    };
    const supportingDocLabels = {
      'attendance-grades': 'شهادة حضور وبطاقة الأعداد',
      'baccalaureate': 'شهادة البكالوريا',
      'university': 'شهادة تعليم جامعي',
      'other': 'شهادة أخرى'
    };

    const governorateLabel = governorates.find(g => g.value === reviewData.governorate)?.label || reviewData.governorate;

    return (
      <div ref={printRef}>
        <div className="header">
          <h1> استمارة التسجيل في التطوع</h1>
          <p style={{ color: '#666', fontSize: '14px' }}>جمعية متطوعون في خدمة الحماية المدنية بن عروس</p>
        </div>

        <div className="section">
          <div className="section-title">معلومات الهوية</div>
          <div className="field">
            <span className="field-label">رقم بطاقة التعريف:</span>
            <span className="field-value">{reviewData.idNumber}</span>
          </div>
          <div className="field">
            <span className="field-label">تاريخ الإصدار:</span>
            <span className="field-value">{reviewData.idIssueDate?.format('DD/MM/YYYY')}</span>
          </div>
          <div className="field">
            <span className="field-label">رقم الهاتف الشخصي:</span>
            <span className="field-value">{reviewData.phone}</span>
          </div>
        </div>

        <div className="section">
          <div className="section-title">البيانات الشخصية</div>
          <div className="field">
            <span className="field-label">الاسم الكامل:</span>
            <span className="field-value">{reviewData.firstName} {reviewData.lastName}</span>
          </div>
          <div className="field">
            <span className="field-label">تاريخ الولادة:</span>
            <span className="field-value">{reviewData.birthDate?.format('DD/MM/YYYY')}</span>
          </div>
          <div className="field">
            <span className="field-label">الجنس:</span>
            <span className="field-value">{genderLabel}</span>
          </div>
        </div>

        <div className="section">
          <div className="section-title">معلومات العائلة</div>
          <div className="field">
            <span className="field-label">اسم الأب:</span>
            <span className="field-value">{reviewData.fatherName}</span>
          </div>
          <div className="field">
            <span className="field-label">اسم الجد:</span>
            <span className="field-value">{reviewData.grandFatherName}</span>
          </div>
          <div className="field">
            <span className="field-label">اسم الأم الكامل:</span>
            <span className="field-value">{reviewData.motherFirstName} {reviewData.motherLastName}</span>
          </div>
          <div className="field">
            <span className="field-label">الحالة العائلية:</span>
            <span className="field-value">{maritalStatusLabels[reviewData.maritalstatus]}</span>
          </div>
          <div className="field">
            <span className="field-label">عدد الأبناء:</span>
            <span className="field-value">{reviewData.children}</span>
          </div>
          <div className="field">
            <span className="field-label">المهنة:</span>
            <span className="field-value">{reviewData.profession}</span>
          </div>
          <div className="field">
            <span className="field-label">رقم هاتف الأب:</span>
            <span className="field-value">{reviewData.fatherphone}</span>
          </div>
        </div>

        <div className="section">
          <div className="section-title">معلومات الإقامة</div>
          <div className="field">
            <span className="field-label">الولاية:</span>
            <span className="field-value">{governorateLabel}</span>
          </div>
          {reviewData.region && (
            <div className="field">
              <span className="field-label">المنطقة:</span>
              <span className="field-value">{reviewData.region}</span>
            </div>
          )}
          <div className="field">
            <span className="field-label">العنوان الكامل:</span>
            <span className="field-value">{reviewData.address}</span>
          </div>
        </div>

        <div className="section">
          <div className="section-title">المستوى التعليمي</div>
          <div className="field">
            <span className="field-label">المستوى التعليمي:</span>
            <span className="field-value">{educationLabels[reviewData.educationlevel]}</span>
          </div>
          <div className="field">
            <span className="field-label">شهادة الإثبات:</span>
            <span className="field-value">{supportingDocLabels[reviewData.supportingdocument]}</span>
          </div>
        </div>

        <div style={{ marginTop: '40px', textAlign: 'center', color: '#999', fontSize: '12px' }}>
          <p>تاريخ التسجيل: {dayjs().format('DD/MM/YYYY HH:mm')}</p>
        </div>
      </div>
    );
  };

  // Affichage de succès
  if (submitSuccess) {
    return (
      <div style={{ 
        maxWidth: 900, 
        margin: '0 auto', 
        padding: '16px', 
        direction: 'rtl',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Card
          style={{
            textAlign: 'center',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}
          bodyStyle={{ padding: '40px' }}
        >
          <CheckCircleOutlined style={{ fontSize: 64, color: '#52c41a', marginBottom: 24 }} />
          <Title level={2}>تم التسجيل بنجاح!</Title>
          <Text type="secondary" style={{ fontSize: 16, display: 'block', marginTop: 16 }}>
            شكراً لتسجيلك. سيتم مراجعة طلبك والتواصل معك قريباً.
          </Text>
        </Card>
      </div>
    );
  }

  return (
    <div style={{ 
      maxWidth: 900, 
      margin: '0 auto', 
      padding: '16px', 
      direction: 'rtl',
      minHeight: '100vh'
    }}>
      <SchemaOrg schema={getRegisterActionSchema()} id="register-schema" />
      <SchemaOrg schema={getBreadcrumbSchema(breadcrumbs)} id="breadcrumb-schema" />
      
      <Card 
        style={{ 
          marginBottom: 16, 
          textAlign: 'center',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
        }}
        bodyStyle={{ padding: '20px 16px' }}
      >
        <Title level={2} style={{ marginBottom: 8, fontSize: 'clamp(20px, 5vw, 28px)' }}>
        التسجيل في التطوع
        </Title>
        <Text type="secondary" style={{ fontSize: 'clamp(12px, 3.5vw, 14px)', display: 'block', lineHeight: 1.6 }}>
          انضم إلى جمعية متطوعون في خدمة الحماية المدنية بن عروس وكن جزءاً من فريق يخدم المجتمع
        </Text>
      </Card>

      <Alert
        message="تنبيه هام"
        description="يرجى التحقق من صحة المعلومات المدخلة لأن أي خطأ في البيانات سيؤدي إلى رفض الملف تلقائياً."
        type="warning"
        icon={<ExclamationCircleOutlined />}
        showIcon
        style={{ 
          marginBottom: 16,
          borderRadius: '8px',
          fontSize: 'clamp(12px, 3.5vw, 14px)'
        }}
      />

      <Card 
        style={{ 
          marginBottom: 16,
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          overflow: 'hidden'
        }}
        bodyStyle={{ padding: '20px 8px' }}
      >
        <div 
          ref={stepsContainerRef}
          style={{ 
            overflowX: 'auto',
            overflowY: 'hidden',
            scrollBehavior: 'smooth',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'thin',
            scrollbarColor: '#1890ff #f0f0f0'
          }}
        >
          <Steps 
            current={currentStep} 
            items={steps.map((step, index) => ({
              ...step,
              status: completedSteps.includes(index) ? 'finish' : 
                      index === currentStep ? 'process' : 'wait',
              icon: completedSteps.includes(index) ? <CheckOutlined /> : step.icon
            }))}
            responsive={false}
            size="small"
            style={{
              minWidth: '600px',
              paddingBottom: '10px'
            }}
          />
        </div>
      </Card>

      <Card
        style={{
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          marginBottom: 16
        }}
        bodyStyle={{ padding: '20px 16px' }}
      >
        <Spin spinning={loading} tip="جاري التسجيل...">
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            scrollToFirstError
          >
            {renderStepContent()}

            <div style={{ 
              marginTop: 24, 
              display: 'flex', 
              gap: '12px',
              justifyContent: 'space-between',
              borderTop: '1px solid #f0f0f0', 
              paddingTop: 20,
              flexWrap: 'wrap'
            }}>
              {currentStep > 0 && (
                <Button 
                  onClick={prev} 
                  icon={<ArrowRightOutlined />}
                  size="large"
                  disabled={loading}
                  style={{ flex: '1 1 auto', minWidth: '120px' }}
                >
                  السابق
                </Button>
              )}
              
              {currentStep < steps.length - 1 ? (
                <Button 
                  type="primary" 
                  onClick={next} 
                  icon={<ArrowLeftOutlined />}
                  size="large"
                  disabled={loading}
                  style={{ flex: '1 1 auto', minWidth: '120px', marginRight: currentStep === 0 ? 'auto' : 0 }}
                >
                  التالي
                </Button>
              ) : (
                <Button 
                  type="primary" 
                  onClick={handleReview}
                  icon={<SendOutlined />}
                  size="large"
                  loading={loading}
                  style={{ flex: '1 1 auto', minWidth: '120px' }}
                >
                  مراجعة وتسجيل
                </Button>
              )}
            </div>
          </Form>
        </Spin>
      </Card>

      {/* Modal de révision */}
      <Modal
        title={
          <Space style={{ fontSize: '18px', fontWeight: 'bold' }}>
            <ExclamationCircleOutlined style={{ color: '#faad14' }} />
            <span>مراجعة البيانات قبل التسجيل</span>
          </Space>
        }
        open={showReviewModal}
        onCancel={() => setShowReviewModal(false)}
        width={800}
        style={{ direction: 'rtl' }}
        footer={[
          <Button 
            key="edit" 
            icon={<EditOutlined />}
            onClick={() => setShowReviewModal(false)}
            size="large"
          >
            تعديل البيانات
          </Button>,
          <Button 
            key="download" 
            icon={<DownloadOutlined />}
            onClick={handleDownloadPDF}
            size="large"
          >
            تحميل PDF
          </Button>,
          <Button 
            key="submit" 
            type="primary" 
            icon={<SaveOutlined />}
            loading={loading}
            onClick={() => onFinish(reviewData)}
            size="large"
          >
            حفظ وتسجيل
          </Button>
        ]}
      >
        <Alert
          message="تنبيه مهم"
          description="يرجى مراجعة جميع البيانات بعناية. بعد الضغط على 'حفظ وتسجيل' لن تتمكن من تعديلها."
          type="warning"
          showIcon
          style={{ marginBottom: 20 }}
        />
        
        <div style={{ maxHeight: '60vh', overflowY: 'auto', padding: '10px 0' }}>
          {renderReviewContent()}
        </div>
      </Modal>

      <style jsx>{`
        /* Scrollbar personnalisée pour webkit */
        div[style*="overflowX"]::-webkit-scrollbar {
          height: 6px;
        }
        
        div[style*="overflowX"]::-webkit-scrollbar-track {
          background: #f0f0f0;
          border-radius: 3px;
        }
        
        div[style*="overflowX"]::-webkit-scrollbar-thumb {
          background: #1890ff;
          border-radius: 3px;
        }
        
        div[style*="overflowX"]::-webkit-scrollbar-thumb:hover {
          background: #096dd9;
        }
        
        @media (max-width: 768px) {
          .ant-steps-item-title {
            font-size: 12px !important;
          }
          .ant-steps-item-icon {
            width: 28px !important;
            height: 28px !important;
            font-size: 14px !important;
          }
        }
        
        @media print {
          .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 3px solid #1890ff;
            padding-bottom: 20px;
          }
          .section {
            margin-bottom: 25px;
            page-break-inside: avoid;
          }
          .section-title {
            background: #1890ff;
            color: white;
            padding: 10px;
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 15px;
          }
          .field {
            display: flex;
            margin-bottom: 12px;
            padding: 8px;
            background: #f5f5f5;
          }
          .field-label {
            font-weight: bold;
            width: 200px;
            color: #333;
          }
          .field-value {
            flex: 1;
            color: #666;
          }
        }
      `}</style>
    </div>
  );
};

export default RegisterPage;