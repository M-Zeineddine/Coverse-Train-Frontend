import { Component, OnInit, model } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonApp, IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonMenu, IonMenuButton, IonButton, IonList, IonItem, IonLabel, IonRouterOutlet, IonBackButton } from "@ionic/angular/standalone";
import { UserFormComponent } from 'src/app/components/user-form/user-form.component';
import { IUser } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.page.html',
  styleUrls: ['./edit-user.page.scss'],
  standalone: true,
  imports: [IonBackButton, IonRouterOutlet, IonLabel, IonItem,
    IonApp,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonMenu,
    IonMenuButton,
    IonButton,
    IonList,
    UserFormComponent
  ]
})
export class EditUserPage implements OnInit {

  constructor(private userService: UserService, private route: ActivatedRoute) { }

  apiResponse = model<any | null>(null);
  user: IUser | null = null;


  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.fetchUser(parseInt(userId));
    }
  }

  async fetchUser(id: number) {
    try {
      const response = await this.userService.getUserById(id).toPromise();
      this.user = response;
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  }

  async saveUser(userData: IUser) {
    if (!this.user) return;

    try {
      const response = await this.userService.updateUser(this.user.id, userData).toPromise();
      this.apiResponse.set(response);
      this.fetchUser(this.user.id)
    } catch (error) {
      this.apiResponse.set(error);
    }
  }

}
