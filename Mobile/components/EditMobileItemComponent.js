import React from 'react';
import PropTypes from 'prop-types';

import './EditMobileItemComponent.css';
import {events} from './events';

class EditMobileItemComponent extends React.PureComponent{
    static propTypes = {
        curClient: PropTypes.shape(),
        id: PropTypes.string,
    }

    state = {
        lastNameTmp: this.props.curClient.lastName,
        firstNameTmp: this.props.curClient.firstName,
        secondNameTmp: this.props.curClient.secondName,
        balanceTmp: this.props.curClient.balance,
        statusTmp: this.props.curClient.status,
        isChange: false,
    }

    isChangeTrue = () =>{
        this.setState({isChange: true});
    }

    getTmpVal = (EO) =>{
        
        switch (EO.target.id) {
            case "lastName":
                this.setState({lastNameTmp: EO.target.value});
            break;
            case "firstName":
                this.setState({firstNameTmp: EO.target.value});
            break
            case "secondName":
                this.setState({secondNameTmp: EO.target.value});
            break
            case "balance":
                this.setState({balanceTmp: EO.target.value});
            break
            case "status":
                this.setState({statusTmp: EO.target.value});
            break
            default:
                break;
        }
    }

    getEditBody = () => {
        
        return(
            <div>
                {
                    (typeof this.props.id == 'number') &&
                    <label >Id: {this.props.id}</label>
                }
                <div >
                    <label >Фамилия: </label> 
                    <input id='lastName' type='text' defaultValue={this.props.curClient.lastName} onBlur={this.getTmpVal} onChange={this.isChangeTrue}></input>
                </div>
                
                <div >
                    <label >Имя: </label> 
                    <input id='firstName' type='text' defaultValue={this.props.curClient.firstName} onBlur={this.getTmpVal} onChange={this.isChangeTrue}></input>
                </div>
                
                <div >
                    <label>Отчество: </label>
                    <input id='secondName' type='text' defaultValue={this.props.curClient.secondName} onBlur={this.getTmpVal} onChange={this.isChangeTrue}></input>
                </div>
                
                <div >
                    <label>Баланс: </label>
                    <input id='balance' type='text' defaultValue={this.props.curClient.balance} onBlur={this.getTmpVal} onChange={this.isChangeTrue}></input>
                </div>

                <div >
                    <label>Статус: </label>
                    <input id='status' type='text' defaultValue={this.props.curClient.status} onBlur={this.getTmpVal} onChange={this.isChangeTrue}></input>
                </div>
                
                {
                    (typeof this.props.id !== 'number') && 
                    <div className="EditItemCardComponent">  
                        <input type='button' value='Сохранить' onClick={this.update}></input>
                        <input type='button' value='Отмена' onClick={this.cancel}></input>
                    </div>
                }
                {
                    (typeof this.props.id == 'number') && 
                    <div className="EditItemCardComponent"> 
                        <input type='button' value='Добавить' onClick={this.save}></input>
                        <input type='button' value='Отмена' onClick={this.cancel}></input>
                    </div>
                }
            </div>   
        )
    }

    cancel = () =>{
        events.emit("stopEditClient", this.props.curClient);
    }

    update = () =>{
        if(this.state.isChange){
            //если что-то меняли, то переписываем всю информацию по клиенту
            let newClient = {"id":this.props.curClient.id, "lastName":this.state.lastNameTmp, "firstName":this.state.firstNameTmp, "secondName":this.state.secondNameTmp, "balance":this.state.balanceTmp, "status":this.state.statusTmp};
            events.emit("updateClient", this.props.curClient, newClient);
        }
        events.emit("stopEditClient", this.props.curClient);    //по кнопке Сохранить в любом случае убираем режим редактирования
    }

    render(){
        let body = this.getEditBody()
        return(  
            <div>{body}</div>
        )
    }

}

export default EditMobileItemComponent;