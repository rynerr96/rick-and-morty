import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import ResidentInfo from './ResidentInfo';

const Location = () => {

    const [location, setLocation] = useState({});
    const [search, setSearch] = useState("");

    useEffect(() => {
        const random = Math.floor(Math.random() * 120) + 1;
        axios.get(`https://rickandmortyapi.com/api/location/${random}/`)
            .then((res) => setLocation(res.data));
    }, []);

    const searchType = () => {
        axios.get(`https://rickandmortyapi.com/api/location/${search}/`)
            .then((res) => setLocation(res.data));
    }
    // location.residents

    console.log(location)
    const [page, setPage] = useState(1)
    const lastIndex = page * 5
    const firstIndex = lastIndex - 5
    const residentsPaginated = location.residents?.slice(firstIndex, lastIndex)

    const lastPage = Math.ceil(location.residents?.length / 5)
    console.log(lastPage)
    const numbers = []
    
    for(let i = 1 ; i<= lastPage; i++){
        numbers.push(i)
    }

    return (

        <div className='contenedor-padre'>
            <div className='input'>
                <input className='input-text' type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <div className='button'>
                <button onClick={searchType}><i className="fa-solid fa-magnifying-glass" style={{ fontSize: "xx-large", color: "rgba(252, 3, 243, 0.621)" }} ></i> </button>
            </div>
            <div className='contenedor-hijo'>
                <br />
                <br />
                <div className='barra-lista'>
                    <h1 className='name'> <strong>{location.name}</strong></h1>
                    <ul className='ul-main'>

                        <li> <strong> Type: <br />  {location.type} </strong></li>
                        <li> <strong> Dimension: <br />  {location.dimension}</strong></li>
                        <li> <strong> Episodes: <br />  {
                            location.residents?.length}</strong></li>
                    </ul>

                </div>
                <div className='cards'>
                    {residentsPaginated?.map(character => (

                        <ResidentInfo character={character} key={character} />
                    ))}
                </div>
            </div>
            <br />
            <br />
            <div className='Btn-container'>
            <button className='Btn-Prev' onClick={() => setPage(page - 1)}
                disabled={page === 1}
            >Prev Page</button>
            {numbers.map(number=> (
                <button className='Btn-Numbers' onClick={() => setPage(number)} >{number}</button>
             ))}
            <button className='Btn-Next' onClick={() => setPage(page + 1)}
            disabled={page ===lastPage}
            >Next Page</button>
            </div>
        </div>
    );
};

export default Location;