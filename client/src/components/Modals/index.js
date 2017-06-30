import React from 'react';

import { ButtonToolbar, Button,FormGroup, FormControl, Modal } from 'react-bootstrap'

export const Modale = (props) => {

  let title = "Заголовок";

  switch(props.title) {
    case "ADD_GOOD":
        title = "Добавить товар"
        break;
    case "DELETE_GOOD":
        title = "Удалить товар"
        break;
    case "DELETE_CATEGORY":
        title = "Удалить категорию"
        break;
    case "ADD_CATEGORY":
        title = "Добавить категорию"
        break;
    case "CHANGE_GOODS":
        title = "Изменить товар"
        break;
    default:
      break;
  }

  return (
        <Modal show={props.showModal} onHide={props.close}>
          <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              {props.children}
          </Modal.Body>
        </Modal>
  )
}

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

  
  let {name, price, retail, category} = "";
  let po;
  if(props.valuesInput !== false) {
    po = props.valuesInput[0].goods[0];
    name = po.name;
    price = po.price;
    retail = po.retail;
    category = po.category;
  }

  return (

    <div>
      <form onSubmit={actionValue} >
            <FormGroup> 
              <FormControl componentClass="select" name="category"  placeholder="select">
                <option value="Без категории" >Без категории</option>
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

export const MWcontentText = (props) => {
  let text = props.type === "DELETE_GOOD" 
    ? `Точно удалить товар id${props.id}`
    : `Все товары в этой категории будут помечены "Без категории"`

  let handle = (e) => {
    props.anoter(props.id)
    props.close()
  }

  return (
    <div>
        <p>{text}</p>  
        <ButtonToolbar>
          <Button href="#" onClick={handle}>Да</Button>
          <Button href="#" onClick={props.close}>Нет</Button>
        </ButtonToolbar>
    </div>
  )
}

