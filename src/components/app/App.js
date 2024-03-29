import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
// import { Helmet as NewHelmet} from "react-helmet";

import AppHeader from "../appHeader/AppHeader";

// import { MainPages, ComicsPage, Page404, SingleComic } from '../../pages'
import Spinner from "../spinner/Spinner";
import SinglePage from "../../pages/SinglePage";


const MainPages = lazy(() => import ("../../pages/MainPages"));
const ComicsPage = lazy(() => import ("../../pages/ComicsPage"));
const Page404 = lazy(() => import ("../../pages/Page404"));
const SingleComic = lazy(() => import ("../../pages/singleComic/SingleComic"));
const SingleCharacter = lazy(() => import ("../../pages/SingleCharacter/SingleCharacter"));



const App = () => {    

    return (
        
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Suspense fallback={<Spinner />} >
                        <Routes>
                            <Route index path='/' element = {<MainPages />} />
                            <Route path='/comics' element = {<ComicsPage />} />
                            <Route path="/comics/:id" element = {<SinglePage Component = {SingleComic} dataType = 'comic' />} />
                            <Route path="/characters/:id" element = {<SinglePage Component = {SingleCharacter} dataType = 'character' />} />
                            <Route path= '*' element = {<Page404 />}/>
                        </Routes>
                    </Suspense>
                    {/* <Routes>
                        <Route index path='/' element={<MainPages />}/>   
                        <Route path='/comics' element={<ComicsPage />} />
                        <Route path="/comics/:comicId" element={<SingleComic/>} />
                        <Route path= '*' element = {<Page404 />}/>
                    </Routes> */}
                </main>
            </div>
        </Router>
    )
}

export default App;