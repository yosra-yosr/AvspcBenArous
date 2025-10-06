// src/components/common/AlertComponents.jsx
import { Alert } from 'antd';
import { 
  ExclamationCircleOutlined, 
  InfoCircleOutlined, 
  CheckCircleOutlined,
  WarningOutlined 
} from '@ant-design/icons';

// Alert de validation des données
export const DataValidationAlert = ({ style }) => (
  <Alert
    message="تنبيه هام"
    description="يرجى التحقق من صحة المعلومات المدخلة لأن أي خطأ في البيانات سيؤدي إلى رفض الملف تلقائياً."
    type="warning"
    icon={<ExclamationCircleOutlined />}
    showIcon
    style={{ 
      marginBottom: 16,
      borderRadius: '8px',
      fontSize: 'clamp(12px, 3.5vw, 14px)',
      ...style
    }}
  />
);

// Alert de révision avant soumission
export const ReviewBeforeSubmitAlert = ({ style }) => (
  <Alert
    message="تنبيه مهم"
    description="يرجى مراجعة جميع البيانات بعناية. بعد الضغط على 'حفظ وتسجيل' سيتم إرسال طلبك وتنزيل الاستمارة تلقائياً."
    type="warning"
    showIcon
    style={{ marginBottom: 20, ...style }}
  />
);

// Alert de succès d'inscription
export const SuccessRegistrationAlert = ({ style }) => (
  <Alert
    message="تم التسجيل بنجاح!"
    description="تم تسجيلك بنجاح في الجمعية. يرجى تحضير الوثائق المطلوبة وإيداعها في المكتب."
    type="success"
    icon={<CheckCircleOutlined />}
    showIcon
    style={{ 
      marginBottom: 20,
      borderRadius: '8px',
      ...style
    }}
  />
);

// Alert d'information sur les documents
export const DocumentsInfoAlert = ({ style }) => (
  <Alert
    message="الوثائق المطلوبة"
    description="يرجى إحضار الوثائق المذكورة أدناه إلى مكتب الجمعية لإتمام عملية التسجيل."
    type="info"
    icon={<InfoCircleOutlined />}
    showIcon
    style={{ 
      marginBottom: 20,
      borderRadius: '8px',
      ...style
    }}
  />
);

// Alert d'avertissement pour délai
export const DeadlineWarningAlert = ({ days = 7, style }) => (
  <Alert
    message="مهلة تقديم الملف"
    description={`لديك ${days} أيام لإيداع الوثائق المطلوبة في مكتب الجمعية، وإلا سيتم إلغاء طلبك تلقائياً.`}
    type="warning"
    icon={<WarningOutlined />}
    showIcon
    style={{ 
      marginBottom: 20,
      borderRadius: '8px',
      ...style
    }}
  />
);