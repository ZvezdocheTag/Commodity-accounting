import fetch from 'isomorphic-fetch'
import axios from 'axios'

export const GET_GOODS = "GET_GOODS"
export const ADD_GOOD = "ADD_GOOD"
export const CHANGE_GOOD = "CHANGE_GOOD"
export const DELETE_GOOD = "ADD_GOOD"
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
      .then(function (response) {
        console.log(response, "GO");
      })
      .catch(function (error) {
        console.log(error);
      });

      console.log(res, "WNY")
      console.log(data, "SUO")
      return {
            type: "ADD_GOOD",
            data
        }
}



export const changeGood = (id) => ({
    type: "CHANGE_GOODS",
    id
})

export const deleteGood = (id) => ({
    type: "DELETE_GOODS",
    id
})

export const filterGoods = (category) => ({
    type: "DELETE_GOODS",
    category
})

