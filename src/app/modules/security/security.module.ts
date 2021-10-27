import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';

import { SecurityRoutingModule } from './security-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { AuthService } from './store/services/auth.service';
import { AuthGuard } from './store/services/auth.guard.service';
import { AuthStates } from './store';
import { SecurityComponent } from './security/security.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LockComponent } from './lock/lock.component';


@NgModule({
  declarations: [
    SecurityComponent,
    LoginComponent,
    RegisterComponent,
    ForgotpasswordComponent,
    LockComponent
  ],
  imports: [
    CommonModule,
    FormsModule,

    ReactiveFormsModule,
    SecurityRoutingModule
  ]
})
export class SecurityModule { 
  static forRoot(): ModuleWithProviders<RootAuthModule> {
    return {
      ngModule: RootAuthModule,
      providers: [AuthService, AuthGuard]
    };
  }

}
@NgModule({
  imports: [CommonModule,SecurityModule, SecurityRoutingModule, NgxsModule.forFeature(AuthStates)]
})
export class RootAuthModule {}
