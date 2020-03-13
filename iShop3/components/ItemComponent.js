import React from 'react';
import PropTypes from 'prop-types';

import './ItemComponent.css';

class ItemComponent extends React.Component{
    static PropTypes = {
        nameItem: PropTypes.string.isRequired,
        priceItem: PropTypes.number,
        imgPathItem: PropTypes.string.isRequired,
        itemsInStorage: PropTypes.number,
        selectedItemName:PropTypes.string.isRequired,
        selectedItem:PropTypes.shape({}),
        isChanged: PropTypes.bool,
        isEdit: PropTypes.bool,
        isValid: PropTypes.bool,
        cbSelected: PropTypes.func,
        cbUnselect: PropTypes.func,
        cbDeleteItem: PropTypes.func,
        cbStartEdit: PropTypes.func,
        cbStopEdit: PropTypes.func,
        cbSetChangeFlag: PropTypes.func,
        cbSaveChangeItem: PropTypes.func,
        cbCheckValid: PropTypes.func,
    }

    clickOnItem = (EO) => {
        //ф-ция вызывается при клике на строку таблицы
        let resValid = this.props.cbCheckValid();
        if (resValid==false){
            console.log("Не валидно");
            return
        }
        
        if (this.props.selectedItemName) {

            if(this.props.isChanged){
                let res = confirm("Запись была изменена. Сохранить изменения?");
                if (res){
                    this.props.cbSaveChangeItem();
                    this.removeChangeFlag();
                }else{
                    this.removeChangeFlag();
                }
            }

            if(this.props.nameItem==this.props.selectedItemName) {
                //повторный клик на выделенную строку убирает выделение
                this.props.cbUnselect(this.props.nameItem);
            }else{
                //выделяем строку
                this.props.cbSelected(this.props.nameItem);
            }
            this.props.cbStopEdit();
            return;
        }
        //если выделенной строки нет
        this.props.cbSelected(this.props.nameItem);
        this.props.cbStopEdit();
    }

    clickOnButtonDel = (EO) => {
        //ф-ция вызывается при нажатии кнопки Удалить
        this.props.cbDeleteItem(this.props.nameItem);
    }

    clickOnButtonEdit = (EO) => {
        //ф-ция вызывается при нажатии кнопки Редактировать
        this.props.cbSelected(this.props.nameItem);
        this.props.cbStartEdit(this.props.nameItem)
    }

    getClassName = () => {
        //ф-ция возвращает название класса для выделенной строки
        if(this.props.selectedItemName==this.props.nameItem){
            return "itemComponent_clicked" + " itemComponent_td";
        }else {
            return " itemComponent_td";
        }
    }

    removeChangeFlag = () =>{
        this.props.cbSetChangeFlag(false);
    }

    render(){
        return (
            <tr>
                <td onClick={this.clickOnItem} className = {this.getClassName()}>{this.props.nameItem}</td>
                <td onClick={this.clickOnItem} className = {this.getClassName()}>{this.props.priceItem}</td>
                <td onClick={this.clickOnItem} className = {this.getClassName()}>
                    <a href = {this.props.imgPathItem}>{this.props.imgPathItem}</a>
                </td>
                <td onClick={this.clickOnItem} className = {this.getClassName()}>{this.props.itemsInStorage}</td>
                <td>
                    <input type = "button" value = "Удалить" onClick = {this.clickOnButtonDel} disabled={this.props.isEdit}></input>
                    <input type = "button" value = "Редактировать" onClick = { this.clickOnButtonEdit} ></input>
                </td>
            </tr>
        )
    }
}

export default ItemComponent;