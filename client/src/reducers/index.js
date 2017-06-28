import { combineReducers } from 'redux'
import update from 'immutability-helper'


import {
ADD_GOOD,
REQUEST_DATA,
FETCH_POST, CREATE_POST, CREATE_POST_SUCCESS, CREATE_POST_FAILURE, RESET_NEW_POST,
DELETE_GOOD, DELETE_GOOD_SUCCESS, DELETE_GOOD_FAILURE,
CHANGE_GOOD,
CHANGE_GOOD_SUCCESS,
CHANGE_GOOD_FAILURE,
} from '../actions'

const INITIAL = {newGood: [], posts: [],
   newPost:{post:null, error: null, loading: false},
    deletedPost: {post: null, error:null, loading: false},
    changePost: {post: null, error: null, loading: false}}
const goodies = (state = INITIAL, action) => {
  let error;
  switch (action.type) {
    case FETCH_POST:
      return update(state, {load: {$set: action.load}})
    case REQUEST_DATA:   
      return update(state, {good: {$set: action.data}})
    case ADD_GOOD:
      console.log("add,go")
      return update(state, {good: {$push: [action.data]}})
    case CREATE_POST:
      console.log("CREATE_POST,go", action, ...state.newPost)
      return {...state, newPost: {...state.newPost, loading: true}}
    case CREATE_POST_SUCCESS:
      console.log("CREATE_POST_SUCCESS,go", action)
      return update(state, {good: {$push: [action.newPost]}})
    case CREATE_POST_FAILURE:
       console.log("CREATE_POST_FAILURE,go",  action)
      error = action.payload || {message: action.payload.message}
      return {...state, newPost: {post: null, error: error, loading: false}}
    case RESET_NEW_POST:
      return {...state, newPost: {post: null, error: null, loading: false}}

    case DELETE_GOOD:
      return {...state, deletedPost: {...state.deletedPost, loading: true}}
    case DELETE_GOOD_SUCCESS:
      let filter = state.good.filter(item => item._id !== action.payload);
      return update(state, {good: {$set: filter}})
    case DELETE_GOOD_FAILURE:
      error = action.payload || {message: action.payload.message};//2nd one is network or server down errors
      return {...state, deletedPost: {post:null, error:error, loading: false}}   

    case CHANGE_GOOD:
      return {...state, changePost: {...state.changePost, loading: true}}
    case CHANGE_GOOD_SUCCESS:
      
      // let some = state.good;
      let filterCategory = state.good.map(item => {
        console.log(item, action.payload)
        if(item._id === action.payload._id) {
          item.goods[0] = action.payload
        } 
        return item;
      })
      console.log(filterCategory, "REDUCER")
      return update(state, {good: {$set: state.good}})
    case CHANGE_GOOD_FAILURE:
      return state;
    default:
      return state
  }
}


export const rootReducer = combineReducers({
  goodies
})