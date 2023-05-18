import { Directive, Input } from '@angular/core';
import { FormControl, NG_VALIDATORS, Validators } from '@angular/forms';

@Directive({
  selector: '[appValidateImgUrl][ngModel]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: ValidateImgUrlDirective,
      multi: true
    }
  ]
})
export class ValidateImgUrlDirective implements Validators {

  constructor() { }

  validate(control: FormControl) {
    let url: string = control.value;
    if (!url || url == ''){
      return null
    }
    // url = url.toString()
    const imageUrlregex = /^http[^\?]*.(jpg|jpeg|gif|png|bmp)(\?(.*))?$/gmi;
    const validImageUrl = url.match(imageUrlregex) != null;

    if( validImageUrl){
      return null
    }

    return {
      invalidImgUrl: true
    }
  }
}
