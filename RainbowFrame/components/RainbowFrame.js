import React from 'react';
import PropTypes from 'prop-types';

import './RainbowFrame.css'

class RainbowComponent extends React.Component{
    

    render(){
        var frames ;

        for (let i = 0; i < this.props.colors.length; i++) {
            frames = <div style={{border:"solid 4px "+this.props.colors[i],padding:"10px"}}>
                                {frames}
                                {
                                    (i==0) &&  //первый 'квадратик' рисуется в центре
                                    this.props.children
                                }
                      </div> 
        }

        return (
           <div>
               {frames}
           </div>
        )
    }
}

export default RainbowComponent