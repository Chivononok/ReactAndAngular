import React from 'react';
import PropTypes from 'prop-types';

import './EditItemCardComponent.css';

class EditItemCardComponent extends React.Component{
    static defaultProps = {
        editItem: PropTypes.shape({
            nameItem: "",
            priceItem: "",
            imgPathItem: "",
            itemsInStorage: "",
        }),
    }

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
        cbChangeNewMode: PropTypes.func,
        cbStopEdit: PropTypes.func,
    }

    state = {
        nameErrorText: this.props.validText.nameItem,
        priceErrorText:this.props.validText.priceItem,
        imgpathErrorText:this.props.validText.imgPathItem,
        countErrorText: this.props.validText.itemsInStorage,
        tmpNameItemVal: this.props.editItem.nameItem,
        tmpPriceVal: this.props.editItem.priceItem,
        tmpImgPathVal: this.props.editItem.imgPathItem,
        tmpCountVal: this.props.editItem.itemsInStorage,
    }

    getHeader = () =>{
        if(typeof this.props.id !== 'number'){
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

    getEditBody = (header) => {
        
        return(
            <div>
                <h1>{header}</h1>
                {
                    (typeof this.props.id == 'number') &&
                    <label className='ShowItemCardComponent'>Id: {this.props.id}</label>
                }
                <div className="EditItemCardComponent">
                    <label >Name: </label> 
                    <input id='Name' type='text' defaultValue={this.props.editItem.nameItem} onChange={this.checkField}></input>
                    {
                        (this.state.nameErrorText !="") &&
                        <label className="EditItemCardComponent_ErrText">{this.state.nameErrorText}</label>
                    }
                </div>
                
                <div className="EditItemCardComponent">
                    <label >Price: </label> 
                    <input id='Price' type='text' defaultValue={this.props.editItem.priceItem} onChange={this.checkField}></input>
                    {
                        (this.state.priceErrorText !="") &&
                        <label className="EditItemCardComponent_ErrText">{this.state.priceErrorText}</label>
                    }
                </div>
                
                <div className="EditItemCardComponent">
                    <label>imgPath: </label>
                    <input id='imgPath' type='text' defaultValue={this.props.editItem.imgPathItem} onChange={this.checkField}></input>
                    {
                        (this.state.imgpathErrorText !="") &&
                        <label className="EditItemCardComponent_ErrText">{this.state.imgpathErrorText}</label>
                    }
                </div>
                
                <div className="EditItemCardComponent">
                    <label>Count: </label>
                    <input id='Count' type='text' defaultValue={this.props.editItem.itemsInStorage} onChange={this.checkField}></input>
                    {
                        (this.state.countErrorText !="") &&
                        <label className="EditItemCardComponent_ErrText">{this.state.countErrorText}</label>
                    }
                </div>
                
                {
                    (typeof this.props.id !== 'number') && 
                    <div className="EditItemCardComponent">  
                        <input type='button' value='Сохранить' onClick={this.save} disabled={this.state.nameErrorText=="" && this.state.priceErrorText=="" && this.state.imgpathErrorText=="" && this.state.countErrorText==""?false:true}></input>
                        <input type='button' value='Отмена' onClick={this.cancel}></input>
                    </div>
                }
                {
                    (typeof this.props.id == 'number') && 
                    <div className="EditItemCardComponent"> 
                        <input type='button' value='Добавить' onClick={this.save} disabled={this.state.nameErrorText=="" && this.state.priceErrorText=="" && this.state.imgpathErrorText=="" && this.state.countErrorText==""?false:true}></input>
                        <input type='button' value='Отмена' onClick={this.cancel}></input>
                    </div>
                }
            </div>   
        )
    }

    save = () => {
        //обработчик кнопки Сохранить
        this.props.cbSaveChangeItem();
        this.props.cbSetChangeFlag(false);
        this.props.cbChangeNewMode(false);
        this.props.cbStopEdit();
    }

    cancel = () => {
        //действие происходит при нажатии кнопки Отменить
        this.props.cbSetChangeFlag(false);
        this.props.cbChangeNewMode(false);
        this.props.cbStopEdit();
    }

    render(){
        var header = this.getHeader();
        var body = this.getEditBody(header);
        return (
            <div>{body}</div>
        )
        
    }
}

export default EditItemCardComponent;