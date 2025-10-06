// src/services/PDFService.js
class PDFService {
  static generateHTML(content) {
    return `
<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>استمارة التسجيل - جمعية متطوعون في خدمة الحماية المدنية بن عروس</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Arial', 'Segoe UI', Tahoma, sans-serif;
      direction: rtl;
      text-align: right;
      padding: 30px;
      background: #fff;
      color: #333;
      line-height: 1.8;
    }
    
    .logo-container {
      text-align: center;
      margin-bottom: 30px;
    }
    
    .logo {
      max-width: 150px;
      height: auto;
    }
    
    .header {
      text-align: center;
      border-bottom: 3px solid #1890ff;
      padding-bottom: 20px;
      margin-bottom: 30px;
    }
    
    .header h1 {
      font-size: 28px;
      color: #1890ff;
      margin-bottom: 10px;
      font-weight: bold;
    }
    
    .header p {
      font-size: 16px;
      color: #666;
    }
    
    .section {
      margin-bottom: 30px;
      padding: 20px;
      border: 1px solid #e8e8e8;
      border-radius: 8px;
      background: #fafafa;
      page-break-inside: avoid;
    }
    
    .section-title {
      font-size: 20px;
      font-weight: bold;
      color: #1890ff;
      margin-bottom: 15px;
      padding-bottom: 10px;
      border-bottom: 2px solid #1890ff;
    }
    
    .field {
      display: flex;
      justify-content: space-between;
      padding: 12px 0;
      border-bottom: 1px dashed #e8e8e8;
    }
    
    .field:last-child {
      border-bottom: none;
    }
    
    .field-label {
      font-weight: bold;
      color: #555;
      flex: 0 0 40%;
    }
    
    .field-value {
      color: #333;
      flex: 0 0 55%;
      text-align: left;
    }
    
    @media print {
      body {
        padding: 20px;
      }
      
      .section {
        page-break-inside: avoid;
      }
      
      @page {
        margin: 2cm;
      }
    }
    
    @media screen and (max-width: 600px) {
      body {
        padding: 15px;
      }
      
      .header h1 {
        font-size: 22px;
      }
      
      .section-title {
        font-size: 18px;
      }
      
      .field {
        flex-direction: column;
      }
      
      .field-label,
      .field-value {
        flex: 1 1 100%;
        text-align: right;
      }
      
      .field-value {
        margin-top: 5px;
        padding-right: 15px;
        color: #1890ff;
      }
    }
  </style>
</head>
<body>
  ${content}
</body>
</html>
    `;
  }

  static download(htmlContent) {
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
    
    link.href = url;
    link.download = `استمارة_التسجيل_${timestamp}.html`;
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up the URL object
    setTimeout(() => URL.revokeObjectURL(url), 100);
  }

  static print(htmlContent) {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    // Wait for content to load before printing
    printWindow.onload = () => {
      printWindow.print();
    };
  }
}

export default PDFService;