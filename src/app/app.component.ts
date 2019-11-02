import { UserComponent } from './user/user.component';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  exibirTopo = true;

  onActivate(component)
  {
    if (component instanceof UserComponent)
    {
      this.exibirTopo = false;
    }
  }
  
  onDeactivate(component)
  {
    if (component instanceof UserComponent)
    {
      this.exibirTopo = true;
    }
  }
}
