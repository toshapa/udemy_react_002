import { useState, useEffect, useRef } from 'react';

import MarvelService from '../../services/MarvelService';
import Spinner  from "../spinner/Spinner.js";
import ErrorMessage from '../error/error';

import './charList.scss';
import React from 'react';


const CharList = (props) => {

    const [charList, setCharList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(1);
    const [charEndead, setCharEndead] = useState(false);    

    // state = {
    //     charList: [],
    //     loading: false,
    //     error: false,
    //     newItemLoading: false,
    //     offset: 1,
    //     charEndead: false,
    // }

    const marvelService = new MarvelService();



    useEffect(() => {
        onRequestNewChar();
    }, []);


    // componentDidMount() {
    //     this.onRequestNewChar()
    // }
    


    const onRequestNewChar = (offset) => {
        onCharListLoading()
        marvelService.getAllCharacters(offset)
            .then(onCharLoaded)
            .catch(onError)
    }

    const onCharLoaded = (newCharList) => {
        let endead = false
        if (newCharList.length < 9) {
            endead = true
        }
        // this.setState(({offset, charList}) => ({
        //     charList: [...charList, ...newCharList],
        //     loading: false,
        //     newItemLoading: false,
        //     offset: offset + 9,
        //     charEndead: endead
        // }
        // ))

        setCharList(charList => [...charList, ...newCharList]);
        setLoading(false);
        setNewItemLoading(true);
        setOffset(offset => offset + 9);
        setCharEndead(charEndead => endead)
    }

    

    const onCharListLoading = () => {

        setNewItemLoading(true);

        // setState({
        //     newItemLoading: true
        // })
    }

    const onError = () => {
        // return this.setState({
        //     loading: false, 
        //     error: true
        //     })

        setError(true);
        setLoading(loading => false)
    }

    const activeRed = useRef([]);

    // const pushActiveRedItems = (ref) => {
    //     this.activeRed.push(ref)
    // }

    const onFocusItem = (id) => {
        activeRed.current.forEach(items => {items.classList.remove('char__item_selected')})
        activeRed.current[id].classList.add('char__item_selected')
        activeRed.current[id].focus();
    }

    const onCheckedItems = (e,b) => {
        console.log(e,b)
        props.onSelectedChar(e)
        onFocusItem(b);

    }

    const renderItems = (arr) => {
        let character = arr.map((item, i) => {
            
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
            let {id, thumbnail, name} = item
            return (
                <li className="char__item" 
                key = {id}
                // onClick = {() => {props.onSelectedChar(id)}}
                onClick={() => onCheckedItems(id, i)}
                ref = {el => activeRed.current[i] = el}
                // onPointerEnter = {(e) => {
                //     props.onSelectedChar(item.id)
                //     onFocusItem(i)
                // }}
                >
                    <img src={thumbnail} alt={name} style={imgStyle}/>
                    <div className="char__name">{name}</div>
                </li>
            )
        })
        return (
            <ul className="char__grid">
                {character}
            </ul>
        )
    }


        
    // const {charList, loading, error, newItemLoading, offset, charEndead} = this.state;
    
    
    const items = renderItems(charList);
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) ? items : null;

        return (
            <div className="char__list">
                    {errorMessage}
                    {spinner}
                    {content}
                <button 
                    className="button button__main button__long"
                    disabled={newItemLoading}
                    style={{'display': charEndead ? 'none' : 'block'}}
                    onClick={() => onRequestNewChar(offset)}
                    >
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }

export default CharList;