import React, { Component } from 'react';
import {Table, ButtonToolbar, Button} from 'react-bootstrap'

const Buttonset = () => (    <ButtonToolbar>
      <Button bsStyle="primary" bsSize="small">Small button</Button>
      <Button bsSize="small">Small button</Button>
    </ButtonToolbar>)


export const GoodsTable = (props) => {
  let goods = props.goods;
  console.log(props.all, "ALL")
  if(typeof goods === "undefined") {
    return (<div>Sorry no data here</div>)
  }
  if(props.all.newGood.length) {
    // goods= goods.concat(props.all.newGood)
  }
  console.log(goods)
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
          console.log(isa)
        return (
          <tr key={i}>
            <td data-id={typeof item._id === "undefine" ? i : item._id}>{`${i}`}</td>
            <td>{isa.name}</td>
            <td>{isa.price}</td>
            <td>{isa.retailPrice}</td>
            <td>
                <Buttonset />
            </td>
          </tr>
        )
        })
      }

    </tbody>
  </Table>
);
}