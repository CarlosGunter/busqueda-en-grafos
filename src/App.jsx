import { useState } from 'react'
import './App.css'
import { search } from './Model/search'
import Nodes from './components/nodes'

function App () {
  const [result, getResult] = useState(false)
  const handleSubmit = (event) => {
    event.preventDefault()
    const inputs = new window.FormData(event.target)
    const nodeI = parseInt(inputs.get('initialNode')) - 1
    const nodeF = parseInt(inputs.get('finalNode')) - 1
    const direction = inputs.get('direction')
    getResult(search({ nodeI, nodeF, direction }))
  }

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
          <select name="direction">
            <option value="normal">Horario</option>
            <option value="reverse">Antihorario</option>
          </select>
        </label>
        <button type='submit'>Buscar</button>
      </form>
      {
        result
          ? <Nodes result={result}></Nodes>
          : null
      }
    </>
  )
}

export default App
