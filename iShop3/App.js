"use strict";

import React from 'react';
import ReactDOM from 'react-dom';

import IShopComponent from './components/iShopComponent';

var iShopName = "Магазин всяких штук"
var items = [
    {nameItem: "товар 1", priceItem: 10, imgPathItem: "http//#", itemsInStorage: 2},
    {nameItem: "товар 2", priceItem: 1, imgPathItem: "http//#", itemsInStorage: 1},
    {nameItem: "товар 3", priceItem: 7, imgPathItem: "http//#", itemsInStorage: 24},
    {nameItem: "товар 4", priceItem: 4, imgPathItem: "http//#", itemsInStorage: 6},
];

ReactDOM.render(
    <IShopComponent
        shopName = {iShopName}
        items = {items}
    />,
    document.getElementById('container') 
);