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

interface SigninResponse {
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  rootUrl = 'https://api.angular-email.com/auth';
  signedin$ = new BehaviorSubject(null);
  username = '';

  constructor(private http: HttpClient) { }

  usernameAvailable(username: string) {
    return this.http.post<UsernameAvailableResponse>(`${this.rootUrl}/username`, { username });
  }

  signUp(credentials: SignUp) {
    return this.http.post<SignUpResponse>(`${this.rootUrl}/signup`, credentials)
    .pipe(
      tap(({username}) => {
        this.signedin$.next(true);
        this.username = username;
      })
    );
  }

  checkAuth() {
    return this.http.get<SigninResponse>(`${this.rootUrl}/signedin`)
    .pipe(
      tap(({authenticated, username}) => {
        this.signedin$.next(authenticated);
        console.log('Response -->', authenticated);
        this.username = username;
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
    return this.http.post<SigninResponse>(`${this.rootUrl}/signin`, credentials).pipe(
      tap(({username}) => {
        this.signedin$.next(true);
        this.username = username;
      })
    )
  }
}
