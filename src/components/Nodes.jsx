import { useEffect, useState } from 'react'
import { Bracket } from '../assets/svg'

export default function Nodes ({ result }) {
  // Estado del tipo de busqueda que se obtuvo en el algoritmo
  const [status, setStatus] = useState(null)
  useEffect(() => {
    setStatus('Completa')
    if (result.search === false) setStatus('Fallida')
    if (result.search === 'partial' || Number.isInteger(result.search)) {
      setStatus('Parcial')
    }
  }, [result.search])

  return (
      <div className='route'>
        <h2>Busqueda {status}</h2>
        <div className="diagram">
          {
            // Iteracion de la ruta de nodos
            [...result.route].map(nodes => {
              // Evita que se impriman los nodos que no tengan sucesores
              // en la ruta
              if (!result.successors[nodes.node]) return ''

              // Imprime los el nodo actual y sus sucesores
              return (
                <div key={nodes.node} className="relation">
                  <div>
                    {nodes.node + 1}
                    <span className="distance">{nodes.distance}</span>
                  </div>
                  <Bracket></Bracket>
                  <Successors result={result} nodes={nodes}></Successors>
                </div>
              )
            })
          }
        </div>

        <div className='table'>
          <h3>Tipo de sucesores {'('}Comparacion de distancias{')'}</h3>
          <p><span className='color aqua'></span><span className='bold'>Sucesor </span>{' < '} Sucesores, Nodo actual</p>
          <p><span className='color red'></span>Sucesores{' > '}<span className='bold'>Sucesor</span>{' > '}Nodo actual</p>
          <p><span className='color yellow'></span>Nodo previo</p>
        </div>

        <section className="widget">
          {
            // Imprime la ruta de la busqueda
            [...result.route].length === 1
              ? <div className="one_node">{[...result.route][0].node + 1}</div>
              : [...result.route].map(nodes => {
                  return (
                <div key={nodes.node} className="node">{nodes.node + 1}</div>
                  )
                })
          }
        </section>

      </div>
  )
}

function Successors ({ result, nodes }) {
  return (
    <div>
      {
        // Iteracion de los sucesores en el nodo actual
        result.successors[nodes.node]?.values.map((successor, index) => {
          let typeNode = ''
          // Si el sucesor se encuentra en la ruta sera el nodo siguiente
          // se colorea de color azul
          if (result.route.find(n => n.node === successor)) typeNode = 'next_node'
          // Si el sucesor es igual a el nodo previo se pinta de amarillo
          if (nodes.previousNode === successor) typeNode = 'prev_node'
          // Se evalua si la busqueda es parcial y si el nodo que tiene
          // la distancia menor entre los sucesores, pero tambien tiene
          // una distancia mayor al nodo actual, es igual al sucesor
          // se colorea de rojo
          if (result.search === successor) typeNode = 'parcial_node'

          // Imprime los sucesores y sus distancias respecto al nodo final
          return (
            <p key={successor} className={typeNode}>
              {successor + 1}
              <span className="distance">
                {result.successors[nodes.node]?.distances[index]}
              </span>
            </p>
          )
        })
      }
    </div>
  )
}
