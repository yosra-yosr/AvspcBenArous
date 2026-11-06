// src/components/registration/MissingDocumentsCard.jsx
import { Card, Tag, Space, Alert, Badge, Divider } from 'antd';
import {
  FileDoneOutlined,
  CheckCircleOutlined,
  WarningOutlined,
  CloseCircleOutlined,
  DollarOutlined
} from '@ant-design/icons';
import { REQUIRED_DOCUMENTS } from '../../config/documents';

const MissingDocumentsCard = ({ volunteer }) => {
  if (!volunteer) return null;

  // ✅ Récupération des documents manquants
  const missingDocs = Array.isArray(volunteer?.missing_documents)
    ? volunteer.missing_documents
    : [];

  // ✅ Stats
  const totalDocs = REQUIRED_DOCUMENTS.length;
  const receivedDocs = totalDocs - missingDocs.length;
  const completionRate = Math.round((receivedDocs / totalDocs) * 100);

  // ✅ Statut de paiement
  const hasPaid = !!volunteer?.has_paid;

  // Couleur de progression
  const progressColor =
    completionRate === 100 ? '#52c41a' :
    completionRate >= 50 ? '#faad14' : '#ff4d4f';

  return (
    <Card
      size="small"
      title={
        <Space>
          <FileDoneOutlined style={{ color: '#722ed1' }} />
          <span>حالة ملفك الوثائقي</span>
          <Badge
            count={`${receivedDocs} / ${totalDocs}`}
            style={{ backgroundColor: progressColor }}
          />
        </Space>
      }
      style={{ marginBottom: 16, borderRadius: 12 }}
      styles={{ body: { padding: 16 } }}
    >
      {/* ═══════════════════════════════════════════════ */}
      {/* Barre de progression */}
      {/* ═══════════════════════════════════════════════ */}
      <div style={{ marginBottom: 16 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 6,
            fontSize: 13,
            color: '#595959'
          }}
        >
          <span>نسبة إكمال الملف</span>
          <span style={{ fontWeight: 'bold', color: progressColor }}>
            {completionRate}%
          </span>
        </div>
        <div
          style={{
            height: 8,
            background: '#f0f0f0',
            borderRadius: 4,
            overflow: 'hidden'
          }}
        >
          <div
            style={{
              width: `${completionRate}%`,
              height: '100%',
              background: progressColor,
              transition: 'width 0.3s ease'
            }}
          />
        </div>
      </div>

      {/* ═══════════════════════════════════════════════ */}
      {/* Message si tout est complet */}
      {/* ═══════════════════════════════════════════════ */}
      {completionRate === 100 && (
        <Alert
          type="success"
          showIcon
          icon={<CheckCircleOutlined />}
          message="مبروك! ملفك الوثائقي مكتمل ✅"
          description="جميع الوثائق المطلوبة تم استلامها. يمكنك المتابعة مع الإدارة."
          style={{ marginBottom: 12 }}
        />
      )}

      {/* ═══════════════════════════════════════════════ */}
      {/* Message d'information si documents manquants */}
      {/* ═══════════════════════════════════════════════ */}
      {missingDocs.length > 0 && (
        <Alert
          type="warning"
          showIcon
          icon={<WarningOutlined />}
          message={`لديك ${missingDocs.length} وثيقة ناقصة يجب إكمالها`}
          description="يرجى إحضار الوثائق التالية إلى مقر الجمعية لاستكمال ملفك."
          style={{ marginBottom: 12 }}
        />
      )}

      {/* ═══════════════════════════════════════════════ */}
      {/* Liste des documents avec statut */}
      {/* ═══════════════════════════════════════════════ */}
      <Space direction="vertical" style={{ width: '100%' }} size={4}>
        {REQUIRED_DOCUMENTS.map((doc) => {
          const isReceived = !missingDocs.includes(doc.code);

          return (
            <div
              key={doc.code}
              style={{
                padding: '8px 12px',
                background: isReceived ? '#f6ffed' : '#fff7e6',
                border: `1px solid ${isReceived ? '#b7eb8f' : '#ffd591'}`,
                borderRadius: 8,
                display: 'flex',
                alignItems: 'center',
                gap: 8
              }}
            >
              {isReceived ? (
                <CheckCircleOutlined style={{ color: '#52c41a', fontSize: 16 }} />
              ) : (
                <CloseCircleOutlined style={{ color: '#fa8c16', fontSize: 16 }} />
              )}
              <span
                style={{
                  fontSize: 13,
                  color: isReceived ? '#389e0d' : '#d46b08',
                  fontWeight: isReceived ? 500 : 500,
                  flex: 1
                }}
              >
                {doc.label}
              </span>
              {isReceived ? (
                <Tag color="success" style={{ margin: 0 }}>
                  ✓ مستلم
                </Tag>
              ) : (
                <Tag color="warning" style={{ margin: 0 }}>
                  ⏳ مطلوب
                </Tag>
              )}
            </div>
          );
        })}
      </Space>

      {/* ═══════════════════════════════════════════════ */}
      {/* Section paiement (info) */}
      {/* ═══════════════════════════════════════════════ */}
      <Divider style={{ margin: '16px 0' }} />
      <div
        style={{
          padding: '8px 12px',
          background: hasPaid ? '#f6ffed' : '#fff2e8',
          borderRadius: 8,
          border: `1px solid ${hasPaid ? '#b7eb8f' : '#ffbb96'}`,
          display: 'flex',
          alignItems: 'center',
          gap: 8
        }}
      >
        <DollarOutlined
          style={{ color: hasPaid ? '#52c41a' : '#fa541c', fontSize: 16 }}
        />
        <span
          style={{
            fontSize: 13,
            fontWeight: 500,
            color: hasPaid ? '#389e0d' : '#d4380d',
            flex: 1
          }}
        >
          معلوم الانخراط (25 د)
        </span>
        {hasPaid ? (
          <Tag color="success" style={{ margin: 0 }}>
            ✓ مدفوع
          </Tag>
        ) : (
          <Tag color="error" style={{ margin: 0 }}>
            ✗ غير مدفوع
          </Tag>
        )}
      </div>
    </Card>
  );
};

export default MissingDocumentsCard;