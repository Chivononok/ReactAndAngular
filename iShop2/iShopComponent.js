var IShopComponent = React.createClass({
    displayName: "IShopComponent",

    propTypes:{
        shopName: React.PropTypes.string.isRequired,
        items: React.PropTypes.arrayOf(React.PropTypes.shape())
    },

    getInitialState: function(){
        return {
            shopItems: this.props.items,
            selectedItemName: null,
        };
    },

    itemSelected: function(itemName){
        //ф-ция вызывается при клике на строку таблицы, выделяет/снимает_выделение со строки
        if (this.state.selectedItemName==itemName) {
            //повторный клик по выделенной записи снимаает выделение
            this.setState({selectedItemName: null});
        } else {
            this.setState({selectedItemName: itemName});
        }
    },

    ask4delete: function(itemName){
        //ф-ция вызывается при нажатии кнопки Удалить
        var res = confirm("Вы уверены, что хотите удалить запись " + itemName + "?");
        if (res) {
            var tmpArr = this.state.shopItems.filter(v => v.nameItem != itemName);
            this.setState({shopItems: tmpArr});
        }
    },

    render: function(){

        var tableHeaders = [];
        var tableLines = [];

        //=== заголовок таблицы ===
        var header = React.DOM.tr({key: 1},
            React.DOM.th({className: "IShopTableHeadTh"}, "Название"),
            React.DOM.th({className: "IShopTableHeadTh"}, "Цена"),
            React.DOM.th({className: "IShopTableHeadTh"}, "URL картинки"),
            React.DOM.th({className: "IShopTableHeadTh"}, "Кол-во на складе"),
            React.DOM.th({className: "IShopTableHeadTh"}, "Кнопка")
        );
        tableHeaders.push(header);
        //=========================

        tableLines = this.state.shopItems.map(v => 
            React.createElement(ItemComponent, {
                key:v.nameItem, 
                nameItem: v.nameItem, 
                priceItem: v.priceItem, 
                imgPathItem: v.imgPathItem, 
                itemsInStorage: v.itemsInStorage,
                selectedItemName: this.state.selectedItemName,
                cbSelected: this.itemSelected,  
                cbDeleteItem: this.ask4delete,
            }),
        );

        return React.DOM.div({className: "IShopComponent"},
            React.DOM.h1(null, this.props.shopName),   //название магазина
            React.DOM.table({className:"IShopTable"},
                React.DOM.thead(null, tableHeaders),    //отображаем заголовк таблицы
                React.DOM.tbody(null, tableLines)       //отображаем тело таблицы
            ),  
        );
    },
})