import { Component, Input, input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IonToolbar, IonApp, IonContent, IonHeader, IonTitle, IonButtons, IonButton } from "@ionic/angular/standalone";

@Component({
    selector: 'app-delete-user-modal',
    standalone: true,
    imports: [
        IonApp,
        IonContent,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonButtons,
        IonButton
    ],
    template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Confirm Deletion</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="dismiss()">Close</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    
    <ion-content>
      <div class="wrapper">
        <p>Are you sure you want to delete user <strong>{{ user.name }}</strong>?</p>
        <ion-button expand="block" color="danger" (click)="confirmDeletion()">Delete</ion-button>
        <ion-button expand="block" (click)="dismiss()">Cancel</ion-button>
      </div>
    </ion-content>
  `
})
export class DeleteUserModalComponent {
    user = input();

    constructor(private modalController: ModalController) { }

    dismiss() {
        this.modalController.dismiss();
    }

    confirmDeletion() {
        this.modalController.dismiss({ confirmed: true });
    }
}
