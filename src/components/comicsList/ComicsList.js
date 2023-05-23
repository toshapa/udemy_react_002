import './comicsList.scss';
import uw from '../../resources/img/UW.png';
import xMen from '../../resources/img/x-men.png';

import Spinner from '../spinner/Spinner';

import useMarvelService from '../../services/MarvelService';
import { useEffect, useRef, useState } from 'react';

const ComicsList = () => {

    const [offset, setOffset] = useState(8);
    const [comicsList, setNewComicsList] = useState([]);
    const [loadSpinner, setLoadSpinner] = useState(true)

    const {getComics, loading} = useMarvelService();

    useEffect(() => {
        onRequestNewListComcics()
    }, []);
    
    const onRequestNewListComcics = () => {
        setOffset(offset => offset + 8)
        getComics(offset)
        .then(setNewComicsList)
    }

    const activeRed = useRef([]);


    const onFocusItem = (id) => {
        activeRed.current.forEach(items => {items.classList.remove('comics__item-img__selected')})
        activeRed.current[id].classList.add('comics__item-img__selected')
        activeRed.current[id].focus();
    }

    const getNewComics = () => {
        onRequestNewListComcics()
        console.log(offset)
        
    }

    const renderComcicsList = (comics) => {
        // console.log(comics)
        const listOfComcics = comics.map((item, i) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.img === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'scale-down'};
            }
            return(
                <li className="comics__item" 
                    key={item.id}
                    // ref={(el) => activeRed.current[i] = el}
                    // onMouseEnter={() => onFocusItem(i)}
                    >
                    <a href={item.url}>
                        <img src={item.img} alt={item.alt} className="comics__item-img" style={imgStyle}
                            ref={(el) => activeRed.current[i] = el}
                            onMouseEnter={() => onFocusItem(i)}
                        />
                        <div className="comics__item-name">{item.title.toUpperCase()}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </a>
                </li>
            )
        })
        return (
            <ul className="comics__grid">
                {listOfComcics}
            </ul>
        )
    }

    

    const comics = renderComcicsList(comicsList);
    const spinner = loading && loadSpinner ? <Spinner /> : null;
    return (
        <div className="comics__list">
            {/* <ul className="comics__grid"> */}
                {comics}
                {spinner}
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
            <button className="button button__main button__long"
                onClick={() => getNewComics()}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;