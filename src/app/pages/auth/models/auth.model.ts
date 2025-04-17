import { FormControl } from '@angular/forms';

export type AuthForm = {
  [FieldName in keyof AuthFormState]: FormControl<AuthFormState[FieldName]>;
};

export interface AuthFormState {
  name: string;
  email: string;
  password: string;
}
