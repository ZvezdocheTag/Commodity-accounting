import React, { Component } from 'react';
import logo from './logo.svg';
import {Layout} from './components'
import './App.css';
import {fetchPost, requestData, addGood} from './actions'
import { connect} from 'react-redux'
import { bindActionCreators } from 'redux'

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
  // console.log(dispatch, ownProps, "SOME")
  return {
    fetchPost : () => {   
      dispatch(fetchPost()).then(response => { console.log(response); return response.json()},
                error => console.log("Error occure", error))
                .then(json => dispatch(requestData(json)))
    },
    addGood: (data) => {

      dispatch(addGood(data))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

// export default App;
