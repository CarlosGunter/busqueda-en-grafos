import { DISTANCE, SUCCESSORS } from '../graph'

export function searchPrimMejor ({ nodeI, nodeF, direction }) {
  // Si el nodo inicial y el nodo final son iguales se retorna el nodo final
  if (nodeI === nodeF) {
    return {
      route: [{ node: nodeF, distance: '0 + 0 = 0' }],
      successors: {},
      search: true
    }
  }
  // Si alguno de los nodos es mayor a la cantidad de nodos disponibles
  // se indica que no es posible encontrar el nodo meta con un false
  if (nodeI > 27 || nodeF > 27) {
    return { route: [], search: false }
  }

  // Funcion heuristica
  let g = 0 // Arco del nodo previo al actual
  let h = DISTANCE[nodeI][nodeF] // Distanacia al nodo final
  let f = g + h // Funcion heuristica
  // Se agrega el nodo inicial a la ruta
  const nodesTraveled = [ // Ruta de nodos con distancia
    { node: nodeI, distance: `${g} + ${h} = ${f}` }
  ]
  const basicRoute = [nodeI] // Ruta de nodos
  // Distancias de los sucesores de cada nodo de la ruta final
  const successors = {}
  let currentNode = nodeI // El nodo actual sera iniciado en el nodo inicial
  let previousNode // Nodo anterior
  let nodeMeta = false // Determina si el nodo meta se ha encontrado

  while (!nodeMeta) {
    // Se guarda el nodo anterior
    previousNode = currentNode
    // Obtener los sucesores del nodo actual
    const successorsOfNode = direction === 'normal'
      // Sentido horario
      ? SUCCESSORS[currentNode]
      // Sentido antihorario
      : SUCCESSORS[currentNode].toReversed()
    // Si no hay sucesores se regresa una busqueda parcial
    if (!successorsOfNode) {
      nodeMeta = 'partial'
      break
    }

    // Se obtienen las distancias de cada sucesor respecto al nodo final
    const successorsF = []
    const successorsFStr = []
    successorsOfNode.forEach(succesor => {
      g = DISTANCE[currentNode][succesor]
      h = DISTANCE[succesor][nodeF]
      f = g + h

      successorsF.push(f)
      successorsFStr.push(`${g} + ${h} = ${f}`)
    })
    // Se guardan las distancias de cada sucesor respecto al nodo final
    successors[currentNode] = {
      values: successorsOfNode,
      distances: successorsFStr
    }

    // Se evalua si el nodo es meta
    if (successorsOfNode.includes(nodeF)) {
      // Se agrega el nodo a la ruta
      nodesTraveled.push({
        node: nodeF,
        distance: 0,
        previousNode
      })
      basicRoute.push(currentNode)
      nodeMeta = true // Nodo meta encontrado
    } else {
      // Se obtiene el valor menor del arreglo de la funcion heuristica
      const ignoreRepeated = successorsF.filter(item => {
        return !nodesTraveled.some(node => node.node === item)
      })
      const minDistance = Math.min(...ignoreRepeated)

      // Se agrega el nodo sucesor con la distancia menor a la ruta de nodos
      const minIndex = ignoreRepeated.indexOf(minDistance)
      nodesTraveled.push({
        node: successorsOfNode[minIndex],
        distance: minDistance,
        previousNode
      })
      basicRoute.push(successorsOfNode[minIndex])

      // El sucesor con menor distancia al nodo final se asigna como nodo actual
      currentNode = successorsOfNode[minIndex]
    }
  }
  console.log(nodesTraveled)

  // Se retorna un objeto con la ruta, los sucesores de cada nodo recorrido
  // y el estado de la busqueda
  return ({
    route: nodesTraveled,
    successors,
    search: nodeMeta,
    finalNode: nodeF
  })
}
