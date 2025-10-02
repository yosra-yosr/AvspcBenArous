import { useState, useEffect } from 'react';
import { Input, DatePicker, Button, Card, Typography, Alert, Spin } from 'antd';
import { IdcardOutlined, CalendarOutlined, SearchOutlined, LockOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { Title, Paragraph } = Typography;

const ResultsPage = () => {
  const [formData, setFormData] = useState({ idNumber: '', dob: null });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const [blockTime, setBlockTime] = useState(0);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [permanentBlock, setPermanentBlock] = useState(false);

  const MAX_ATTEMPTS = 3;
  const BLOCK_DURATION = 900; // 15 minutes en secondes

  // Vérifier le blocage au chargement
  useEffect(() => {
    // Vérifier le blocage permanent
    const permBlock = localStorage.getItem('permanentBlock');
    if (permBlock === 'true') {
      setPermanentBlock(true);
      setError('🚫 تم حظر الوصول نهائياً. الرجاء التواصل مع الإدارة للحصول على المساعدة.');
      return;
    }

    const blocked = localStorage.getItem('resultsBlocked');
    const blockTimestamp = localStorage.getItem('blockTimestamp');
    const hasBeenBlocked = localStorage.getItem('hasBeenBlocked');
    
    if (blocked && blockTimestamp) {
      const now = Date.now();
      const timeElapsed = Math.floor((now - parseInt(blockTimestamp)) / 1000);
      
      if (timeElapsed < BLOCK_DURATION) {
        setIsBlocked(true);
        setBlockTime(BLOCK_DURATION - timeElapsed);
      } else {
        // Débloquer après 15 minutes
        localStorage.removeItem('resultsBlocked');
        localStorage.removeItem('blockTimestamp');
        localStorage.removeItem('attemptCount');
        
        // Marquer qu'il a déjà été bloqué une fois
        if (!hasBeenBlocked) {
          localStorage.setItem('hasBeenBlocked', 'true');
        }
      }
    }

    const savedAttempts = localStorage.getItem('attemptCount');
    if (savedAttempts) {
      setAttempts(parseInt(savedAttempts));
      if (parseInt(savedAttempts) >= 2) {
        setShowCaptcha(true);
      }
    }
  }, []);

  // Timer de déblocage
  useEffect(() => {
    if (isBlocked && blockTime > 0) {
      const timer = setInterval(() => {
        setBlockTime((prev) => {
          if (prev <= 1) {
            setIsBlocked(false);
            localStorage.removeItem('resultsBlocked');
            localStorage.removeItem('blockTimestamp');
            localStorage.removeItem('attemptCount');
            setAttempts(0);
            setShowCaptcha(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isBlocked, blockTime]);

  const handleIdNumberChange = (e) => {
    const value = e.target.value.replace(/[\D\s]/g, '');
    setFormData({ ...formData, idNumber: value });
    
    if (value && value.length !== 8) {
      setError('⚠️ رقم بطاقة التعريف يجب أن يكون 8 أرقام.');
    } else {
      setError('');
    }
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, dob: date });
    
    if (date && dayjs(date).isAfter(dayjs())) {
      setError('⚠️ تاريخ الولادة لا يمكن أن يكون في المستقبل.');
    } else {
      setError('');
    }
  };

  const incrementAttempts = () => {
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);
    localStorage.setItem('attemptCount', newAttempts.toString());

    if (newAttempts >= 2) {
      setShowCaptcha(true);
    }

    if (newAttempts >= MAX_ATTEMPTS) {
      const hasBeenBlocked = localStorage.getItem('hasBeenBlocked');
      
      if (hasBeenBlocked === 'true') {
        // Si déjà bloqué une fois → blocage permanent
        setPermanentBlock(true);
        localStorage.setItem('permanentBlock', 'true');
        setError('🚫 تم تجاوز الحد المسموح من المحاولات. تم حظر الوصول نهائياً. الرجاء التواصل مع الإدارة عبر الهاتف أو البريد الإلكتروني للحصول على نتيجتك.');
      } else {
        // Premier blocage → 15 minutes
        setIsBlocked(true);
        setBlockTime(BLOCK_DURATION);
        localStorage.setItem('resultsBlocked', 'true');
        localStorage.setItem('blockTimestamp', Date.now().toString());
        localStorage.setItem('hasBeenBlocked', 'true');
        setError(`⏱️ تم حظر الوصول مؤقتاً لمدة ${BLOCK_DURATION / 60} دقيقة. هذه فرصتك الأخيرة، أي محاولة فاشلة بعد انتهاء المدة ستؤدي إلى حظر دائم.`);
      }
    }
  };

  const handleSubmit = async () => {
    if (permanentBlock) {
      setError('🚫 تم حظر الوصول نهائياً. للحصول على نتيجتك، الرجاء الاتصال بالإدارة.');
      return;
    }

    if (isBlocked) {
      setError(`⏱️ الرجاء الانتظار ${Math.floor(blockTime / 60)} دقيقة و ${blockTime % 60} ثانية قبل المحاولة مرة أخرى.`);
      return;
    }

    const { idNumber, dob } = formData;
    
    if (!idNumber || !dob) {
      setError('⚠️ الرجاء ملء جميع الحقول المطلوبة.');
      return;
    }

    if (idNumber.length !== 8) {
      setError('⚠️ رقم بطاقة التعريف يجب أن يكون 8 أرقام.');
      return;
    }

    if (dayjs(dob).isAfter(dayjs())) {
      setError('⚠️ تاريخ الولادة لا يمكن أن يكون في المستقبل.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Simuler un délai (throttling côté client)
      await new Promise(resolve => setTimeout(resolve, 2000));

      // TODO: Remplacer par votre appel API réel
      const response = await fetch('/api/check-results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          idNumber,
          dob: dayjs(dob).format('YYYY-MM-DD')
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.found) {
          // Réinitialiser les tentatives en cas de succès
          localStorage.removeItem('attemptCount');
          setAttempts(0);
          window.location.href = `/result?id=${idNumber}&dob=${dayjs(dob).format('YYYY-MM-DD')}`;
        } else {
          incrementAttempts();
          setError(' لم يتم العثور على نتائج. الرجاء التحقق من البيانات المدخلة.');
        }
      } else {
        incrementAttempts();
        setError(' حدث خطأ. الرجاء المحاولة لاحقاً.');
      }
    } catch (err) {
      incrementAttempts();
      setError(' حدث خطأ في الاتصال. الرجاء المحاولة لاحقاً.');
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{ minHeight: '70vh', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <Card style={{ maxWidth: '500px', width: '100%', borderRadius: '15px', boxShadow: '0 10px 40px rgba(0,0,0,0.2)' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <Title level={2} style={{ color: '#1a202c', marginBottom: '10px' }}>
            الإطلاع على النتائج
          </Title>
          <Paragraph style={{ color: '#4a5568', fontSize: '16px' }}>
            أدخل معلوماتك للاطلاع على نتيجة تسجيلك
          </Paragraph>
        </div>

        {permanentBlock && (
          <Alert
            message="🚫 تم حظر الوصول نهائياً"
            description={
              <div>
                <p style={{ marginBottom: '10px' }}>لقد تجاوزت الحد الأقصى المسموح به من المحاولات الفاشلة.</p>
                <p style={{ fontWeight: 'bold', marginBottom: '10px' }}>للحصول على نتيجتك:</p>
                <ul style={{ paddingRight: '20px', margin: 0 }}>
                  <li>اتصل بالإدارة مباشرة</li>
                  <li>راسلنا عبر البريد الإلكتروني</li>
                  <li>قم بزيارة مقر الجمعية</li>
                </ul>
              </div>
            }
            type="error"
            showIcon
            style={{ marginBottom: '20px', borderRadius: '8px' }}
          />
        )}

        
        {isBlocked && !permanentBlock && (
          <Alert
            message="⏱️ تم حظر الوصول مؤقتاً"
            description={
              <div>
                <p style={{ marginBottom: '8px' }}>الرجاء الانتظار {formatTime(blockTime)} قبل المحاولة مرة أخرى.</p>
                <p style={{ fontWeight: 'bold', color: '#d4380d', marginBottom: 0 }}>
                  ⚠️ تحذير: هذه فرصتك الأخيرة! أي محاولات فاشلة بعد انتهاء المدة ستؤدي إلى حظر دائم.
                </p>
              </div>
            }
            type="warning"
            showIcon
            icon={<LockOutlined />}
            style={{ marginBottom: '20px', borderRadius: '8px' }}
          />
        )},

        {!isBlocked && !permanentBlock && attempts > 0 && (
          <Alert
            message={`⚠️ تبقى لك ${MAX_ATTEMPTS - attempts} ${MAX_ATTEMPTS - attempts === 1 ? 'محاولة' : 'محاولات'} فقط`}
            description="الرجاء التأكد من صحة البيانات المدخلة"
            type="warning"
            showIcon
            style={{ marginBottom: '20px', borderRadius: '8px' }}
          />
        )}

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontWeight: 'bold', fontSize: '15px', marginBottom: '8px' }}>
            رقم بطاقة التعريف الوطنية
          </label>
          <Input
            prefix={<IdcardOutlined style={{ color: '#667eea' }} />}
            placeholder="رقم بطاقة التعريف الوطنية"
            size="large"
            maxLength={8}
            value={formData.idNumber}
            onChange={handleIdNumberChange}
            onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
            disabled={isBlocked || loading || permanentBlock}
            style={{ borderRadius: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontWeight: 'bold', fontSize: '15px', marginBottom: '8px' }}>
            تاريخ الولادة
          </label>
          <DatePicker
            placeholder="اختر تاريخ الولادة"
            size="large"
            value={formData.dob}
            onChange={handleDateChange}
            format="YYYY-MM-DD"
            suffixIcon={<CalendarOutlined style={{ color: '#667eea' }} />}
            disabledDate={(current) => current && current > dayjs().endOf('day')}
            disabled={isBlocked || loading || permanentBlock}
            style={{ width: '100%', borderRadius: '8px' }}
          />
        </div>

        {showCaptcha && !isBlocked && (
          <Alert
            message=" للحماية من الاستخدام الخاطئ"
            description="سيتم طلب تأكيد إضافي في المحاولة القادمة للتأكد من أنك مستخدم حقيقي"
            type="info"
            showIcon
            style={{ marginBottom: '20px', borderRadius: '8px', background: '#e6f7ff', borderColor: '#91d5ff' }}
          />
        )}

        {error && (
          <Alert
            message={error}
            type="error"
            showIcon
            style={{ marginBottom: '20px', borderRadius: '8px' }}
          />
        )}

        <Button
          type="primary"
          size="large"
          icon={loading ? <Spin /> : <SearchOutlined />}
          block
          onClick={handleSubmit}
          disabled={isBlocked || loading || permanentBlock}
          style={{
            background: (isBlocked || permanentBlock) ? '#ccc' : 'linear-gradient(135deg, #ff6b35, #ff8c42)',
            border: 'none',
            height: '48px',
            fontSize: '16px',
            fontWeight: 'bold',
            borderRadius: '8px',
            boxShadow: (isBlocked || permanentBlock) ? 'none' : '0 4px 15px rgba(255, 107, 53, 0.3)',
            marginTop: '10px',
            cursor: (isBlocked || permanentBlock) ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'جاري البحث...' : 'عرض النتيجة'}
        </Button>

        <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '13px', color: '#718096' }}>
          <LockOutlined style={{ marginLeft: '5px' }} />
          بياناتك محمية ومؤمنة بالكامل
        </div>
      </Card>
    </div>
  );
};

export default ResultsPage;