import './App.css'
import Nodes from './components/Nodes'
import { useSearch } from './hooks/useSearch'

function App () {
  const graphImg = new URL('@assets/images/mapa_grafo.jpg', import.meta.url).href
  const tableImg = new URL('@assets/images/tabla_grafo.png', import.meta.url).href

  const { result, handleSubmit } = useSearch()

  // Validacion de los inputs para solo permitir numeros del 1 - 28
  const validation = (event) => {
    const range = /^1[0-9]|^2[0-8]|^[1-9]$/
    event.target.value = event.target.value.match(range)
  }

  return (
    <main className='container'>
      <h1>Busquedas en grafos</h1>
      <div className='search'>
        <form onSubmit={handleSubmit}>
          <h3>Parámetros</h3>
          <div>
            <label>
              <span>Busqueda: </span>
              <select name='searchType'>
                <option value='maxPend' defaultChecked>Maxima Pendiente</option>
              </select>
            </label>
          </div>
          <div className='inputs'>
            <label>Inicial:
              <input name='initialNode' type='text' placeholder='1 - 28' required onKeyUp={(value) => { validation(value) }} />
            </label>
            <label>Final:
              <input name='finalNode' type='text' placeholder='1 - 28' required onKeyUp={(value) => { validation(value) }} />
            </label>
          </div>
          <label>Sentido:
            <select name='direction'>
              <option value='normal'>Horario</option>
              <option value='reverse'>Antihorario</option>
            </select>
          </label>
          <button type='submit'>Buscar</button>
        </form>

        <div className='table'>
          <h3>Tipo de sucesores (Comparacion de distancias)</h3>
          <p><span className='color aqua' /><span className='bold'>Sucesor </span>{' < '} Sucesores, Nodo actual</p>
          <p><span className='color red' />Sucesores{' > '}<span className='bold'>Sucesor</span>{' > '}Nodo actual</p>
          <p><span className='color yellow' />Nodo previo</p>
          <p><span className='color lightcoral' />Nodo meta</p>
        </div>
      </div>
      {
        result
          ? <Nodes result={result} />
          : null
      }

      <section className='image'>
        <div>
          <h3>Grafo</h3>
          <img src={graphImg} alt='Mapa del grafo' />
        </div>
        <div>
          <h3>Tabla</h3>
          <img src={tableImg} alt=' Tabla de distancias' />
        </div>
      </section>
    </main>
  )
}

export default App
