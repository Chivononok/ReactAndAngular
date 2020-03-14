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
        selectedItem: null,
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

    selectItem = (id) => {
        //ф-ция выделяет строку по id
        var selItem = this.getItemById(id);
        this.setState({selectedItem: selItem});
        this.setState({editedNewNameItemVal: selItem.nameItem});
        this.setState({editedNewPriceItemVal: selItem.priceItem});
        this.setState({editedNewimgPathItemVal: selItem.imgPathItem});
        this.setState({editedNewitemsInStorageVal: selItem.itemsInStorage});
    }

    unselectItem = () => {
        //ф-ция убирает выделение
        this.setState({selectedItem: null});
    }

    ask4delete = (id) => {
        //ф-ция вызывается при нажатии кнопки Удалить
        let delItem = this.getItemById(id);
        var res = confirm("Вы уверены, что хотите удалить запись " + delItem.nameItem + "?");
        if (res) {
            if(this.state.selectedItem){
                if(this.state.selectedItem.id == id){
                    this.setState({selectedItem: null});
                }
            }
            var tmpArr = this.state.shopItems.filter(v => v.id != id);
            this.setState({shopItems: tmpArr});
        }
    }

    getItemById = (id) => {
        //ф-ция возвращает хэш с описанием товара по его id
        var tmpArr = this.state.shopItems.filter(v => v.id == id);
        return tmpArr[0];
    }

    startEdit = (id) => {
        //ф-ция включает режим редактирвоания для конкретной записи
        this.setState({isEdit: true})
        var selItem = this.getItemById(id);
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
        }else{
            let newItem = {};
            newItem.nameItem = this.state.editedNewNameItemVal;
            newItem.priceItem = this.state.editedNewPriceItemVal;
            newItem.imgPathItem = this.state.editedNewimgPathItemVal;
            newItem.itemsInStorage = this.state.editedNewitemsInStorageVal;
            newItem.id = this.getLastId()+1;
            this.state.shopItems.push(newItem);
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
        this.setState({selectedItem: null})
    }

    getLastId = () => {
        //ф-ция возвращает id последнего товара
        let res = 0;
        let countElements = this.state.shopItems.length;
        if (countElements>0){
            return this.state.shopItems[countElements-1].id;
        }else{
            return 0;
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
            <ItemComponent key={v.id}
                id = {v.id}
                nameItem = {v.nameItem}
                priceItem = {v.priceItem} 
                imgPathItem = {v.imgPathItem} 
                itemsInStorage = {v.itemsInStorage}
                selectedItem = {this.state.selectedItem}
                isChanged = {this.state.isChanged}
                isEdit = {this.state.isEdit}
                isValid = {this.state.isValid}
                isNewMode = {this.state.isNewMode}
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

        let validText = {
            "nameItem": "поле не может быть пустым", 
            "priceItem":"поле не может быть пустым", 
            "imgPathItem":"поле не может быть пустым", 
            "itemsInStorage":"поле не может быть пустым"
        };

        let editValidText = {
            "nameItem": "", 
            "priceItem":"", 
            "imgPathItem":"", 
            "itemsInStorage":""
        };

        let id = this.getLastId() + 1;
        
        return (
            <div className='IShopComponent'>
                <h1>{this.props.shopName}</h1>
                <table>
                    {header}
                    <tbody>
                        {tableLines}
                    </tbody>
                </table>
                <input type='button' value='Новый' disabled={this.state.isEdit || this.state.isNewMode} onClick={this.startNewMode}></input>
                {
                    (this.state.selectedItem) && (this.state.isEdit == false) && (this.state.isNewMode==false) &&
                    <ShowItemCardComponent key={this.state.selectedItem.id}
                        nameItem = {this.state.selectedItem.nameItem}
                        priceItem = {this.state.selectedItem.priceItem}
                        imgPathItem = {this.state.selectedItem.imgPathItem}
                        itemsInStorage = {this.state.selectedItem.itemsInStorage}
                    />
                }
                {
                    (this.state.isEdit)  && (this.state.selectedItem) && (this.state.isNewMode==false) &&
                    <EditItemCardComponent key={this.state.selectedItem.id}
                        editItem = {this.state.selectedItem}
                        validText = {editValidText}
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
                        cbChangeNewMode = {this.changeNewMode}
                        cbStopEdit = {this.stopEdit}
                    />
                }
                {
                    (this.state.isNewMode) &&
                    <EditItemCardComponent key = {id}
                        id = {id}
                        validText = {validText}
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
                        cbChangeNewMode = {this.changeNewMode}
                        cbStopEdit = {this.stopEdit}
                    />
                }
            </div>
        )
    }
}

export default IShopComponent;