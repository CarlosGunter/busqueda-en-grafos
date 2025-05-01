import { SUCCESSORS } from '../graph'

export function searchAncho ({ nodeI, nodeF, direction }) {
  // Validaciones iniciales
  if (nodeI === nodeF) {
    return {
      type: 'table',
      table: [{ node: nodeF, revisado: true, previousNode: null }],
      route: [nodeF],
      finalNode: nodeF
    }
  }

  if (nodeI > 27 || nodeF > 27) {
    return {
      type: 'table',
      route: [],
      table: [{ node: nodeI, revisado: false, previousNode: null }],
      finalNode: nodeF
    }
  }

  const nodesTraveled = [{ node: nodeI, revisado: false, previousNode: null }]
  let foundNode = false
  let currentNode = nodeI

  while (!foundNode) {
    // Se cambia al estado de revisado
    const currentNodeIndex = nodesTraveled.findIndex(
      node => node.node === currentNode
    )
    nodesTraveled[currentNodeIndex].revisado = true
    // Se verifica si el nodo actual es el nodo final
    if (currentNode === nodeF) {
      foundNode = true
      break
    }
    // Se obtiene los sucesores del nodo actual
    const nextNodes = direction === 'normal'
      ? SUCCESSORS[currentNode]
      : SUCCESSORS[currentNode].toReversed()
    // Si no hay sucesores se termina la busqueda
    if (!nextNodes) {
      break
    }
    // Agregar sucesores a la lista de nodos recorridos
    nextNodes.forEach(successor => {
      if (!nodesTraveled.some(node => node.node === successor)) {
        nodesTraveled.push({
          node: successor,
          revisado: false,
          previousNode: currentNode
        })
      }
    })
    // Se busca y actualiza el siguiente nodo a revisar
    currentNode = nodesTraveled.find(node => !node.revisado)?.node
  }
  // Se crea la ruta de la busqueda
  const route = []
  let flagNode = nodeF
  while (flagNode !== nodeI) {
    const { node, previousNode } = nodesTraveled.find(
      node => node.node === flagNode
    )
    route.unshift(node)
    flagNode = previousNode
  }
  route.unshift(nodeI)

  return {
    type: 'table',
    table: nodesTraveled,
    route,
    finalNode: nodeF
  }
}
