import { useState, useEffect } from 'react';

import Spinner from '../spinner/Spinner'
import ErrorMessage from '../error/error'

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

import useMarvelService from '../../services/MarvelService';

import setContent from '../../utils/setContent'

const RandomChar = () => {

    
    // componentDidMount() {
    //     this.UpdateChar()
    // }
    

    useEffect(() => {
        UpdateChar();
    },[]) 


    // state = {
    //     data: {},
    //     loading: true,
    //     error: false
    // }

    const [data, setChar] = useState({});
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(false);


    
    const {loading, error, getCharacters, clearError, process, setProcess} = useMarvelService()

    const UpdateChar = () => {
        clearError();
        const id = Math.floor(Math.floor(Math.random() * (1011400 - 1011000) + 1011000))
        getCharacters(id)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'))
            // .catch(onError)
    }

    const onCharLoaded = (data) => {
        setChar(data);
        // setLoading(false);

        // this.setState({ 
        //     data,
        //     loading: false
        //     })
    }

    // const onError = () => {

    //     setLoading(false);
    //     setError(true);

    //     // return this.setState({
    //     //     loading: false, 
    //     //     error: true
    //     //     })
    // }

        // const {data, loading, error} = this.state;
        // const errorMessage = error ? <ErrorMessage/> : null
        // const spinner = loading ? <Spinner/> : null
        // const content = !(loading || error) ? <View data = {data}/>  : null


    return (
        
        <div className="randomchar">
            {/* {content}
            {errorMessage} 
            {spinner}  */}

            {setContent(process, View, data)}
                        
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main"  onClick={UpdateChar}>
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
}

const View = ({data}) => {

    const {thumbnail, wiki, description, name, homePage} = data;
    
    let imgStyle = {'objectFit' : 'cover'};
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'contain'};
    }
    
    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className="randomchar__img" style={imgStyle}/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">{description}</p>
                <div className="randomchar__btns">
                    <a href={homePage} className="button button__main">
                        <div className="inner">Home Page</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;