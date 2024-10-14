import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then(m => m.HomePage)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'users',
    children: [
      {
        path: "",
        loadComponent: () => import('./pages/user/users/users.page').then(m => m.UsersPage),
      },
      {
        path: 'add',
        loadComponent: () => import('./pages/user/add-user/add-user.page').then(m => m.AddUserPage)
      },
      {
        path: 'edit/:id',
        loadComponent: () => import('./pages/user/edit-user/edit-user.page').then(m => m.EditUserPage)
      }
    ]

  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
