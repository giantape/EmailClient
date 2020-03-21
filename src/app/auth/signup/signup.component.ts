import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatchPassword } from '../validators/match-password';
import { UniqeUsername } from '../validators/uniqe-username';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  authForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern(/^[a-z0-9]+$/) ], [this.uniqeUsername.validate]),
    password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
    passwordConfirmation: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
  }, {validators: [this.matchPassword.validate]});

  constructor(
    private matchPassword: MatchPassword,
    private uniqeUsername: UniqeUsername,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.authForm.invalid) { return; }
    this.authService.signUp(this.authForm.value)
    .subscribe({
      next: () => {
        //navigate to signin or inbox
        this.router.navigateByUrl('/inbox');

      },
      error: (err) => {
        if (!err.status) {
          this.authForm.setErrors({noConnection: true});
        }
      }
    });
    console.log('form SUbmited', this.authForm.value);
  }
}
