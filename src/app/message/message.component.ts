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

    (mousedown)="mousedown(message, mBar)"
    (mouseup)="mouseup()">
      <div style=' padding-left: 20px; font-size: 20px; line-height: 38px'>{{ message }}</div>

    </div>
  `
})
export class MessageComponent implements OnInit {
  @Input() messages;
  @Output() select = new EventEmitter();
  @Output() unselect = new EventEmitter();
  private pause;
  constructor() { }

  ngOnInit() {
  }


  mousedown(message, mBar){
    this.pause = setTimeout(() => {
      if(mBar.classList.contains("alert-primary")){
        // console.log(message + "primary")
        mBar.classList.remove('alert-primary');
        mBar.classList.add('alert-danger')
        this.select.emit(message)
      }else{
        // console.log(message + "danger")
        mBar.classList.remove('alert-danger');
        mBar.classList.add('alert-primary')
        this.unselect.emit(message)
      }
      // mBar.classList.toggle('alert-danger');


        // if (mButton.style.display === 'none') {
        //     mButton.style.display = 'block';
        // } else {
        //   mButton.style.display = 'none';
        // }
    }, 500);
  }
  mouseup(){
     clearTimeout(this.pause)
  }




}
