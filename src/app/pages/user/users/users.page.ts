import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { IonApp, IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonMenu, IonMenuButton, IonButton, IonModal, IonList, IonItem, IonLabel, IonIcon } from "@ionic/angular/standalone";
import { UserService } from 'src/app/services/user/user.service';
import { NgFor } from '@angular/common';
import { ModalController } from '@ionic/angular';
import { DeleteUserModalComponent } from '../delete-user-modal.component';
import { AddUserPage } from "../add-user/add-user.page";

@Component({
  selector: 'app-users',
  standalone: true,
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonIcon, IonLabel, IonItem, IonList, IonModal,
    IonApp,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonMenu,
    IonMenuButton,
    IonButton,
    RouterModule,
    NgFor, AddUserPage]
})
export class UsersPage implements OnInit {

  constructor(private userService: UserService, private router: Router, private modalController: ModalController) { }
  users: any;

  ngOnInit() {
    this.fetchUsers()
  }

  async fetchUsers() {
    try {
      const response = await this.userService.getUsers().toPromise();
      this.users = response;
      console.log('Users:', this.users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }

  navigate() {
    this.router.navigate(['/users/add']);
  }

  async openDeleteModal(user: any) {
    const modal = await this.modalController.create({
      component: DeleteUserModalComponent,
      componentProps: {
        user: user
      }
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data && data.confirmed) {
      this.deleteUser(user.id);
    }
  }

  async deleteUser(userId: number) {
    try {
      await this.userService.deleteUser(userId).toPromise();
      this.users = this.users.filter((user: any) => user.id !== userId);
      console.log('IUser deleted:', userId);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  }
}
