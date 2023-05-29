import { HashRouter as Router, Route, Routes } from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";

import { MainPages, ComicsPage, Page404, SingleComic } from '../../pages'


const App = () => {    

    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <MainPages />
                <main>
                    <Routes>
                        <Route path='/' element={<MainPages />}/>   
                        <Route path='/comics' element={<ComicsPage />} />
                        <Route path="/comics/:comicId" element={<SingleComic/>} />
                        <Route path= '*' element = {<Page404 />}/>
                    </Routes>
                </main>
            </div>
        </Router>
    )
}

// "homepage" : "https://toshapa.github.io/udemy_react_002/",  --openssl-legacy-provider start

export default App;