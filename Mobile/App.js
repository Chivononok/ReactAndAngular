"use strict";

import React from 'react';
import ReactDOM from 'react-dom';

import MobileCompanyComponent from './components/MobileCompanyComponent';

let companyName='Velcom';
let clientsArr=[ 
  {id:1, lastName: "Иванов", firstName: "Иван", secondName: "Иванович", balance:200, status: 1}, 
  {id:2, lastName: "Петров", firstName: "Петр", secondName: "Петрович", balance:250, status: 1}, 
  {id:3, lastName: "Сидоров", firstName: "Сидр", secondName: "Сидорович", balance:180, status: 1},
  {id:4, lastName: "Григорьев", firstName: "Григорий", secondName: "Григорьевич", balance:220, status: 0},
];

ReactDOM.render(
  <MobileCompanyComponent 
    name={companyName}
    clients={clientsArr}
  />
  , document.getElementById('container') 
);

