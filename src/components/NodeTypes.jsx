export default function NodeTypes ({
  title,
  successor,
  searchPartial,
  prevNode,
  finalNode
}) {
  return (
    <div className='table'>
      <h3>{title}</h3>
      {/* <h3>Tipo de sucesores (Comparacion de distancias)</h3> */}
      {successor && (
        <p>
          <span className='color aqua' /> {successor}
        </p>
      )}
      {/* <p>
        <span className='color aqua' />
        Sucesores{' < '}<span className='bold'>Sucesor</span>{' > '}Nodo actual
      </p> */}
      {searchPartial && (
        <p>
          <span className='color red' />
          {searchPartial}
        </p>
      )}
      {/* <p>
        <span className='color red' />
        Sucesores{' > '}<span className='bold'>Sucesor</span>{' > '}Nodo actual
      </p> */}
      {prevNode && (
        <p><span className='color yellow' />Nodo previo</p>
      )}
      {/* <p><span className='color yellow' />Nodo previo</p> */}
      {finalNode && (
        <p><span className='color lightcoral' />Nodo meta</p>
      )}
      {/* <p><span className='color lightcoral' />Nodo meta</p> */}
    </div>
  )
}
