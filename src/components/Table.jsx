import Widget from './Widget'
import NodeTypes from './NodeTypes'

export default function Table ({ result }) {
  return (
    <div>
      <h2>Busqueda completa</h2>

      <NodeTypes
        title='Tabla de nodos'
        successor='Siguiente sucesor'
        finalNode='Nodo meta'
      />

      <div className='table'>
        <div className='column'>
          <span>Nodo</span>
          <span>Revisado</span>
          <span>Antecesor</span>
        </div>

        <div className='table_result'>
          {result.table.map((node) => {
            // Definir estilo de nodo
            let nodeStyle = ''
            if (result.route.includes(node.node)) {
              nodeStyle = 'next_node'
            }
            if (node.node === result.finalNode) {
              nodeStyle = 'final_node'
            }
            return (
              <div key={node.node} className={`column ${nodeStyle}`}>
                <span>{node.node + 1}</span>
                <span>{node.revisado ? '✔️' : '❌'}</span>
                <span>
                  {node.previousNode !== null
                    ? node.previousNode + 1
                    : 0}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      <Widget route={result.route} />

    </div>
  )
}
