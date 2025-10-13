import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, Typography, Tag, Descriptions, Button, Alert, Space, Divider } from 'antd';
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
  PrinterOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';

const { Title, Paragraph, Text } = Typography;

const ResultDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [volunteerData, setVolunteerData] = useState(null);

  useEffect(() => {
    if (location.state?.volunteerData) {
      setVolunteerData(location.state.volunteerData);
    } else {
      // Si pas de données, rediriger vers la page de recherche
      navigate('/results');
    }
  }, [location, navigate]);

  const getStatusConfig = (status) => {
    switch (status) {
      case 'approved':
        return {
          color: 'success',
          icon: <CheckCircleOutlined />,
          text: 'مقبول ',
          bgColor: '#f6ffed',
          borderColor: '#b7eb8f'
        };
      case 'rejected':
        return {
          color: 'error',
          icon: <CloseCircleOutlined />,
          text: 'مرفوض ',
          bgColor: '#fff2e8',
          borderColor: '#ffbb96'
        };
      case 'pending':
      default:
        return {
          color: 'processing',
          icon: <ClockCircleOutlined />,
          text: 'قيد المراجعة ',
          bgColor: '#e6f7ff',
          borderColor: 'orange'
        };
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (!volunteerData) {
    return null;
  }

  const statusConfig = getStatusConfig(volunteerData.status);

  return (
    <div style={{ minHeight: '70vh', background: '#f5f5f5', padding: '20px' }} >
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* Bouton retour */}
        <Button 
          icon={<HomeOutlined />} 
          onClick={() => navigate('/')}
          style={{ marginBottom: '20px' }}
        >
          العودة إلى الصفحة الرئيسية
        </Button>

        {/* Carte principale */}
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
              {statusConfig.text}
            </Tag>
          </div>

          {/* Message personnalisé selon le statut */}
          {volunteerData.status === 'approved' && (
            <Alert
              message="مبروك! تم قبول تسجيلك"
              description={
                <div>
                  <p>نحن سعداء بقبولك كمتطوع في جمعيتنا. سيتم التواصل معك قريباً لتحديد موعد البدء.</p>
                  {/* <p style={{ marginTop: '10px', fontWeight: 'bold' }}>
                    {volunteerData.message || 'تم العثور على النتيجة بنجاح'}
                  </p> */}
                </div>
              }
              type="success"
              showIcon
              style={{ marginBottom: '30px', borderRadius: '8px' }}
            />
          )}

          {volunteerData.status === 'rejected' && (
            <Alert
              message="نأسف لعدم قبول طلبك"
              description={
                <div>
                  <p><strong>السبب:</strong> {volunteerData.rejectionReason || 'لم يتم تحديد سبب'}</p>
                  <p style={{ marginTop: '10px' }}>يمكنك إعادة التقديم مرة أخرى بعد تحسين ملفك أو التواصل مع الإدارة للمزيد من المعلومات.</p>
                </div>
              }
              type="error"
              showIcon
              style={{ marginBottom: '30px', borderRadius: '8px' }}
            />
          )}

          {volunteerData.status === 'pending' && (
            <Alert
              message="طلبك قيد المراجعة"
              description="سيتم مراجعة طلبك من قبل فريقنا وسنتواصل معك قريباً. الرجاء الانتظار."
              type="info"
              showIcon
              style={{ marginBottom: '30px', borderRadius: '8px' }}
            />
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
              <Text strong>{volunteerData.nom} {volunteerData.prenom}</Text>
            </Descriptions.Item>

            <Descriptions.Item 
              label={<><IdcardOutlined style={{ marginLeft: '8px' }} /> رقم بطاقة التعريف</>}
            >
              {volunteerData.numCin}
            </Descriptions.Item>

            <Descriptions.Item 
              label={<><CalendarOutlined style={{ marginLeft: '8px' }} /> تاريخ الولادة</>}
            >
              {dayjs(volunteerData.dateNaissance).format('DD/MM/YYYY')}
            </Descriptions.Item>

            <Descriptions.Item 
              label={<><PhoneOutlined style={{ marginLeft: '8px' }} /> رقم الهاتف</>}
            >
              {volunteerData.tel}
            </Descriptions.Item>

            <Descriptions.Item 
              label={<><MailOutlined style={{ marginLeft: '8px' }} /> البريد الإلكتروني</>}
            >
              {volunteerData.email}
            </Descriptions.Item>

            <Descriptions.Item 
              label={<><HomeOutlined style={{ marginLeft: '8px' }} /> العنوان</>}
            >
              {volunteerData.adresse}
            </Descriptions.Item>

            {volunteerData.delegation && (
              <Descriptions.Item label="المعتمدية">
                {volunteerData.delegation}
              </Descriptions.Item>
            )}

            {volunteerData.gouvernorat && (
              <Descriptions.Item label="الولاية">
                {volunteerData.gouvernorat}
              </Descriptions.Item>
            )}
          </Descriptions>

          {/* Informations complémentaires */}
          {(volunteerData.niveauEtude || volunteerData.experience || volunteerData.disponibilite) && (
            <>
              <Divider />
              <Title level={4} style={{ marginBottom: '20px', marginTop: '30px' }}>
                معلومات إضافية
              </Title>

              <Descriptions bordered column={1} size="middle">
                {volunteerData.niveauEtude && (
                  <Descriptions.Item label="المستوى التعليمي">
                    {volunteerData.niveauEtude}
                  </Descriptions.Item>
                )}

                {volunteerData.experience && (
                  <Descriptions.Item label="الخبرة">
                    {volunteerData.experience}
                  </Descriptions.Item>
                )}

                {volunteerData.disponibilite && (
                  <Descriptions.Item label="التوفر">
                    {volunteerData.disponibilite}
                  </Descriptions.Item>
                )}

                {volunteerData.competences && (
                  <Descriptions.Item label="المهارات">
                    {volunteerData.competences}
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

              <Button 
                icon={<LeftOutlined />}
                onClick={() => navigate('/')}
                size="large"
                style={{ borderRadius: '8px' }}
              >
                العودة إلى الصفحة الرّئيسيّة
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
          <Space direction="vertical" size="small" >
            <Text >
              <PhoneOutlined style={{ marginLeft: '8px', color: '#667eea' }} />
              <strong>الهاتف:</strong>
              <a href="tel:+21656202702" dir="ltr" className="phone-number">+216 56 202 702</a>
              <a href="tel:+21690769362" dir="ltr" className="phone-number">+216 90 769 362</a>
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

        {/* Note de bas de page */}
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