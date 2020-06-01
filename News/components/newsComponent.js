import React from 'react';
import PropTypes from 'prop-types';

import './newsComponent.css';

class newsComponent extends React.Component{

    state = {
       resultText: "",
    }

    convert2Hash = (txt) =>{
        //ф-ция переводит строку в хеш с ключами 'span' и 'a', значение хэша - значение тегов в строке (для тега <a> значение href)
        let indexKeyS = txt.indexOf('<span');   //начало тега <span
        let indexKeyE = txt.indexOf('>', indexKeyS);    //конец тега "<span>" (закрывающая скобка)
        let indexValE = txt.indexOf('<', indexKeyE);    //конец значения для тега <span>
        let valSpan = txt.substring(indexKeyE+1, indexValE);    //текст значения в теге <span>
       
        let indexHrefStart = txt.indexOf('/wps');   //индекс начала ссылке в теге <a> (атрибут href)
        indexValE = txt.indexOf('"', indexHrefStart);   //индекс конца ссылки в href
        let valA = txt.substring(indexHrefStart, indexValE);    //значение атрибута href

        let hash = {'span':valSpan, 'a': valA}; //результат поместили в хэш и вернули его
        return hash;
    }

    getNewsText = (txt) =>{
        //ф-ция возвращает строку с телом новости
        let indexStartNews = txt.indexOf('<div id="content">');
        let indexEndNews = txt.indexOf('<div class="clr">', indexStartNews);
        let txtNews = txt.substring(indexStartNews, indexEndNews);
        
        return txtNews;
    }

    getNewsByURL = (url) => {
        fetch(url)
            .then(res => res.text())
            .then(
                (result) => {
                    let indexStart = result.indexOf('id="news"');   //индекс начала блока с новостями
                    indexStart = result.indexOf('<p>', indexStart); //индекс начала первой тега <p> в блоке новосте
                    let indexEnd = result.indexOf('</div>', indexStart);    //индекс конца блока новостей
                    let txt = result.substring(indexStart, indexEnd);   //текст со списком новостей
                    let arr = txt.split('</p>');    //разбили список новостей на массив, разделитель </p>
                    let arr2 = [];
                    //=== сделали из массива строк массив хэшей с ключами 'span' и 'a' ===
                    for (let i = 0; i < arr.length; i++) {
                        let tmpElem = this.convert2Hash(arr[i])
                        arr2.push(tmpElem);
                    }
                    //====================================================================
                    arr2.forEach(element => {
                        //перебираем все элементы массива с хэшами и отправляем запрос новости по ссылке из хэша с ключом 'a'
                        if (element.a) {
                            fetch(element.a)
                            .then(res2 => res2.text())
                            .then(
                                (result2) => {
                                    let newsText = this.getNewsText(result2);   //получили текст новости
                                    let newsInfo = 'link: ' + element.a + '\n date: ' + element.span + '\n text :' + newsText + '\n';
                                    this.setState({resultText: this.state.resultText + newsInfo});
                                },
                                (error2) => {
                                    console.log(error2)
                            });
                        }
                    });

                    console.log(arr2);
                },
                (error) => {
                    console.log(error)
                });
    }

    componentDidMount(){
        let url1 = './wps/portal/main/aboutBank/newsArchive?filter_startdate_82b6ab58-cd36-4eb8-9ebf-98216c287130=18.09.2015&filter_enddate_82b6ab58-cd36-4eb8-9ebf-98216c287130=03.12.2015';
        let url2 = './wps/portal/main/aboutBank/newsArchive?filter_startdate_82b6ab58-cd36-4eb8-9ebf-98216c287130=16.02.2016&filter_enddate_82b6ab58-cd36-4eb8-9ebf-98216c287130=07.09.2017';
        let url3 = './wps/portal/main/aboutBank/newsArchive?filter_startdate_82b6ab58-cd36-4eb8-9ebf-98216c287130=10.04.2018&filter_enddate_82b6ab58-cd36-4eb8-9ebf-98216c287130=01.02.2019';
        let url4 = './wps/portal/main/aboutBank/newsArchive?filter_startdate_82b6ab58-cd36-4eb8-9ebf-98216c287130=21.02.2019&filter_enddate_82b6ab58-cd36-4eb8-9ebf-98216c287130=31.05.2020';

        this.getNewsByURL(url1);
        this.getNewsByURL(url2);
        this.getNewsByURL(url3);
        this.getNewsByURL(url4);
    }

    render(){
        
        return (
            <div>
                <textarea name="newsInfo" defaultValue={this.state.resultText} rows="45" cols="180"></textarea>
            </div>
        ) 
    }
}

export default newsComponent;