import React from 'react';

import './MobileFilterComponent.css';
import {events} from './events';

class MobileFilterComponent extends React.PureComponent{

    showAll = () => {
        events.emit("filter", "All");
    }

    showActive = () => {
        events.emit("filter", "Active");
    }

    showBlocked = () => {
        events.emit("filter", "Blocked");
    }

    render(){
        console.log("render MobileFilterComponent");
        return(
            <div>
                <input id = 'all' type='button' value='Все' onClick={this.showAll}></input>
                <input id = 'active' type='button' value='Активные' onClick={this.showActive}></input>
                <input id = 'blocked' type='button' value='Заблокирвоанные' onClick={this.showBlocked}></input>
            </div>
        )
    }
}

export default MobileFilterComponent;