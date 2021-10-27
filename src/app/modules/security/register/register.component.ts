import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Navigate } from '@ngxs/router-plugin';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { RegisterUser } from '../store';
import { RegisterState } from '../store/states/register.state';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public submitted: boolean = false;
  public registerForm!: FormGroup;

  get f() {
    return this.registerForm?.controls;
  }


  @Select(RegisterState.getPending) pending$?: Observable<boolean>;
  @Select(RegisterState.getError) error$?: Observable<string>;

 

  constructor(
    private store: Store,
    private formBuilder: FormBuilder,
    private router: Router,
    //private log: LoggerService
  ) {

  }

  ngOnInit() {
    this.bindLoginFormGroup();
  }

  bindLoginFormGroup() {
    this.registerForm = this.formBuilder.group({
      email: [
        "",
        [Validators.required, Validators.email]
      ],
      username: [
        "",
        [Validators.required]
      ],
      password: ["", [Validators.required, Validators.minLength(6)]],
      confirmPassword: ["", [Validators.required, Validators.minLength(6)]]
    });
  }
  onNavigate($event: string) {
    this.store.dispatch(new Navigate(['/login']));
  }
  onSubmit() {
if(this.registerForm){
    if (this.registerForm.valid) {  
      let uname= this.registerForm.get('email')?.value;
      this.registerForm.patchValue({username:uname });
      this.store.dispatch(new RegisterUser(this.registerForm.value));
    }
    else if (this.registerForm.invalid) {
      //this.log.Information("loginForm.invalid");
      return;
    }


  }
}
}