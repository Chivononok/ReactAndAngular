import React from 'react';
import PropTypes from 'prop-types';

import './iShopComponent.css';

import ItemComponent from './ItemComponent';

class IShopComponent extends React.Component {
    static PropTypes = {
        shopName: PropTypes.string.isRequired,
        items: PropTypes.arrayOf(PropTypes.shape())
    };

    state = {
        shopItems: this.props.items,
        selectedItemName: null,
    }

    itemSelected = (itemName) => {
        //ф-ция вызывается при клике на строку таблицы, выделяет/снимает_выделение со строки
        if (this.state.selectedItemName==itemName) {
            //повторный клик по выделенной записи снимаает выделение
            this.setState({selectedItemName: null});
        } else {
            this.setState({selectedItemName: itemName});
        }
    }

    ask4delete = (itemName) => {
        //ф-ция вызывается при нажатии кнопки Удалить
        var res = confirm("Вы уверены, что хотите удалить запись " + itemName + "?");
        if (res) {
            var tmpArr = this.state.shopItems.filter(v => v.nameItem != itemName);
            this.setState({shopItems: tmpArr});
        }
    }

    render(){

        var tableHeaders = [];
        var tableLines = [];
             
        //=== заголовок таблицы ===
        var header = (      
        <thead>
            <tr>
              <th className={"IShopTableHeadTh"}>Название</th>
              <th className={"IShopTableHeadTh"}>Цена</th>
              <th className={"IShopTableHeadTh"}>URL картинки</th>
              <th className={"IShopTableHeadTh"}>Кол-во на складе</th>
              <th className={"IShopTableHeadTh"}>Кнопка</th>
            </tr>
        </thead>)
        tableHeaders.push(header);
        //=========================

        tableLines = this.state.shopItems.map(v => 
            <ItemComponent key={v.nameItem}
                nameItem = {v.nameItem}
                priceItem = {v.priceItem} 
                imgPathItem = {v.imgPathItem} 
                itemsInStorage = {v.itemsInStorage}
                selectedItemName = {this.state.selectedItemName}
                cbSelected = {this.itemSelected} 
                cbDeleteItem = {this.ask4delete}
            />
        );
        
        return (
            <div className='IShopComponent'>
                <h1>{this.props.shopName}</h1>
                <table>
                    {header}
                    <tbody>
                        {tableLines}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default IShopComponent;