import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './modules/security/store/services/auth.guard.service';

const routes: Routes = [
  { path: '', redirectTo:'/shell', pathMatch: 'full' },
  {
    path: 'shell',
    loadChildren: () =>
      import('./modules/shell/shell.module').then((m) => m.ShellModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'security',
    loadChildren: () =>
      import('./modules/security/security.module').then((m) => m.SecurityModule),
   // canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

//imports: [RouterModule.forRoot(routes, { useHash: true })],