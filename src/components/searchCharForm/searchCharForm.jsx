import { useState } from "react";
import { Formik, Form, ErrorMessage as FormikErrorMesage, Field } from "formik";
import { Link } from "react-router-dom";

import { MarvelService } from '../../services/MarvelService';

import './searchformchar.scss';


const SearchCharForm = () => {

    // const [char, setChar] = useState(null);

    const validateCharName = (value) => {
        let error = '';
        if(!value) {
            error = 'hueta'
            console.log(value)
        }
        return error;
    }

    return (
        <div className="char__search-form">
            <Formik
                initialValues={{
                    charName: ''
                }}
                onSubmit={(values)=> {console.log(values)}}
                // validate={{validateCharName}}
            >
                {(errors, touched, validateField) =>(
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
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default SearchCharForm;