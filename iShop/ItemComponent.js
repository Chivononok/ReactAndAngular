var ItemComponent = React.createClass({
    displayName: "ItemComponent",

    render: function(){

        var shopName = this.props.shopName;
        var tableHeaders = [];
        var tableLines = [];

        //=== формируем тело таблицы ====
        this.props.items.forEach(element => {
            var line = 
                React.DOM.tr({key: element.nameItem}, 
                    React.DOM.td(null, element.nameItem),   //наименование товара
                    React.DOM.td(null, element.priceItem),  //цена товара
                    React.DOM.td(null, 
                        React.DOM.a({href: element.imgPathItem}, element.nameItem)),    //ссылка на товар
                    React.DOM.td(null, element.itemsInStorage)  //кол-во единиц на складе
                )
            tableLines.push(line);  //добавляем каждую строку таблицы в массив
        });
        //==============================
        //=== заголовок таблицы ===
        var header = React.DOM.tr({key: Math.random},
            React.DOM.th(null, "Название"),
            React.DOM.th(null, "Цена"),
            React.DOM.th(null, "URL картинки"),
            React.DOM.th(null, "Кол-во на складе")
        );
        tableHeaders.push(header);
        //=========================

        return React.DOM.div({className:"ItemComponent"},
            React.DOM.h1(null, shopName),   //название магазина
            React.DOM.table({className:"ItemComponentTable"},
                React.DOM.thead(null, tableHeaders),    //отображаем заголовк таблицы
                React.DOM.tbody(null, tableLines)       //отображаем тело таблицы
            ),  
        );
    },
});