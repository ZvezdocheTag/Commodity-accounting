import React, { Component } from 'react';
import {Table, ButtonToolbar, Button} from 'react-bootstrap'

const Buttonset = () => (    <ButtonToolbar>
      <Button bsStyle="primary" bsSize="small">Small button</Button>
      <Button bsSize="small">Small button</Button>
    </ButtonToolbar>)


export const GoodsTable = (props) => {
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
      <tr>
        <td>1</td>
        <td>Mark</td>
        <td>Otto</td>
        <td>@mdo</td>
        <td>
            <Buttonset />
        </td>
      </tr>
    </tbody>
  </Table>
);
}