import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/_models/user';
import { AuthService } from 'src/app/_services/auth.service';
import { isArray } from 'util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  formulario: FormGroup;
  error = null;
  user: User;

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
      name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      email: [null, [Validators.pattern('^[a-zA-Z0-9.]+@[a-zA-Z0-9]+.[a-zA-Z]+$')]],
      userName: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      password: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      confirmPassword: [null, Validators.required]
    }, {
      validator: this.passwordMatchValidator
    });
  }

  public passwordMatchValidator(fg: FormGroup)
  {
    if (fg.get('password').value !== fg.get('confirmPassword').value)
    {
      fg.get('confirmPassword').setErrors({passwordsMismatch: true})
    }
  }

  public submitForm()
  {
    this.error = null;

    if (this.formulario.valid)
    {
      console.log("VALID");
      let user: User = this.formulario.value;

      console.log(user)
      this.authService.register(user).subscribe(
        (data: User) => {
          console.log(data);
          this.user = data;
          this.user.password = this.formulario.get('password').value;
          this.authService.login(this.user).subscribe(
            response => {
              console.log(response);
              this.route.navigateByUrl('/');
              console.log(this.authService.getTokenExpirationDate())
              console.log(this.authService.isLoggedIn())
            },
            error => console.log(error)
          );
        },
        error => {
          console.log(error)
          console.log(isArray(error.error))
          if (isArray(error.error))
          {
            this.error = error.error[0].code
            console.log(this.error)
          }
        }
      );
    }
    else {
      console.log("INVALID")
      const keysArray = [
        'name', 'email', 'username', 'password', 'confirmPassword'
      ];
  
      for (const key of keysArray)
      {
        this.formulario.get(key).markAsTouched();
      }
    }
  }

}
