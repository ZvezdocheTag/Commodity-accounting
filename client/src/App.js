import React, { Component } from 'react';
import {Layout} from './components'
import './App.css';
import {fetchPost, requestData, addGood, filterGoods,
        createPost, createPostSuccess, createPostFailure, 
        createCategory, createCategorySuccess, createCategoryFailure, 
        deleteGood , deleteGoodSuccess, deleteGoodFailure, 
        deleteCategory , deleteCategorySuccess, deleteCategoryFailure, 
        changeGood, changeGoodSuccess, changeGoodFailure
} from './actions'
import { connect} from 'react-redux'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout category={this.props}/>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return state
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    createPost: (data) => {
      dispatch(createPost(data)).payload.then(res => {
        if(res.status !== 200) {
          dispatch(createPostFailure(res.data));
          throw res;
        } else {
          dispatch(createPostSuccess(res.data));
        }  
      })
    },
    createCategory: (data) => {
      dispatch(createCategory(data)).payload.then(res => {
        if(res.status !== 200) {
          dispatch(createCategoryFailure(res.data));
          throw res;
        } else {
          console.log(res, "CREATE RES")
          dispatch(createCategorySuccess(res.data));
        }  
      })
    },
    deleteGood: (id) => {
      dispatch(deleteGood(id)).payload.then(res => {
        console.log(res, "DELTE")
        if(res.status !== 200) {
          dispatch(deleteGoodFailure(res));
          throw res.data;
        } else {
          dispatch(deleteGoodSuccess(id));
        }  
      })
    },
    deleteCategory: (id) => {
      dispatch(deleteCategory(id)).payload.then(res => {
        if(res.status !== 200) {
          dispatch(deleteCategoryFailure(res));
          throw res.data;
        } else {
          dispatch(deleteCategorySuccess(id));
        }  
      }).catch(err => {
        console.log(err, "delete")
      })
    },
    filterGoods: (category) => {
      dispatch(filterGoods(category))
    },
    changeGood: (data) => {
      dispatch(changeGood(data)).payload.then((res) => {
        if(res.status !== 200) {
          dispatch(changeGoodFailure(res.data));
          throw res.data;
        } else {
          dispatch(changeGoodSuccess(res.data));
        }  
      },
      (err) => {
          let res = err.response;
          let data;
          if(res.status === 404 && res.config.data.indexOf("_id") !== -1) {
            data = JSON.parse(res.config.data)
            dispatch(changeGoodSuccess(data));
          } else {   
            dispatch(changeGoodFailure(res.config.data));
          }
        }
      )
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
