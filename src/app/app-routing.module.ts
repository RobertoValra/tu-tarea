import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import AuthGuard from './services/auth/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './components/login/login.module#LoginPageModule'  },
  { path: 'home', loadChildren: './components/home/home.module#HomePageModule', canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
