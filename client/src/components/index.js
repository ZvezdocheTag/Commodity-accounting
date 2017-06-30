import React from 'react';
import {Grid, Row, Col, ButtonToolbar, Button } from 'react-bootstrap'
import {Logo} from './Logo/'
import {GoodsTable} from './Table'
import {List} from './Category'
import {MWcontentForm, MWcontentText, MWcontentFormShort, Modale } from './Modals'

const SwitcherModalContent = (props) => {
  switch(props.type) {
    case "ADD_GOOD":
        return (<MWcontentForm 
                 anoter={props.anoter} 
                 close={props.close}
                 categories={props.categories}
                 valuesInput={props.valuesInput !== null ? props.valuesInput : false}/>)
    case "DELETE_GOOD":
        return (<MWcontentText 
                 anoter={props.anoter} 
                 close={props.close}
                 type={props.type}
                 id={props.goodId}
                 categories={props.categories}
                 valuesInput={props.valuesInput !== null ? props.valuesInput : false}/>)
    case "DELETE_CATEGORY":
        return (<MWcontentText 
                 anoter={props.anoter} 
                 close={props.close}
                 type={props.type}
                 id={props.categoryId}
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
      eventType: "default",
      goodId: 0,
      categoryId:0
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

  deleteGood(e, id) {
    this.setState({ showModal: true, formType: this.props.category.deleteGood, eventType: "DELETE_GOOD", goodId: id})
  }

  deleteCategory(e, id) {
    this.setState({ showModal: true, formType: this.props.category.deleteCategory, eventType: "DELETE_CATEGORY", categoryId: id})
  }

  addCategory(e) {
    this.setState({ showModal: true, formType: this.props.category.createCategory, eventType: "ADD_CATEGORY"  })
  }

  changeGoods(e, id) {
    let currentItem = this.props.category.goodies.good.filter(item => item._id === id);
    this.setState({ showModal: true, formType: this.props.category.changeGood, modalValue: currentItem, eventType: "CHANGE_GOODS"  })
  }

  render() {
    let category = this.props.category.goodies.categoryNew;

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
                        <List
                           categories={category} 
                           evDelete={this.deleteCategory.bind(this)}
                           eventDelete={this.props.category.deleteCategory} 
                           eventFilter={this.props.category.filterGoods}/>
                    </Col>
                    <Col xs={12} md={9} className="content">
                        <GoodsTable 
                        deletGoodHandle={this.deleteGood.bind(this)}
                        goods={this.props.category.goodies.good}
                        events={this.props.category} 
                        close={this.close.bind(this)}
                        all={this.props.category.goodies} 
                        changeGoodsHandle={this.changeGoods.bind(this)}/>
                    </Col>
                </Row>
              </div>
            </Grid>
            <Modale close={
                this.close.bind(this)} 
                showModal={this.state.showModal}
                title={this.state.eventType}>
              <SwitcherModalContent 
                 type={this.state.eventType}
                 anoter={this.state.formType} 
                 categories={category}
                 goodId={this.state.goodId}
                 categoryId={this.state.categoryId}
                 close={this.close.bind(this)}
                 valuesInput={this.state.modalValue !== null ? this.state.modalValue : false}/>
            </Modale> 
        </div>
    
  }
}