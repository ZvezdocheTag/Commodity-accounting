import React, { Component } from 'react';
import {Layout} from './components'
import './App.css';
import {fetchPost, requestData, addGood, createPost,
        createPostSuccess, createPostFailure, 
        deleteGood , deleteGoodSuccess, deleteGoodFailure, 
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
    fetchPost : () => {   
      dispatch(fetchPost()).then(response => {return response.json()},
                error => console.log("Error occure", error))
                .then(json => dispatch(requestData(json)))
    },
    addGood: (data) => {
      dispatch(addGood(data))
    },
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
    deleteGood: (id) => {
      dispatch(deleteGood(id)).payload.then(res => {
        if(res.status !== 200) {
          dispatch(deleteGoodFailure(res));
          throw res.data;
        } else {
          dispatch(deleteGoodSuccess(id));
        }  
      })
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
