import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  constructor(private menuControl: MenuController) {
  }

  closeMenu() {
    this.menuControl.close();
  }
}
