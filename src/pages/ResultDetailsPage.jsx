import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, Typography, Tag, Descriptions, Button, Alert, Space, Divider, message, Grid } from 'antd';
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
const { useBreakpoint } = Grid;

const ResultDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const screens = useBreakpoint();
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
      
      const pdfData = {
        idNumber: volunteerData.idNumber || '',
        idIssueDate: volunteerData.idIssueDate || '',
        phone: volunteerData.phone || '',
        email: volunteerData.email || '',
        firstName: volunteerData.firstName || '',
        lastName: volunteerData.lastName || '',
        birthDate: volunteerData.birthDate || '',
        gender: volunteerData.gender || '',
        fatherName: volunteerData.fatherName || '',
        grandFatherName: volunteerData.grandFatherName || '',
        motherFirstName: volunteerData.motherFirstName || '',
        motherLastName: volunteerData.motherLastName || '',
        maritalstatus: volunteerData.maritalStatus || '',
        children: volunteerData.children || 0,
        profession: volunteerData.profession || '',
        fatherphone: volunteerData.fatherPhone || '',
        governorate: volunteerData.governorate || '',
        region: volunteerData.region || '',
        address: volunteerData.address || '',
        educationlevel: volunteerData.educationLevel || '',
        supportingdocument: volunteerData.supportingDocument || ''
      };
      
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
      }
      
      if (!pdfData.idIssueDate) {
        pdfData.idIssueDate = dayjs().subtract(1, 'year').format('YYYY-MM-DD');
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
    window.open('/downloads/fiche-instructions.pdf', '_blank');
  };

  if (!volunteerData) {
    return null;
  }

  const statusConfig = getStatusConfig(volunteerData.statusCode);
  const isPendingStatus = ['pending', 'under_review'].includes(volunteerData.statusCode);
  const isMobile = !screens.md;

  return (
    <div style={{ 
      minHeight: '70vh', 
      background: '#f5f5f5', 
      padding: isMobile ? '10px' : '20px' 
    }}>
      <div style={{ 
        maxWidth: '900px', 
        margin: '0 auto',
        width: '100%'
      }}>
        <Button 
          icon={<HomeOutlined />} 
          onClick={() => navigate('/')}
          style={{ 
            marginBottom: isMobile ? '10px' : '20px',
            fontSize: isMobile ? '14px' : '16px',
            height: isMobile ? '36px' : '40px'
          }}
          size={isMobile ? 'middle' : 'large'}
        >
          العودة إلى الصفحة الرئيسية
        </Button>

        <Card 
          style={{ 
            borderRadius: isMobile ? '10px' : '15px', 
            boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
            marginBottom: '20px',
            overflow: 'hidden'
          }}
          bodyStyle={{ padding: isMobile ? '16px' : '24px' }}
        >
          {/* En-tête avec statut */}
          <div style={{ 
            textAlign: 'center', 
            padding: isMobile ? '20px 10px' : '30px 20px',
            background: statusConfig.bgColor,
            borderRadius: isMobile ? '10px 10px 0 0' : '15px 15px 0 0',
            marginTop: isMobile ? '-16px' : '-24px',
            marginLeft: isMobile ? '-16px' : '-24px',
            marginRight: isMobile ? '-16px' : '-24px',
            marginBottom: isMobile ? '20px' : '30px',
            borderBottom: `3px solid ${statusConfig.borderColor}`
          }}>
            <div style={{ 
              fontSize: isMobile ? '40px' : '60px', 
              marginBottom: isMobile ? '5px' : '10px' 
            }}>
              {statusConfig.icon}
            </div>
            <Title level={isMobile ? 3 : 2} style={{ 
              marginBottom: isMobile ? '5px' : '10px', 
              color: '#1a202c',
              fontSize: isMobile ? '20px' : '24px'
            }}>
              نتيجة التسجيل
            </Title>
            <Tag 
              color={statusConfig.color} 
              style={{ 
                fontSize: isMobile ? '14px' : '18px', 
                padding: isMobile ? '4px 12px' : '8px 20px',
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
              style={{ 
                marginBottom: isMobile ? '20px' : '30px', 
                borderRadius: '8px',
                fontSize: isMobile ? '14px' : '16px'
              }}
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
              style={{ 
                marginBottom: isMobile ? '20px' : '30px', 
                borderRadius: '8px',
                fontSize: isMobile ? '14px' : '16px'
              }}
            />
          )}

          {isPendingStatus && (
            <Alert
              message="طلبك قيد المراجعة"
              description="سيتم مراجعة طلبك من قبل فريقنا وسنتواصل معك قريباً. الرجاء الانتظار."
              type="info"
              showIcon
              style={{ 
                marginBottom: isMobile ? '20px' : '30px', 
                borderRadius: '8px',
                fontSize: isMobile ? '14px' : '16px'
              }}
            />
          )}

          {/* Afficher les documents requis pour les statuts pending */}
          {isPendingStatus && (
            <>
              <Divider style={{ margin: isMobile ? '16px 0' : '24px 0' }} />
              <RequiredDocuments 
                onDownloadFicheInstructions={handleDownloadInstructions}
                onDownloadRegistrationForm={handleDownloadRegistrationForm}
              />
            </>
          )}

          <Divider style={{ margin: isMobile ? '16px 0' : '24px 0' }} />

          {/* Informations personnelles */}
          <Title level={isMobile ? 5 : 4} style={{ 
            marginBottom: isMobile ? '15px' : '20px',
            fontSize: isMobile ? '16px' : '20px'
          }}>
            <UserOutlined style={{ marginLeft: '8px' }} />
            المعلومات الشخصية
          </Title>

          <Descriptions 
            bordered 
            column={1} 
            size={isMobile ? "small" : "middle"}
            labelStyle={{ 
              fontWeight: 'bold',
              width: isMobile ? '120px' : '180px',
              fontSize: isMobile ? '13px' : '14px'
            }}
            contentStyle={{
              fontSize: isMobile ? '13px' : '14px',
              wordBreak: 'break-word'
            }}
          >
            <Descriptions.Item 
              label={<><UserOutlined style={{ marginLeft: '5px' }} /> الاسم الكامل</>}
            >
              <Text strong>{volunteerData.firstName} {volunteerData.lastName}</Text>
            </Descriptions.Item>

            <Descriptions.Item 
              label={<><IdcardOutlined style={{ marginLeft: '5px' }} /> رقم بطاقة التعريف</>}
            >
              <span style={{ direction: 'ltr', display: 'inline-block' }}>{volunteerData.idNumber}</span>
            </Descriptions.Item>

            <Descriptions.Item 
              label={<><CalendarOutlined style={{ marginLeft: '5px' }} /> تاريخ الولادة</>}
            >
              {dayjs(volunteerData.birthDate).format('DD/MM/YYYY')}
            </Descriptions.Item>

            <Descriptions.Item label="الجنس">
              {volunteerData.gender === 'male' ? 'ذكر' : 'أنثى'}
            </Descriptions.Item>

            <Descriptions.Item 
              label={<><PhoneOutlined style={{ marginLeft: '5px' }} /> رقم الهاتف</>}
            >
              <span style={{ direction: 'ltr', display: 'inline-block' }}>{volunteerData.phone}</span>
            </Descriptions.Item>

            <Descriptions.Item 
              label={<><MailOutlined style={{ marginLeft: '5px' }} /> البريد الإلكتروني</>}
            >
              <span style={{ 
                direction: 'ltr', 
                display: 'inline-block',
                wordBreak: 'break-all'
              }}>
                {volunteerData.email}
              </span>
            </Descriptions.Item>

            <Descriptions.Item 
              label={<><HomeOutlined style={{ marginLeft: '5px' }} /> العنوان الحالي</>}
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
              <Divider style={{ margin: isMobile ? '16px 0' : '24px 0' }} />
              <Title level={isMobile ? 5 : 4} style={{ 
                marginBottom: isMobile ? '15px' : '20px',
                marginTop: isMobile ? '10px' : '30px',
                fontSize: isMobile ? '16px' : '20px'
              }}>
                معلومات العائلة
              </Title>

              <Descriptions 
                bordered 
                column={1} 
                size={isMobile ? "small" : "middle"}
                labelStyle={{ 
                  fontWeight: 'bold',
                  width: isMobile ? '120px' : '180px',
                  fontSize: isMobile ? '13px' : '14px'
                }}
                contentStyle={{
                  fontSize: isMobile ? '13px' : '14px',
                  wordBreak: 'break-word'
                }}
              >
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
                    <span style={{ direction: 'ltr', display: 'inline-block' }}>
                      {volunteerData.fatherPhone}
                    </span>
                  </Descriptions.Item>
                )}
              </Descriptions>
            </>
          )}

          {/* Dates importantes */}
          <Divider style={{ margin: isMobile ? '16px 0' : '24px 0' }} />
          <Title level={isMobile ? 5 : 4} style={{ 
            marginBottom: isMobile ? '15px' : '20px',
            marginTop: isMobile ? '10px' : '30px',
            fontSize: isMobile ? '16px' : '20px'
          }}>
            <CalendarOutlined style={{ marginLeft: '8px' }} />
            التواريخ المهمة
          </Title>

          <Descriptions 
            bordered 
            column={1} 
            size={isMobile ? "small" : "middle"}
            labelStyle={{ 
              fontWeight: 'bold',
              width: isMobile ? '120px' : '180px',
              fontSize: isMobile ? '13px' : '14px'
            }}
            contentStyle={{
              fontSize: isMobile ? '13px' : '14px',
              wordBreak: 'break-word'
            }}
          >
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
          <div style={{ 
            marginTop: isMobile ? '20px' : '30px', 
            textAlign: 'center' 
          }}>
            <Space 
              size={isMobile ? "small" : "middle"} 
              direction={isMobile ? "vertical" : "horizontal"}
              style={{ width: isMobile ? '100%' : 'auto' }}
            >
              <Button 
                type="primary" 
                icon={<PrinterOutlined />}
                onClick={handlePrint}
                size={isMobile ? "middle" : "large"}
                block={isMobile}
                style={{
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
                  height: isMobile ? '40px' : '48px',
                  fontSize: isMobile ? '14px' : '16px'
                }}
              >
                طباعة النتيجة
              </Button>

              {isPendingStatus && (
                <Button 
                  type="default"
                  icon={<DownloadOutlined />}
                  onClick={handleDownloadRegistrationForm}
                  size={isMobile ? "middle" : "large"}
                  block={isMobile}
                  style={{ 
                    borderRadius: '8px',
                    height: isMobile ? '40px' : '48px',
                    fontSize: isMobile ? '14px' : '16px'
                  }}
                >
                  تحميل الاستمارة
                </Button>
              )}

              <Button 
                icon={<LeftOutlined />}
                onClick={() => navigate('/')}
                size={isMobile ? "middle" : "large"}
                block={isMobile}
                style={{ 
                  borderRadius: '8px',
                  height: isMobile ? '40px' : '48px',
                  fontSize: isMobile ? '14px' : '16px'
                }}
              >
                العودة إلى الصفحة الرئيسية
              </Button>
            </Space>
          </div>
        </Card>

        {/* Carte d'informations de contact */}
        <Card 
          style={{ 
            borderRadius: isMobile ? '10px' : '15px', 
            boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
            background: '#f9fafb'
          }}
          bodyStyle={{ padding: isMobile ? '16px' : '20px' }}
        >
          <Title level={isMobile ? 5 : 5} style={{ 
            marginBottom: isMobile ? '10px' : '15px',
            fontSize: isMobile ? '16px' : '18px'
          }}>
            هل تحتاج إلى مساعدة؟
          </Title>
          <Paragraph style={{ 
            marginBottom: isMobile ? '8px' : '10px',
            fontSize: isMobile ? '14px' : '16px'
          }}>
            إذا كان لديك أي استفسارات أو تحتاج إلى مزيد من المعلومات، يمكنك التواصل معنا عبر:
          </Paragraph>
          <Space direction="vertical" size={isMobile ? "small" : "small"} style={{ width: '100%' }}>
            <Text style={{ fontSize: isMobile ? '14px' : '15px', display: 'flex', alignItems: 'center' }}>
              <PhoneOutlined style={{ marginLeft: '8px', color: '#667eea' }} />
              <strong>الهاتف:</strong>
              <a href="tel:+21656202702" dir="ltr" style={{ marginRight: '5px', wordBreak: 'break-all' }}>+216 56 202 702</a>
            </Text>
            <Text style={{ fontSize: isMobile ? '14px' : '15px', display: 'flex', alignItems: 'center' }}>
              <MailOutlined style={{ marginLeft: '8px', color: '#667eea' }} />
              <strong>البريد الإلكتروني:</strong>
              <span style={{ marginRight: '5px', wordBreak: 'break-all' }}>avspcbenarous2023@gmail.com</span>
            </Text>
            <Text style={{ fontSize: isMobile ? '14px' : '15px', display: 'flex', alignItems: 'center' }}>
              <HomeOutlined style={{ marginLeft: '8px', color: '#667eea' }} />
              <strong>العنوان:</strong>
              <span style={{ marginRight: '5px' }}>مقر الجمعية، بن عروس</span>
            </Text>
          </Space>
        </Card>

        <div style={{ 
          textAlign: 'center', 
          marginTop: isMobile ? '20px' : '30px', 
          color: '#718096', 
          fontSize: isMobile ? '12px' : '13px',
          padding: isMobile ? '0 10px' : '0'
        }}>
          <Paragraph style={{ fontSize: isMobile ? '12px' : '13px' }}>
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