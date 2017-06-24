import React, { Component } from 'react';
import logo from './logo.svg';
import {Layout} from './components'
import './App.css';
import {fetchData} from './actions'
import { connect} from 'react-redux'


// store.dispatch(fetchData()).then(() => console.log(store.getState()))

class App extends Component {
  componentDidMount() {
    // console.log(this)
    // console.log(this.props.fetchData().then(() => console.log()) , "INNER")
  }
  render() {
    
    return (
      <div className="App">
        <Layout category={this.props.goodies}/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state
}

// const mapDispatchToProps = dispatch => {
//   return {
//     fetchData : () => dispatch(fetchData())
//   }
// }

export default connect(
  mapStateToProps,
  // mapDispatchToProps
)(App)

// export default App;
