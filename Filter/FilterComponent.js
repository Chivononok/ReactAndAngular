var FilterComponent = React.createClass({
    displayName: "FilterComponenet",

    propTypes:{
        words: React.PropTypes.arrayOf(React.PropTypes.string)
    },

    getInitialState: function(){
        return {
            baseWords: this.props.words,
            curWords: this.props.words.slice(0),
            filterText: "",
            isSort: false,
        };
    },

    funcFilterTextChanged: function(eo){
        //ф-ция записывает в state все изменения в окне ввода
        this.setState({filterText: eo.target.value});
    },

    funcCleanTextFilter: function(){
        //ф-ция срабатывает при нажатии кнопки Сбросить: приводит список к начальному состоянию, убирает галку Сортировки
        this.setState({filterText: ""});
        this.setState({curWords: this.state.baseWords});
        this.setState({isChecked: false});
    },

    funcChangeSortFlag: function(){
        //ф-ция срабатывает при клике на чекбокс. Меняет в states признак необходимости сортировки на противоположный текущему
        if(this.state.isChecked){
            this.setState({isChecked: false});
        }else{
            this.setState({isChecked: true});
        }
    },

    funcGetWords: function(filterText){
        //ф-ция возвращает обработанный массив со словами для отображения
        function filtrFunc(v, i, a){
            return v.indexOf(filterText) >-1;
        }

        tmpArr = this.state.curWords.filter(filtrFunc); //применяем фильтр к массиву

        if(this.state.isChecked){
            //если выставлен флаг необходимости сортировки, то сортируем массив
            tmpArr.sort();
        }
        return tmpArr;
    },

    render: function(){

        var words = this.funcGetWords(this.state.filterText).join("\n");    //получаем массив со словами для отображения и приводим его в строку с разделителем 'переход на новую строку'

        return React.DOM.div(null, 
            React.DOM.input({type: "checkbox", onChange: this.funcChangeSortFlag, checked: this.state.isChecked}),
            React.DOM.input({type: "text", onChange: this.funcFilterTextChanged, value: this.state.filterText}),
            React.DOM.input({type: "button", value:"Очистить", onClick: this.funcCleanTextFilter}),
            React.DOM.div(null,
                React.DOM.textarea({className: "FilterArea", value: words}),
            ), 
        );
    },
});