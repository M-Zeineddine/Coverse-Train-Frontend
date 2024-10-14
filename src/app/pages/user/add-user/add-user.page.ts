import { ChangeDetectionStrategy, Component, OnInit, ViewChild, effect, model, viewChild } from '@angular/core';
import { IonApp, IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonMenu, IonMenuButton, IonButton, IonList, IonItem, IonLabel, IonRouterOutlet, IonBackButton } from "@ionic/angular/standalone";
import { UserFormComponent } from 'src/app/components/user-form/user-form.component';
import { IUser } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.page.html',
  styleUrls: ['./add-user.page.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
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
export class AddUserPage implements OnInit {
  apiResponse = model<any | null>(null);

  constructor(private userService: UserService) {

  }

  ngOnInit() {

  }

  async saveUser(userData: IUser) {
    try {
      const response = await this.userService.addUser(userData).toPromise()
      this.apiResponse.set(response);

    } catch (error) {
      this.apiResponse.set(error);
    }
  }
}
