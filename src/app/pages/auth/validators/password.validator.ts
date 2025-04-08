import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordValidator = (min: number, max: number): ValidatorFn => (control: AbstractControl): ValidationErrors | null => {
  const value = control.value;
  const hasUpperCase = /[A-Z]/.test(value);
  const hasLowerCase = /[a-z]/.test(value);
  const hasDigit = /\d/.test(value);

  if (value.length === 0) {
    return { required: 'This field is required' };
  }

  if (value.length < min) {
    return { minLength: `Min length is ${min}` };
  }

  if (value.length > max) {
    return { maxLength: `Max length is ${max}` };
  }

  if (!hasUpperCase) {
    return { upperCase: 'Value must contain at least 1 uppercase latter' };
  }

  if (!hasLowerCase) {
    return { lowerCase: 'Value must contain at least 1 lowercase latter' };
  }

  if (!hasDigit) {
    return { digit: 'Value must contain at least 1 digit' };
  }

  return null;
};
