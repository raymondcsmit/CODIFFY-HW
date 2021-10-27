import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Navigate } from "@ngxs/router-plugin";
import { Login } from '../store';
import { IAuthenticate } from '../store/model/security.model';
import { LoginState } from '../store/states/login.state';
import { FindValueSubscriber } from 'rxjs/internal/operators/find';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  public submitted: boolean = false;
  public loginForm!: FormGroup;

  get f() {
    return this.loginForm?.controls;
  }


  @Select(LoginState.getPending) pending$?: Observable<boolean>;
  @Select(LoginState.getError) error$?: Observable<string>;



  constructor(private store: Store, private formBuilder: FormBuilder, private router: Router) {
  }

  ngOnInit() {
    this.bindLoginFormGroup();
  }

  bindLoginFormGroup() {
    this.loginForm = this.formBuilder.group({
      email: [
        "",
        [Validators.required, Validators.email]
      ],
      username: [
        "",
        //[Validators.required]
      ],
      password: ["", [Validators.required, Validators.minLength(6)]]
    });
  }
  onNavigate($event: string) {
    this.store.dispatch(new Navigate(['/register']));
  }
  onSubmit() {
    if (this.loginForm) {
      if (this.loginForm.valid) {
        let uname = this.loginForm.get('email')?.value;
        this.loginForm.patchValue({ username: uname });
        this.store.dispatch(new Login(this.loginForm.value));
      }
      else if (this.loginForm.invalid) {
        //this.log.Information("loginForm.invalid");
        return;
      }

    }
  }




}

