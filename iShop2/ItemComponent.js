var ItemComponent = React.createClass({
    displayName: "ItemComponent",

    propTypes:{
        nameItem: React.PropTypes.string,
        priceItem: React.PropTypes.number,
        imgPathItem: React.PropTypes.string,
        itemsInStorage: React.PropTypes.number,
        selectedItemName: React.PropTypes.string,
        cbSelected: React.PropTypes.func,
        cbDeleteItem: React.PropTypes.func,
    },

    clickOnItem : function(EO){
        //ф-ция вызывается при клике на строку таблицы
        this.props.cbSelected(this.props.nameItem);
    },

    clickOnButton(EO){
        //ф-ция вызывается при нажатии кнопки Удалить
        this.props.cbDeleteItem(this.props.nameItem);
    },

    getClassName: function(){
        //ф-ция возвращает название класса для выделенной строки
        if(this.props.selectedItemName==this.props.nameItem){
            return "itemComponent_clicked";
        }else {
            return null;
        }
    },

    render: function(){

        return React.DOM.tr(null,
            React.DOM.td({onClick: this.clickOnItem, className: this.getClassName()}, this.props.nameItem),   //наименование товара
            React.DOM.td({onClick: this.clickOnItem, className: this.getClassName()}, this.props.priceItem),  //цена товара
            React.DOM.td({onClick: this.clickOnItem, className: this.getClassName()}, 
                React.DOM.a({href: this.props.imgPathItem}, this.props.nameItem)),    //ссылка на товар
            React.DOM.td({onClick: this.clickOnItem, className: this.getClassName()}, this.props.itemsInStorage),  //кол-во единиц на складе
            React.DOM.td(null,
                React.DOM.input({type: "button", value: "Удалить", onClick: this.clickOnButton}),   //кнопка Удалить
            ),
        )
    },
});