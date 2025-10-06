// src/pages/RegisterPage.jsx
import { useState, useRef, useEffect } from 'react';
import { Form, Button, Steps, Card, Typography, message, Spin, Modal, Space } from 'antd';
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
import PDFService from '../services/PDFService';

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
  const [currentStep, setCurrentStep] = useState(0);
  const [availableRegions, setAvailableRegions] = useState([]);
  const [selectedGovernorate, setSelectedGovernorate] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formData, setFormData] = useState({});
  const [completedSteps, setCompletedSteps] = useState([]);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewData, setReviewData] = useState(null);
  const stepsContainerRef = useRef(null);
  const printRef = useRef();

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
      setShowReviewModal(true);
    } catch (error) {
      message.error('يرجى ملء جميع الحقول المطلوبة بشكل صحيح');
    }
  };

  const handleDownloadPDF = () => {
    const printContent = printRef.current;
    const htmlContent = PDFService.generateHTML(printContent.innerHTML);
    PDFService.download(htmlContent);
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

    return (
      <div ref={printRef}>
        <div className="logo-container">
          <img src="/assets/images/شعار.png" alt="شعار" className="logo" />
        </div>
        <div className="header">
          <h1>استمارة التسجيل في التطوع</h1>
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
            <span className="field-value">{labels.gender[reviewData.gender]}</span>
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
            <span className="field-value">{labels.maritalstatus[reviewData.maritalstatus]}</span>
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
            <span className="field-value">{labels.education[reviewData.educationlevel]}</span>
          </div>
          <div className="field">
            <span className="field-label">شهادة الإثبات:</span>
            <span className="field-value">{labels.supportingDoc[reviewData.supportingdocument]}</span>
          </div>
        </div>

        <div style={{ marginTop: '40px', textAlign: 'center', color: '#999', fontSize: '12px' }}>
          <p>تاريخ التسجيل: {dayjs().format('DD/MM/YYYY HH:mm')}</p>
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

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '16px', direction: 'rtl', minHeight: '100vh' }}>
      {/* <SchemaOrg schema={getRegisterActionSchema()} id="register-schema" /> */}
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
                <Button type="primary" onClick={handleReview} icon={<SendOutlined />} size="large" loading={loading} style={{ flex: '1 1 auto', minWidth: '120px' }}>
                  مراجعة وتسجيل
                </Button>
              )}
            </div>
          </Form>
        </Spin>
      </Card>

      <Modal
        title={<Space style={{ fontSize: '18px', fontWeight: 'bold' }}><span>مراجعة البيانات قبل التسجيل</span></Space>}
        open={showReviewModal}
        onCancel={() => setShowReviewModal(false)}
        width={800}
        style={{ direction: 'rtl' }}
        footer={[
          <Button key="edit" icon={<EditOutlined />} onClick={() => setShowReviewModal(false)} size="large">تعديل البيانات</Button>,
          <Button key="download" icon={<DownloadOutlined />} onClick={handleDownloadPDF} size="large">معاينة PDF</Button>,
          <Button key="submit" type="primary" icon={<SaveOutlined />} loading={loading} onClick={handleFinalSubmit} size="large">حفظ وتسجيل</Button>
        ]}
      >
        <ReviewBeforeSubmitAlert />
        <div style={{ maxHeight: '60vh', overflowY: 'auto', padding: '10px 0' }}>
          {renderReviewContent()}
        </div>
      </Modal>
    </div>
  );
};

export default RegisterPage;