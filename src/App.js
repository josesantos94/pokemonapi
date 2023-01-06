import './App.css';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';



function App() {
  let pokemonApi = 'http://pokeapi.co/api/v2/pokemon';
  const [list, setList] = useState([]);
  const [next, setNext] = useState(null);
  const [previous, setPrevious] = useState(null);

  function sortedArray(list) {

    const sortedArray = [...list];
    sortedArray.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });

    setList(sortedArray);

  }

  function nextPage(next) {
    setNext(next);
  }

  function previousPage(previous) {
    setPrevious(previous);
  }

   useEffect(() => {
    axios
      .get(pokemonApi).then((response) =>
        sortedArray(response.data.results),

      );
  }, []);

  useEffect(() => {
    axios
      .get(pokemonApi).then((response) =>
        nextPage(response.data.next),
      );
  }, [])

  useEffect(() => {
    axios
      .get(pokemonApi).then((response) =>
        previousPage(response.data.previous),
      );
  }, [])

  //clique vai buscar o event e com o value faz as alterações 
const handleClick = (event) => {
      
      axios.get(event.target.value).then((response) =>
        sortedArray(response.data.results),
      );
    axios.get(event.target.value).then((response) =>
        nextPage(response.data.next),
      );
    axios.get(event.target.value).then((response) =>
        previousPage(response.data.previous),
      );
  }

  return (
    <>
      <h1>Consumir api pokemon</h1>
      <hr />
      {list.map((item) => (
        <Pokemon key={item.name} data={item} />
      ))}
      <button value = {previous} onClick={handleClick} style={{ marginRight: 50 }} disabled={previous === null}>Atrás</button>
      <button value = {next} onClick={handleClick} disabled={next === null}>Frente</button>

    </>
  );
}

const Pokemon = ({ data }) => {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    axios.get(data.url).then((response) => setDetails(response.data));
  }, []);

  if (details === null) {
    return <div>-</div>;
  }
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
