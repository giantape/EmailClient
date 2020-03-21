import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

interface UsernameAvailableResponse {
  available: boolean;
}

interface SignUp {
  username: string;
  password: string;
  passwordConfirmation: string;
}

interface SignUpResponse {
  username: string;
}

interface SigninResponse {
  authenticated: boolean;
  username: string;
}

interface SigninCredential {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  rootUrl = 'https://api.angular-email.com/auth';
  signedin$ = new BehaviorSubject(null);

  constructor(private http: HttpClient) { }

  usernameAvailable(username: string) {
    return this.http.post<UsernameAvailableResponse>(`${this.rootUrl}/username`, { username });
  }

  signUp(credentials: SignUp) {
    return this.http.post<SignUpResponse>(`${this.rootUrl}/signup`, credentials)
    .pipe(
      tap(() => {
        this.signedin$.next(true);
      })
    );
  }

  checkAuth() {
    return this.http.get<SigninResponse>(`${this.rootUrl}/signedin`)
    .pipe(
      tap(({authenticated}) => {
        this.signedin$.next(authenticated);
        console.log('Response -->', authenticated);
      })
    );
  }

  signOut() {
    return this.http.post(`${this.rootUrl}/signout`, {})
    .pipe(
      tap(() => {
        this.signedin$.next(false);
      })
    );
  }

  signedIn(credentials: SigninCredential) {
    return this.http.post(`${this.rootUrl}/signin`, credentials).pipe(
      tap(() => {
        this.signedin$.next(true);
      })
    )
  }
}
