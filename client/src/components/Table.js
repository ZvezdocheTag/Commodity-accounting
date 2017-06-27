import React, { Component } from 'react';
import {Table, ButtonToolbar, Button} from 'react-bootstrap'
import {Modale} from './Modal'
import {MWcontentForm} from './index'

const Buttonset = (props) => {
  let id = props.id;

  const handle = () => {
    // console.log(props.events)
    props.events.deleteGood(id)
  }

  const changer = (e) => {
    props.changeGood(e, id)
  }
  return (<ButtonToolbar>
      <Button bsStyle="primary" bsSize="small" onClick={handle}>Удалить</Button>
      <Button bsSize="small" onClick={changer}>Изменить</Button>
    </ButtonToolbar>)
}


export const GoodsTable = (props) => {
  // console.log(props.events)
  let goods = props.goods;
  if(typeof goods === "undefined") {
    return (<div>Sorry no data here</div>)
  }
  if(props.all.newGood.length) {
    goods= goods.concat(props.all.newGood)
  }
  // goods = goods.filter((item, i) )
  // if(props.all.deletedPost.post !== null) {
  //   goods = goods.filter(item => item._id !== props.all.deletedPost.post )
  // }

  // console.log(goods)
  return (
  <Table striped bordered condensed hover>
    <thead>
      <tr>
        <th>ID</th>
        <th>Название товара</th>
        <th>Цена (Закупочная)</th>
        <th>Цена</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {
        goods.map((item, i) => 
        {
          const isa = item.goods[0];
        return (
          <tr key={i}>
            <td title={item._id} data-id={item._id}>{`${item._id.slice(-2)}`}</td>
            <td>{isa.name}</td>
            <td>{isa.price}</td>
            <td>{isa.retailPrice}</td>
            <td>
                <Buttonset id={item._id} events={props.events} changeGood={props.changeGoodsHandle}/>
            </td>
          </tr>
        )
        })
      }

    </tbody>
  </Table>
);
}