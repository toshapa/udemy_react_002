import ErrorMessage from "../components/error/error"
import { Link } from "react-router-dom"

const Page404 = () => {
    return (
        <>
            <ErrorMessage />
            <p style={{textAlign : 'center', fontWeight : 'bold', fontSize : '24px'}}>Page doesn't exist</p>
            <Link style={{display : 'block', textAlign : 'center', fontSize : '24px', fontWeight : 'bold', marginTop : '30px'}} to='/'>Back to main page</Link>
        </>
    )
}

export default Page404