import React from 'react';
import {Table, ButtonToolbar, Button} from 'react-bootstrap'

const Buttonset = (props) => {
  let id = props.id;

  const deleted = () => {
    props.events.deleteGood(id)
  }

  const changer = (e) => {
    props.changeGood(e, id)
  }
  return (<ButtonToolbar>
      <Button bsStyle="primary" bsSize="small" onClick={deleted}>Удалить</Button>
      <Button bsSize="small" onClick={changer}>Изменить</Button>
    </ButtonToolbar>)
}


export const GoodsTable = (props) => {
  let goods = props.goods;
  if(typeof goods === "undefined") {
    return (<div>Sorry no data here</div>)
  }

  let filterType = props.all.filter.type;
 
  if(filterType !== "all") {
    goods = goods.filter(item => item.category === filterType)
  }
  
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
                <td>{isa.retail}</td>
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