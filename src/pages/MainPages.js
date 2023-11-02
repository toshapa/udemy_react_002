import { useState } from "react";
import { Helmet as NewHelmet} from "react-helmet";


import RandomChar from "../components/randomChar/RandomChar";
import CharList from "../components/charList/CharList";
import CharInfo from "../components/charInfo/CharInfo";
import SearchCharForm from "../components/searchCharForm/searchCharForm";

import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary";

import decoration from '../resources/img/vision.png';

const MainPages = () => {

    const [selectedChar, setChar] = useState(null)
    
    const onSelectedChar = (id) => {
        setChar(id)
    }

    const NewTitle = () => {
        return (
            <NewHelmet>
                <title>Marvel information portal</title>
                <meta name="description" content="Marvel information portal" />
            </NewHelmet>
        )
    }

    return (
        <>  
            <NewTitle />
            <ErrorBoundary>
                <RandomChar />  
            </ErrorBoundary>
            <div className="char__content">
                <ErrorBoundary>
                    <CharList onSelectedChar = {onSelectedChar}/>
                </ErrorBoundary>
                <div 
                    style={{
                        position: 'sticky',
                        top: 0
                    }}
                >
                    <ErrorBoundary>
                        <CharInfo charId = {selectedChar}/>
                        <SearchCharForm />
                    </ErrorBoundary>
                </div>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    )

}

export default MainPages;