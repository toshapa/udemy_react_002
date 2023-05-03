import MarvelService from '../../services/MarvelService';
import Spinner  from "../spinner/Spinner.js";
import ErrorMessage from '../error/error';

import './charList.scss';
import React, { Component } from 'react';


class CharList extends Component {

    constructor(props) {
        super(props)
        // this.focusRef = React.createRef()
    }

    state = {
        charList: [],
        loading: false,
        error: false,
        newItemLoading: false,
        offset: 1,
        charEndead: false,
        // focus: falses
    }

    
    

    MarvelService = new MarvelService()

    componentDidMount() {
        this.onRequestNewChar()
        
    }
    
    onRequestNewChar = (offset) => {
        this.onCharListLoading()
        this.MarvelService.getAllCharacters(offset)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }

    onCharLoaded = (newCharList) => {
        let endead = false
        if (newCharList.length < 9) {
            endead = true
        }
        this.setState(({offset, charList}) => ({
            charList: [...charList, ...newCharList],
            loading: false,
            newItemLoading: false,
            offset: offset + 9,
            charEndead: endead
        }
        ))
    }

    

    onCharListLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }

    onError = () => {
        return this.setState({
            loading: false, 
            error: true
            })
    }

    activeRed = []

    pushActiveRedItems = (ref) => {
        this.activeRed.push(ref)
    }

    onFocusItem = (id) => {
        this.activeRed.forEach(items => {items.classList.remove('char__item_selected')})
        this.activeRed[id].classList.add('char__item_selected')
    }



    renderItems (arr) {
        let character = arr.map((item, i) => {
            
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
            let {id, thumbnail, name} = item
            return (
                <li className="char__item" 
                key = {id}
                onClick = {() => {this.props.onSelectedChar(id)}}
                ref = {this.pushActiveRedItems}
                onPointerEnter = {(e) => {
                    // this.props.onCharSelected(item.id)
                    this.onFocusItem(i)
                }}
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

    render () {

        
        const {charList, loading, error, newItemLoading, offset, charEndead} = this.state;
        
        
        const items = this.renderItems(charList);
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
                    onClick={() => this.onRequestNewChar(offset)}
                    >
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;