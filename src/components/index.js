import React from 'react';
import ReactDOM from 'react-dom';

import {Grid, Row, Col, ButtonToolbar, Button, Modal, OverlayTrigger, Popover, Tooltip, FormGroup, FormControl } from 'react-bootstrap'
import {Logo} from './Logo/'
import {GoodsTable} from './Table'
import {List} from './Category'
import {Modale} from './Modal'


const MWcontentForm = () => {
  return (
    <div>
      <form>
            <FormGroup> 
              <FormControl componentClass="select" placeholder="select">
                <option value="select">select</option>
                <option value="other">...</option>
              </FormControl>   
            </FormGroup>
            <FormGroup> 
              <FormControl type="text" placeholder="Enter text" />
            </FormGroup>
            <FormGroup> 
              <FormControl type="text" placeholder="Enter text" />
            </FormGroup>
            <FormGroup> 
              <FormControl type="text" placeholder="Enter text" />
            </FormGroup>
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
                        <GoodsTable />
                    </Col>
                </Row>
              </div>
            </Grid>
            <Modale close={this.close.bind(this)} showModal={this.state.showModal}>
              {this.state.formType ? <MWcontentForm /> : <MWcontentText /> }
            </Modale> 
        </div>
    
}
}