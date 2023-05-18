import { Directive, Input } from '@angular/core';
import { FormControl, NG_VALIDATORS, Validators } from '@angular/forms';

@Directive({
  selector: '[appMin][ngModel]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting:ValidateMinValueDirective,
      multi: true
    }
  ]
})
export class ValidateMinValueDirective implements Validators{
  @Input('appMin') min: number;

  constructor() { }

  validate(control: FormControl) {
    let num: number = control.value;
    if(num < this.min){
      return {
        min: true
      }
    }
    return null;
  }
}
