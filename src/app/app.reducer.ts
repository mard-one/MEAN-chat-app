import { ActionReducer, Action } from '@ngrx/store';
import { ADD_MESSAGE, DELETE_MESSAGE } from './app.actions';


export function AppReducer(state:string[] = [], action){
  switch(action.type){
    case ADD_MESSAGE:
      return [...state, action.payload.message]
    case DELETE_MESSAGE:
      state = state.filter((stateMessage) => {
        return !(action.payload.message.includes(stateMessage))
      })
      return state
    default:
      return state
  }
}
