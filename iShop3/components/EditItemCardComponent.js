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
        validText: PropTypes.shape(),
        id: PropTypes.number,    //номер записи при добавлении
        isValid: PropTypes.bool,
        cbSetValidResult: PropTypes.func,
        cbSetChangeFlag: PropTypes.func,
        cbSaveChangeItem: PropTypes.func,
        cbChangeEditedNameItemVal: PropTypes.func,
        cbChangeEditedPriceItemVal : PropTypes.func,
        cbChangeEditedimgPathItemVal : PropTypes.func,
        cbChangeEditeditemsInStorageVal : PropTypes.func,
        cbSetNameErrorText: PropTypes.func,
        cbSetPriceErrorText : PropTypes.func,
        cbSetImgpathErrorText: PropTypes.func,
        cbSetCountErrorText: PropTypes.func,
    }

    state = {
        nameErrorText: "",
        priceErrorText: "",
        imgpathErrorText: "",
        countErrorText: "",
        tmpNameItemVal: this.props.editItem.nameItem,
        tmpPriceVal: this.props.editItem.priceItem,
        tmpImgPathVal: this.props.editItem.imgPathItem,
        tmpCountVal: this.props.editItem.itemsInStorage,
    }

    getHeader = () =>{
        if(this.props.editItem){
            return "Редактирование товара " + this.props.editItem.nameItem;
        }else {
            return "Добавление нового товара";
        }
    }

    checkField = (EO) =>{
        //ф-ция проверяет правильность заполнения поля
        
        var res= "";

        this.props.cbSetChangeFlag(true);

        switch (EO.target.id) {
            case "Name":
                if (EO.target.value == "") {
                    res = "поле не может быть пустым";
                    
                    this.setState({nameErrorText: res});
                }else{
                    this.setState({nameErrorText: ""});
                    res = "";
                }
                this.setState({tmpNameItemVal: EO.target.value});
                this.props.cbChangeEditedNameItemVal(EO.target.value);
                this.props.cbSetNameErrorText(res);
            break;
            case "Price":
                if (EO.target.value == "") {
                    res = "поле не может быть пустым";
                    this.setState({priceErrorText: res});
                }else{
                    this.setState({priceErrorText: ""});
                    res = "";
                }
                this.setState({tmpPriceVal: EO.target.value});
                this.props.cbChangeEditedPriceItemVal(EO.target.value);
                this.props.cbSetPriceErrorText(res);
            break
            case "imgPath":
                if (EO.target.value == "") {
                    res = "поле не может быть пустым";
                    this.setState({imgpathErrorText: res});
                }else{
                    this.setState({imgpathErrorText: ""});
                    res = "";
                }
                this.setState({tmpImgPathVal: EO.target.value});
                this.props.cbChangeEditedimgPathItemVal(EO.target.value);
                this.props.cbSetImgpathErrorText(res);
            break
            case "Count":
                if (EO.target.value == "") {
                    res = "поле не может быть пустым";
                    this.setState({countErrorText: res});
                }else{
                    this.setState({countErrorText: ""});
                    res = "";
                }
                this.setState({tmpCountVal: EO.target.value});
                this.props.cbChangeEditeditemsInStorageVal(EO.target.value);
                this.props.cbSetCountErrorText(res);
            break
            default:
                break;
        }

        if (res != "") {
            this.props.cbSetValidResult(false);
        } else if(this.state.nameErrorText=="" && this.state.priceErrorText=="" && this.state.imgpathErrorText=="" && this.state.countErrorText==""){
            this.props.cbSetValidResult(true);
        }

        return res;
    }
/*
    addChangeFlag = (EO) =>{
        this.props.cbSetChangeFlag(true);
        
        if(EO.target.id=="Name"){
            this.props.cbChangeEditedNameItemVal(EO.target.value);
        }
        if(EO.target.id=="Price"){
            this.props.cbChangeEditedPriceItemVal(EO.target.value);
        }
        if(EO.target.id=="imgPath"){
            this.props.cbChangeEditedimgPathItemVal(EO.target.value);
        }
        if(EO.target.id=="Count"){
            this.props.cbChangeEditeditemsInStorageVal(EO.target.value);
        }
        if(this.state.nameErrorText=="" && this.state.priceErrorText=="" && this.state.imgpathErrorText=="" && this.state.countErrorText==""){
            this.props.cbSetValidResult(true);
        }
        
    }
    */

    getEditBody = (header) => {
        
        return(
            <div>
                <h1>{header}</h1>
                <label >Name: </label> 
                <input id='Name' type='text' defaultValue={this.props.editItem.nameItem} onChange={this.checkField }></input>
                {
                    (this.state.nameErrorText !="") &&
                    <label>{this.state.nameErrorText}</label>
                }

                <label className='ShowItemCardComponent'>Price: </label> 
                <input id='Price' type='text' defaultValue={this.props.editItem.priceItem} onChange={this.checkField}></input>
                {
                    (this.state.priceErrorText !="") &&
                    <label>{this.state.priceErrorText}</label>
                }
                
                <label className='ShowItemCardComponent'>imgPath: </label>
                <input id='imgPath' type='text' defaultValue={this.props.editItem.imgPathItem}  onChange={this.checkField}></input>
                {
                    (this.state.imgpathErrorText !="") &&
                    <label>{this.state.imgpathErrorText}</label>
                }
                
                <label className='ShowItemCardComponent'>Count: </label>
                <input id='Count' type='text' defaultValue={this.props.editItem.itemsInStorage}  onChange={this.checkField}></input>
                {
                    (this.state.countErrorText !="") &&
                    <label>{this.state.countErrorText}</label>
                }

                <input className='ShowItemCardComponent' type='button' value='Сохранить' onClick={this.save} disabled={this.state.nameErrorText=="" && this.state.priceErrorText=="" && this.state.imgpathErrorText=="" && this.state.countErrorText==""?false:true}></input>
                <input type='button' value='Редактировать'></input>
            </div>   
        )
    }

    getNewBody = (header) => {
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
                <input className='ShowItemCardComponent' type='button' value='Добавить'></input>
                <input type='button' value='Отмена'></input>
            </div>
        )
    }

    save = () => {
        this.props.cbSaveChangeItem();
        this.props.cbSetChangeFlag(false);
    }

    render(){
        var header = this.getHeader();
        
        if(this.props.editItem){
            var body = this.getEditBody(header);
        }else{
            var body = this.getNewBody(header);
        }
        return (
            <div>{body}</div>
        )
    }
}

export default EditItemCardComponent;