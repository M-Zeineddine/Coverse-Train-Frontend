import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { signal, effect } from '@angular/core';
import { IonApp, IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonMenu, IonMenuButton, IonButton, IonList, IonItem, IonLabel, IonRouterOutlet } from "@ionic/angular/standalone";

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonRouterOutlet, IonLabel, IonItem,
    IonApp,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonMenu,
    IonMenuButton,
    IonButton,
    IonList
  ]
})
export class HomePage {

}
