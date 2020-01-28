import { AlertifyService } from './../../_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';
import { CarrinhoService } from './../../_services/carrinho.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/_models/user';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-formulario-ordem-compra',
  templateUrl: './formulario-ordem-compra.component.html',
  styleUrls: ['./formulario-ordem-compra.component.css']
})
export class FormularioOrdemCompraComponent implements OnInit {
  formulario: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;
  showFormulario;
  user: User;


  @Output() public purchaseEvent = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder,
    private carrinhoService: CarrinhoService,
    public authService: AuthService,
    public alertifyService: AlertifyService,
    private bsLocaleService: BsLocaleService
  ) {
    this.bsLocaleService.use('pt-br')
  }

  ngOnInit() {
    this.bsConfig = {
      containerClass: 'theme-dark-blue',
      isAnimated: true
    };

    this.showFormulario = true;
    this.createForm();
  }

  scrollUp()
  {
    // const currentUrl = window.location.href;
    // window.location.href = currentUrl;
    window.scrollTo(0, 0)
  }

  private createForm()
  {
    this.user = JSON.parse(localStorage.getItem('user'));

    this.formulario = this.fb.group({
      street: [null || this.user.street, Validators.required],
      number: [null || this.user.number, [Validators.required, Validators.maxLength(5)]],
      city: [null || this.user.city, Validators.required],
      district: [null || this.user.district, Validators.required],
      state: [null || this.user.state, Validators.required],
      phoneNumber: [null || this.user.phoneNumber, [Validators.minLength(8), Validators.maxLength(20)]],
      dateOfBirth: [null],
      country: [null || this.user.country, Validators.required],
      card: [null, [Validators.required, Validators.pattern('^[0-9]{16}$')]],
      cvv: [null, [Validators.required, Validators.pattern('^[0-9]{3}$')]]
    });

    if (this.user.street !== null)
    {
      this.showFormulario = false;
      this.formulario.get('dateOfBirth').setValue(new Date(this.user.dateOfBirth));
      this.formulario.get('card').setValue(this.user.cardNumber.substr(0, 16));
      this.formulario.get('cvv').setValue(this.user.cardNumber.substr(16, 3));
    }

  }

  efetivarCompra()
  {
    this.alertifyService.confirm(
      'Clique em Ok para finalizar a compra ou em Cancel para sair',
      () => { this.sendRequestToFinalizePurchaseOrder(); },
      () => { }
    );
  }

  private sendRequestToFinalizePurchaseOrder()
  {
    if (this.updateUserFromForm())
    {
      const userId = this.authService.getDecodedToken().nameid;

      this.carrinhoService.confirmaOrdemCompra(userId).subscribe(
        response =>
        {
          console.log(response);
          if (response.cart.length === 0)
          {
            this.carrinhoService.esvaziaCarrinho();
            this.purchaseEvent.emit(response.purchase);
            this.alertifyService.confirm(
              'Compra efetivada! Temos prazer em serví-lo, volte sempre!',
              () => {},
              () => {}
            )
          }
        },
        error =>
        {
          console.log(error);
          if (error.status === 400) 
          {
            alert('Seu carrinho de compras está vazio!');
          }
        }
      );
    }
  }

  private updateUserFromForm(): boolean
  {
    this.treatValueOfDateBeforeSubmitting();

    if (this.formulario.valid)
    {
      const userForUpdate: User = {
        name: this.user.name,
        userName: this.user.userName,
        street: this.formulario.get('street').value,
        country: this.formulario.get('country').value,
        city: this.formulario.get('city').value,
        district: this.formulario.get('district').value,
        state: this.formulario.get('state').value,
        number: this.formulario.get('number').value,
        phoneNumber: this.formulario.get('phoneNumber').value,
        dateOfBirth: this.formulario.get('dateOfBirth').value,
        cardNumber:
          this.formulario.get('card').value + this.formulario.get('cvv').value,
      };

      this.authService.updateUser(userForUpdate).subscribe(user => {
        console.log("USER UPDATED ===> ", user)
      }, error => {
        console.log(error)
      })

      return true;
    }

    this.markFormAsTouched();

    return false;
  }

  private markFormAsTouched()
  {
    const keysArray = [
      'street',
      'number',
      'city',
      'district',
      'phoneNumber',
      'state',
      'country',
      'card',
      'dateOfBirth',
      'cvv'
    ];

    for (const key of keysArray) {
      this.formulario.get(key).markAsTouched();
    }
    alert('Preencha os campos obrigatórios do formulário');
  }

  private treatValueOfDateBeforeSubmitting()
  {
    console.log(this.formulario.get('dateOfBirth').value)
    if (this.formulario.get('dateOfBirth').value === null)
    {
      this.formulario.get('dateOfBirth').setValue(new Date());
    }
  }
}
