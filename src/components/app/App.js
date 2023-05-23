import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";

import { MainPages, ComicsPage } from '../../pages'


const App = () => {    

    return (
        <Router>
            <div className="app">
                <AppHeader/>
                {/* <MainPages /> */}
                <main>
                    <Routes>
                        <Route path='/' element={<MainPages />}/>
                        <Route path='/comics' element={<ComicsPage />} />
                    </Routes>
                </main>
            </div>
        </Router>
    )
}

export default App;