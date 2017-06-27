import React, { Component } from 'react';
import logo from './logo.svg';
import {Layout} from './components'
import './App.css';
import {fetchPost, requestData, addGood, createPost,
   createPostSuccess, createPostFailure, resetNewPost
  ,deleteGood , deleteGoodSuccess, deleteGoodFailure, 
changeGood, changeGoodSuccess, changeGoodFailure
} from './actions'
import { connect} from 'react-redux'
import { bindActionCreators } from 'redux'

class App extends Component {
  render() {
   console.log(this, "APP")
    return (
      <div className="App">
        <Layout category={this.props}/>
      </div>
    );
  }
}



const validateCreatePost = (value, dispatch) => {
  return dispatch(createPost(value).then(result => {
    console.log(result, "SOME")
    if(result.payload.response.status !== 200) {
      console.log("LOK")
      dispatch(createPostFailure(result.payload.response.data));
    } else {
      dispatch(createPostSuccess(result.payload.data));
    }
  }))
}


const mapStateToProps = (state, ownProps) => {
  return state
}

const mapDispatchToProps = (dispatch, ownProps) => {
  // console.log(dispatch, ownProps, "SOME")
  return {
    fetchPost : () => {   
      dispatch(fetchPost()).then(response => { console.log(response, "POST GETTED"); return response.json()},
                error => console.log("Error occure", error))
                .then(json => dispatch(requestData(json)))
    },
    addGood: (data) => {
      dispatch(addGood(data))
    },
    createPost: (data) => {

      // dispatch(createPost(data))
      dispatch(createPost(data)).payload.then(res => {
        console.log(res)
        if(res.status !== 200) {
           console.log("FAIL", res)
          dispatch(createPostFailure(res.data));
          throw res;
        } else {
           console.log("LOK" , res)
          dispatch(createPostSuccess(res.data));
        }  
      })
    },
    deleteGood: (id) => {
      dispatch(deleteGood(id)).payload.then(res => {
        // console.log(res, "DELTE")
        if(res.status !== 200) {
           console.log("FAIL")
          dispatch(deleteGoodFailure(res));
          throw res.data;
        } else {
           console.log("LOK")
          //  deleteGoodSuccess
          dispatch(deleteGoodSuccess(id));
        }  
      })
    },
    changeGood: (data) => {
      dispatch(changeGood(data)).payload.then(res => {
        console.log(res, "PUTE")
        if(res.status !== 200) {
           console.log("FAIL")
          dispatch(changeGoodFailure(res.data));
          throw res.data;
        } else {
           console.log("LOK")
          //  changeGoodSuccess
          dispatch(changeGoodSuccess(res.data));
        }  
      })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

// export default App;
