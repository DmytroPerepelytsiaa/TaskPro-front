import { DIALOG_DATA } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { EditProfileForm, User } from '@shared/auth/models';
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
  private dialogData = inject<{ user: User }>(DIALOG_DATA);
  private formBuilder = inject(FormBuilder);

  editProfileForm: FormGroup<EditProfileForm> = this.formBuilder.group<EditProfileForm>({
    name: this.formBuilder.nonNullable.control('', [trimValidator(2, 36)]),
    avatarUrl: this.formBuilder.control(null),
  });
  InputType = InputType;
  
  ngOnInit(): void {
    this.editProfileForm.patchValue({
      name: this.dialogData.user.name,
      avatarUrl: this.dialogData.user.avatarUrl,
    });
  }

  // TODO: implement edit profile logic
}
