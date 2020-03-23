import React from 'react';
import PropTypes, { shape } from 'prop-types';

import './MobileCompanyComponent.css';

import MobileItemComponent from './MobileItemComponent';
import MobileFilterComponent from './MobileFilterComponent';
import {events} from './events';

class MobileCompanyComponent extends React.PureComponent{
    static propTypes = {
        name: PropTypes.string,
        clients: PropTypes.arrayOf(
            PropTypes.shape({
                    id: PropTypes.number,
                    lastName: PropTypes.string,
                    firstName: PropTypes.string,
                    secondName: PropTypes.string,
                    balance: PropTypes.number,
                    status: PropTypes.number,
                }   
            )
        ),
    };

    state = {
        companyName:  this.props.name,
        clientsArr: this.props.clients,
    }

    setCompanyNameMTC = () =>{
        this.setState({companyName: "MTC"});
    }

    setCompanyNameVelcom = () =>{
        this.setState({companyName: "Velcom"});
    }

    componentDidMount = () =>{
        events.addListener("delClient", this.removeClient)
    }

    componentWillUnmount = () =>{
        events.removeListener("delClient", this.removeClient)
    }

    removeClient = (client) =>{
        var tmpArr = this.state.clientsArr.filter(v => v != client);
        this.setState({clientsArr: tmpArr});
    }

    render(){
        console.log("render MobileCompanyComponent")
        var tableHeaders = [];
             
        //=== заголовок таблицы ===
        var header = (      
        <thead>
            <tr>
              <th >Фамилия</th>
              <th >Имя</th>
              <th >Отчество</th>
              <th >Баланс</th>
              <th >Статус</th>
              <th >Редактировать</th>
              <th >Удалить</th>
            </tr>
        </thead>)
        tableHeaders.push(header);
        //=========================

        let tableLines = this.state.clientsArr.map(v => 
            <MobileItemComponent key={v.id}
                curClient = {v}
            />
        );

        return(
            <div>
                <input type='button' value="MTC" onClick={this.setCompanyNameMTC}></input>
                <input type='button' value="Velcom" onClick={this.setCompanyNameVelcom}></input>
                <div>
                    <label>Название: {this.state.companyName}</label>
                </div>
                <MobileFilterComponent/>

                <table>
                    {header}
                    <tbody>
                        {tableLines}
                    </tbody>
                </table>
                <input type='button' value='Добавить клиента' ></input>
                
            </div>
        )
    }

}

export default MobileCompanyComponent;