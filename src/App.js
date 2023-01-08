import './App.css';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';



function App() {
  let pokemonApi = 'https://pokeapi.co/api/v2/pokemon';
  const [list, setList] = useState([]);
  const [next, setNext] = useState(null);
  const [previous, setPrevious] = useState(null);

  useEffect(() => {
    axios.get(pokemonApi).then((response) => {
      setNext(response.data.next);
    });

  }, [])

  useEffect(() => {
    axios.get(pokemonApi).then((response) => {
      setPrevious(response.data.previous);
    });
  }, [])

  
  useEffect(() => {
    axios.get(pokemonApi).then((response) => {
      // reoordenando alfabeticamente nossos pokemons
      const listaSort = sortArray(response.data.results);
      const promissesArray = listaSort.map((item) => {
        return axios.get(item.url);
      });

      Promise.all(promissesArray).then((values) => setList(values));

    });
  }, []);

  function sortArray(lista) {
    const sortedArray = [...lista];
    sortedArray.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
    return sortedArray;
  }

  const handleClick = (event) => {

    const api = event.target.value;
  
      axios.get(api).then((response) => {
        setNext(response.data.next);
      });
  
        
      axios.get(api).then((response) => {
        setPrevious(response.data.previous);
      });
   
   
      axios.get(api).then((response) => {
        // reoordenando alfabeticamente nossos pokemons
        const listaSort = sortArray(response.data.results);
        const promissesArray = listaSort.map((item) => {
          return axios.get(item.url);
        });
  
        Promise.all(promissesArray).then((values) => setList(values));
  
      });
 
  }



  //clique vai buscar o event e com o value faz as alterações 
  // const handleClick = (event) => {

  //   console.log({ "Evento": event });

  //   axios.get(event.target.value).then((response) => {
  //     // reoordenando alfabeticamente nossos pokemons
  //     const sortedArray = [...response.data.results];
  //     sortedArray.sort((a, b) => {
  //       return a.name.localeCompare(b.name);
  //     }, setList(sortedArray));
  //   }),

  //     axios.get(event.target.value).then((response) => {
  //       setNext(response.data.next);
  //     }),


  //     axios.get(event.target.value).then((response) => {
  //       setPrevious(response.data.previous);
  //     })
  // }



  return (
    <>
      <h1>Consumir api pokemon</h1>
      <hr />
      <div style={{ marginTop: 100, marginBottom: 100 }}>{list.length === 0 && 'carregando pokemons...'}</div>
      {list.map((item) => (
        <Pokemon key={item.data.name} details={item.data} />
      ))},
      <button value={previous} onClick={handleClick} style={{ marginRight: 50 }} disabled={previous === null}>Atrás</button>
      <button value={next} onClick={handleClick} disabled={next === null}>Frente</button>


    </>
  )
}


const Pokemon = ({ details }) => {

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <img src={details.sprites.front_default} style={{ width: 30, marginRight: 20 }} />
      <span>
        <b>{details.name}</b> - EXP {details.base_experience}
      </span>

    </div>
  )

};


export default App;