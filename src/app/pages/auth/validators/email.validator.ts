import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

import { emailRegex } from '../constants';

export const emailValidator = (min: number, max: number): ValidatorFn => (control: AbstractControl): ValidationErrors | null => {
  const trimmedValue = control.value.trim();
  const isEmail = emailRegex.test(trimmedValue);
 
  if (trimmedValue.length === 0) {
    return { required: 'This field is required' };
  }

  if (trimmedValue.length < min) {
    return { minLength: `Min length is ${min}` };
  }

  if (trimmedValue.length > max) {
    return { maxLength: `Max length is ${max}` };
  }

  if (!isEmail) {
    return { email: 'Email is invalid' };
  }

  return null;
};
