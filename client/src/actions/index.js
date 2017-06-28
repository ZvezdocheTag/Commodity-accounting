import fetch from 'isomorphic-fetch'
import axios from 'axios'

export const REQUEST_DATA = "REQUEST_DATA"
export const REQUEST_CATEGORY = "REQUEST_CATEGORY"
export const FILTER_GOODS = "FILTER_GOODS"

// export const requestData = (data) => ({
//     type: REQUEST_DATA,
//     data
// })

export const requestData = (data) => ({
    type: REQUEST_DATA,
    data
})

export const requestCategory = (data) => ({
    type: REQUEST_CATEGORY,
    data
})

export function fetchData() {
    return function(dispatch) {
        return fetch('/data')
                .then(response => { console.log(response, "SOME"); return response.json()},
                error => console.log("Error occure", error))
                .then(json =>  {
                    console.log(json, "FETCH ")
                    return dispatch(requestData(json))
                })

    }
}

export function fetchCategory() {
    return function(dispatch) {
        return fetch('/category')
                .then(response => { console.log(response); return response.json()},
                error => console.log("Error occure", error))
                .then(json =>
                dispatch(requestCategory(json)))
    }
}


export const getGoods = (data) => ({
    type: "GET_GOODS",
    data
})

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
                retail: data.retail,
                id: data.id
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

export const changeGood = (data) => {
    const request = axios('/person', {
        method: 'PUT',
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


export const CREATE_CATEGORY = 'CREATE_CATEGORY';
export const CREATE_CATEGORY_SUCCESS = 'CREATE_CATEGORY_SUCCESS';
export const CREATE_CATEGORY_FAILURE = 'CREATE_CATEGORY_FAILURE';

export function createCategory(data) {
    const request = axios({
        method: 'post',
        url: '/category',
        data: {
          categoryName: data.categoryName,
        }
      })

      return {
          type: CREATE_CATEGORY,
          payload: request
      }
}

export function createCategorySuccess(newPost) {
    return {
        type: CREATE_CATEGORY_SUCCESS,
        newPost
    }
}

export function createCategoryFailure(err) {
    return {
        type: CREATE_CATEGORY_FAILURE,
        err
    }
}

export const DELETE_CATEGORY = 'DELETE_CATEGORY';
export const DELETE_CATEGORY_SUCCESS = 'DELETE_CATEGORY_SUCCESS';
export const DELETE_CATEGORY_FAILURE = 'DELETE_CATEGORY_FAILURE';

export const deleteCategory = (id) => 
{
        const request = axios({
        method: 'delete',
        url: '/category',
        data: {id: id}
      })

      return {
        type: "DELETE_CATEGORY",
        payload: request
    }
}
export function deleteCategorySuccess(deletedCategory) {
  return {
    type: DELETE_CATEGORY_SUCCESS,
    payload: deletedCategory
  };
}

export function deleteCategoryFailure(response) {
  return {
    type: DELETE_CATEGORY_FAILURE,
    payload: response
  };
}