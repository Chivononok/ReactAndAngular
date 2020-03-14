import React from 'react';
import PropTypes from 'prop-types';

import './ItemComponent.css';

class ItemComponent extends React.Component{
    static PropTypes = {
        id: PropTypes.number,
        nameItem: PropTypes.string.isRequired,
        priceItem: PropTypes.number,
        imgPathItem: PropTypes.string.isRequired,
        itemsInStorage: PropTypes.number,
        selectedItem:PropTypes.shape({}),
        isChanged: PropTypes.bool,
        isEdit: PropTypes.bool,
        isValid: PropTypes.bool,
        isNewMode: PropTypes.bool,
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
        if (resValid==false || this.props.isNewMode){
            return
        }
        
        if (this.props.selectedItem) {
            if(this.props.isChanged){
                let res = confirm("Запись была изменена. Сохранить изменения?");
                if (res){
                    this.props.cbSaveChangeItem();
                    this.removeChangeFlag();
                }else{
                    this.removeChangeFlag();
                }
            }

            if(this.props.id==this.props.selectedItem.id) {
                //повторный клик на выделенную строку убирает выделение
                this.props.cbUnselect(this.props.id);
            }else{
                //выделяем строку
                this.props.cbSelected(this.props.id);
            }
            
            this.props.cbStopEdit();
            return;
        }
        //если выделенной строки нет
        this.props.cbSelected(this.props.id);
        this.props.cbStopEdit();
    }

    clickOnButtonDel = (EO) => {
        //ф-ция вызывается при нажатии кнопки Удалить
        this.props.cbDeleteItem(this.props.id);
    }

    clickOnButtonEdit = (EO) => {
        //ф-ция вызывается при нажатии кнопки Редактировать
        if(this.props.isChanged){
            let res = confirm("Запись была изменена. Сохранить изменения?");
            if (res){
                this.props.cbSaveChangeItem();
                this.removeChangeFlag();
            }else{
                this.removeChangeFlag();
            }
        }
        this.props.cbSelected(this.props.id);
        this.props.cbStartEdit(this.props.id)
    }

    getClassName = () => {
        //ф-ция возвращает название класса для выделенной строки
        if(this.props.selectedItem){
            if(this.props.selectedItem.id==this.props.id){
                return "itemComponent_clicked" + " itemComponent_td";
            }else {
                return " itemComponent_td";
            }
        }else {
            return " itemComponent_td";
        }
    }

    removeChangeFlag = () =>{
        //ф-ция убирает режим редактирования
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
                    <input type = "button" value = "Удалить" onClick = {this.clickOnButtonDel} disabled={this.props.isEdit || this.props.isNewMode}></input>
                    <input type = "button" value = "Редактировать" onClick = { this.clickOnButtonEdit} disabled = {this.props.isNewMode}></input>
                </td>
            </tr>
        )
    }
}

export default ItemComponent;