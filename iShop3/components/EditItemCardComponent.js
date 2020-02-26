import React from 'react';
import PropTypes from 'prop-types';

import './EditItemCardComponent.css';

class EditItemCardComponent extends React.Component{
    static PropTypes = {
        //=== запись для редактирования ===
        editItem: PropTypes.shape({
            nameItem: PropTypes.string,
            priceItem: PropTypes.number,
            imgPathItem: PropTypes.string,
            itemsInStorage: PropTypes.number,
        }),
        //==================================
        id: PropTypes.number    //номер записи при добавлении
    }

    getHeader = () =>{
        if(this.props.editItem){
            return "Редактирование товара " + editItem.nameItem;
        }else {
            return "Добавление нового товара";
        }
    }

    render(){
        var header = this.getHeader();
        if(this.props.editItem){
            return (
                <div>
                    <h1>{header}</h1>
                    <label className='ShowItemCardComponent'>Name: 
                        <input type='text'>{this.props.nameItem}</input>
                    </label> 
                    <label className='ShowItemCardComponent'>Price: {this.props.priceItem}
                        <input type='text'>{this.props.nameItem}</input>
                    </label> 
                    <label className='ShowItemCardComponent'>imgPath: {this.props.imgPathItem}
                        <input type='text'>{this.props.nameItem}</input>
                    </label>
                    <label className='ShowItemCardComponent'>Count: {this.props.itemsInStorage}
                        <input type='text'>{this.props.nameItem}</input>
                    </label>
                </div>
            )
        }else{
            return(
                <div>
                    <h1>{header}</h1>
                    <label className='ShowItemCardComponent'>Id: {this.props.id}</label>
                    <label className='ShowItemCardComponent'>Name: 
                        <input type='text'></input>
                    </label> 
                    <label className='ShowItemCardComponent'>Price: 
                        <input type='text'></input>
                    </label> 
                    <label className='ShowItemCardComponent'>imgPath: 
                        <input type='text'></input>
                    </label>
                    <label className='ShowItemCardComponent'>Count: 
                        <input type='text'></input>
                    </label>
                </div>
            )
        }
    }
}

export default EditItemCardComponent;