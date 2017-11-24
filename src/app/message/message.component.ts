import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-message',
  template: `
    <div style='margin: 2px 0; padding: 10px 5px; border-radius: 5px'class="bg-secondary text-white" #mBar *ngFor = "let message of messages"(mousedown)="mousedown(message, mBar)"(mouseup)="mouseup()">
      <div style='padding-left: 20px; font-size: 20px; line-height: 25px'>{{ message }}</div>
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
      if(mBar.classList.contains("bg-secondary")){
        mBar.classList.remove('bg-secondary');
        mBar.classList.add('bg-danger')
        this.select.emit(message)
      }else{
        mBar.classList.remove('bg-danger');
        mBar.classList.add('bg-secondary')
        this.unselect.emit(message)
      }
    }, 500);
  }
  mouseup(){
     clearTimeout(this.pause)
  }

}
