import React from 'react';
import PropTypes from 'prop-types';

import './Br2jsx.css'

class Br2jsx extends React.Component{

    static PropTypes = {
        txt: PropTypes.string,
    }

    render(){

        let txt = this.props.txt;
        let a = txt.replace(/<br\/>/g, "<br>").replace(/<br \/>/g, "<br>"); //заменяет все <br/> и <br /> на <br> (как смог написать регулярку - так и написал)
        let tmpArr = a.split("<br>");   //делает из строки массив, разделитель для массива <br>
        let body;

        for (let i = tmpArr.length-1; i >= 0; i--) {    //-1, т.к. нумерация начинается с 0
            body = <React.Fragment> 
                        {tmpArr[i]}
                        {
                           (i !== tmpArr.length-1) &&   //после последнего элемента массива не надо проставлять <br>
                           <br/> 
                        }
                        {body}
                    </React.Fragment>
        }

        return(
            <div>
                {body}
            </div>
        )
    }

}
export default Br2jsx;