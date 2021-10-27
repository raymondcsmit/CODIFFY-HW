import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { AuthApiResponse, IAuthenticate,  IRegister, IUser } from "../model/security.model";

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  apilogin({ username, password }: IAuthenticate): Observable<AuthApiResponse> {
    return this.http.post<AuthApiResponse>(`${environment.apiUrl}/auth/login`, {
      username,
      password
    });
  }
  unLock({ username, password }: IAuthenticate): Observable<AuthApiResponse> {
    return this.http.post<AuthApiResponse>(`${environment.apiUrl}/auth/unlock`, {
      username,
      password
    });
  }
  loginWithRefreshToken(payload: string): Observable<AuthApiResponse> {
    let header = {
      headers: new HttpHeaders()
        .set('refreshToken',  `${payload}`)
    }
    
    return this.http.post<AuthApiResponse>(`${environment.apiUrl}/auth/refreshtoken`,null,header);
  }
  register({ username, password, email, confirmPassword }: IRegister): Observable<AuthApiResponse> {
    return this.http.post<AuthApiResponse>(`${environment.apiUrl}/auth/register`, {
      username,
      email,
      password,
      confirmPassword
    });
  }
  logout() {
    return of(true);
  }
}
