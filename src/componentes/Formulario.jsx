import {useState,useEffect} from 'react'
import styles from './Formulario.module.css'

function Formulario (){

    const[name, setname]=useState('')
    const[resultados,setResultados] =useState([])
    const[cargando, setCargando] = useState(false)
    const[error, setError] = useState(null)

useEffect(()=>{
    if(name===''){
        setResultados([]);
        return;
    } else{
        setCargando(true);
        fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`)

          .then(response => {
            if (!response.ok) {
              throw new Error('Pokemon no encontrado');
            }
            return response.json();
          })
          .then(data => {
            setResultados([data]);
            setCargando(false);
            setError(null);
          })
          .catch(error => {
            setError(error.message);
            setCargando(false);
            setResultados([]);
          });
}}, [name]);

const handleSearchChange = (event) => {
    setname(event.target.value);
  };

return  (
    <>
      <div className={styles.contenedor}>
      <h1>Buscador Pokemon</h1>
      <form>
        <input
          type="text"
          placeholder="Introduce un pokemon"
          value={name}
          onChange={handleSearchChange}
        />
      </form>
      {cargando && <p>Cargando...</p>}
      {error && <p>{error}</p>}
      {resultados.length > 0 && (
        <div>
          {resultados.map(pokemon => (
            <div className={styles.contenedorPokemon} key={pokemon.id}>
              <h2>{pokemon.name}</h2>
              <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            </div>
          ))}
        </div>
      )}
      {name !== '' && resultados.length === 0 && !cargando && !error && (
        <p>No se ha encontrado ningún pokemon</p>
      )}
    </div>
    </>
)
}

export default Formulario