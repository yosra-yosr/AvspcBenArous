<!DOCTYPE html>
<html lang="ar">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>تم التسجيل بنجاح</title>
  <style>
    body {
      direction: rtl;
      font-family: 'Cairo', sans-serif;
      background: linear-gradient(to right, #e3f2fd, #ffffff);
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      overflow: hidden;
    }

    .box {
      background-color: #ffffff;
      border-radius: 20px;
      padding: 40px 30px;
      box-shadow: 0 15px 40px rgba(0,0,0,0.1);
      text-align: center;
      width: 90%;
      max-width: 550px;
      animation: fadeIn 1s ease-out;
    }

    .logo {
      width: 90px;
      border-radius: 50%;
      margin-bottom: 10px;
    }

    .org {
      font-size: 20px;
      font-weight: bold;
      color: #0d47a1;
      margin-bottom: 20px;
    }

    .icon {
      font-size: 70px;
      color: #43a047;
      animation: popIn 0.5s ease;
    }

    h1 {
      color: #388e3c;
      font-size: 26px;
      margin: 10px 0;
    }

    p {
      font-size: 17px;
      color: #333;
      margin: 10px 0;
    }

    .btn {
      display: inline-block;
      margin-top: 25px;
      padding: 10px 20px;
      background-color: #388e3c;
      color: white;
      text-decoration: none;
      border-radius: 8px;
      font-weight: bold;
      transition: 0.3s ease;
    }

    .btn:hover {
      background-color: #2e7d32;
    }

    .countdown {
      margin-top: 15px;
      font-size: 14px;
      color: #777;
    }

    .social {
      margin-top: 20px;
    }

    .social a {
      color: #0d47a1;
      text-decoration: none;
      font-weight: bold;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes popIn {
      from { transform: scale(0.5); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }
  </style>

</head>
<body>

<div class="box">
  <img src="شعار.png" class="logo" alt="شعار الجمعية">
  <div class="org">جمعية متطوعون في خدمة الحماية المدنية - بن عروس</div>
  <div class="icon">✅</div>
  <h1>تم التسجيل بنجاح!</h1>
  <p>نحن فخورون بانضمامك إلينا. شكراً لثقتك ومبادرتك.</p>
  <p>تم إرسال نسخة من استمارتك إلى بريدك الإلكتروني.</p>
  <a href="generate-pdf.php" class="btn" download>📄 تحميل نسخة PDF</a>
  <a href="view_pdf.php?file=<?= urlencode($file) ?>" class="btn" target="_blank">👁️ معاينة PDF</a>
  <div class="social">
    لمتابعتنا: <a href="https://www.facebook.com/protection.civile.ben.arous" target="_blank">صفحتنا على فيسبوك</a>
  </div>
</div>

</body>
</html>