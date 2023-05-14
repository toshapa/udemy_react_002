


class MarvelService {

    _totalChar = 210

    _apiBase = 'https://gateway.marvel.com:443/v1/public'
    _apiKey = 'apikey=12af9b7db3f6c23ab35369e22802b956'

    getResorces = async (url) => {
        
        let res = await fetch(url)
        if (!res.ok) {
            throw new Error (`Could't fetch ${url}. status ${res.status}`)
        }
        return await res.json()
    }

    getAllCharacters = async (Offset = this._totalChar) => {
        const res = await this.getResorces(`${this._apiBase}/characters?limit=9&offset=${Offset}&${this._apiKey}`);
        return res.data.results.map(this._transformCharacter)
        
    }

    getCharacters = async  (id) => {

        const res = await this.getResorces(`${this._apiBase}/characters/${id}?${this._apiKey}`);
        return this._transformCharacter(res.data.results[0])
        
    }

    _transformCharacter = (char) => {
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
}

export default MarvelService