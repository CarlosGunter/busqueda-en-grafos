import { useState } from 'react'
import './App.css'
import { search } from './utils/search'
import Nodes from './components/Nodes'

function App () {
  const graphImg = new URL('@assets/images/mapa_grafo.jpg', import.meta.url).href
  const tableImg = new URL('@assets/images/tabla_grafo.png', import.meta.url).href

  // Estado que recibe el objeto del algoritmo
  const [result, getResult] = useState(false)
  const handleSubmit = (event) => {
    event.preventDefault()
    const inputs = new window.FormData(event.target)
    // Obtener valor del nodo inicial
    const nodeI = parseInt(inputs.get('initialNode')) - 1
    // Obtener valor del nodo final
    const nodeF = parseInt(inputs.get('finalNode')) - 1
    // Obtener direccion
    const direction = inputs.get('direction')
    // Pasar parametros al algoritmo y obtener el objeto
    getResult(search({ nodeI, nodeF, direction }))
  }

  // Validacion de los inputs para solo permitir numeros del 1 - 28
  const validation = (event) => {
    const range = /^1[0-9]|^2[0-8]|^[1-9]$/
    event.target.value = event.target.value.match(range)
  }

  return (
    <>
      <h1>Busqueda - Maxima pendiente</h1>
      <form onSubmit={handleSubmit}>
        <h3>Nodo</h3>
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
    </>
  )
}

export default App
