import { useState } from "react";


import RandomChar from "../components/randomChar/RandomChar";
import CharList from "../components/charList/CharList";
import CharInfo from "../components/charInfo/CharInfo";

import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary";

import decoration from '../resources/img/vision.png';

const MainPages = () => {

    const [selectedChar, setChar] = useState(null)
    
    const onSelectedChar = (id) => {
        setChar(id)
    }

    return (
        <>  
            <ErrorBoundary>
                <RandomChar />  
            </ErrorBoundary>
            <div className="char__content">
                <ErrorBoundary>
                    <CharList onSelectedChar = {onSelectedChar}/>
                </ErrorBoundary>

                <ErrorBoundary>
                    <CharInfo charId ={selectedChar}/>
                </ErrorBoundary>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    )

}

export default MainPages;