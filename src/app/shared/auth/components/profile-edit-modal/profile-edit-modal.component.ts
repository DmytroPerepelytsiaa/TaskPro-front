import { DIALOG_DATA } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { EditProfileForm, User } from '@shared/auth/models';
import { InputType } from '@shared/ui/models';
import { UiModule } from '@shared/ui/ui.module';
import { emailValidator, trimValidator } from '@shared/validators';

@Component({
  selector: 'tp-profile-edit-modal',
  templateUrl: './profile-edit-modal.component.html',
  imports: [UiModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileEditModalComponent implements OnInit {
  constructor(@Inject(DIALOG_DATA) public data: { user: User }) {}
  
  private formBuilder = inject(FormBuilder);

  editProfileForm: FormGroup<EditProfileForm> = this.formBuilder.group<EditProfileForm>({
    name: this.formBuilder.nonNullable.control('', [trimValidator(2, 36)]),
    email: this.formBuilder.nonNullable.control('', [emailValidator(0, 256)]),
  });
  InputType = InputType;
  
  ngOnInit(): void {
    this.editProfileForm.patchValue({
      name: this.data.user.name,
      email: this.data.user.email,
    });
  }

  // TODO: implement edit profile logic
}
