import {Component, ElementRef, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-report-charge',
  templateUrl: 'report-charge.html',
})
export class ReportChargePage {

  @ViewChild('comment') commentInput: ElementRef;

  commentString: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  resize() {
    this.commentInput.nativeElement.style.height = this.commentInput.nativeElement.scrollHeight + 'px';
  }
}
