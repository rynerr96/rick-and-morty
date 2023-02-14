import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const ResidentInfo = ({ character }) => {
    const [characters, setCharacters] = useState({})




    useEffect(() => {
        axios.get(character)
            .then(res => setCharacters(res.data))
    }, [])
    console.log(characters)

    const getMultiply = () => {
        if (characters.status == "Alive") {
            return (
                <>
                    <img className="alive" src={characters.image} alt="" />
                </>
            )
        } else if (characters.status == "Dead") {
            return (
                <>
                    <img className="dead" src={characters.image} alt="" />

                </>
            )
        } else {
            return (
                <>
                    <img className="unknow" src={characters.image} alt="" />

                </>
            )
        }

    }



    return (
        <div className='card-characters'>
            <h1>{characters?.name}</h1>
            <q>Status: {characters.status}</q>
            {getMultiply()}
            <p>Origins name: {characters.origin?.name}</p>
            <p>Episodes: <span>{characters.episode?.length}</span></p>

        </div>
    );
};

export default ResidentInfo;