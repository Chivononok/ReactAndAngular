import React from 'react';
import PropTypes from 'prop-types';

import './ItemCardComponent.css';

class ItemCardComponent extends React.Component{
    static PropTypes = {
        nameItem: PropTypes.string.isRequired,
        priceItem: PropTypes.number.isRequired,
        imgPathItem: PropTypes.string.isRequired,
        itemsInStorage: PropTypes.number.isRequired,
        type: PropTypes.number.isRequired,  //1 - добавление нового, 2 -редактирование
    }

    getHeader = () =>{
        if(this.props.type == 1){
            return "Добавление нового товара";
        }else if(this.props.type == 2){
            return "Редактирование товара " + this.props.nameItem;
        }
    }

    render(){
        return (
            <div>
                <h1>{this.getHeader()}</h1>
                <label className='ItemCardComponent' >Name:
                    <input type='text' value={this.props.nameItem}></input>
                </label> 
                <label className='ItemCardComponent'>Price:
                    <input type='text' value={this.props.priceItem}></input>
                </label> 
                <label className='ItemCardComponent'>imgPath:
                    <input type='text' value={this.props.imgPathItem}></input>
                </label>
                <label className='ItemCardComponent'>Count:
                    <input type='text' value={this.props.itemsInStorage}></input>
                </label>
            </div>
        )
    }
}

export default ItemCardComponent;