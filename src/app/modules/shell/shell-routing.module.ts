import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../security/store/services/auth.guard.service';
import { ShellComponent } from './shell/shell.component';

const routes: Routes = [
  { path: '', component: ShellComponent,  children: [] } ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShellRoutingModule { }
