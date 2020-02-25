"use strict";

import React from 'react';
import ReactDOM from 'react-dom';

import IShopComponent from './components/iShopComponent';

var iShopName = "Магазин всяких штук";
var items = require('./items.json');

ReactDOM.render(
    <IShopComponent
        shopName = {iShopName}
        items = {items}
    />,
    document.getElementById('container') 
);