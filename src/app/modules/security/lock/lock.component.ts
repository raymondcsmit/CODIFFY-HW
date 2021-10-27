import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { UnLockScreen } from '../store';
import { IUser } from '../store/model/security.model';
import { AuthStatusState } from '../store/states/auth.state';

@Component({
  selector: 'app-lock',
  templateUrl: './lock.component.html',
  styleUrls: ['./lock.component.css']
})
export class LockComponent implements OnInit {
  @Select(AuthStatusState.getUser) user$!: Observable<IUser>
  username: string = "";
  public lockForm!: FormGroup;
  constructor(private store: Store, private formBuilder: FormBuilder) { }
  

  get f() {
    return this.lockForm?.controls;
  }
  ngOnInit(): void {
    this.bindLoginFormGroup();
    this.user$.subscribe(u => this.username = u.userName);
  }
  bindLoginFormGroup() {
    this.lockForm = this.formBuilder.group({
      username: [""],
      password: ["", [Validators.required, Validators.minLength(6)]]
    });
  }
  onSubmit() {
    if (this.lockForm) {
      if (this.lockForm.valid) {
        this.lockForm.patchValue({ username: this.username });
        this.store.dispatch(new UnLockScreen(this.lockForm.value));
      }
      else if (this.lockForm.invalid) {
        //this.log.Information("loginForm.invalid");
        return;
      }

    }
  }
}
