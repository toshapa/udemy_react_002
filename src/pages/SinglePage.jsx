import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import useMarvelService from "../services/MarvelService";

import Spinner from "../components/spinner/Spinner";
import ErrorMessage from "../components/error/error";
import AppBanner from "../components/appBanner/AppBanner";


const SinglePage = ({component, dataType}) => {

    console.log(dataType)

    const {id} = useParams()
    const [data, setData] = useState()
    const {error, loading, getComic, getCharacters, clearError} = useMarvelService()

    useEffect(() => {
        UpdateData()
    }, [id])

    const UpdateData = () => {
        clearError();

        switch(dataType) {
            case 'comic' : getComic(id).then(onDataLoaded)
            break
            case 'character' : getCharacters(id).then(onDataLoaded) 
        }
    }

    const onDataLoaded = (data) => {
        setData(data)
    }
    
    return
}

export default SinglePage;