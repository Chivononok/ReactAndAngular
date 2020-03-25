import React from 'react';
import PropTypes, { shape } from 'prop-types';

import './MobileItemComponent.css';
import {events} from './events';

class MobileItemComponent extends React.PureComponent{
    static propTypes = {
        curClient: PropTypes.shape(),

    }

    clickOnButtonEdit = () =>{
        events.emit("editClient", this.props.curClient);
    }

    clickOnButtonDel = (EO) =>{
        events.emit("delClient", this.props.curClient);
    }

    render(){
        console.log("render MobileItemComponent id:" + this.props.curClient.id)
        return(
            <tr>
                <td >{this.props.curClient.lastName}</td>
                <td >{this.props.curClient.firstName}</td>
                <td >{this.props.curClient.secondName}</td>
                <td >{this.props.curClient.balance}</td>
                <td >{this.props.curClient.status}</td>
                <td>
                    <input type = "button" value = "Удалить" onClick = {this.clickOnButtonDel}></input>
                </td>
                <td>
                    <input type = "button" value = "Редактировать" onClick = { this.clickOnButtonEdit} ></input>
                </td>
            </tr>
        )
    }

}
export default MobileItemComponent;