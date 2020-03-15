"use strict";

import React from 'react';
import ReactDOM from 'react-dom';

import Br2jsx from "./components/Br2jsx";

let txt="первый<br>второй<br/>третий<br />последний";

ReactDOM.render(
   <Br2jsx  txt = {txt}> 
        
   </Br2jsx>,
    document.getElementById('container') 
);