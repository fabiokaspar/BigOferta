import { Component, OnInit, EventEmitter, OnDestroy, Output } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public componentToRender = 'cadastro';
  
  constructor() { }
  
  ngOnInit() {

  }

  public toggleComponentToRender(event: string)
  {
    this.componentToRender = (event === 'cadastro') ? 'cadastro' : 'login';
  }

}
