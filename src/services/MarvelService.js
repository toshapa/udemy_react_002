import { useHttp } from "../hooks/http.hooks"


const useMarvelService = () => {

    const {loading, error, request, clearError} = useHttp();

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
    return {getAllCharacters, getCharacters, loading, error, clearError}
}

export default useMarvelService