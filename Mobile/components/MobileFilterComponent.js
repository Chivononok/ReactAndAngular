import React from 'react';

import './MobileFilterComponent.css';

class MobileFilterComponent extends React.PureComponent{

    render(){
        return(
            <div>
                <input type='button' value='Все'></input>
                <input type='button' value='Активные'></input>
                <input type='button' value='Заблокирвоанные'></input>
            </div>
        )
    }
}

export default MobileFilterComponent;