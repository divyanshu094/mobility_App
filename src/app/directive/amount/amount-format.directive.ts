import { DecimalPipe } from '@angular/common';
import { Directive, ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subscription, map } from 'rxjs';

@Directive({
  selector: '[inputAmountFormat]',
  providers: [DecimalPipe]
})
export class AmountFormatDirective implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription;

  constructor(private ngControl: NgControl, private decimal: DecimalPipe,private elementRef: ElementRef,
    private renderer: Renderer2) {
  }

  ngOnInit() {
    this.renderer.addClass(
      this.elementRef.nativeElement,
      'amountInput'
    );
    const control:any = this.ngControl.control;
    this.subscription = control.valueChanges.pipe(
      map(value => {
        if(value){
          const parts:any = value.toString().split(".");
          parts[0] = this.decimal.transform(parts[0].replace(/,/g, ''));
          return parts.join('.');
        }else{
          return value;
        }
      })
    ).subscribe((v: any) => control.setValue(v, { emitEvent: false }));
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
