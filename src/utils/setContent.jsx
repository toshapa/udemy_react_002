import Skeleton from "../components/skeleton/Skeleton";
import Spinner from "../components/spinner/Spinner";
import ErrorMessage from "../components/error/error";


const setContent = (process, Component, data, comicList) => {
    switch (process) {
        case 'waiting' : 
            return <Skeleton />
        case 'loading' : 
            return <Spinner/>
        case 'confirmed' :
            return <Component data = {data} comic = {comicList} /> 
        case 'error' : 
            return <ErrorMessage />
        default :
            throw new Error ('Shoto ne to')
    }
}

export default setContent;