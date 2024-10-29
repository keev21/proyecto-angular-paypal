import { Component, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'proyecto-angular-paypal';
  private amount = '100.00';  // Monto de pago

  constructor(private elRef: ElementRef) {}

  ngAfterViewInit(): void {
    this.loadPayPalButton();
  }

  private loadPayPalButton() {
    if ((window as any).paypal) {
      (window as any).paypal.Buttons({
        style: {
          layout: 'vertical',
          color: 'blue',
          shape: 'rect',
          label: 'paypal'
        },
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: this.amount
              }
            }]
          });
        },
        onApprove: (data: any, actions: any) => {
          return actions.order.capture().then((details: any) => {
            alert('Compra completada por ' + details.payer.name.given_name);
          });
        },
        onError: (err: any) => {
          console.error('Error en el pago: ', err);
          alert('Hubo un error en el pago.');
        }
      }).render(this.elRef.nativeElement.querySelector('#paypal-button-container'));
    }
  }
}
