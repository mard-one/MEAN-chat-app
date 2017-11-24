import { ActionReducer, Action } from '@ngrx/store';
import { ADD_MESSAGE, DELETE_MESSAGE } from './app.actions';


export function AppReducer(state:string[] = [], action){
  switch(action.type){
    case ADD_MESSAGE:
      console.log(state)
      return [...state, action.payload.message]
    case DELETE_MESSAGE:
      console.log("before state " + state)
      console.log("delete list " + action.payload.message)
      state = state.filter((stateMessage) => {
      // console.log(message)
      // console.log([...state])

        return !(action.payload.message.includes(stateMessage))
        // stateMessage != action.payload.message.filter((deleteMessage) => {
        //   console.log('state message '+stateMessage)
        //   console.log('delete message '+deleteMessage)
        //   return deleteMessage
        // })
      })
      console.log("after state " + state)
      // [...state]
      // action.payload.message =
      return state
    default:
      return state
  }
}
