import { FormControl } from '@angular/forms';

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}

export type AuthForm = {
  [FieldName in keyof AuthFormState]: FormControl<AuthFormState[FieldName]>;
};

export interface AuthFormState {
  name: string;
  email: string;
  password: string;
}

export type EditProfileForm = {
  [FieldName in keyof EditProfileFormState]: FormControl<EditProfileFormState[FieldName]>;
};

export interface EditProfileFormState {
  name: string;
  avatarUrl: File | null;
}
