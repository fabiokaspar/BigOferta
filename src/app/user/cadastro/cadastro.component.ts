import { AlertifyService } from './../../_services/alertify.service';
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
    private route: Router,
    private alertifyService: AlertifyService,
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
    if (!fg.get('confirmPassword').hasError('required'))
    {
      if (fg.get('password').value !== fg.get('confirmPassword').value)
      {
        fg.get('confirmPassword').setErrors({passwordsMismatch: true})
      }
    }
  }

  private subscribeInRegister(user: User)
  {
    this.authService.register(user).subscribe(
      (data: User) => {
        console.log(data);
        this.user = data;
        this.user.password = this.formulario.get('password').value;

        this.authService.login(this.user).subscribe(
          response => {
            console.log(response);

            this.route.navigateByUrl('/');
            this.alertifyService.success(`Seja bem-vindo ${user.userName}!`);
          },
          error => console.log(error)
        );
      },
      error => {
        console.log(error);
        if (isArray(error.error))
        {
          this.error = error.error[0].code;
        }
      }
    );
  }

  public submitForm()
  {
    this.error = null;

    if (this.formulario.valid)
    {
      let user: User = this.formulario.value;
      this.subscribeInRegister(user);
    }
    else
    {
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
