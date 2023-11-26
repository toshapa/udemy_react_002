import React, { useMemo } from 'react';
import { useState, useEffect, useRef } from 'react';

import useMarvelService from '../../services/MarvelService';
import Spinner  from "../spinner/Spinner.js";
// import Skeleton from '../skeleton/Skeleton.js';
import ErrorMessage from '../error/error';
// import setContent from '../../utils/setContent';

import './charList.scss';


const setContent = (process, Component, newItemLoading) => {
    console.log(process)
    switch (process) {
        case 'waiting' : 
            return <Spinner />
        case 'loading' : 
            return newItemLoading ? <Component /> : <Spinner />
        case 'confirmed' :
            return <Component /> 
        case 'error' : 
            return <ErrorMessage />
        default :
            throw new Error ('Shoto ne to')
    }
}


const CharList = (props) => {
    const [charList, setCharList] = useState([]);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(false);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(9);
    const [charEndead, setCharEndead] = useState(true);

    // state = {
    //     charList: [],
    //     loading: false,
    //     error: false,
    //     newItemLoading: false,
    //     offset: 1,
    //     charEndead: false,
    // }

    const {loading, error, getAllCharacters, process, setProcess} = useMarvelService();
    console.log(process)
    

    useEffect(() => {
        return onRequestNewChar(offset, false)
    }, []);


    // componentDidMount() {
    //     this.onRequestNewChar()
    // }
    
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
        // setLoading(false);
        setNewItemLoading(false);
        setOffset(offset => offset + 9);
        setCharEndead(endead)
    }

    const onRequestNewChar = (offset, load) => {
        load ? setNewItemLoading(false) : setNewItemLoading(true)
        // onCharListLoading()
        // setNewItemLoading(true)
        // console.log(`newChar: ${offset}`)
        getAllCharacters(offset)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'))
            // .catch(onError)
    }

    // const onCharListLoading = () => {

    //     setNewItemLoading(true);

    //     // setState({
    //     //     newItemLoading: true
    //     // })
    // }

    // const onError = () => {
    //     // return this.setState({
    //     //     loading: false, 
    //     //     error: true
    //     //     })

    //     setError(true);
    //     setLoading(loading => false)
    // }

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

    // const elements = useMemo(() => {
    //     return setContent(process, renderItems(charList))
    // }, [process])

    
    // const {charList, loading, error, newItemLoading, offset, charEndead} = this.state;
    
    // const items = renderItems(charList);


    // const errorMessage = error ? <ErrorMessage/> : null;
    // const spinner = loading && !newItemLoading ? <Spinner/> : null;
    // const content = !(loading || error) ? items : null;
        return (
            <div className="char__list">
                    {/* {items} */}
                    {/* {errorMessage}
                    {spinner}
                    {content} */}
                    {setContent(process, () => renderItems(charList), newItemLoading)}
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