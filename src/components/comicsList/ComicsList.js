import './comicsList.scss';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../error/error';

import useMarvelService from '../../services/MarvelService';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const setContent = (process, Component, newItemLoading) => {
    switch (process) {
        case 'waiting' : 
            return <Spinner />
        case 'loading' : 
            return newItemLoading ? <Spinner /> : <Spinner />  
        case 'confirmed' :
            return <Component /> 
        case 'error' : 
            return <ErrorMessage />
        default :
            throw new Error ('Shoto ne to')
    }
}

const ComicsList = () => {

    const [comicsList, setNewComicsList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false)
    const [comicsEnded, setComicsEnded] = useState(false);
    const [offset, setOffset] = useState(8);

    // const [loadSpinner, setLoadSpinner] = useState(true)

    const {getComics, loading, process, setProcess} = useMarvelService();

    useEffect(() => {
        onRequestNewListComics(offset, true)
        // eslint-disable-next-line
    }, []);

    const onComicsLoaded = (newComics) => {
        let ended = false;
        if (newComics.length < 8) {
            ended = true;
        }
        
        setNewComicsList([...newComics])
        setNewItemLoading(false)
        setOffset(offset + 8)
        setComicsEnded(ended)
    }

    const onRequestNewListComics = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true)
        getComics(offset)
            .then(onComicsLoaded)
            .then(() => setProcess('confirmed'))
        // .then(setNewComicsList)
        
    }

    const activeRed = useRef([]);


    const onFocusItem = (id) => {
        activeRed.current.forEach(items => {items.classList.remove('comics__item-img__selected')})
        activeRed.current[id].classList.add('comics__item-img__selected')
        activeRed.current[id].focus();
    }


    const renderComcicsList = (comics) => {
        const listOfComcics = comics.map((item, i) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.img === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'scale-down'};
            }
            return(
                <li className="comics__item" 
                    key={i}
                    // ref={(el) => activeRed.current[i] = el}
                    // onMouseEnter={() => onFocusItem(i)}
                    >
                    <Link to={`/comics/${item.id}`}>
                        <img src={item.img} alt={item.alt} className="comics__item-img" style={imgStyle}
                            ref={(el) => activeRed.current[i] = el}
                            onMouseEnter={() => onFocusItem(i)}
                        />
                        <div className="comics__item-name">{item.title.toUpperCase()}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </Link>
                </li>
            )
        })
        return (
            <ul className="comics__grid">
                {listOfComcics}
            </ul>
        )
    }

    // const comics = renderComcicsList(comicsList);
    // const spinner = loading && loadSpinner ? <Spinner /> : null;
    return (
        
        <div className="comics__list">
            {/* <ul className="comics__grid"> */}
                {/* {comics}
                {spinner} */}
                {setContent(process, () => renderComcicsList(comicsList), newItemLoading)}
                {/* <li className="comics__item">
                    <a href="#">
                        <img src={uw} alt="ultimate war" className="comics__item-img"/>
                        <div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
                        <div className="comics__item-price">9.99$</div>
                    </a>
                </li>
                <li className="comics__item">
                    <a href="#">
                        <img src={xMen} alt="x-men" className="comics__item-img"/>
                        <div className="comics__item-name">X-Men: Days of Future Past</div>
                        <div className="comics__item-price">NOT AVAILABLE</div>
                    </a>
                </li>
                <li className="comics__item">
                    <a href="#">
                        <img src={uw} alt="ultimate war" className="comics__item-img"/>
                        <div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
                        <div className="comics__item-price">9.99$</div>
                    </a>
                </li>
                <li className="comics__item">
                    <a href="#">
                        <img src={xMen} alt="x-men" className="comics__item-img"/>
                        <div className="comics__item-name">X-Men: Days of Future Past</div>
                        <div className="comics__item-price">NOT AVAILABLE</div>
                    </a>
                </li>
                <li className="comics__item">
                    <a href="#">
                        <img src={uw} alt="ultimate war" className="comics__item-img"/>
                        <div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
                        <div className="comics__item-price">9.99$</div>
                    </a>
                </li>
                <li className="comics__item">
                    <a href="#">
                        <img src={xMen} alt="x-men" className="comics__item-img"/>
                        <div className="comics__item-name">X-Men: Days of Future Past</div>
                        <div className="comics__item-price">NOT AVAILABLE</div>
                    </a>
                </li>
                <li className="comics__item">
                    <a href="#">
                        <img src={uw} alt="ultimate war" className="comics__item-img"/>
                        <div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
                        <div className="comics__item-price">9.99$</div>
                    </a>
                </li>
                <li className="comics__item">
                    <a href="#">
                        <img src={xMen} alt="x-men" className="comics__item-img"/>
                        <div className="comics__item-name">X-Men: Days of Future Past</div>
                        <div className="comics__item-price">NOT AVAILABLE</div>
                    </a>
                </li> */}
            {/* </ul> */}
            <button 
                disabled = {newItemLoading}
                style={{'display' : comicsEnded ? 'none' : 'block'}}
                className="button button__main button__long"
                onClick={() => onRequestNewListComics(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;