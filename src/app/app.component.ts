import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { MessageActions } from './app.actions';

interface AppStore {
  message: string[]
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  messages: Observable<Array<Object>>;
  selectedMessages: string[] = [];


  constructor(private store: Store<AppStore>){
    this.messages = store.select('messages')
    this.messages.subscribe((state) => {
      this.selectedMessages = this.selectedMessages.filter((selectedMessageToDelete) => {
        return state.includes(selectedMessageToDelete)
      })
    })
    setTimeout(() => {
      this.sendMessage(
        { value:"Hey, I'm Chat App."}
        )
    }, 2000)
    setTimeout(() => {
      this.sendMessage(
        { value:"You can text me if you want."}
        )
    }, 4000)
    setTimeout(() => {
      this.sendMessage(
        { value:"But I think I can't reply. ))"}
        )
    }, 6000)
    setTimeout(() => {
      this.sendMessage(
        { value:"In order to send a message hit 'Enter' or push the button 'Send Message'"}
        )
    }, 8000)

    setTimeout(() => {
      this.sendMessage(
        { value:"In case you want to delete message just hold on a message you want to delete. And click on 'Delete' button"}
        )
    }, 12000)
    setTimeout(() => {
      this.sendMessage(
        { value:"It pops up once you selected"}
        )
    }, 14000)
  }

  sendMessage(text){
    this.store.dispatch(MessageActions.addMessage(text.value))
    text.value = null
  }

  deleteMessage(listMessages){
    this.store.dispatch(MessageActions.deleteMessage(listMessages))
  }

  onKeypress(key, input){
    if (key.key == "Enter"){
      if (input.value){
        this.sendMessage(input)
        return false
      }
    }
  }

  select(message){
    this.selectedMessages.push(message);
  }

  unselect(message){
    this.selectedMessages = this.selectedMessages.filter(function(x) {
      return x.toString() !== message.toString()
    }).map(function (x) {
        return x;
    });
  }

}
