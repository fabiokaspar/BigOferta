import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap';
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
  bsConfig: Partial<BsDatepickerConfig>;
  formulario: FormGroup;
  error = '';
  user: User;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: Router
  ) { }

  ngOnInit() {
    this.bsConfig = {
      containerClass: 'theme-dark-blue',
      isAnimated: true
    };
    this.createForm();
  }

  public createForm()
  {
    this.formulario = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      username: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      dateOfBirth: [''],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      city: [''],
      country: [''],
      confirmPassword: ['', Validators.required]
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
    this.treatValueOfDateBeforeSubmitting();
    this.error = '';

    if (this.formulario.valid)
    {
      console.log("VALID")
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
      this.formulario.get('name').markAsTouched();
      this.formulario.get('username').markAsTouched();
      this.formulario.get('password').markAsTouched();
      this.formulario.get('confirmPassword').markAsTouched();
    }
  }

  private treatValueOfDateBeforeSubmitting()
  {
    console.log(this.formulario.get('dateOfBirth').value)
    if (this.formulario.get('dateOfBirth').value === '')
    {
      this.formulario.get('dateOfBirth').setValue(new Date());
    }
  }

}
