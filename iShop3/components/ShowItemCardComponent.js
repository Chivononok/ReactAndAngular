import React from 'react';
import PropTypes from 'prop-types';

import './ShowItemCardComponent.css';

class ShowItemCardComponent extends React.Component{
    static PropTypes = {
        nameItem: PropTypes.string.isRequired,
        priceItem: PropTypes.number.isRequired,
        imgPathItem: PropTypes.string.isRequired,
        itemsInStorage: PropTypes.number.isRequired,
    }


    render(){
        return (
            <div>
                <label className='ShowItemCardComponent'>Name: {this.props.nameItem}</label> 
                <label className='ShowItemCardComponent'>Price: {this.props.priceItem}</label> 
                <label className='ShowItemCardComponent'>imgPath: {this.props.imgPathItem}</label>
                <label className='ShowItemCardComponent'>Count: {this.props.itemsInStorage}</label>
            </div>
        )
    }
}

export default ShowItemCardComponent;