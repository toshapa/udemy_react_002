import { Link } from 'react-router-dom';
// import { useState, useEffect } from 'react';

// import useMarvelService from '../../services/MarvelService';
// import ErrorMessage from '../../components/error/error';
// import Spinner from '../../components/spinner/Spinner';


// import AppBanner from '../../components/appBanner/AppBanner';
import './singleComic.scss';
// import xMen from '../../resources/img/x-men.png';

const SingleComic = ({data}) => {
    const {title, descr, pageCount, lang, price, img} = data

    let imgStyle = {'objectFit' : 'cover'};
        if (img === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
            imgStyle = {'objectFit' : 'scale-down'};
            return (<div className="single-comic"></div>)
        }
    // const {comicId} = useParams();
    // const [comic, setComic] = useState(null);
    // const {loading, error, getComic, clearError} = useMarvelService();
    // console.log(comicId)
    // useEffect(() => {
    //     updateComicPage()
    // }, [comicId])

    // const updateComicPage = () => {
    //     clearError();
    //     getComic(comicId)
    //         .then(onComicLoaded)
    // }

    // const onComicLoaded = (comic) => {
    //     return setComic(comic)
    // }

 
    // const errorMessage = error ? <ErrorMessage/> : null;
    // const spinner = loading ? <Spinner/> : null;
    // const content = !(loading || error || !comic) ? <RenderComicView comic={comic}/> : null;

    return (
        <>
            <div className='single-comic'>
                <img src={img} alt={title} style={imgStyle} className="single-comic__img"/>
                <div className="single-comic__info">
                    <h2 className="single-comic__name">{title}</h2>
                    <p className="single-comic__descr">{descr}</p>
                    <p className="single-comic__descr">{pageCount}</p>
                    <p className="single-comic__descr">{`Language: ${lang}`}</p>
                    <div className="single-comic__price">{price}</div>
                </div>
                <Link to="/comics" className="single-comic__back">Back to all</Link>
            </div>
        </>
    )
}


// const RenderComicView = ({comic}) => {
//     const {descr, id, img, lang, pageCount, price, title} = comic;
//     console.log(id)
//     let imgStyle = {'objectFit' : 'cover'};
//         if (img === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
//             imgStyle = {'objectFit' : 'scale-down'};
//         }
//     return (
        
//         <div className="single-comic">
            
//         </div>
//     )
// }
 
export default SingleComic;