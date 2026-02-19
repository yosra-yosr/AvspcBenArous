import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, Typography, Tag, Descriptions, Button, Alert, Space, Divider, message } from 'antd';
import { 
  CheckCircleOutlined, 
  CloseCircleOutlined, 
  ClockCircleOutlined,
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  HomeOutlined,
  CalendarOutlined,
  IdcardOutlined,
  LeftOutlined,
  PrinterOutlined,
  DownloadOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';

// Importez les composants nécessaires
import RequiredDocuments from '../components/registration/RequiredDocuments';
import { generateRegistrationPDF, downloadPDF } from '../utils/pdfGenerator';

const { Title, Paragraph, Text } = Typography;

const ResultDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [volunteerData, setVolunteerData] = useState(null);

  useEffect(() => {
    if (location.state?.volunteerData) {
      setVolunteerData(location.state.volunteerData);
    } else {
      navigate('/results');
    }
  }, [location, navigate]);

  const getStatusConfig = (statusCode) => {
    switch (statusCode) {
      case 'approved':
      case 'interview_scheduled':
      case 'interview_passed':
      case 'stagiaire':
      case 'certified_volunteer':
        return {
          color: 'success',
          icon: <CheckCircleOutlined />,
          text: 'مقبول',
          bgColor: '#f6ffed',
          borderColor: '#b7eb8f'
        };
      case 'rejected':
      case 'interview_failed':
        return {
          color: 'error',
          icon: <CloseCircleOutlined />,
          text: 'مرفوض',
          bgColor: '#fff2e8',
          borderColor: '#ffbb96'
        };
      case 'pending':
      case 'under_review':
      default:
        return {
          color: 'processing',
          icon: <ClockCircleOutlined />,
          text: 'قيد المراجعة',
          bgColor: '#e6f7ff',
          borderColor: 'orange'
        };
    }
  };

  const handlePrint = () => {
    window.print();
  };

const handleDownloadRegistrationForm = () => {
  if (!volunteerData) {
    message.error('لا توجد بيانات للتحميل');
    return;
  }

  try {
    console.log('📋 Données originales du volontaire:', volunteerData);
    
    // Maintenant avec les nouveaux champs de l'API
    const pdfData = {
      // Champs d'identité - NOUVEAU: idIssueDate est maintenant retourné par l'API
      idNumber: volunteerData.idNumber || '',
      idIssueDate: volunteerData.idIssueDate || '', // Maintenant disponible!
      phone: volunteerData.phone || '',
      email: volunteerData.email || '',
      
      // Données personnelles
      firstName: volunteerData.firstName || '',
      lastName: volunteerData.lastName || '',
      birthDate: volunteerData.birthDate || '',
      gender: volunteerData.gender || '',
      
      // Famille
      fatherName: volunteerData.fatherName || '',
      grandFatherName: volunteerData.grandFatherName || '',
      motherFirstName: volunteerData.motherFirstName || '',
      motherLastName: volunteerData.motherLastName || '',
      maritalstatus: volunteerData.maritalStatus || '',
      children: volunteerData.children || 0,
      profession: volunteerData.profession || '',
      fatherphone: volunteerData.fatherPhone || '',
      
      // Résidence
      governorate: volunteerData.governorate || '',
      region: volunteerData.region || '',
      address: volunteerData.address || '',
      
      // Éducation - NOUVEAU: supportingDocument est maintenant retourné par l'API
      educationlevel: volunteerData.educationLevel || '',
      supportingdocument: volunteerData.supportingDocument || '' // Maintenant disponible!
    };
    
    console.log('📄 Données pour PDF:', pdfData);
    console.log('🔍 idIssueDate:', pdfData.idIssueDate);
    console.log('🔍 supportingdocument:', pdfData.supportingdocument);
    
    // Si supportingdocument est vide, utiliser une valeur par défaut basée sur l'éducation
    if (!pdfData.supportingdocument && pdfData.educationlevel) {
      const educationLevel = pdfData.educationlevel || '';
      
      if (educationLevel === 'bachelor' || educationLevel === 'baccalaureate') {
        pdfData.supportingdocument = 'baccalaureate';
      } else if (educationLevel === 'university') {
        pdfData.supportingdocument = 'university';
      } else if (['primary', 'secondary', 'highschool'].includes(educationLevel)) {
        pdfData.supportingdocument = 'attendance-grades';
      } else {
        pdfData.supportingdocument = 'other';
      }
      
      console.log('🔄 Valeur par défaut pour supportingdocument:', pdfData.supportingdocument);
    }
    
    // Si idIssueDate est vide, utiliser une date par défaut
    if (!pdfData.idIssueDate) {
      pdfData.idIssueDate = dayjs().subtract(1, 'year').format('YYYY-MM-DD');
      console.log('🔄 Date d\'émission par défaut:', pdfData.idIssueDate);
    }
    
    const pdfContent = generateRegistrationPDF(pdfData);
    downloadPDF(pdfContent);
    
    message.success('تم إعداد استمارة التسجيل للطباعة - يرجى اختيار "حفظ كـ PDF"');
  } catch (error) {
    console.error('❌ Erreur lors de la génération du PDF:', error);
    message.error('حدث خطأ أثناء تحضير استمارة التسجيل');
  }
};

  const handleDownloadInstructions = () => {
    message.info('سيتم تحميل بطاقة الإرشادات قريباً');
    // Vous pouvez ajouter ici la logique pour télécharger le fichier PDF d'instructions
    window.open('/downloads/fiche-instructions.pdf', '_blank');
  };

  if (!volunteerData) {
    return null;
  }

  const statusConfig = getStatusConfig(volunteerData.statusCode);
  const isPendingStatus = ['pending', 'under_review'].includes(volunteerData.statusCode);

  return (
    <div style={{ minHeight: '70vh', background: '#f5f5f5', padding: '20px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <Button 
          icon={<HomeOutlined />} 
          onClick={() => navigate('/')}
          style={{ marginBottom: '20px' }}
        >
          العودة إلى الصفحة الرئيسية
        </Button>

        <Card 
          style={{ 
            borderRadius: '15px', 
            boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
            marginBottom: '20px'
          }}
        >
          {/* En-tête avec statut */}
          <div style={{ 
            textAlign: 'center', 
            padding: '30px 20px',
            background: statusConfig.bgColor,
            borderRadius: '15px 15px 0 0',
            marginTop: '-24px',
            marginLeft: '-24px',
            marginRight: '-24px',
            marginBottom: '30px',
            borderBottom: `3px solid ${statusConfig.borderColor}`
          }}>
            <div style={{ fontSize: '60px', marginBottom: '10px' }}>
              {statusConfig.icon}
            </div>
            <Title level={2} style={{ marginBottom: '10px', color: '#1a202c' }}>
              نتيجة التسجيل
            </Title>
            <Tag 
              color={statusConfig.color} 
              style={{ 
                fontSize: '18px', 
                padding: '8px 20px',
                borderRadius: '20px'
              }}
            >
              {volunteerData.statusLabelAr || statusConfig.text}
            </Tag>
          </div>

          {/* Messages selon le statut */}
          {['approved', 'interview_passed', 'stagiaire', 'certified_volunteer'].includes(volunteerData.statusCode) && (
            <Alert
              message="مبروك! تم قبول تسجيلك"
              description="نحن سعداء بقبولك كمتطوع في جمعيتنا. سيتم التواصل معك قريباً لتحديد موعد البدء."
              type="success"
              showIcon
              style={{ marginBottom: '30px', borderRadius: '8px' }}
            />
          )}

          {['rejected', 'interview_failed'].includes(volunteerData.statusCode) && (
            <Alert
              message="نأسف لعدم قبول طلبك"
              description={
                <div>
                  {volunteerData.lastStatusReason && (
                    <p><strong>السبب:</strong> {volunteerData.lastStatusReason}</p>
                  )}
                  <p style={{ marginTop: '10px' }}>
                    يمكنك إعادة التقديم مرة أخرى بعد تحسين ملفك أو التواصل مع الإدارة للمزيد من المعلومات.
                  </p>
                </div>
              }
              type="error"
              showIcon
              style={{ marginBottom: '30px', borderRadius: '8px' }}
            />
          )}

          {isPendingStatus && (
            <Alert
              message="طلبك قيد المراجعة"
              description="سيتم مراجعة طلبك من قبل فريقنا وسنتواصل معك قريباً. الرجاء الانتظار."
              type="info"
              showIcon
              style={{ marginBottom: '30px', borderRadius: '8px' }}
            />
          )}

          {/* Afficher les documents requis pour les statuts pending */}
          {isPendingStatus && (
            <>
              <Divider />
              <RequiredDocuments 
                onDownloadFicheInstructions={handleDownloadInstructions}
                onDownloadRegistrationForm={handleDownloadRegistrationForm}
              />
            </>
          )}

          <Divider />

          {/* Informations personnelles */}
          <Title level={4} style={{ marginBottom: '20px' }}>
            <UserOutlined style={{ marginLeft: '8px' }} />
            المعلومات الشخصية
          </Title>

          <Descriptions bordered column={1} size="middle">
            <Descriptions.Item 
              label={<><UserOutlined style={{ marginLeft: '8px' }} /> الاسم الكامل</>}
            >
              <Text strong>{volunteerData.firstName} {volunteerData.lastName}</Text>
            </Descriptions.Item>

            <Descriptions.Item 
              label={<><IdcardOutlined style={{ marginLeft: '8px' }} /> رقم بطاقة التعريف</>}
            >
              {volunteerData.idNumber}
            </Descriptions.Item>

            <Descriptions.Item 
              label={<><CalendarOutlined style={{ marginLeft: '8px' }} /> تاريخ الولادة</>}
            >
              {dayjs(volunteerData.birthDate).format('DD/MM/YYYY')}
            </Descriptions.Item>

            <Descriptions.Item label="الجنس">
              {volunteerData.gender === 'male' ? 'ذكر' : 'أنثى'}
            </Descriptions.Item>

            <Descriptions.Item 
              label={<><PhoneOutlined style={{ marginLeft: '8px' }} /> رقم الهاتف</>}
            >
              {volunteerData.phone}
            </Descriptions.Item>

            <Descriptions.Item 
              label={<><MailOutlined style={{ marginLeft: '8px' }} /> البريد الإلكتروني</>}
            >
              {volunteerData.email}
            </Descriptions.Item>

            <Descriptions.Item 
              label={<><HomeOutlined style={{ marginLeft: '8px' }} /> العنوان الحالي</>}
            >
              {volunteerData.address}
            </Descriptions.Item>

            {volunteerData.region && (
              <Descriptions.Item label="المنطقة">
                {volunteerData.region}
              </Descriptions.Item>
            )}

            {volunteerData.governorate && (
              <Descriptions.Item label="الولاية">
                {volunteerData.governorate}
              </Descriptions.Item>
            )}

            {volunteerData.educationLevel && (
              <Descriptions.Item label="المستوى التعليمي">
                {volunteerData.educationLevel}
              </Descriptions.Item>
            )}

            {volunteerData.profession && (
              <Descriptions.Item label="المهنة">
                {volunteerData.profession}
              </Descriptions.Item>
            )}

            {volunteerData.maritalStatus && (
              <Descriptions.Item label="الحالة الاجتماعية">
                {volunteerData.maritalStatus === 'single' ? 'أعزب/عزباء' : 
                 volunteerData.maritalStatus === 'married' ? 'متزوج/ة' : 
                 volunteerData.maritalStatus === 'divorced' ? 'مطلق/ة' : 'أرمل/ة'}
              </Descriptions.Item>
            )}
          </Descriptions>

          {/* Informations familiales */}
          {(volunteerData.fatherName || volunteerData.motherFirstName) && (
            <>
              <Divider />
              <Title level={4} style={{ marginBottom: '20px', marginTop: '30px' }}>
                معلومات العائلة
              </Title>

              <Descriptions bordered column={1} size="middle">
                {volunteerData.fatherName && (
                  <Descriptions.Item label="اسم الأب">
                    {volunteerData.fatherName}
                  </Descriptions.Item>
                )}

                {volunteerData.grandFatherName && (
                  <Descriptions.Item label="اسم الجد">
                    {volunteerData.grandFatherName}
                  </Descriptions.Item>
                )}

                {volunteerData.motherFirstName && (
                  <Descriptions.Item label="اسم الأم">
                    {volunteerData.motherFirstName} {volunteerData.motherLastName}
                  </Descriptions.Item>
                )}

                {volunteerData.fatherPhone && (
                  <Descriptions.Item label="هاتف الأب">
                    {volunteerData.fatherPhone}
                  </Descriptions.Item>
                )}
              </Descriptions>
            </>
          )}

          {/* Dates importantes */}
          <Divider />
          <Title level={4} style={{ marginBottom: '20px', marginTop: '30px' }}>
            <CalendarOutlined style={{ marginLeft: '8px' }} />
            التواريخ المهمة
          </Title>

          <Descriptions bordered column={1} size="middle">
            <Descriptions.Item label="تاريخ التسجيل">
              {dayjs(volunteerData.createdAt).format('DD/MM/YYYY - HH:mm')}
            </Descriptions.Item>

            {volunteerData.updatedAt && volunteerData.updatedAt !== volunteerData.createdAt && (
              <Descriptions.Item label="آخر تحديث">
                {dayjs(volunteerData.updatedAt).format('DD/MM/YYYY - HH:mm')}
              </Descriptions.Item>
            )}

            {volunteerData.sessionName && (
              <Descriptions.Item label="دورة التسجيل">
                {volunteerData.sessionName}
              </Descriptions.Item>
            )}
          </Descriptions>

          {/* Actions */}
          <div style={{ marginTop: '30px', textAlign: 'center' }}>
            <Space size="middle">
              <Button 
                type="primary" 
                icon={<PrinterOutlined />}
                onClick={handlePrint}
                size="large"
                style={{
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
                }}
              >
                طباعة النتيجة
              </Button>

              {isPendingStatus && (
                <Button 
                  type="default"
                  icon={<DownloadOutlined />}
                  onClick={handleDownloadRegistrationForm}
                  size="large"
                  style={{ borderRadius: '8px' }}
                >
                  تحميل الاستمارة
                </Button>
              )}

              <Button 
                icon={<LeftOutlined />}
                onClick={() => navigate('/')}
                size="large"
                style={{ borderRadius: '8px' }}
              >
                العودة إلى الصفحة الرئيسية
              </Button>
            </Space>
          </div>
        </Card>

        {/* Carte d'informations de contact */}
        <Card 
          style={{ 
            borderRadius: '15px', 
            boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
            background: '#f9fafb'
          }}
        >
          <Title level={5} style={{ marginBottom: '15px' }}>
            هل تحتاج إلى مساعدة؟
          </Title>
          <Paragraph style={{ marginBottom: '10px' }}>
            إذا كان لديك أي استفسارات أو تحتاج إلى مزيد من المعلومات، يمكنك التواصل معنا عبر:
          </Paragraph>
          <Space direction="vertical" size="small">
            <Text>
              <PhoneOutlined style={{ marginLeft: '8px', color: '#667eea' }} />
              <strong>الهاتف:</strong>
              <a href="tel:+21656202702" dir="ltr" style={{ marginLeft: '5px' }}>+216 56 202 702</a>
            </Text>
            <Text>
              <MailOutlined style={{ marginLeft: '8px', color: '#667eea' }} />
              <strong>البريد الإلكتروني:</strong> avspcbenarous2023@gmail.com
            </Text>
            <Text>
              <HomeOutlined style={{ marginLeft: '8px', color: '#667eea' }} />
              <strong>العنوان:</strong> مقر الجمعية، بن عروس
            </Text>
          </Space>
        </Card>

        <div style={{ textAlign: 'center', marginTop: '30px', color: '#718096', fontSize: '13px' }}>
          <Paragraph>
            💡 <strong>نصيحة:</strong> احفظ هذه الصفحة أو اطبعها للرجوع إليها لاحقاً
          </Paragraph>
        </div>
      </div>

      {/* Styles d'impression */}
      <style>
        {`
          @media print {
            body * {
              visibility: hidden;
            }
            .ant-card, .ant-card * {
              visibility: visible;
            }
            .ant-card {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              box-shadow: none !important;
            }
            button {
              display: none !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default ResultDetailsPage;