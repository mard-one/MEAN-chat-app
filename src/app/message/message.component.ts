import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-message',
  template: `
    <div style='

    display: flex;
    justify-content: space-between;
    margin: 2px 0;
    padding: 10px 5px;'

    class="alert alert-primary"
    #mBar *ngFor = "let message of messages"

    (mousedown)="selected(message, mBar)"
    (mouseup)="unselected()">
      <div style=' padding-left: 20px; font-size: 20px; line-height: 38px'>{{ message }}</div>

    </div>
  `
})
export class MessageComponent implements OnInit {
  @Input() messages;
  @Output() select = new EventEmitter();
  private pause;
  constructor() { }

  ngOnInit() {
  }


  selected(message, mBar){
    this.pause = setTimeout(() => {
      mBar.classList.toggle('alert-danger');
      console.log(message)
      this.select.emit(message)

        // if (mButton.style.display === 'none') {
        //     mButton.style.display = 'block';
        // } else {
        //   mButton.style.display = 'none';
        // }
    }, 500);
  }
  unselected(){
     clearTimeout(this.pause)
  }




}
