import { useState } from "react";


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

    return (
        <>  
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