// src/pages/RegisterPage.jsx
import { useState, useRef, useEffect } from 'react';
import { Form, Button, Steps, Card, Typography, message, Spin, Modal, Space, Input, Select, DatePicker, Row, Col } from 'antd';
import {
  IdcardOutlined, UserOutlined, TeamOutlined, EnvironmentOutlined,
  SafetyCertificateOutlined, ArrowRightOutlined, ArrowLeftOutlined,
  SendOutlined, EditOutlined, SaveOutlined, DownloadOutlined, CheckOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';
import volunteerApi from '../services/volunteerApi';
import SchemaOrg from '../components/common/SchemaOrg';
import { getBreadcrumbSchema } from '../utils/schemas';
import { DataValidationAlert, ReviewBeforeSubmitAlert } from '../components/common/AlertComponents';
import SuccessScreen from '../components/registration/SuccessScreen';
import {
  IdentityStep, PersonalDataStep, FamilyStep, ResidenceStep, EducationStep
} from '../components/registration/FormSteps';
import { GOVERNORATES, REGIONS_DATA, BREADCRUMBS } from '../utils/constants';
import DataFormatterService from '../services/DataFormatterService';
import ErrorHandlerService from '../services/ErrorHandlerService';

const { Title, Text } = Typography;

const FORM_STEPS = [
  { title: 'الهوية', icon: <IdcardOutlined /> },
  { title: 'البيانات', icon: <UserOutlined /> },
  { title: 'العائلة', icon: <TeamOutlined /> },
  { title: 'الإقامة', icon: <EnvironmentOutlined /> },
  { title: 'التعليم', icon: <SafetyCertificateOutlined /> }
];

const STEP_FIELDS = {
  0: ['idNumber', 'idIssueDate', 'phone'],
  1: ['firstName', 'lastName', 'birthDate', 'gender'],
  2: ['fatherName', 'grandFatherName', 'motherFirstName', 'motherLastName', 'maritalstatus', 'children', 'profession', 'fatherphone'],
  3: ['governorate', 'address'],
  4: ['educationlevel', 'supportingdocument']
};

const RegisterPage = () => {
  const [form] = Form.useForm();
  const [reviewForm] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [availableRegions, setAvailableRegions] = useState([]);
  const [selectedGovernorate, setSelectedGovernorate] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formData, setFormData] = useState({});
  const [completedSteps, setCompletedSteps] = useState([]);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewData, setReviewData] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const stepsContainerRef = useRef(null);

  useEffect(() => {
    if (stepsContainerRef.current) {
      const container = stepsContainerRef.current;
      const stepWidth = container.scrollWidth / FORM_STEPS.length;
      const scrollPosition = stepWidth * currentStep - (container.clientWidth / 2) + (stepWidth / 2);
      
      container.scrollTo({
        left: Math.max(0, scrollPosition),
        behavior: 'smooth'
      });
    }
  }, [currentStep]);

  const handleGovernorateChange = (value) => {
    setSelectedGovernorate(value);
    form.setFieldValue('region', undefined);
    
    if (value === 'ben_arous') {
      setAvailableRegions(REGIONS_DATA.ben_arous);
      message.success('تم فتح قائمة المناطق لولاية بن عروس');
    } else {
      setAvailableRegions([]);
    }
  };

  const next = async () => {
    try {
      const fieldsToValidate = STEP_FIELDS[currentStep];
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

  const prev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleReview = async () => {
    try {
      const fieldsToValidate = STEP_FIELDS[currentStep];
      await form.validateFields(fieldsToValidate);
      
      const currentValues = form.getFieldsValue(fieldsToValidate);
      const allValues = { ...formData, ...currentValues };
      
      setReviewData(allValues);
      reviewForm.setFieldsValue(allValues);
      setIsEditMode(false);
      setShowReviewModal(true);
    } catch (error) {
      message.error('يرجى ملء جميع الحقول المطلوبة بشكل صحيح');
    }
  };

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleSaveEdit = async () => {
    try {
      const values = await reviewForm.validateFields();
      setReviewData(values);
      setIsEditMode(false);
      message.success('تم تحديث البيانات بنجاح');
    } catch (error) {
      message.error('يرجى التحقق من صحة البيانات');
    }
  };

  const handleDownloadPDF = () => {
    const labels = DataFormatterService.getDisplayLabels();
    const governorateLabel = GOVERNORATES.find(g => g.value === reviewData.governorate)?.label || reviewData.governorate;

    const pdfContent = `
      <!DOCTYPE html>
      <html dir="rtl" lang="ar">
      <head>
        <meta charset="UTF-8">
        <style>
          @page { margin: 20mm; }
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: white;
            padding: 30px;
            color: #2c3e50;
            line-height: 1.6;
          }
          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 35px;
            padding-bottom: 15px;
            border-bottom: 4px solid #ff6b35;
          }
          .logo {
            width: auto;
            height: auto;
          }
          .header-text {
            text-align: right;
            flex: 1;
            margin-right: 25px;
          }
          .header-text h1 {
            color: #2c3e50;
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 6px;
          }
          .header-text p {
            color: #7f8c8d;
            font-size: 13px;
          }
          .section {
            margin-bottom: 25px;
            background: #ffffff;
            padding: 0;
            border-radius: 6px;
            border: 1px solid #e0e0e0;
            overflow: hidden;
          }
          .section-title {
            background: linear-gradient(135deg, gray 0%, #ff8c5a 100%);
            color: white;
            font-size: 16px;
            font-weight: bold;
            padding: 12px 15px;
            margin: 0;
          }
          .section-content {
            padding: 15px;
          }
          .field {
            display: flex;
            padding: 12px 10px;
            border-bottom: 1px solid #f0f0f0;
            background: #fafafa;
            margin-bottom: 8px;
            border-radius: 4px;
          }
          .field:last-child {
            margin-bottom: 0;
          }
          .field:nth-child(even) {
            background: #ffffff;
          }
          .field-label {
            color: #5a5a5a;
            font-weight: 700;
            min-width: 200px;
            font-size: 13px;
            padding-left: 15px;
            position: relative;
          }
          .field-label:after {
            content: '';
            position: absolute;
            left: 5px;
            top: 50%;
            transform: translateY(-50%);
            width: 3px;
            height: 60%;
            background: #ff6b35;
            border-radius: 2px;
          }
          .field-value {
            color: #2c3e50;
            flex: 1;
            font-size: 13px;
            font-weight: 500;
            padding: 2px 8px;
            background: white;
            border-radius: 3px;
            border: 1px solid #e8e8e8;
          }
          .footer {
            margin-top: 40px;
            text-align: center;
            padding-top: 20px;
            border-top: 2px solid #e0e0e0;
          }
          .footer-date {
            color: #7f8c8d;
            font-size: 11px;
            margin-bottom: 10px;
            background: #f8f9fa;
            padding: 8px;
            border-radius: 4px;
            display: inline-block;
          }
          .footer-signature {
            color: #2c3e50;
            font-size: 12px;
            margin-top: 35px;
            display: flex;
            justify-content: space-around;
            padding: 0 30px;
          }
          .signature-box {
            text-align: center;
            flex: 1;
          }
          .signature-line {
            width: 180px;
            border-top: 2px solid #2c3e50;
            margin: 30px auto 8px;
          }
          @media print {
            body { padding: 15px; }
            .section { page-break-inside: avoid; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <img src="/assets/images/شعار.png" alt="شعار" class="logo" />
          <div class="header-text">
            <h1>استمارة التسجيل في التطوع</h1>
            <p>جمعية متطوعون في خدمة الحماية المدنية بن عروس</p>
          </div>
        </div>

        <div class="section">
          <div class="section-title">معلومات الهوية</div>
          <div class="section-content">
            <div class="field">
              <span class="field-label">رقم بطاقة التعريف</span>
              <span class="field-value">${reviewData.idNumber}</span>
            </div>
            <div class="field">
              <span class="field-label">تاريخ الإصدار</span>
              <span class="field-value">${reviewData.idIssueDate?.format('DD/MM/YYYY')}</span>
            </div>
            <div class="field">
              <span class="field-label">رقم الهاتف الشخصي</span>
              <span class="field-value">${reviewData.phone}</span>
            </div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">البيانات الشخصية</div>
          <div class="section-content">
            <div class="field">
              <span class="field-label">الاسم الكامل</span>
              <span class="field-value">${reviewData.firstName} ${reviewData.lastName}</span>
            </div>
            <div class="field">
              <span class="field-label">تاريخ الولادة</span>
              <span class="field-value">${reviewData.birthDate?.format('DD/MM/YYYY')}</span>
            </div>
            <div class="field">
              <span class="field-label">الجنس</span>
              <span class="field-value">${labels.gender[reviewData.gender]}</span>
            </div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">معلومات العائلة</div>
          <div class="section-content">
            <div class="field">
              <span class="field-label">اسم الأب</span>
              <span class="field-value">${reviewData.fatherName}</span>
            </div>
            <div class="field">
              <span class="field-label">اسم الجد</span>
              <span class="field-value">${reviewData.grandFatherName}</span>
            </div>
            <div class="field">
              <span class="field-label">اسم الأم الكامل</span>
              <span class="field-value">${reviewData.motherFirstName} ${reviewData.motherLastName}</span>
            </div>
            <div class="field">
              <span class="field-label">الحالة العائلية</span>
              <span class="field-value">${labels.maritalstatus[reviewData.maritalstatus]}</span>
            </div>
            <div class="field">
              <span class="field-label">عدد الأبناء</span>
              <span class="field-value">${reviewData.children}</span>
            </div>
            <div class="field">
              <span class="field-label">المهنة</span>
              <span class="field-value">${reviewData.profession}</span>
            </div>
            <div class="field">
              <span class="field-label">رقم هاتف الأب</span>
              <span class="field-value">${reviewData.fatherphone}</span>
            </div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">معلومات الإقامة</div>
          <div class="section-content">
            <div class="field">
              <span class="field-label">الولاية</span>
              <span class="field-value">${governorateLabel}</span>
            </div>
            ${reviewData.region ? `
            <div class="field">
              <span class="field-label">المنطقة</span>
              <span class="field-value">${reviewData.region}</span>
            </div>
            ` : ''}
            <div class="field">
              <span class="field-label">العنوان الكامل</span>
              <span class="field-value">${reviewData.address}</span>
            </div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">المستوى التعليمي</div>
          <div class="section-content">
            <div class="field">
              <span class="field-label">المستوى التعليمي</span>
              <span class="field-value">${labels.education[reviewData.educationlevel]}</span>
            </div>
            <div class="field">
              <span class="field-label">شهادة الإثبات</span>
              <span class="field-value">${labels.supportingDoc[reviewData.supportingdocument]}</span>
            </div>
          </div>
        </div>

        <div class="footer">
          <div class="footer-date">تاريخ التسجيل: ${dayjs().format('DD/MM/YYYY HH:mm')}</div>
          <div class="footer-signature">
            <div class="signature-box">
              <div>توقيع المتطوع</div>
              <div class="signature-line"></div>
            </div>
            <div class="signature-box">
              <div>ختم الجمعية</div>
              <div class="signature-line"></div>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    // Ouvrir dans une nouvelle fenêtre pour imprimer en PDF
    const printWindow = window.open('', '_blank');
    printWindow.document.write(pdfContent);
    printWindow.document.close();
    
    // Attendre le chargement puis déclencher l'impression
    printWindow.onload = function() {
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
      }, 250);
    };
    
    message.success('تم فتح نافذة الطباعة - اختر "حفظ كـ PDF"');
  };

  const handleFinalSubmit = async () => {
    setLoading(true);
    
    try {
      const formattedData = DataFormatterService.formatForAPI(reviewData, GOVERNORATES);
      console.log('📤 Données envoyées à l\'API:', formattedData);
      const response = await volunteerApi.create(formattedData);

      if (response.success) {
        handleDownloadPDF();
        setSubmitSuccess(true);
        setShowReviewModal(false);
        
        message.success({
          content: response.message || 'تم تسجيل المتطوع بنجاح وتنزيل الفيش',
          duration: 5
        });
      }
    } catch (error) {
      ErrorHandlerService.handleSubmitError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleReturnHome = () => {
    form.resetFields();
    reviewForm.resetFields();
    setCurrentStep(0);
    setSubmitSuccess(false);
    setSelectedGovernorate('');
    setAvailableRegions([]);
    setFormData({});
    setCompletedSteps([]);
    setReviewData(null);
  };

  const renderStepContent = () => {
    const formItemStyle = { marginBottom: 16 };
    
    switch (currentStep) {
      case 0:
        return <IdentityStep formItemStyle={formItemStyle} />;
      case 1:
        return <PersonalDataStep formItemStyle={formItemStyle} />;
      case 2:
        return <FamilyStep formItemStyle={formItemStyle} />;
      case 3:
        return (
          <ResidenceStep
            formItemStyle={formItemStyle}
            governorates={GOVERNORATES}
            selectedGovernorate={selectedGovernorate}
            availableRegions={availableRegions}
            handleGovernorateChange={handleGovernorateChange}
          />
        );
      case 4:
        return <EducationStep formItemStyle={formItemStyle} />;
      default:
        return null;
    }
  };

  const renderReviewContent = () => {
    if (!reviewData) return null;

    const labels = DataFormatterService.getDisplayLabels();
    const governorateLabel = GOVERNORATES.find(g => g.value === reviewData.governorate)?.label || reviewData.governorate;

    if (isEditMode) {
      return (
        <Form form={reviewForm} layout="vertical">
          <Title level={4} style={{ marginBottom: 16, color: '#ff6b35' }}>معلومات الهوية</Title>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item name="idNumber" label="رقم بطاقة التعريف" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="idIssueDate" label="تاريخ الإصدار" rules={[{ required: true }]}>
                <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="phone" label="رقم الهاتف" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Title level={4} style={{ marginTop: 24, marginBottom: 16, color: '#ff6b35' }}>البيانات الشخصية</Title>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item name="firstName" label="الاسم" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="lastName" label="اللقب" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="birthDate" label="تاريخ الولادة" rules={[{ required: true }]}>
                <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item name="gender" label="الجنس" rules={[{ required: true }]}>
                <Select>
                  <Select.Option value="male">ذكر</Select.Option>
                  <Select.Option value="female">أنثى</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Title level={4} style={{ marginTop: 24, marginBottom: 16, color: '#ff6b35' }}>معلومات العائلة</Title>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item name="fatherName" label="اسم الأب" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="grandFatherName" label="اسم الجد" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="motherFirstName" label="اسم الأم" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item name="motherLastName" label="لقب الأم" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="maritalstatus" label="الحالة العائلية" rules={[{ required: true }]}>
                <Select>
                  <Select.Option value="single">أعزب</Select.Option>
                  <Select.Option value="married">متزوج</Select.Option>
                  <Select.Option value="divorced">مطلق</Select.Option>
                  <Select.Option value="widowed">أرمل</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="children" label="عدد الأبناء" rules={[{ required: true }]}>
                <Input type="number" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="profession" label="المهنة" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="fatherphone" label="رقم هاتف الأب" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Title level={4} style={{ marginTop: 24, marginBottom: 16, color: '#ff6b35' }}>معلومات الإقامة</Title>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="governorate" label="الولاية" rules={[{ required: true }]}>
                <Select>
                  {GOVERNORATES.map(gov => (
                    <Select.Option key={gov.value} value={gov.value}>{gov.label}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="address" label="العنوان" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Title level={4} style={{ marginTop: 24, marginBottom: 16, color: '#ff6b35' }}>المستوى التعليمي</Title>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="educationlevel" label="المستوى التعليمي" rules={[{ required: true }]}>
                <Select>
                  <Select.Option value="primary">ابتدائي</Select.Option>
                  <Select.Option value="secondary">ثانوي</Select.Option>
                  <Select.Option value="university">جامعي</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="supportingdocument" label="شهادة الإثبات" rules={[{ required: true }]}>
                <Select>
                  <Select.Option value="cin">بطاقة تعريف</Select.Option>
                  <Select.Option value="passport">جواز سفر</Select.Option>
                  <Select.Option value="diploma">شهادة</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      );
    }

    return (
      <div style={{ padding: '20px 0' }}>
        <div style={{ marginBottom: 30, paddingBottom: 20, borderBottom: '2px solid #ff6b35' }}>
          <Title level={4} style={{ color: '#2c3e50', marginBottom: 15 }}>معلومات الهوية</Title>
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Text strong style={{ color: '#5a5a5a' }}>رقم بطاقة التعريف:</Text>
              <div style={{ color: '#2c3e50', marginTop: 5 }}>{reviewData.idNumber}</div>
            </Col>
            <Col span={8}>
              <Text strong style={{ color: '#5a5a5a' }}>تاريخ الإصدار:</Text>
              <div style={{ color: '#2c3e50', marginTop: 5 }}>{reviewData.idIssueDate?.format('DD/MM/YYYY')}</div>
            </Col>
            <Col span={8}>
              <Text strong style={{ color: '#5a5a5a' }}>رقم الهاتف:</Text>
              <div style={{ color: '#2c3e50', marginTop: 5 }}>{reviewData.phone}</div>
            </Col>
          </Row>
        </div>

        <div style={{ marginBottom: 30, paddingBottom: 20, borderBottom: '2px solid #ff6b35' }}>
          <Title level={4} style={{ color: '#2c3e50', marginBottom: 15 }}>البيانات الشخصية</Title>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Text strong style={{ color: '#5a5a5a' }}>الاسم الكامل:</Text>
              <div style={{ color: '#2c3e50', marginTop: 5 }}>{reviewData.firstName} {reviewData.lastName}</div>
            </Col>
            <Col span={6}>
              <Text strong style={{ color: '#5a5a5a' }}>تاريخ الولادة:</Text>
              <div style={{ color: '#2c3e50', marginTop: 5 }}>{reviewData.birthDate?.format('DD/MM/YYYY')}</div>
            </Col>
            <Col span={6}>
              <Text strong style={{ color: '#5a5a5a' }}>الجنس:</Text>
              <div style={{ color: '#2c3e50', marginTop: 5 }}>{labels.gender[reviewData.gender]}</div>
            </Col>
          </Row>
        </div>

        <div style={{ marginBottom: 30, paddingBottom: 20, borderBottom: '2px solid #ff6b35' }}>
          <Title level={4} style={{ color: '#2c3e50', marginBottom: 15 }}>معلومات العائلة</Title>
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Text strong style={{ color: '#5a5a5a' }}>اسم الأب:</Text>
              <div style={{ color: '#2c3e50', marginTop: 5 }}>{reviewData.fatherName}</div>
            </Col>
            <Col span={8}>
              <Text strong style={{ color: '#5a5a5a' }}>اسم الجد:</Text>
              <div style={{ color: '#2c3e50', marginTop: 5 }}>{reviewData.grandFatherName}</div>
            </Col>
            <Col span={8}>
              <Text strong style={{ color: '#5a5a5a' }}>اسم الأم:</Text>
              <div style={{ color: '#2c3e50', marginTop: 5 }}>{reviewData.motherFirstName} {reviewData.motherLastName}</div>
            </Col>
            <Col span={8}>
              <Text strong style={{ color: '#5a5a5a' }}>الحالة العائلية:</Text>
              <div style={{ color: '#2c3e50', marginTop: 5 }}>{labels.maritalstatus[reviewData.maritalstatus]}</div>
            </Col>
            <Col span={8}>
              <Text strong style={{ color: '#5a5a5a' }}>عدد الأبناء:</Text>
              <div style={{ color: '#2c3e50', marginTop: 5 }}>{reviewData.children}</div>
            </Col>
            <Col span={8}>
              <Text strong style={{ color: '#5a5a5a' }}>المهنة:</Text>
              <div style={{ color: '#2c3e50', marginTop: 5 }}>{reviewData.profession}</div>
            </Col>
            <Col span={8}>
              <Text strong style={{ color: '#5a5a5a' }}>رقم هاتف الأب:</Text>
              <div style={{ color: '#2c3e50', marginTop: 5 }}>{reviewData.fatherphone}</div>
            </Col>
          </Row>
        </div>

        <div style={{ marginBottom: 30, paddingBottom: 20, borderBottom: '2px solid #ff6b35' }}>
          <Title level={4} style={{ color: '#2c3e50', marginBottom: 15 }}>معلومات الإقامة</Title>
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Text strong style={{ color: '#5a5a5a' }}>الولاية:</Text>
              <div style={{ color: '#2c3e50', marginTop: 5 }}>{governorateLabel}</div>
            </Col>
            {reviewData.region && (
              <Col span={8}>
                <Text strong style={{ color: '#5a5a5a' }}>المنطقة:</Text>
                <div style={{ color: '#2c3e50', marginTop: 5 }}>{reviewData.region}</div>
              </Col>
            )}
            <Col span={reviewData.region ? 8 : 16}>
              <Text strong style={{ color: '#5a5a5a' }}>العنوان الكامل:</Text>
              <div style={{ color: '#2c3e50', marginTop: 5 }}>{reviewData.address}</div>
            </Col>
          </Row>
        </div>

        <div style={{ marginBottom: 30 }}>
          <Title level={4} style={{ color: '#2c3e50', marginBottom: 15 }}>المستوى التعليمي</Title>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Text strong style={{ color: '#5a5a5a' }}>المستوى التعليمي:</Text>
              <div style={{ color: '#2c3e50', marginTop: 5 }}>{labels.education[reviewData.educationlevel]}</div>
            </Col>
            <Col span={12}>
              <Text strong style={{ color: '#5a5a5a' }}>شهادة الإثبات:</Text>
              <div style={{ color: '#2c3e50', marginTop: 5 }}>{labels.supportingDoc[reviewData.supportingdocument]}</div>
            </Col>
          </Row>
        </div>

        <div style={{ marginTop: 40, textAlign: 'center', padding: '20px', background: '#f8f9fa', borderRadius: 8 }}>
          <Text style={{ color: '#7f8c8d', fontSize: 12 }}>تاريخ التسجيل: {dayjs().format('DD/MM/YYYY HH:mm')}</Text>
        </div>
      </div>
    );
  };

  if (submitSuccess) {
    return (
      <SuccessScreen
        formData={reviewData}
        onDownloadPDF={handleDownloadPDF}
        onReturnHome={handleReturnHome}
      />
    );
  }

  const modalFooter = isEditMode ? [
    <Button key="cancel" onClick={() => setIsEditMode(false)} size="large">
      إلغاء
    </Button>,
    <Button key="save" type="primary" icon={<SaveOutlined />} onClick={handleSaveEdit} size="large" style={{ background: '#ff6b35', borderColor: '#ff6b35' }}>
      حفظ التعديلات
    </Button>
  ] : [
    <Button key="edit" icon={<EditOutlined />} onClick={handleEdit} size="large" style={{ borderColor: '#ff6b35', color: '#ff6b35' }}>
      تعديل البيانات
    </Button>,
    <Button key="download" icon={<DownloadOutlined />} onClick={handleDownloadPDF} size="large">
      تحميل PDF
    </Button>,
    <Button key="submit" type="primary" icon={<SaveOutlined />} loading={loading} onClick={handleFinalSubmit} size="large" style={{ background: '#ff6b35', borderColor: '#ff6b35' }}>
      حفظ وتسجيل
    </Button>
  ];

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '16px', direction: 'rtl', minHeight: '100vh' }}>
      <SchemaOrg schema={getBreadcrumbSchema(BREADCRUMBS)} id="breadcrumb-schema" />
      
      <Card style={{ marginBottom: 16, textAlign: 'center', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }} bodyStyle={{ padding: '20px 16px' }}>
        <Title level={2} style={{ marginBottom: 8, fontSize: 'clamp(20px, 5vw, 28px)' }}>
          التسجيل في التطوع
        </Title>
        <Text type="secondary" style={{ fontSize: 'clamp(12px, 3.5vw, 14px)', display: 'block', lineHeight: 1.6 }}>
          انضم إلى جمعية متطوعون في خدمة الحماية المدنية بن عروس وكن جزءاً من فريق يخدم المجتمع
        </Text>
      </Card>

      <DataValidationAlert />

      <Card style={{ marginBottom: 16, borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', overflow: 'hidden' }} bodyStyle={{ padding: '20px 8px' }}>
        <div ref={stepsContainerRef} style={{ overflowX: 'auto', overflowY: 'hidden', scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch' }}>
          <Steps 
            current={currentStep} 
            items={FORM_STEPS.map((step, index) => ({
              ...step,
              status: completedSteps.includes(index) ? 'finish' : index === currentStep ? 'process' : 'wait',
              icon: completedSteps.includes(index) ? <CheckOutlined /> : step.icon
            }))}
            responsive={false}
            size="small"
            style={{ minWidth: '600px', paddingBottom: '10px' }}
          />
        </div>
      </Card>

      <Card style={{ borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', marginBottom: 16 }} bodyStyle={{ padding: '20px 16px' }}>
        <Spin spinning={loading} tip="جاري المعالجة...">
          <Form form={form} layout="vertical" scrollToFirstError>
            {renderStepContent()}

            <div style={{ marginTop: 24, display: 'flex', gap: '12px', justifyContent: 'space-between', borderTop: '1px solid #f0f0f0', paddingTop: 20, flexWrap: 'wrap' }}>
              {currentStep > 0 && (
                <Button onClick={prev} icon={<ArrowRightOutlined />} size="large" disabled={loading} style={{ flex: '1 1 auto', minWidth: '120px' }}>
                  السابق
                </Button>
              )}
              
              {currentStep < FORM_STEPS.length - 1 ? (
                <Button type="primary" onClick={next} icon={<ArrowLeftOutlined />} size="large" disabled={loading} style={{ flex: '1 1 auto', minWidth: '120px', marginRight: currentStep === 0 ? 'auto' : 0 }}>
                  التالي
                </Button>
              ) : (
                <Button type="primary" onClick={handleReview} icon={<SendOutlined />} size="large" loading={loading} style={{ flex: '1 1 auto', minWidth: '120px', background: '#ff6b35', borderColor: '#ff6b35' }}>
                  مراجعة وتسجيل
                </Button>
              )}
            </div>
          </Form>
        </Spin>
      </Card>

      <Modal
        title={
          <Space style={{ fontSize: '18px', fontWeight: 'bold', color: '#2c3e50' }}>
            <span>{isEditMode ? 'تعديل البيانات' : 'مراجعة البيانات قبل التسجيل'}</span>
          </Space>
        }
        open={showReviewModal}
        onCancel={() => {
          setShowReviewModal(false);
          setIsEditMode(false);
        }}
        width={900}
        style={{ direction: 'rtl' }}
        footer={modalFooter}
      >
        {!isEditMode && <ReviewBeforeSubmitAlert />}
        <div style={{ maxHeight: '60vh', overflowY: 'auto', padding: '10px 0' }}>
          {renderReviewContent()}
        </div>
      </Modal>
    </div>
  );
};

export default RegisterPage;