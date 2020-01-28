import { Injectable } from '@angular/core';
declare let alertify: any;

alertify.defaults.theme.ok = 'ui positive button';
alertify.defaults.theme.cancel = 'ui black button';

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }

  confirm(message: string, okCallback: () => any, failCallback: () => any)
  {
    alertify.confirm('Confirm', message,
      () => { okCallback(); },
      () => { failCallback(); }
    )
    .set({
      resizable: true
    })
    .resizeTo(0, 160);
  }

  success(message: string)
  {
    alertify.success(message);
  }

  error(message: string)
  {
    alertify.error(message);
  }

  warning(message: string)
  {
    alertify.warning(message);
  }

  message(message: string)
  {
    alertify.message(message);
  }
}
