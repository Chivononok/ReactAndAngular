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
        isValid: true, //признак валидности всей формы
        nameErrorText: "",
        priceErrorText: "",
        imgpathErrorText: "",
        countErrorText: "",
    }

    selectItem = (itemName) => {
        //ф-ция выделяет строку с itemName
        this.setState({selectedItemName: itemName});
            var selItem = this.getItemByItemName(itemName);
            this.setState({selectedItem: selItem});
    }

    unselectItem = () => {
        //ф-ция убирает выделение
        this.setState({selectedItemName: null});
        this.setState({selectedItem: null});
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

    startEdit = (itemName) => {
        //ф-ция включает режим редактирвоания для конкретной записи
        this.setState({isEdit: true})
        var selItem = this.getItemByItemName(itemName);
        this.setState({selectedItem: selItem});
    }

    stopEdit = () => {
        //ф-ция убирает режим редактирования
        this.setState({isEdit: false});
    }

    setValidResult = (result) =>{
        //ф-ция хапоминает результат проверки на валидацию
        this.setState({isValid: result})
    }

    checkField = (id, value) =>{
        //ф-ция проверяет правильность заполнения поля
        var res="";
        
        switch (id) {
            case "Name":
                if (value == "") {
                    res = "поле не может быть пустым";
                    this.setState({nameErrorText: res});
                }else{
                    this.setState({nameErrorText: ""});
                    res = "";
                }
            break;
            case "Price":
                if (value == "") {
                    res = "поле не может быть пустым";
                    this.setState({priceErrorText: res});
                }else{
                    this.setState({priceErrorText: ""});
                    res = "";
                }
            break
            case "imgPath":
                if (value == "") {
                    res = "поле не может быть пустым";
                    this.setState({imgpathErrorText: res});
                }else{
                    this.setState({imgpathErrorText: ""});
                    res = "";
                }
            break
            case "Count":
                if (value == "") {
                    res = "поле не может быть пустым";
                    this.setState({countErrorText: res});
                }else{
                    this.setState({countErrorText: ""});
                    res = "";
                }
            break
            default:
                break;
        }

        if (res != "") {
            this.setValidResult(false);
        } else if(this.state.nameErrorText=="" && this.state.priceErrorText=="" && this.state.imgpathErrorText=="" && this.state.countErrorText==""){
            this.setValidResult(true);
        }

        return res;
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
                cbSelected = {this.selectItem}
                cbUnselect = {this.unselectItem}
                cbDeleteItem = {this.ask4delete}
                cbStartEdit = {this.startEdit}
                cbStopEdit = {this.stopEdit}
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
                    <ShowItemCardComponent key={this.state.selectedItem.nameItem}
                        nameItem = {this.state.selectedItem.nameItem}
                        priceItem = {this.state.selectedItem.priceItem}
                        imgPathItem = {this.state.selectedItem.imgPathItem}
                        itemsInStorage = {this.state.selectedItem.itemsInStorage}
                        type = {this.state.actionType}
                    />
                }
                {
                    (this.state.isEdit) && (this.state.selectedItem) &&
                    <EditItemCardComponent key={this.state.selectedItem.nameItem}
                        editItem = {this.state.selectedItem}
                        validText = {{"nameErrorText":this.state.nameErrorText, "priceErrorText":this.state.priceErrorText, "imgpathErrorText":this.state.imgpathErrorText, "countErrorText":this.state.countErrorText}}
                        cbSetValidResult = {this.setValidResult}
                        isValid = {this.state.isValid}
                        cbCheckField = {this.checkField}
                    />
                }
            </div>
        )
    }
}

export default IShopComponent;