import fetch from 'isomorphic-fetch'

export const GET_GOODS = "GET_GOODS"
export const ADD_GOOD = "ADD_GOOD"
export const CHANGE_GOOD = "CHANGE_GOOD"
export const DELETE_GOOD = "ADD_GOOD"
export const FILTER_GOODS = "FILTER_GOODS"
export const REQUEST_DATA = "REQUEST_DATA"

export const requestData = (data) => ({
    type: "REQUEST_DATA",
    data
})


export function fetchData() {
    return function(dispatch) {
        return fetch('testdata.json')
                .then(response => response.json(),
                error => console.log("Error occure", error))
                .then(json =>
                dispatch(requestData(json)))
    }
}

export const getGoods = (data) => ({
    type: "GET_GOODS",
    data
})

export const addGood = (data) => ({
    type: "ADD_GOODS",
    data
})

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

const GET_CATEGORY = "GET_CATEGORY"
const ADD_CATEGORY = "ADD_CATEGORY"
const DELETE_CATEGORY = "DELETE_CATEGORY"

export const getCategory = (data) => ({
    type: "GET_CATEGORY",
    data
})

export const addCategory = (data) => ({
    type: "ADD_CATEGORY",
    data
})

export const deleteCategory = (id) => ({
    type: "DELETE_CATEGORY",
    id
})
