import React from 'react';
import PropTypes, { shape } from 'prop-types';

import './MobileCompanyComponent.css';

import MobileItemComponent from './MobileItemComponent';
import MobileFilterComponent from './MobileFilterComponent';
import {events} from './events';
import EditMobileItemComponent from './EditMobileItemComponent'

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
        companyName: this.props.name,
        clientsArr: this.props.clients,         //массив с клиентами без фильтров
        clientsArrFilter: this.props.clients,   //массив с клиентами с фильтрами
        editClient: null,
        id: -1,
        curFilterType:"",   //текущий фильтр
    }

    setCompanyNameMTC = () =>{
        this.setState({companyName: "MTC"});
    }

    setCompanyNameVelcom = () =>{
        this.setState({companyName: "Velcom"});
    }

    componentDidMount = () =>{
        events.addListener("delClient", this.removeClient);
        events.addListener("editClient", this.editClient);
        events.addListener("stopEditClient", this.stopEdit);
        events.addListener("updateClient", this.updateClient);
        events.addListener("filter", this.filterClient);
    }

    componentWillUnmount = () =>{
        events.removeListener("delClient", this.removeClient);
        events.removeListener("editClient", this.editClient);
        events.removeListener("stopEditClient", this.stopEdit);
        events.removeListener("updateClient", this.updateClient);
        events.removeListener("filter", this.filterClient);
    }

    removeClient = (client) =>{
        var tmpArr = this.state.clientsArr.filter(v => v != client);
        this.setState({clientsArr: tmpArr});
        
        let tmpArrFilter = this.filter(this.state.curFilterType, [...tmpArr]);
        this.setState({clientsArrFilter: tmpArrFilter});
    }

    editClient = (client) =>{
        this.setState({editClient: client});
    }

    stopEdit = () =>{
        this.setState({editClient: null});
        this.setState({id: -1});
    }

    updateClient = (curClient, newClient) =>{
        //ф-ция ищет клиента и заменяет его данные. Если не находит - добавляет клиента как нового
        let index = this.state.clientsArr.indexOf(curClient);
        let filterType = this.state.curFilterType;
        let tmpArr = [...this.state.clientsArr];
        if(index > -1){
            //замена данных клиента
            tmpArr[index] = newClient;
        } else {
            //добавление клиента
            tmpArr.push(newClient);
        }
        this.setState({clientsArr: tmpArr});

        let tmpArrFilter = this.filter(this.state.curFilterType, [...tmpArr]);
        this.setState({clientsArrFilter: tmpArrFilter});
    }

    filter = (filterType, tmpArr) =>{
        //накладывает фильтр на входящий массив. Возвращает новый массив
        let tmpArr1 = [...tmpArr];
        switch (filterType) {
            case "All":
                this.setState({clientsArrFilter: tmpArr1});
                this.setState({curFilterType:"All"});
                break;
            case "Active":
                tmpArr1 = tmpArr.filter(v =>
                    v.status == 1
                );
                this.setState({clientsArrFilter: tmpArr1});
                this.setState({curFilterType:"Active"});
                break;
            case "Blocked":
                tmpArr1 = tmpArr.filter(v =>
                    v.status != 1
                );
                this.setState({clientsArrFilter: tmpArr1});
                this.setState({curFilterType:"Blocked"});
                break;
            default:

                break;
        }
        return tmpArr1;
    }

    getLastId = () => {
        //ф-ция возвращает id последнего клиента
        let countElements = this.state.clientsArr.length;
        if (countElements>0){
            return this.state.clientsArr[countElements-1].id;
        }else{
            return 0;
        }
    }

    addClient = () => {
        //ф-ция обрабатывает кнопку добавить клиента
        let lastId = this.getLastId();
        this.setState({id:lastId + 1});
        
        let newClient = {id:lastId + 1, lastName: "", firstName: "", secondName: "", balance:0, status: 1};
        this.setState({editClient: newClient});
    }

    filterClient = (filterType) =>{
        //ф-ция фильтрует по нажатию кнопок фильтра
        this.filter(filterType, this.state.clientsArr);
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

        let tableLines = this.state.clientsArrFilter.map(v => 
            <MobileItemComponent key={v.id}
                curClient = {v}
                id = {this.state.id}
            />
        );

        return(
            <div>

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
                <input id='buttonAdd' type='button' value='Добавить клиента' onClick={this.addClient} disabled={this.state.id>-1 || this.state.editClient!=null}></input>
                {
                    (this.state.editClient) &&
                    <EditMobileItemComponent key = {this.state.editClient.id}
                        curClient = {this.state.editClient}
                        id = {this.state.id}
                    />
                }
            </div>
        )
    }

}

export default MobileCompanyComponent;