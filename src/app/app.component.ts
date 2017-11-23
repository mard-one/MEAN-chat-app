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
  selectedMessages: string[]

  constructor(private store: Store<AppStore>){
    this.messages = store.select('messages')
  }

  sendMessage(text){
      this.store.dispatch(MessageActions.addMessage(text.value))
      text.value = null
  }

  onKeypress(key, text){
    if (key.key == "Enter"){
      this.sendMessage(text)
      return false
    }
  }

  select(message){
    // console.log(message)
    this.selectedMessages.push(message)
  }

}
