"use strict";

import React from 'react';
import renderer from 'react-test-renderer';

import MobileFilterComponent from "../components/MobileFilterComponent";

test('Проверка фильтров', () =>{
    const component = renderer.create(
        <MobileFilterComponent/>
    );

    let componentTree = component.toJSON();
    expect(componentTree).toMatchSnapshot();

    //=== кнопка Все ===
    const buttonAll = component.root.findByProps({id:"all"});
    buttonAll.props.onClick();
    componentTree=component.toJSON();
    expect(componentTree).toMatchSnapshot();
    //==================
    //=== кнопка Заблокирвоанные ===
    const buttonBlocked = component.root.findByProps({id:"blocked"});
    buttonBlocked.props.onClick();
    componentTree=component.toJSON();
    expect(componentTree).toMatchSnapshot();
    //==============================
    //=== кнопка Активные ===
    const buttonActive = component.root.findByProps({id:"active"});
    buttonActive.props.onClick();
    componentTree=component.toJSON();
    expect(componentTree).toMatchSnapshot();
    //=======================
});