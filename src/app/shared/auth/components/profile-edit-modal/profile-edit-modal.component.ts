import { DIALOG_DATA } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { EditProfileForm, EditProfileFormState, User } from '@shared/auth/models';
import { InputType } from '@shared/ui/models';
import { UiModule } from '@shared/ui/ui.module';
import { trimValidator } from '@shared/validators';

@Component({
  selector: 'tp-profile-edit-modal',
  templateUrl: './profile-edit-modal.component.html',
  imports: [UiModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileEditModalComponent implements OnInit {
  @Output() saveData = new EventEmitter<EditProfileFormState>();
  
  private dialogData = inject<{ user: User }>(DIALOG_DATA);
  private formBuilder = inject(FormBuilder);

  editProfileForm: FormGroup<EditProfileForm> = this.formBuilder.group<EditProfileForm>({
    name: this.formBuilder.nonNullable.control('', [trimValidator(2, 36)]),
    avatarUrl: this.formBuilder.control(null),
  });
  InputType = InputType;
  temporaryAvatarUrl: string | null = null;
  
  ngOnInit(): void {
    this.temporaryAvatarUrl = this.dialogData.user.avatarUrl;

    this.editProfileForm.patchValue({ name: this.dialogData.user.name });
  }

  handleAvatarChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (!file) {
      // TODO: handle error
      return;
    }

    this.temporaryAvatarUrl = URL.createObjectURL(file);
    this.editProfileForm.patchValue({ avatarUrl: file });
  }

  onSaveData(): void {
    this.saveData.emit(this.editProfileForm.getRawValue());
  }
}
