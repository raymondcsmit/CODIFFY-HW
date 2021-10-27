import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SecurityModule } from './modules/security/security.module';
import { environment } from 'src/environments/environment';
import { LayoutState } from './modules/shell/store';
import { ApiInterceptor } from './interceptor/api.interceptor';

import { httpInterceptorProviders } from './interceptor';
import { ngxLoadingAnimationTypes, NgxLoadingModule } from 'ngx-loading';
import { LoaderState } from './store/app.store';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { AuthState, AuthStates, LoginState } from './modules/security/store';
import { RegisterState } from './modules/security/store/states/register.state';
import { AuthStatusState } from './modules/security/store/states/auth.state';
import { NgxsWebsocketPluginModule } from '@ngxs/websocket-plugin';
import { NgWizardConfig, NgWizardModule, THEME } from 'ng-wizard';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { MomentModule } from 'angular2-moment';

const AppStates = [LayoutState, LayoutState, LoaderState,AuthState,
  AuthStatusState,  LoginState,  RegisterState];
  const ngWizardConfig: NgWizardConfig = {
    theme: THEME.default
  };

@NgModule({
  declarations: [
    AppComponent,   
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    NgbModule,
    NgIdleKeepaliveModule.forRoot(),
    MomentModule,
    NgWizardModule.forRoot(ngWizardConfig),
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }), // ToastrModule added
    SecurityModule.forRoot(),
    NgxsModule.forRoot(AppStates!, {
      developmentMode: !environment.production
    }),
    NgxsStoragePluginModule.forRoot({
      key: ['auth.status', 'loader', LoaderState]
    }),
    NgxsRouterPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot({
      name: 'Lawyers Dev Tools'
    }),
    NgxsLoggerPluginModule.forRoot({
      //disabled: environment.production
      disabled:true
    }),
    // NgxsWebsocketPluginModule.forRoot({
    //   url: 'ws://localhost:4200'
    // }),
    NgxsFormPluginModule.forRoot(),
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.circleSwish,
      backdropBackgroundColour: 'rgba(0,0,0,0.1)', 
      backdropBorderRadius: '4px',
      primaryColour: '#ffffff', 
      secondaryColour: '#ffffff', 
      tertiaryColour: '#ffffff'
  })
    
  ],
  
  providers: [
    httpInterceptorProviders
],
  bootstrap: [AppComponent]
})
export class AppModule { }
