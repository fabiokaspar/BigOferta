import { AuthService } from 'src/app/_services/auth.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { User } from 'src/app/_models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formulario: FormGroup;
  user: User;
  error = 0;
  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: Router
  ) { }

  ngOnInit() {
    this.createForm();
  }

  public createForm()
  {
    this.formulario = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submitForm()
  {
    this.error = 0;

    if (this.formulario.valid)
    {
      this.user = this.formulario.value;

      console.log(this.user)
      this.authService.login(this.user).subscribe(
        data => {
          console.log(data)
          this.route.navigateByUrl('/');
          console.log(this.authService.getTokenExpirationDate())
          console.log(this.authService.isLoggedIn())
          // this.error = 0;
        },
        error => {
          console.log(error)
          this.error = error.status;
        }
      );
    }
    else
    {
      this.formulario.get('username').markAsTouched()
      this.formulario.get('password').markAsTouched()
    }
  }

}
