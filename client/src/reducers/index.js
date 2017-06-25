import { combineReducers } from 'redux'
import update from 'immutability-helper'

import {GET_GOODS,
ADD_GOOD,
CHANGE_GOOD,
DELETE_GOOD,
FILTER_GOODS,
REQUEST_DATA} from '../actions'

const goodies = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_DATA:
        
      return update(state, {$set: action.data})
    case ADD_GOOD:
        return update(state, {
                good: {$set: action.data}
            })
    default:
    // console.log(state, "INRE")
      return state
  }
}


export const rootReducer = combineReducers({
  goodies
})