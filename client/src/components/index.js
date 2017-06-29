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
              <FormControl componentClass="select" name="category"  placeholder="select" defaultValue="Без категории">
                {/*<option value="Без категории" >{item.categoryName}</option>*/}
                {props.categories.map((item, i) => 
                  <option value={item.categoryName} key={i}>{item.categoryName}</option>)
                }
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

export const MWcontentFormShort = (props) => {
  let actionValue = (e) => {
    e.preventDefault();
    let name = e.target.querySelector('[name="name"]').value;

    let data = {
      categoryName: name
    }

    props.anoter(data)
  }
  return (
    <div>
      <form onSubmit={actionValue} >
            <FormGroup> 
              <FormControl type="text" name="name" placeholder="Enter text" />
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

const SwitcherModalContent = (props) => {
  switch(props.type) {
    case "ADD_GOOD":
        return (<MWcontentForm 
                 anoter={props.anoter} 
                 close={props.close}
                 categories={props.categories}
                 valuesInput={props.valuesInput !== null ? props.valuesInput : false}/>)
    case "ADD_CATEGORY":
        return (<MWcontentFormShort 
                 anoter={props.anoter} 
                 close={props.close}
                 valuesInput={props.valuesInput !== null ? props.valuesInput : false}/>)
    case "CHANGE_GOODS":
        return (<MWcontentForm 
                 anoter={props.anoter} 
                 close={props.close}
                 categories={props.categories}
                 valuesInput={props.valuesInput !== null ? props.valuesInput : false}/>)
    default:
      return (<div>Modal empty!</div>)
  }             
}

export class Layout extends React.Component {
  constructor() {
    super()
    this.state = {
      showModal: false,
      formType: false,
      modalValue: null,
      eventType: "default"
    }
  }

  close() {
    this.setState({ showModal: false, formType: false, modalValue: null, eventType: "default" });
  }

  open() {
    this.setState({ showModal: true });
  }

  addGoods(e) {
    this.setState({ showModal: true, formType: this.props.category.createPost, eventType: "ADD_GOOD" })
  }

  addCategory(e) {
    console.log(this.props.category)
    this.setState({ showModal: true, formType: this.props.category.createCategory, eventType: "ADD_CATEGORY"  })
  }

  changeGoods(e, id) {
    let currentItem = this.props.category.goodies.good.filter(item => item._id === id);
    this.setState({ showModal: true, formType: this.props.category.changeGood, modalValue: currentItem, eventType: "CHANGE_GOODS"  })
  }

  render() {
    let category = this.props.category.goodies.categoryNew;
    console.log(this, "INN COMPONENT")
    console.log(category, "INN category")

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
                          <Button href="#" onClick={this.addCategory.bind(this)}>Добавить категорию</Button>
                        </ButtonToolbar>
                    </Col>
                </Row>
              </div>
              <div className="main">
                <Row>
                    <Col xs={12} md={3} className="aside">
                        <List categories={category} eventDelete={this.props.category.deleteCategory} eventFilter={this.props.category.filterGoods}/>
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
              <SwitcherModalContent 
                 type={this.state.eventType}
                 anoter={this.state.formType} 
                 categories={category}
                 close={this.close.bind(this)}
                 valuesInput={this.state.modalValue !== null ? this.state.modalValue : false}/>
            </Modale> 
        </div>
    
  }
}