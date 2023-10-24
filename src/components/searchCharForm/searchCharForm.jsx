import { useState, useEffect } from "react";
import { Formik, Form, ErrorMessage as FormikErrorMesage, Field } from "formik";
import { Link } from "react-router-dom";

import useMarvelService from '../../services/MarvelService';
import ErrorMessage from "../error/error";

import './searchformchar.scss';


const SearchCharForm = () => {

    const [char, setChar] = useState(null)
    const {getCharacterByName, clearError} = useMarvelService()
    
    const onCharLoaded = (name) => {
        setChar(name)
    }

    const UpdateChar = ({charName}) => {
        clearError();
        getCharacterByName(charName)
            .then(onCharLoaded);
    }

    const validateCharName = (value) => {
        let error = '';
        if(!value) {
            error = 'You need to fill it'
        } else if (!/^[a-zA-Z]/.test(value)) {
            error = 'Latin, please!'
            return error
        }
        // UpdateChar(value)
        return error;
    }
    const errorMessage = <div className="char__search-critical-error"><ErrorMessage /></div>
    const results = !char ? null : char.length > 0 ? 
        <div className="char__search-wrapper">
            <div className="char__search-success">There is, visit to {char[0].name} page</div>
            <Link className='button button__secondary' to = {`/charcter/${char[0].id}`}>
                <div className="inner">To Page</div>
            </Link>
        </div> : <div className="char__search-error">The character was not found. Check the name and try again</div>

    return (
        <div className="char__search-form">
            <Formik
                initialValues={{
                    charName: ''
                }}
                onSubmit={(values)=> {UpdateChar(values)}}>

                {(errors, touched) =>(
                    <Form>
                        <label className="char__search-label" htmlFor="charName">Or find a character by name:</label>
                        <div className="char__search-wrapper">
                            <Field 
                                id = 'charName'
                                name = 'charName'
                                type = 'text'
                                placeholder = 'Enter name'
                                validate = {validateCharName}
                            />
                            {errors.charName && touched.charName && <div>{errors.charName}</div>}
                            <button 
                                className="button button__main"
                                type="submit"
                            >
                                <div className="inner">find</div>
                            </button>
                        </div>
                        <FormikErrorMesage component='div' className="char__search-error" name="charName"/>
                    </Form>
                )}
            </Formik>
            {results}
            {errorMessage}
        </div>
    )
}

export default SearchCharForm;