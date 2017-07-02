import fetch from 'isomorphic-fetch'
import axios from 'axios'
import {
REQUEST_CATEGORY,
REQUEST_DATA,
CREATE_GOOD, CREATE_GOOD_SUCCESS, CREATE_GOOD_FAILURE,
CREATE_CATEGORY, CREATE_CATEGORY_SUCCESS, CREATE_CATEGORY_FAILURE,
RESET_NEW_POST,
FETCH_CATEGORY_NEW,
DELETE_GOOD_SUCCESS, DELETE_GOOD_FAILURE,
 DELETE_CATEGORY_SUCCESS, DELETE_CATEGORY_FAILURE,
CHANGE_GOOD_SUCCESS,
CHANGE_GOOD_FAILURE,
} from '../constant'

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
        .then(response =>  response.json()
        ,
        error => {
            console.log("Error occure", error)
            return error;
        })
        .then(json =>  dispatch(requestData(json))
        )
    }
}

export function fetchCategory() {
    return function(dispatch) {
        return fetch('/category')
        .then(response =>  response.json(),
        error => console.log("Error occure", error))
        .then(json => dispatch(requestCategory(json)))
    }
}

export const fetchCategoryNew = () => {
const request = axios({
    method: 'get',
    url: `/category`,
    headers: []
  });

  return {
    type: FETCH_CATEGORY_NEW,
    payload: request
  };
}

export const getGoods = (data) => ({
    type: "GET_GOODS",
    data
})

export const  createProduct = (data) => {
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
          type: CREATE_GOOD,
          payload: request
      }
}

export const  createProductSuccess = (newPost) => {
    return {
        type: CREATE_GOOD_SUCCESS,
        newPost
    }
}

export const  createProductFailure = (err) => {
    return {
        type: CREATE_GOOD_FAILURE,
        err
    }
}

export const  resetNewPost = () => {
    return {
        type: RESET_NEW_POST
    }
}

export const deleteGood = (id) => {
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

export const deleteGoodSuccess = (deletedGood) => {
  return {
    type: DELETE_GOOD_SUCCESS,
    payload: deletedGood
  };
}

export const deleteGoodFailure = (response) => {
  return {
    type: DELETE_GOOD_FAILURE,
    payload: response
  };
}

export const changeGood = (data) => {
    const request = axios('/person', {
        method: 'put',
        data: {...data}
    })

    return {
        type: "CHANGE_GOOD",
        payload: request
    }
}

export const changeGoodSuccess = (changedGood) => {
  return {
    type: CHANGE_GOOD_SUCCESS,
    payload: changedGood
  };
}

export const changeGoodFailure = (response) => {
  return {
    type: CHANGE_GOOD_FAILURE,
    payload: response
  };
}

export const filterGoods = (category) => ({
    type: "FILTER_GOODS",
    category
})

export const createCategory = (data) => {
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

export const createCategorySuccess = (newPost) => {
    return {
        type: CREATE_CATEGORY_SUCCESS,
        newPost
    }
}

export const createCategoryFailure = (err) => {
    return {
        type: CREATE_CATEGORY_FAILURE,
        err
    }
}

export const deleteCategory = (id) => {
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

export const deleteCategorySuccess = (deletedCategory) => {
    return {
        type: DELETE_CATEGORY_SUCCESS,
        payload: deletedCategory
    };
}

export const deleteCategoryFailure = (response) => {
    return {
        type: DELETE_CATEGORY_FAILURE,
        payload: response
    };
}