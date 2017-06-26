import React from 'react';
import ReactDOM from 'react-dom';

import {Grid, Row, Col, ButtonToolbar, Button, Modal, OverlayTrigger, Popover, Tooltip, FormGroup, FormControl } from 'react-bootstrap'
import {Logo} from './Logo/'
import {GoodsTable} from './Table'
import {List} from './Category'
import {Modale} from './Modal'





const MWcontentForm = (props) => {

  let actionValue = (e) => {
      let self = this;
      e.preventDefault();
    // console.log(props, e.target.value, "ACTION")
      let category = e.target.querySelector('[name="category"]').value;
      let name = e.target.querySelector('[name="name"]').value;
      let price = e.target.querySelector('[name="price"]').value;
      let retail = e.target.querySelector('[name="retail"]').value;
      // console.log(category, name, price, retail, "ACTION")
    
      props.action({
          name: name,
          category: category,
          price: price,
          retail: retail
      })
      // fetch('/person', {
      //   method: 'POST',
      //   data: {
      //     name: name,
      //     category: category,
      //     price: price,
      //     retail: retail
      //   }
      // })

      // props.action({
      //   select: 
      // })
    // dispatch(props.action.category.addGood({"SANSE": 1, "d": 2}))
  }

  return (
    <div>
      <form onSubmit={actionValue} >
            <FormGroup> 
              <FormControl componentClass="select" name="category"  placeholder="select">
                <option value="select">select</option>
                <option value="fruit">.fruit..</option>
                <option value="vegetable">..vegetable.</option>
                <option value="other">...other</option>
              </FormControl>   
            </FormGroup>
            <FormGroup> 
              <FormControl type="text" name="name"  placeholder="Enter text" />
            </FormGroup>
            <FormGroup> 
              <FormControl type="text" name="price"  placeholder="Enter text" />
            </FormGroup>
            <FormGroup> 
              <FormControl type="text" name="retail"  placeholder="Enter text" />
            </FormGroup>
            <button type="submit">Send</button>
      </form>
    </div>
  )
}

const MWcontentText = () => {
  return (
    <div>
        <p>Some text</p>  
        <ButtonToolbar>
          <Button href="#">Да</Button>
          <Button href="#">Нет</Button>
        </ButtonToolbar>
    </div>
  )
}

export class Layout extends React.Component {
  constructor() {
    super()
    this.state = {
      showModal: false,
      formType: false
    }
  }

  close() {
    this.setState({ showModal: false, formType: false  });
  }

  open() {
    this.setState({ showModal: true });
  }

  addGoods() {
    this.setState({ showModal: true, formType: true })
  }

  render() {
    console.log(this, "INN COMPONENT")
    return <div >
            <Grid>
              <div className="header">
                <Row>
                    <Col xs={12} md={3} className="header__logo">
                        <Logo></Logo>
                    </Col>
                    <Col xs={12} md={9} className="header__menu">
                        <ButtonToolbar>
                          <Button href="#" onClick={this.addGoods.bind(this)}>Добавить товар</Button>
                          <Button href="#" onClick={this.open.bind(this)}>Добавить категорию</Button>
                        </ButtonToolbar>
                    </Col>
                </Row>
              </div>
              <div className="main">
                <Row>
                    <Col xs={12} md={3} className="aside">
                        <List />
                    </Col>
                    <Col xs={12} md={9} className="content">
                        <GoodsTable goods={this.props.category.goodies.good} all={this.props.category.goodies}/>
                    </Col>
                </Row>
              </div>
            </Grid>
            <Modale close={this.close.bind(this)} showModal={this.state.showModal}>
              {this.state.formType ? <MWcontentForm action={this.props.category.addGood} /> : <MWcontentText /> }
            </Modale> 
        </div>
    
}
}