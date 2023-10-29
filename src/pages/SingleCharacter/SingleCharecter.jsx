import { useState, useEffect } from 'react';


import './SingleCharacter.scss'


const singleCharacter = ({data}) => {
    console.log('SingleCharacter')
    const {thumbnail} = data
return (
    <div className='single-comic'>
        <img src='' alt="" />
    </div>
)

}


export default singleCharacter