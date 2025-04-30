// Validacion de los inputs para solo permitir numeros del 1 - 28
const validation = (event) => {
  const range = /^1[0-9]|^2[0-8]|^[1-9]$/
  event.target.value = event.target.value.match(range)
}

export default function Form ({ handleSubmit, onChangeSearch }) {
  return (
    <form onSubmit={handleSubmit}>
      <h3>Parámetros</h3>
      <div>
        <label>
          <span>Busqueda: </span>
          <select name='searchType' defaultValue='maxPend' onChange={onChangeSearch}>
            <option value='ancho'>A lo ancho</option>
            <option value='profundidad'>En profundidad</option>
            <option value='maxPend'>Maxima Pendiente</option>
            <option value='simple'>Escalada simple</option>
            <option value='primMej'>Primero mejor</option>
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
  )
}
