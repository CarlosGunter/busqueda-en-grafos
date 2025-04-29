import './App.css'
import Brackets from './components/Brackets'
import Form from './components/Form'
import Table from './components/Table'
import { useSearch } from './hooks/useSearch'

function App () {
  const graphImg = new URL('@assets/images/mapa_grafo.jpg', import.meta.url).href
  const tableImg = new URL('@assets/images/tabla_grafo.png', import.meta.url).href

  const { result, handleSubmit } = useSearch()

  return (
    <main className='container'>
      <h1>Busquedas en grafos</h1>

      <div className='search'>
        <Form handleSubmit={handleSubmit} />
      </div>

      {result && (
        result.type === 'table'
          ? <Table result={result} />
          : <Brackets result={result} />
      )}

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
