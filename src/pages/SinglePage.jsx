import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Helmet as NewHelmet } from "react-helmet";

import useMarvelService from "../services/MarvelService";

import Spinner from "../components/spinner/Spinner";
import ErrorMessage from "../components/error/error";
import AppBanner from "../components/appBanner/AppBanner";
import setContent from "../utils/setContent";


const SinglePage = ({Component, dataType}) => {

    const {id} = useParams()
    const [data, setData] = useState()
    const {error, loading, getComic, getCharacters, clearError, process, setProcess} = useMarvelService()

    useEffect(() => {
        UpdateData()
    }, [id])

    const UpdateData = () => {
        clearError();
        
        switch(dataType) {
            case 'comic' : getComic(id).then(onDataLoaded).then(() => setProcess('confirmed'))
            break;
            case 'character' : getCharacters(id).then(onDataLoaded).then(() => setProcess('confirmed'))
        }
    }

    const onDataLoaded = (data) => {
        console.log(data)
        setData(data)
    }
    const NewTitle = (data) => {
        // clearError();
        return (
            <NewHelmet>
                <title>{data?.data?.title || data?.data?.name}</title>
                <meta name="description" content={data?.data?.descr} />
            </NewHelmet>
        )   
    }
    // const errorMessage = error ? <ErrorMessage /> : null
    // const spinner = loading ? <Spinner /> : null
    // const content = !(loading || error || !data) ? <Component data={data} /> : null
    return (
        <>
            {/* <NewTitle data={data} />  */}
            <AppBanner />
            {/* {errorMessage}
            {spinner}
            {content} */}
            {setContent(process, Component, data)}
        </>
    )
        
    
}

export default SinglePage;