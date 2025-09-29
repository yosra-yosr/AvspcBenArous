import React, { useState, useEffect } from 'react';
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
  Space,
  Alert
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
  ExclamationCircleOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';
import 'dayjs/locale/ar';

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

const RegisterPage = () => {
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [availableRegions, setAvailableRegions] = useState([]);
  const [selectedGovernorate, setSelectedGovernorate] = useState('');

  // خطوات النموذج
  const steps = [
    {
      title: 'معلومات الهوية',
      icon: <IdcardOutlined />,
      description: 'رقم بطاقة التعريف'
    },
    {
      title: 'البيانات الشخصية',
      icon: <UserOutlined />,
      description: 'الاسم والتاريخ'
    },
    {
      title: 'المعلومات العائلية',
      icon: <TeamOutlined />,
      description: 'العائلة والمهنة'
    },
    {
      title: 'العنوان والموقع',
      icon: <EnvironmentOutlined />,
      description: 'الولاية والمنطقة'
    },
    {
      title: 'التعليم والشهائد',
      icon: <SafetyCertificateOutlined />,
      description: 'المستوى التعليمي'
    }
  ];

  // التحقق من الأحرف العربية فقط
  const arabicOnlyRule = {
    pattern: /^[\u0600-\u06FF\s]+$/,
    message: 'يسمح فقط بالأحرف العربية'
  };

  // التحقق من العمر
  const validateAge = (_, value) => {
    if (!value) {
      return Promise.reject('يرجى إدخال تاريخ الولادة');
    }
    const age = dayjs().diff(value, 'year');
    if (age < 18) {
      return Promise.reject('يجب أن يكون العمر 18 سنة على الأقل');
    }
    if (age > 50) {
      return Promise.reject('الحد الأقصى للعمر هو 50 سنة');
    }
    return Promise.resolve();
  };

  // التحقق من تاريخ الإصدار
  const validateIssueDate = (_, value) => {
    if (!value) {
      return Promise.reject('يرجى إدخال تاريخ الإصدار');
    }
    if (value.isAfter(dayjs())) {
      return Promise.reject('تاريخ الإصدار لا يمكن أن يكون في المستقبل');
    }
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
      2: ['fatherName', 'grandFatherName', 'motherFirstName', 'motherLastName', 'maritalstatus', 'children', 'profession'],
      3: ['governorate', 'address'],
      4: ['educationlevel', 'supportingdocument']
    };
    return fieldsMap[step] || [];
  };

  // إرسال النموذج
  const onFinish = (values) => {
    console.log('Form values:', values);
    message.success('تم إرسال النموذج بنجاح! سيتم التواصل معك قريباً');
    // هنا يمكنك إرسال البيانات إلى الخادم
  };

  // محتوى كل خطوة
  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <>
            <Form.Item
              name="idNumber"
              label="رقم بطاقة التعريف"
              rules={[
                { required: true, message: 'هذا الحقل مطلوب' },
                { pattern: /^\d{8}$/, message: 'يجب أن يحتوي على 8 أرقام فقط' }
              ]}
            >
              <Input placeholder="12345678" maxLength={8} />
            </Form.Item>

            <Form.Item
              name="idIssueDate"
              label="تاريخ الإصدار"
              rules={[
                { required: true, message: 'هذا الحقل مطلوب' },
                { validator: validateIssueDate }
              ]}
            >
              <DatePicker style={{ width: '100%' }} placeholder="اختر التاريخ" />
            </Form.Item>

            <Form.Item
              name="phone"
              label="رقم الهاتف الشخصي"
              rules={[
                { required: true, message: 'هذا الحقل مطلوب' },
                { pattern: /^\d{8}$/, message: 'يجب أن يحتوي على 8 أرقام فقط' }
              ]}
            >
              <Input placeholder="12345678" maxLength={8} />
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
            >
              <Input placeholder="محمد" />
            </Form.Item>

            <Form.Item
              name="lastName"
              label="اللقب"
              rules={[
                { required: true, message: 'هذا الحقل مطلوب' },
                arabicOnlyRule,
                { min: 2, message: 'يجب أن يحتوي على حرفين على الأقل' }
              ]}
            >
              <Input placeholder="بن علي" />
            </Form.Item>

            <Form.Item
              name="birthDate"
              label="تاريخ الولادة"
              rules={[
                { required: true, message: 'هذا الحقل مطلوب' },
                { validator: validateAge }
              ]}
            >
              <DatePicker style={{ width: '100%' }} placeholder="اختر التاريخ" />
            </Form.Item>

            <Form.Item
              name="gender"
              label="الجنس"
              rules={[{ required: true, message: 'هذا الحقل مطلوب' }]}
            >
              <Select placeholder="اختر الجنس">
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
              rules={[
                { required: true, message: 'هذا الحقل مطلوب' },
                arabicOnlyRule
              ]}
            >
              <Input placeholder="علي" />
            </Form.Item>

            <Form.Item
              name="grandFatherName"
              label="اسم الجد"
              rules={[
                { required: true, message: 'هذا الحقل مطلوب' },
                arabicOnlyRule
              ]}
            >
              <Input placeholder="أحمد" />
            </Form.Item>

            <Form.Item
              name="motherFirstName"
              label="اسم الأم"
              rules={[
                { required: true, message: 'هذا الحقل مطلوب' },
                arabicOnlyRule
              ]}
            >
              <Input placeholder="فاطمة" />
            </Form.Item>

            <Form.Item
              name="motherLastName"
              label="لقب الأم"
              rules={[
                { required: true, message: 'هذا الحقل مطلوب' },
                arabicOnlyRule
              ]}
            >
              <Input placeholder="السالمي" />
            </Form.Item>

            <Form.Item
              name="maritalstatus"
              label="الحالة العائلية"
              rules={[{ required: true, message: 'هذا الحقل مطلوب' }]}
            >
              <Select placeholder="اختر الحالة العائلية">
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
            >
              <InputNumber min={0} max={20} style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
              name="profession"
              label="المهنة"
              rules={[{ required: true, message: 'هذا الحقل مطلوب' }]}
            >
              <Input placeholder="مهندس" />
            </Form.Item>

            <Form.Item
              name="fatherphone"
              label="رقم هاتف الأب"
              rules={[
                { pattern: /^\d{8}$/, message: 'يجب أن يحتوي على 8 أرقام فقط' }
              ]}
            >
              <Input placeholder="12345678" maxLength={8} />
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
            >
              <Select
                placeholder="اختر الولاية"
                onChange={handleGovernorateChange}
                showSearch
                optionFilterProp="children"
              >
                {governorates.map(gov => (
                  <Option key={gov.value} value={gov.value}>{gov.label}</Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="region"
              label="المنطقة"
            >
              <Select
                placeholder={selectedGovernorate === 'ben_arous' ? 'اختر المنطقة (اختياري)' : 'لا توجد مناطق لهذه الولاية'}
                disabled={selectedGovernorate !== 'ben_arous'}
              >
                {availableRegions.map(region => (
                  <Option key={region} value={region}>{region}</Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="address"
              label="العنوان الشخصي"
              rules={[{ required: true, message: 'هذا الحقل مطلوب' }]}
            >
              <Input.TextArea rows={3} placeholder="أدخل العنوان الكامل" />
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
            >
              <Select placeholder="اختر المستوى التعليمي">
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
            >
              <Select placeholder="اختر نوع الشهادة">
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

  return (
    <div style={{ maxWidth: 900, margin: '40px auto', padding: '0 20px', direction: 'rtl' }}>
      {/* العنوان */}
      <Card style={{ marginBottom: 30, textAlign: 'center' }}>
        <Title level={2}>تسجيل في تطوع</Title>
        <Text type="secondary">
          انضم إلى جمعية متطوعون في خدمة الحماية المدنية بن عروس وكن جزءاً من فريق يخدم المجتمع
        </Text>
      </Card>

      {/* تنبيه هام */}
      <Alert
        message="تنبيه هام"
        description="يرجى التحقق من صحة المعلومات المدخلة لأن أي خطأ في البيانات سيؤدي إلى رفض الملف تلقائياً."
        type="warning"
        icon={<ExclamationCircleOutlined />}
        showIcon
        style={{ marginBottom: 30 }}
      />

      {/* مؤشر الخطوات */}
      <Card style={{ marginBottom: 30 }}>
        <Steps current={currentStep} items={steps} />
      </Card>

      {/* النموذج */}
      <Card>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          scrollToFirstError
        >
          {renderStepContent()}

          {/* أزرار التنقل */}
          <div style={{ marginTop: 40, display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #f0f0f0', paddingTop: 20 }}>
            {currentStep > 0 && (
              <Button onClick={prev} icon={<ArrowRightOutlined />}>
                السابق
              </Button>
            )}
            
            <div style={{ marginRight: 'auto' }}>
              {currentStep < steps.length - 1 && (
                <Button type="primary" onClick={next} icon={<ArrowLeftOutlined />}>
                  التالي
                </Button>
              )}
              
              {currentStep === steps.length - 1 && (
                <Button type="primary" htmlType="submit" icon={<SendOutlined />}>
                  تسجيل
                </Button>
              )}
            </div>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default RegisterPage;