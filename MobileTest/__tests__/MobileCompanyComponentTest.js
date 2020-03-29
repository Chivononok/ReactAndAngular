"use strict";

import React from 'react';
import renderer from 'react-test-renderer';

import MobileCompanyComponent from '../components/MobileCompanyComponent';

test('Проверка кнопки Добавить', () =>{

    let clientsArr=[ 
        {id:0, lastName: "Иванов", firstName: "Иван", secondName: "Иванович", balance:200, status: 1}, 
        {id:1, lastName: "Петров", firstName: "Петр", secondName: "Петрович", balance:250, status: 1}, 
        {id:2, lastName: "Сидоров", firstName: "Сидр", secondName: "Сидорович", balance:180, status: 1},
        {id:3, lastName: "Григорьев", firstName: "Григорий", secondName: "Григорьевич", balance:220, status: 0},
    ];
    let companyName='Velcom';

    const component = renderer.create(
        <MobileCompanyComponent
            clients={clientsArr}
            name={companyName}
        />
    );

    let componentTree = component.toJSON();
    expect(componentTree).toMatchSnapshot();

    const buttonAdd = component.root.findByProps({id:"buttonAdd"});
    buttonAdd.props.onClick();
    

    componentTree=component.toJSON();
    expect(componentTree).toMatchSnapshot();

});