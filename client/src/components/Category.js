import React from 'react';


const Item = (props) => {

    const handleDelete = (e) => {
        // props.eventDelete(props.id)
        props.evDelete(e, props.id)
        if(props.category.length === 1) {
            props.eventFilter("all")
        }
    }

    const handleFilter = (e) => {
        props.eventFilter(props.title)
    }

    return (<li className="category-list__item category-item">
    <a className="category-item__delete" href="#" onClick={handleDelete}>x</a>
    <a className="category-item__link" href={`#${props.title}`} onClick={handleFilter}>{props.title}</a>
</li>)
}

export const List = (props) => {

    if(typeof props.categories !== "undefined") {
        return (
            <ul className="category-list">
                {
                    props.categories.map((item,i) => 
                        <Item title={item.categoryName}
                         key={i}
                        id={item._id}
                        category={props.categories}
                        evDelete={props.evDelete}
                        eventDelete={props.eventDelete}
                        eventFilter={props.eventFilter}/>)
                }
            </ul>
        )
    } else {
        return (
            <ul className="category-list">
                <li>Loading...</li>
            </ul>
        )  
    }
}