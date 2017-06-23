const GET_GOODS = "GET_GOODS"
const ADD_GOOD = "ADD_GOOD"
const CHANGE_GOOD = "CHANGE_GOOD"
const DELETE_GOOD = "ADD_GOOD"
const FILTER_GOODS = "FILTER_GOODS"

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

export const deleteCategory = (data) => ({
    type: "DELETE_CATEGORY",
    id
})
