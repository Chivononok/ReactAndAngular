"use strict";

import React from 'react';
import renderer from 'react-test-renderer';

import MobileItemComponent from "../components/MobileItemComponent";
test('Проверка кнопки Редактировать', () => {
    let curClient = { id:1, lastName: "Петров", firstName: "Петр", secondName: "Петрович", balance:250, status: 1};

    const component = renderer.create(
        <MobileItemComponent curClient={curClient} />
    )

    let componentTree = component.toJSON();
    expect(componentTree).toMatchSnapshot();

    //=== проверка кнопка Редактировать ===
    const buttonEdit = component.root.findByProps({id:"edit"});
    buttonEdit.props.onClick();

    componentTree=component.toJSON();
    expect(componentTree).toMatchSnapshot();
    //=====================================

    //=== проверка кеопки Удалить ===
    const buttondelete = component.root.findByProps({id:"delete"});
    buttondelete.props.onClick();

    componentTree=component.toJSON();
    expect(componentTree).toMatchSnapshot();
    //================================

});