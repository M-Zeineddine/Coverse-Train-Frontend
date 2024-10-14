import { NgFor, NgIf } from '@angular/common';
import { Component, model, input, effect, output, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IonButton, IonInput, IonItem, IonLabel, IonContent } from "@ionic/angular/standalone";
import { IUser } from 'src/app/models/user.model';

@Component({
  selector: 'app-user-form',
  standalone: true,
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  imports: [
    IonButton,
    IonInput,
    IonItem,
    IonLabel,
    IonContent,
    ReactiveFormsModule,
    FormsModule,
    NgIf,
    NgFor
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class UserFormComponent {
  config = model<IUser>();
  formData = output<IUser>();
  apiResponse = input<any | null>(null);
  userData = input<IUser | null>(null);

  nameError = model<string | null>(null);
  emailError = model<string[] | null>(null);

  constructor() {
    effect(() => {
      const response = this.apiResponse();
      if (response && response.error) {
        this.handleError(response.error);
      }

      const user = this.userData();
      if (user) {
        this.config.set({ id: user.id, name: user.name, email: user.email });
      }
    }, { allowSignalWrites: true });
  }

  updateName(event: Event) {
    const input = event.target as HTMLInputElement;
    this.config.update((prevValue) => {
      return {
        ...prevValue!,
        name: input.value
      }
    });
  }

  updateEmail(event: Event) {
    const input = event.target as HTMLInputElement;
    this.config.update((prevValue) => {
      return {
        ...prevValue!,
        email: input.value
      }
    });
  }

  onSave() {
    this.formData.emit(this.config()!);
  }

  handleError(error: any) {
    console.log(error)

    this.nameError.set(null);
    this.emailError.set(null);

    const emailErrorMessages: string[] = [];

    error.message.forEach((msg: string) => {
      if (msg.includes('Name')) {
        this.nameError.set(msg);
      } else if (msg.includes('Email')) {
        emailErrorMessages.push(msg);
      }
    });

    if (emailErrorMessages.length > 0) {
      this.emailError.set(emailErrorMessages);
    }
  }
}
