// src/pages/RegisterPage.jsx
import { useState } from 'react';
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
  Spin
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
  CheckCircleOutlined
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
  const [formData, setFormData] = useState({}); // ⭐ Nouveau: stockage des données

  // خطوات النموذج
  const steps = [
    { title: 'الهوية', icon: <IdcardOutlined /> },
    { title: 'البيانات', icon: <UserOutlined /> },
    { title: 'العائلة', icon: <TeamOutlined /> },
    { title: 'الموقع', icon: <EnvironmentOutlined /> },
    { title: 'التعليم', icon: <SafetyCertificateOutlined /> }
  ];

  // التحقق من الأحرف العربية فقط
  const arabicOnlyRule = {
    pattern: /^[\u0600-\u06FF\s]+$/,
    message: 'يسمح فقط بالأحرف العربية'
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
      
      // ⭐ Sauvegarder les valeurs de l'étape actuelle
      const currentValues = form.getFieldsValue(fieldsToValidate);
      setFormData(prev => ({ ...prev, ...currentValues }));
      
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
    // Trouver le label en arabe pour le governorate
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

  // إرسال النموذج
  const onFinish = async (values) => {
    setLoading(true);
    
    try {
      // ⭐ Fusionner toutes les données des étapes précédentes avec l'étape finale
      const allValues = { ...formData, ...values };
      
      // Log des valeurs complètes du formulaire
      console.log('Valeurs complètes du formulaire:', allValues);
      
      const formattedData = formatDataForAPI(allValues);
      
      // Log des données formatées
      console.log('Données formatées pour envoi:', formattedData);
      
      const response = await volunteerApi.create(formattedData);

      if (response.success) {
        setSubmitSuccess(true);
        message.success({
          content: response.message || 'تم تسجيل المتطوع بنجاح',
          duration: 5,
          icon: <CheckCircleOutlined style={{ color: '#52c41a' }} />
        });
        
        // إعادة تعيين النموذج بعد 3 ثواني
        setTimeout(() => {
          form.resetFields();
          setCurrentStep(0);
          setSubmitSuccess(false);
          setSelectedGovernorate('');
          setAvailableRegions([]);
          setFormData({}); // ⭐ Réinitialiser les données stockées
        }, 3000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      console.error('Error response:', error.response?.data);
      
      if (error.response) {
        const errorData = error.response.data;
        const errorMessage = errorData.message;
        
        // Afficher les erreurs de validation détaillées
        if (errorData.errors && Array.isArray(errorData.errors)) {
          console.error('Erreurs de validation:', errorData.errors);
          
          // Afficher les 3 premières erreurs
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
      } else if (error.request) {
        message.error({
          content: 'لا يمكن الاتصال بالخادم، يرجى التحقق من الاتصال بالإنترنت',
          duration: 5
        });
      } else {
        message.error({
          content: 'حدث خطأ غير متوقع، يرجى المحاولة مرة أخرى',
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
                { pattern: /^\d{8}$/, message: 'يجب أن يحتوي على 8 أرقام فقط' }
              ]}
              style={formItemStyle}
            >
              <Input placeholder="12345678" maxLength={8} size="large" />
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
              label="العنوان الشخصي"
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
          تسجيل في تطوع
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
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
        }}
        bodyStyle={{ padding: '20px 12px' }}
      >
        <Steps 
          current={currentStep} 
          items={steps}
          responsive={false}
          size="small"
          labelPlacement="vertical"
        />
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
                  htmlType="submit" 
                  icon={<SendOutlined />}
                  size="large"
                  loading={loading}
                  style={{ flex: '1 1 auto', minWidth: '120px' }}
                >
                  تسجيل
                </Button>
              )}
            </div>
          </Form>
        </Spin>
      </Card>
    </div>
  );
};

export default RegisterPage;