export default function Table ({ result }) {
  return (
    <div>
      <h2>Busqueda completa</h2>
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
    </div>
  )
}
