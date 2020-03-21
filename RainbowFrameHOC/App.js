"use strict";

import React from 'react';
import ReactDOM from 'react-dom';

import {withRainbowFrame} from './components/withRainbowFrame'


let colors=['red','orange', 'yellow','green', '#00BFFF', 'blue', 'purple'];
let FramedFragment=withRainbowFrame(colors)(React.Fragment);

ReactDOM.render(
   <FramedFragment > 
        Hello
   </FramedFragment>,
    document.getElementById('container') 
);