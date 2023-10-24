import { useState, useEffect}  from 'react';
import useMarvelService from '../../services/MarvelService';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../error/error';
import Skeleton from '../skeleton/Skeleton';



import './charInfo.scss';
// import thor from '../../resources/img/thor.jpeg';



const CharInfo = (props) => {
    const [char, setChar] = useState(null);
    const [comicsList, setComicsList] = useState([]);
    // const [loading, setLoading] = useState(false);
    // const [error, setError] = useState(false);

    // state = {
    //     char: null,
    //     loading: false,
    //     error: false
    // }

    // eslint-disable-next-line
    const {loading, error, getCharacters, clearError, getCharacterComic} = useMarvelService();

    // componentDidMount() {

    //     this.UpdateChar()
    const onRequestNewListComics = (charId) => {
        getCharacterComic(charId.toString())
        .then(setComicsList)
    }
    useEffect(() => {
        UpdateChar()
        if (props.charId === null) {
            return
        }
        onRequestNewListComics(props.charId)
    }, [props.charId])


    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // componentDidUpdate(prevProps) {
    //     if (this.props.charId !== prevProps.charId) {
    //         this.UpdateChar()
    //     }
    // }

    const UpdateChar = () => {
        const {charId} = props
        if (!charId) {
            return
        }

        // onCharLoading()
        clearError()
        getCharacters(charId)
            .then(onCharLoaded)
            // .catch(onError)
    }

    const onCharLoaded = (char) => {
        setChar(char)
        // setLoading(false)

        // this.setState({ 
        //     char,
        //     loading: false
        //     })
    }

    // const onCharLoading = () => {
        
    //     // setLoading(true)
    //     // this.setState({
    //     //     loading: true
    //     // })
    // }
    
    // const onError = () => {
    //     // return this.setState({
    //     //     loading: false, 
    //     //     error: true
    //     //     })
    //     setError(true);
    //     setLoading(false);
    // }

        
        // const {char, error, loading} = this.state
        const skeleton = char || error || loading ? null : <Skeleton/>
        const errorMessage = error ? <ErrorMessage/> : null
        const spinner = loading ? <Spinner/> : null
        const content = !(loading || error || !char) ? <View char = {char} comic = {comicsList}/>  : null
        return (
            <div className="char__info">
                {skeleton}
                {errorMessage}
                {spinner}
                {content}
            </div>
        )
}

const View = ({char, comic}) => {
    const {description, name, thumbnail, wiki, homePage} = char
    let imgStyle = {'objectFit' : 'cover'};
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'contain'};
    }

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt="abyss" style={imgStyle}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homePage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {
                    comic.map(({title, urls}, i) => {
                        return (
                            <li className="char__comics-item" key={i}>
                                <a href={urls}>{title}</a>
                            </li>
                        )
                    })            
                }
            </ul>
        </>
    )
}

export default CharInfo;