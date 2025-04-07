import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const trimValidator = (min: number, max: number): ValidatorFn => (control: AbstractControl): ValidationErrors | null => {
  if (control.value === null) {
    return null;
  }

  const trimmedValue = control.value.trim();
 
  if (trimmedValue.length === 0 && min !== 0) {
    return { required: 'This field is required' };
  }

  if (trimmedValue.length < min) {
    return { minLength: `Min length is ${min}` };
  }

  if (trimmedValue.length > max) {
    return { maxLength: `Max length is ${max}` };
  }

  return null;
};
