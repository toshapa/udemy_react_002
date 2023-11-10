import { Helmet as NewHelmet } from "react-helmet";

import AppBanner from "../components/appBanner/AppBanner";
import ComicsList from "../components/comicsList/ComicsList";
import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary";

const ComicsPage = () => {
    return (
        <>
            <NewHelmet>
                <title>Comic`s List Marvel</title>
                <meta name="description" content='Comic`s List Marvel' />    
            </NewHelmet> 

            <AppBanner />
            <ErrorBoundary>
                <ComicsList />
            </ErrorBoundary>
        </>
    )
}


export default ComicsPage;