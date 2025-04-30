import Widget from './Widget'

export default function Table ({ result }) {
  return (
    <div>
      <h2>Busqueda completa</h2>

      <Table
        title='Tabla de nodos'
        successor='Siguiente sucesor'
        finalNode='Nodo meta'
      />

      <div className='table_result'>
        {result.table.map((node) => {
          return (
            <div key={node.node} className='column'>
              <span>{node.node + 1}</span>
              <span>{node.revisado ? 'Revisado' : 'No revisado'}</span>
              <span>{node.antecesor + 1}</span>
            </div>
          )
        })}
      </div>

      <Widget route={result.route} />

    </div>
  )
}
