import { useHttp } from "../hooks/http.hooks"


const useMarvelService = () => {

    const {loading, error, request, clearError, process, setProcess } = useHttp();


    const _totalChar = 210

    const _apiBase = 'https://gateway.marvel.com:443/v1/public'
    const _apiKey = 'apikey=12af9b7db3f6c23ab35369e22802b956'

    // const getResorces = async (url) => {
         
    //     let res = await fetch(url)
    //     if (!res.ok) {
    //         throw new Error (`Could't fetch ${url}. status ${res.status}`)
    //     }
    //     return await res.json()
    // }

    const getAllCharacters = async (Offset = _totalChar) => {
        const res = await request(`${_apiBase}/characters?limit=9&offset=${Offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter)
    }

    const getCharacters = async (id) => {
        const res = await request(`${_apiBase}/characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0])
        
    }

    const getComics = async (offset) => {
        const res = await request(`${_apiBase}/comics?limit=${offset}&${_apiKey}`)
        return res.data.results.map(_comicsForm)
    }

    const getCharacterComic = async (id) => {
        const res = await request (`${_apiBase}/characters/${id}/comics?${_apiKey}`)
        return _comicCharacterTransform(res.data.results)
    }

    const getComic = async (id) => {
        const res = await request(`${_apiBase}/comics/${id}?${_apiKey}`)
        return _comicTransform(res.data.results[0])
    }

    const getCharacterByName = async (name) => {
        const res = await request(`${_apiBase}/characters?name=${name.toLowerCase()}&${_apiKey}`)
        return (res.data.results)
    }

    const _comicsForm = (comics) => {
        return {
            url: comics.urls[0].url,
            id: comics.id,
            img: `${comics.thumbnail.path}.${comics.thumbnail.extension}`,
            title: comics.title,
            price: comics.prices[0].price,
            alt: comics.series.name
        }
    }

    const _comicCharacterTransform = (comic) => {
        let arr = []            
        arr = comic.map(({ title, urls}) => {
                return {
                    title: title,
                    urls: urls[0].url
                }
            })
        return arr
    }

    const _comicTransform = (comic) => {
        return {
            img: `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
            id: comic.id,
            title: comic.title,
            descr: comic.description || "There is no description",
            pageCount: comic.pageCount ? `${comic.pageCount} p.` : "No information about the number of pages",
            lang: comic.textObjects[0]?.language || "en-us",
            price: comic.prices[0].price ? `${comic.prices[0].price}$` : "not available"
        }
    }

    const _transformCharacter = (char) =>  {
        return {
            id: char.id,
            name: char.name,
            description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
            thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
            homePage: char.urls[0].url,
            wiki: char.urls[1].url, 
            comics: char.comics.items
        }
    }
    return {
        getAllCharacters, 
        getCharacters, 
        loading, 
        process, 
        error, 
        clearError, 
        getComics, 
        getComic, 
        getCharacterComic, 
        getCharacterByName,
        setProcess
    }
}

export default useMarvelService