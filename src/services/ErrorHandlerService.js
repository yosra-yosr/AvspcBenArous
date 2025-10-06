// src/services/ErrorHandlerService.js
import { message } from 'antd';

class ErrorHandlerService {
  static handleSubmitError(error) {
    console.error('Submission error:', error);

    if (error.response) {
      // Server responded with error status
      const status = error.response.status;
      const errorData = error.response.data;

      switch (status) {
        case 400:
          message.error(errorData.message || 'خطأ في البيانات المدخلة. يرجى التحقق من المعلومات.');
          break;
        case 409:
          message.error('رقم بطاقة التعريف مسجل مسبقاً. يرجى التحقق من البيانات.');
          break;
        case 422:
          message.error('بيانات غير صحيحة. يرجى مراجعة جميع الحقول.');
          break;
        case 500:
          message.error('خطأ في الخادم. يرجى المحاولة مرة أخرى لاحقاً.');
          break;
        default:
          message.error(errorData.message || 'حدث خطأ أثناء التسجيل. يرجى المحاولة مرة أخرى.');
      }
    } else if (error.request) {
      // Request was made but no response received
      message.error('خطأ في الاتصال بالخادم. يرجى التحقق من اتصال الإنترنت والمحاولة مرة أخرى.');
    } else {
      // Something else happened
      message.error('حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.');
    }
  }

  static handleValidationError(error) {
    console.error('Validation error:', error);
    
    if (error.errorFields && error.errorFields.length > 0) {
      const firstError = error.errorFields[0];
      message.error(firstError.errors[0] || 'يرجى ملء جميع الحقول المطلوبة بشكل صحيح');
    } else {
      message.error('يرجى ملء جميع الحقول المطلوبة بشكل صحيح');
    }
  }

  static handleNetworkError(error) {
    console.error('Network error:', error);
    message.error('خطأ في الاتصال. يرجى التحقق من اتصال الإنترنت.');
  }
}

export default ErrorHandlerService;