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
                    <input id = "edit" type = "button" value = "Редактировать" onClick = { this.clickOnButtonEdit} disabled={this.props.id>-1}></input>
                </td>
                <td>
                    <input id = "delete" type = "button" value = "Удалить" onClick = {this.clickOnButtonDel} disabled={this.props.id>-1}></input>
                </td>
            </tr>
        )
    }

}
export default MobileItemComponent;