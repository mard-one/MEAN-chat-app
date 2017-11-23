import { ActionReducer, Action } from '@ngrx/store';
import { ADD_MESSAGE, DELETE_MESSAGE } from './app.actions';


export function AppReducer(state:string[] = ['welcome'], action){
  switch(action.type){
    case ADD_MESSAGE:
      return [...state, action.payload.message]
      // state.forEach((i)=>{console.log(Object.keys(i).map(on=>{console.log(i[on])}))});
      // [...state, {message: action.payload.message, id: action.payload.id}];
    case DELETE_MESSAGE:
      return state
    default:
      return state
  }
}
