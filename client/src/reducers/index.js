import { combineReducers } from 'redux'
import update from 'immutability-helper'


import {GET_GOODS,
ADD_GOOD,
CHANGE_GOOD,
DELETE_GOOD,
FILTER_GOODS,
REQUEST_DATA,
FETCH_POST} from '../actions'


const goodies = (state = {newGood: []}, action) => {
  console.log(action.type, "TYPE")
  switch (action.type) {
    case FETCH_POST:
      return update(state, {load: {$set: action.load}})
    case REQUEST_DATA:   
      return update(state, {good: {$set: action.data}})
    case ADD_GOOD:
     
      // let current = []
      // if(typeof state.newGood === "undefined") {
      //   state.newGood = []
      // }
       console.log("NEW GOOD", state.newGood)
      return update(state, {newGood: {$push: [action.data]}})
    default:
      return state
  }
}


export const rootReducer = combineReducers({
  goodies
})