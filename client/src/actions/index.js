import fetch from 'isomorphic-fetch'
import axios from 'axios'

export const GET_GOODS = "GET_GOODS"
export const ADD_GOOD = "ADD_GOOD"
export const FILTER_GOODS = "FILTER_GOODS"
export const REQUEST_DATA = "REQUEST_DATA"
export const FETCH_POST = "FETCH_POST"


export const requestData = (data) => ({
    type: REQUEST_DATA,
    data
})


export function fetchData() {
    return function(dispatch) {
        return fetch('/data')
                .then(response => { console.log(response); return response.json()},
                error => console.log("Error occure", error))
                .then(json =>
                dispatch(requestData(json)))
    }
}

export function fetchPost() {
    const request = fetch('/data');
    // console.log(request)
    return {
        type: FETCH_POST,
        load: request
    }
}

export const getGoods = (data) => ({
    type: "GET_GOODS",
    data
})

export const addGood = (data) => {
    const res = axios({
        method: 'post',
        url: '/person',
        data: {
          category: data.category,
          goods: [
            {
                name: data.name,
                price: data.price,
                retail: data.retail
            }
          ]
        }
      })
      
      return {
            type: "ADD_GOOD",
            res
        }
}


// .then((res) => console.log(res, "GOOD"))
// Create post
export const CREATE_POST = 'CREATE_POST';
export const CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS';
export const CREATE_POST_FAILURE = 'CREATE_POST_FAILURE';
export const RESET_NEW_POST = 'RESET_NEW_POST';

export const DELETE_GOOD = 'DELETE_GOOD';
export const DELETE_GOOD_SUCCESS = 'DELETE_GOOD_SUCCESS';
export const DELETE_GOOD_FAILURE = 'DELETE_GOOD_FAILURE';
export const RESET_DELETED_GOOD = 'RESET_DELETED_GOOD';

export function createPost(data) {
    const request = axios({
        method: 'post',
        url: '/person',
        data: {
          category: data.category,
          goods: [
            {
                name: data.name,
                price: data.price,
                retail: data.retail
            }
          ]
        }
      })

      return {
          type: CREATE_POST,
          payload: request
      }
}

export function createPostSuccess(newPost) {
    return {
        type: CREATE_POST_SUCCESS,
        newPost
    }
}

export function createPostFailure(err) {
    return {
        type: CREATE_POST_FAILURE,
        err
    }
}

export function resetNewPost() {
    return {
        type: RESET_NEW_POST
    }
}
// END 

export const deleteGood = (id) => 
{
        const request = axios({
        method: 'delete',
        url: '/person',
        data: {id: id}
      })

      return {
        type: "DELETE_GOOD",
        payload: request
    }
}
export function deleteGoodSuccess(deletedGood) {
  return {
    type: DELETE_GOOD_SUCCESS,
    payload: deletedGood
  };
}

export function deleteGoodFailure(response) {
  return {
    type: DELETE_GOOD_FAILURE,
    payload: response
  };
}

export const CHANGE_GOOD = 'CHANGE_GOOD';
export const CHANGE_GOOD_SUCCESS = 'CHANGE_GOOD_SUCCESS';
export const CHANGE_GOOD_FAILURE = 'CHANGE_GOOD_FAILURE';

export const changeGood = (data) => 
{
        const request = axios({
        method: 'put',
        url: '/person',
        data: {...data}
      })

      return {
        type: "CHANGE_GOOD",
        payload: request
    }
}
export function changeGoodSuccess(changedGood) {
  return {
    type: CHANGE_GOOD_SUCCESS,
    payload: changedGood
  };
}

export function changeGoodFailure(response) {
  return {
    type: CHANGE_GOOD_FAILURE,
    payload: response
  };
}
export const filterGoods = (category) => ({
    type: "FILTER_GOODS",
    category
})

