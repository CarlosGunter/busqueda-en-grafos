import { useEffect, useState } from 'react'
import { Bracket } from '../assets/svg'

export default function Nodes ({ result }) {
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
            [...result.route].map(nodes => {
              if (!result.successors[nodes.node]) return ''
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
          <p><span className='color aqua'></span>Sucesor {' < '} Sucesores, Nodo actual</p>
          <p><span className='color red'></span>Sucesores{' > '}Sucesor{' > '}Nodo actual</p>
          <p><span className='color yellow'></span>Nodo previo</p>
        </div>

        <section className="widget">
          {
            [...result.route].map(nodes => {
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
        result.successors[nodes.node]?.values.map((success, index) => {
          let typeNode = ''
          if (result.route.find(n => n.node === success)) typeNode = 'next_node'
          if (nodes.previousNode === success) typeNode = 'prev_node'
          if (result.search === success) typeNode = 'parcial_node'
          return (
            <p key={success} className={typeNode}>
              {success + 1}
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
