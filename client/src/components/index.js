import React from 'react';

import {Grid, Row, Col, ButtonToolbar, Button,FormGroup, FormControl } from 'react-bootstrap'
import {Logo} from './Logo/'
import {GoodsTable} from './Table'
import {List} from './Category'
import {Modale} from './Modal'



export const MWcontentForm = (props) => {
  let actionValue = (e) => {
      e.preventDefault();
      let category = e.target.querySelector('[name="category"]').value;
      let name = e.target.querySelector('[name="name"]').value;
      let price = e.target.querySelector('[name="price"]').value;
      let retail = e.target.querySelector('[name="retail"]').value;

      let generateId = (Math.random() * (1000 - 1) + 1) * (Math.random() * (10 - 1) + 1)
      let data = {
          name: name,
          category: category,
          price: price,
          retail: retail,
          id: Math.round(generateId)
      }

      if(props.valuesInput !== false) {
        data = {...data, _id: props.valuesInput[0]._id }
      }

      props.anoter(data)
  }

  
  let {name, price, retail} = "";
  let po;
  if(props.valuesInput !== false) {
    po = props.valuesInput[0].goods[0];
    name = po.name;
    price = po.price;
    retail = po.retail;
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
              <FormControl type="text" name="name"  defaultValue={name} placeholder="Enter text" />
            </FormGroup>
            <FormGroup> 
              <FormControl type="text" name="price"  defaultValue={price} placeholder="Enter text" />
            </FormGroup>
            <FormGroup> 
              <FormControl type="text" name="retail"  defaultValue={retail} placeholder="Enter text" />
            </FormGroup>
            <button type="submit">Сохранить</button>
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
      formType: false,
      modalValue: null
    }
  }

  close() {
    this.setState({ showModal: false, formType: false, modalValue: null });
  }

  open() {
    this.setState({ showModal: true });
  }

  addGoods(e) {
    // console.log()
    
    this.setState({ showModal: true, formType: this.props.category.createPost })
  }

  changeGoods(e, id) {
    // console.log(e, id)
    let currentItem = this.props.category.goodies.good.filter(item => item._id === id);
    // console.log(currentItem)
    this.setState({ showModal: true, formType: this.props.category.changeGood, modalValue: currentItem })
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
                        <GoodsTable 
                        goods={this.props.category.goodies.good}
                        events={this.props.category} 
                        all={this.props.category.goodies} 
                        changeGoodsHandle={this.changeGoods.bind(this)}/>
                    </Col>
                </Row>
              </div>
            </Grid>
            <Modale close={this.close.bind(this)} showModal={this.state.showModal}>
               <MWcontentForm 
                 anoter={this.state.formType} 
                 close={this.close.bind(this)}
                 valuesInput={this.state.modalValue !== null ? this.state.modalValue : false  }/>
            </Modale> 
        </div>
    
  }
}