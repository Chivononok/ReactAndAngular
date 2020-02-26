import React from 'react';
import PropTypes from 'prop-types';

import './iShopComponent.css';

import ItemComponent from './ItemComponent';
import ShowItemCardComponent from './ShowItemCardComponent';
import EditItemCardComponent from './EditItemCardComponent';

class IShopComponent extends React.Component {
    static PropTypes = {
        shopName: PropTypes.string.isRequired,
        items: PropTypes.arrayOf(PropTypes.shape())
    };

    state = {
        shopItems: this.props.items,
        selectedItemName: null,
        selectedItem: null,
        actionType: 1,
        isEdit: false,  //редактируется ли в данный момент запись
    }

    itemSelected = (itemName) => {
        //ф-ция вызывается при клике на строку таблицы, выделяет/снимает_выделение со строки и отображает/прячет карточку товара
        if (this.state.selectedItemName==itemName) {
            //повторный клик по выделенной записи снимаает выделение
            this.setState({selectedItemName: null});
            this.setState({selectedItem: null});
        } else {
            this.setState({selectedItemName: itemName});
            var selItem = this.getItemByItemName(itemName);
            this.setState({selectedItem: selItem});
        }
    }

    ask4delete = (itemName) => {
        //ф-ция вызывается при нажатии кнопки Удалить
        var res = confirm("Вы уверены, что хотите удалить запись " + itemName + "?");
        if (res) {
            if(this.state.selectedItem){
                if(this.state.selectedItem.nameItem == itemName){
                    this.setState({selectedItem: null});
                }
            }
            var tmpArr = this.state.shopItems.filter(v => v.nameItem != itemName);
            this.setState({shopItems: tmpArr});
        }
    }

    getItemByItemName = (itemName) => {
        //ф-ция возвращает хэш с описанием товара по его имени
        var tmpArr = this.state.shopItems.filter(v => v.nameItem == itemName);
        return tmpArr[0];
    }

    editItem = (itemName) => {
        //ф-ция переводит/убирает режим редактирования карточки
        if(this.state.isEdit){
            this.setState({isEdit: false});
            this.setState({selectedItem: null});
        }else{
            this.setState({isEdit: true})
            var selItem = this.getItemByItemName(itemName);
            this.setState({selectedItem: selItem});
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
                cbEditItem = {this.editItem}
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
                <input type='button' value='Новый'></input>
                {
                    (this.state.selectedItem) && (this.state.isEdit == false) &&
                    <ShowItemCardComponent
                        nameItem = {this.state.selectedItem.nameItem}
                        priceItem = {this.state.selectedItem.priceItem}
                        imgPathItem = {this.state.selectedItem.imgPathItem}
                        itemsInStorage = {this.state.selectedItem.itemsInStorage}
                        type = {this.state.actionType}
                    />
                }
                {
                    (this.state.isEdit) &&
                    <EditItemCardComponent
                        editItem = {this.state.selectedItem}
                    />
                }
            </div>
        )
    }
}

export default IShopComponent;