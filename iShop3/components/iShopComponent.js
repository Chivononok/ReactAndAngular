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
        isChanged: false,  //признак того, что в карточку врежиме редактирования были внесены изменения
        isNewMode: false,   //признак того, что нажата кнопка Новый
        nameErrorText: "",
        priceErrorText: "",
        imgpathErrorText: "",
        countErrorText: "",
        editedNewNameItemVal: "",
        editedNewPriceItemVal:"",
        editedNewimgPathItemVal: "",
        editedNewitemsInStorageVal: "",
    }

    selectItem = (itemName) => {
        //ф-ция выделяет строку с itemName
        this.setState({selectedItemName: itemName});
            var selItem = this.getItemByItemName(itemName);
            this.setState({selectedItem: selItem});
            this.setState({editedNewNameItemVal: selItem.nameItem});
            this.setState({editedNewPriceItemVal: selItem.priceItem});
            this.setState({editedNewimgPathItemVal: selItem.imgPathItem});
            this.setState({editedNewitemsInStorageVal: selItem.itemsInStorage});
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

    getItemById = (id) => {
        //ф-ция возвращает хэш с описанием товара по его id
        var tmpArr = this.state.shopItems.filter(v => v.id == id);
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

    setChangedFlag = (val) => {
        //ф-ция выставляет/убирает флаг, что в каком-то компоненте что-то изменили
        this.setState({isChanged: val});
    }

    setNameErrorText = (val) => {
        this.setState({nameErrorText: val});
    }
    setPriceErrorText = (val) => {
        this.setState({priceErrorText: val});
    }
    setImgpathErrorText = (val) => {
        this.setState({imgpathErrorText: val});
    }
    setCountErrorText = (val) => {
        this.setState({countErrorText: val});
    }

    saveChangeItem = () => {
        //ф-ция меняет строку в таблице
        let index = this.state.shopItems.indexOf(this.state.selectedItem) ;
        if(index>-1){
            this.state.shopItems[index].nameItem = this.state.editedNewNameItemVal;
            this.state.shopItems[index].priceItem = this.state.editedNewPriceItemVal;
            this.state.shopItems[index].imgPathItem = this.state.editedNewimgPathItemVal;
            this.state.shopItems[index].itemsInStorage = this.state.editedNewitemsInStorageVal;
        }
    }

    changeEditedNameItemVal = (val) =>{
        //ф-ция запомниает изменное имя записи
        this.setState({editedNewNameItemVal: val}); 
    }

    changeEditedPriceItemVal = (val) =>{
        //ф-ция запомниает изменное имя записи
        this.setState({editedNewPriceItemVal: val}); 
    }

    changeEditedimgPathItemVal = (val) =>{
        //ф-ция запомниает изменное имя записи
        this.setState({editedNewimgPathItemVal: val}); 
    }

    changeEditeditemsInStorageVal = (val) =>{
        //ф-ция запомниает изменное имя записи
        this.setState({editedNewitemsInStorageVal: val}); 
    }

    checkValid = () =>{
        if(this.state.nameErrorText == "" && this.state.priceErrorText=="" && this.state.imgpathErrorText=="" && this.state.countErrorText==""){
            this.setValidResult(true);
            return true;
            
        }else{
            this.setValidResult(false);
            return false;
        }
    }

    changeNewMode = (val) =>{
        //запускает режим создания новой записи
        this.setState({isNewMode: val});
    }

    startNewMode = () =>{
        this.changeNewMode(true);
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
                selectedItem = {this.state.selectedItem}
                isChanged = {this.state.isChanged}
                isEdit = {this.state.isEdit}
                isValid = {this.state.isValid}
                cbSelected = {this.selectItem}
                cbUnselect = {this.unselectItem}
                cbDeleteItem = {this.ask4delete}
                cbStartEdit = {this.startEdit}
                cbStopEdit = {this.stopEdit}
                cbSetChangeFlag = {this.setChangedFlag}
                cbSaveChangeItem = {this.saveChangeItem}
                cbCheckValid = {this.checkValid}
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
                <input type='button' value='Новый' disabled={this.state.isEdit} onClick={this.startNewMode}></input>
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
                    (this.state.isEdit)  && (this.state.selectedItem) &&
                    <EditItemCardComponent key={this.state.selectedItem.nameItem}
                        editItem = {this.state.selectedItem}
                        cbSetValidResult = {this.setValidResult}
                        isValid = {this.state.isValid}
                        cbSetChangeFlag = {this.setChangedFlag}
                        cbSaveChangeItem = {this.saveChangeItem}
                        cbChangeEditedNameItemVal = {this.changeEditedNameItemVal}
                        cbChangeEditedPriceItemVal = {this.changeEditedPriceItemVal}
                        cbChangeEditedimgPathItemVal = {this.changeEditedimgPathItemVal}
                        cbChangeEditeditemsInStorageVal = {this.changeEditeditemsInStorageVal}
                        cbSetNameErrorText = {this.setNameErrorText}
                        cbSetPriceErrorText = {this.setPriceErrorText}
                        cbSetImgpathErrorText = {this.setImgpathErrorText}
                        cbSetCountErrorText = {this.setCountErrorText}
                    />
                }
                {
                    (this.state.isNewMode) &&
                    <EditItemCardComponent 
                    editItem = {null}
                    cbSetValidResult = {this.setValidResult}
                    isValid = {this.state.isValid}
                    cbSetChangeFlag = {this.setChangedFlag}
                    cbSaveChangeItem = {this.saveChangeItem}
                    cbChangeEditedNameItemVal = {this.changeEditedNameItemVal}
                    cbChangeEditedPriceItemVal = {this.changeEditedPriceItemVal}
                    cbChangeEditedimgPathItemVal = {this.changeEditedimgPathItemVal}
                    cbChangeEditeditemsInStorageVal = {this.changeEditeditemsInStorageVal}
                    cbSetNameErrorText = {this.setNameErrorText}
                    cbSetPriceErrorText = {this.setPriceErrorText}
                    cbSetImgpathErrorText = {this.setImgpathErrorText}
                    cbSetCountErrorText = {this.setCountErrorText}
                    />

                }
            </div>
        )
    }
}

export default IShopComponent;