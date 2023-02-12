// components
import { Button } from "./components/Button"
import { Card } from "./components/Card";
// styles
import './sass/App.scss'
// icons
import { TiArrowLeftOutline } from "react-icons/ti";
import { TiArrowRightOutline } from "react-icons/ti";
// Hooks
import { useState } from "react";
import { useEffect } from "react";
 

const App = ()=> {

    const [pokemonId, setPokemonId] = useState(60);
    const [pokemonEvolutions, setPokemonEvolutions] = useState([])

    useEffect(()=>{
        getEvolutions(pokemonId);
    }, [pokemonId])

    async function getEvolutions(id){
        const response = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${id}/`)
        const data = await response.json()

        let pokemonEvoArray = [];

        let pokemonLV1 = data.chain.species.name
        let pokemonLV1Img = await getPokemonImg (pokemonLV1)
        pokemonEvoArray.push([pokemonLV1,pokemonLV1Img])

        if(data.chain.evolves_to.length !== 0){
            let pokemonLV2 = data.chain.evolves_to[0].species.name;
            let pokemonLV2Img = await getPokemonImg (pokemonLV2)
            pokemonEvoArray.push([pokemonLV2,pokemonLV2Img])
            // console.log( pokemonEvoArray)

            if(data.chain.evolves_to[0].evolves_to.length !==0){
                let pokemonLV3 = data.chain.evolves_to[0].evolves_to[0].species.name;
                let pokemonLV3Img = await getPokemonImg (pokemonLV3)
                pokemonEvoArray.push([pokemonLV3,pokemonLV3Img])
            }
        }
        setPokemonEvolutions(pokemonEvoArray)
    }

    async function getPokemonImg (name){
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`)
        const data = await response.json()
        return data.sprites.other['official-artwork'].front_default;
    }
        
    

    function prevClick(){
        (pokemonId === 1)? 
        setPokemonId(1):
        setPokemonId(pokemonId - 1)
    }

    function nextClick(){
        setPokemonId(pokemonId + 1)
    }

    return(
        <div className="app">
            {/* cards */}
            <div className={`card-container card${pokemonEvolutions.length}`}>
                {pokemonEvolutions.map(pokemon => 
                <Card 
                key={pokemon[0]} 
                name={pokemon[0]} 
                img={pokemon[1]} />)}
            </div>
            <div className="buttons-container">
                <Button icon={<TiArrowLeftOutline/>} 
                handleClick={prevClick}
                />
                {/* {pokemonName} */}
                <Button icon={<TiArrowRightOutline/>}
                handleClick={nextClick} 
                />
            </div>
        </div>  
    )
} 

export {App}