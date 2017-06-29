import { combineReducers } from 'redux'
import update from 'immutability-helper'
import {GET_GOODS,
  FILTER_GOODS,
  REQUEST_CATEGORY,REQUEST_DATA,
  CREATE_POST, CREATE_POST_SUCCESS, CREATE_POST_FAILURE,
  CREATE_CATEGORY, CREATE_CATEGORY_SUCCESS, CREATE_CATEGORY_FAILURE,
  RESET_NEW_POST,
  DELETE_GOOD, DELETE_GOOD_SUCCESS, DELETE_GOOD_FAILURE,
  DELETE_CATEGORY, DELETE_CATEGORY_SUCCESS, DELETE_CATEGORY_FAILURE,
  CHANGE_GOOD, CHANGE_GOOD_SUCCESS, CHANGE_GOOD_FAILURE,
} from '../constant'

const hash = window.location.hash;
const filterURL = hash.length > 1 ? hash.slice(1, hash.length) : "all"
const INITIAL = {newGood: [], posts: [],
    filter: {
      type: filterURL,
      goods: []
    },
    categoryNew: [],
    newPost:{post:null, error: null, loading: false},
    newCategory:{post:null, error: null, loading: false},
    deletedPost: {post: null, error:null, loading: false},
    deletedCategory: {post: null, error:null, loading: false},
    changePost: {post: null, error: null, loading: false}}
    
const goodies = (state = INITIAL, action) => {
  let error;
  switch (action.type) {
    
    case REQUEST_DATA:
      return update(state, {good: {$set: action.data}})
    case REQUEST_CATEGORY:  
      return update(state, {categoryNew: {$set: action.data}})
    case CREATE_POST:
      return {...state, newPost: {...state.newPost, loading: true}}
    case CREATE_POST_SUCCESS:
      return update(state, {good: {$push: [action.newPost]}})
    case CREATE_POST_FAILURE:
      error = action.payload || {message: action.payload.message}
      return {...state, newPost: {post: null, error: error, loading: false}}

    case FILTER_GOODS:
      return update(state, {
        filter : {
          type: {$set: action.category}
        }
      })

    case CREATE_CATEGORY:
      return {...state, newCategory: {...state.newPost, loading: true}}
    case CREATE_CATEGORY_SUCCESS:
      return update(state, {categoryNew: {$push: [action.newPost]}})
    case CREATE_CATEGORY_FAILURE:
      error = action.payload || {message: action.payload.message}
      return {...state, newCategory: {post: null, error: error, loading: false}}
      
    case RESET_NEW_POST:
      return {...state, newPost: {post: null, error: null, loading: false}}

    case DELETE_GOOD:
      return {...state, deletedPost: {...state.deletedPost, loading: true}}
    case DELETE_GOOD_SUCCESS:
      let filter = state.good.filter(item => item._id !== action.payload);
      return update(state, {good: {$set: filter}})
    case DELETE_GOOD_FAILURE:
      error = action.payload || {message: action.payload.message};
      return {...state, deletedPost: {post:null, error:error, loading: false}}   
      
    case DELETE_CATEGORY:
      return {...state, deletedCategory: {...state.deletedCategory, loading: true}}
    case DELETE_CATEGORY_SUCCESS:

      let filterCategoryA = state.categoryNew.filter(item => item._id !== action.payload);
      return update(state, {categoryNew: {$set: filterCategoryA}})
    case DELETE_CATEGORY_FAILURE:
      error = action.payload || {message: action.payload.message};
      return {...state, deletedCategory: {post:null, error:error, loading: false}}   

    case CHANGE_GOOD:
      return {...state, changePost: {...state.changePost, loading: true}}
    case CHANGE_GOOD_SUCCESS:
      let filterCategory = state.good.map(item => {
        if(item._id === action.payload._id) {
          item.goods[0] = action.payload
        } 
        return item;
      })
      return update(state, {good: {$set: filterCategory}})
    case CHANGE_GOOD_FAILURE:
      return state;
    default:
      return state
  }
}

export const rootReducer = combineReducers({
  goodies
})