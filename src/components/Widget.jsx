export default function Widget ({ route }) {
  return (
    <section className='widget'>
      {
        // Imprime la ruta de la busqueda
        route.length === 1
          ? <div className='one_node'>{route[0].node + 1}</div>
          : route.map(nodes => {
            return (
              <div key={nodes.node ?? nodes} className='node'>
                {(nodes.node ?? nodes) + 1}
              </div>
            )
          })
      }
    </section>
  )
}
