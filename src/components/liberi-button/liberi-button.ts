import { Component, Input } from '@angular/core';

@Component({
  selector: 'liberi-button',
  templateUrl: 'liberi-button.html'
})
export class LiberiButtonComponent {

  @Input() name: string;
  @Input() disabled: boolean = false;

  constructor() {}

}
