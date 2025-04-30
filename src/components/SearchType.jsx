const searchRepresentation = {
  ancho: null,
  profundidad: null,
  simple: '(Distancia al nodo meta)',
  maxPend: '(Distancia al nodo meta)',
  primMej: 'h + g = f'
}

export default function SearchType ({ searchType }) {
  return (
    <>
      {
        searchRepresentation[searchType]
          ? <BracketsRepresentation
              representation={searchRepresentation[searchType]}
            />
          : <TableRepresentation />
      }
    </>
  )
}

function BracketsRepresentation ({ representation }) {
  return (
    <div className='search_type search_type_brackets'>
      <h3>Representación del nodo</h3>
      <p>
        Nodo
        <span className='sub'>{representation}</span>
      </p>
    </div>
  )
}

function TableRepresentation () {
  return (
    <div className='search_type search_type_table'>
      <h3>Representación del nodo</h3>
      <p>Tabla con los elementos:</p>
      <ul>
        <li>Nodo</li>
        <li>Revisado</li>
        <li>Sucesor</li>
      </ul>
    </div>
  )
}
