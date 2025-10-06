// src/services/ValidationService.js
import dayjs from 'dayjs';
import { VALIDATION_RULES, ERROR_MESSAGES } from '../utils/constants';

class ValidationService {
  static validateIdNumber(value) {
    if (!value) {
      return Promise.reject(ERROR_MESSAGES.REQUIRED);
    }
    
    if (!VALIDATION_RULES.ID_NUMBER.PATTERN.test(value)) {
      return Promise.reject(ERROR_MESSAGES.INVALID_ID);
    }
    
    const firstDigit = value.charAt(0);
    if (!VALIDATION_RULES.ID_NUMBER.VALID_START_DIGITS.includes(firstDigit)) {
      return Promise.reject(ERROR_MESSAGES.INVALID_ID);
    }
    
    return Promise.resolve();
  }

  static validateAge(value) {
    if (!value) {
      return Promise.reject(ERROR_MESSAGES.BIRTH_DATE_REQUIRED);
    }
    
    const age = dayjs().diff(value, 'year');
    
    if (age < VALIDATION_RULES.AGE.MIN) {
      return Promise.reject(ERROR_MESSAGES.INVALID_AGE_MIN);
    }
    
    if (age > VALIDATION_RULES.AGE.MAX) {
      return Promise.reject(ERROR_MESSAGES.INVALID_AGE_MAX);
    }
    
    return Promise.resolve();
  }

  static validateIssueDate(value) {
    if (!value) {
      return Promise.reject(ERROR_MESSAGES.ISSUE_DATE_REQUIRED);
    }
    
    if (value.isAfter(dayjs())) {
      return Promise.reject(ERROR_MESSAGES.FUTURE_DATE);
    }
    
    return Promise.resolve();
  }

  static getArabicOnlyRule() {
    return {
      pattern: VALIDATION_RULES.NAME.ARABIC_PATTERN,
      message: ERROR_MESSAGES.ARABIC_ONLY
    };
  }
}

export default ValidationService;