import { SUCCESSORS } from '../graph'

/**
 * Búsqueda a lo ancho
 * @param {number} params.nodeI - Nodo inicial
 * @param {number} params.nodeF - Nodo final
 * @param {string} params.direction - Direccion de la búsqueda
 * @returns {object} - Resultado de la búsqueda
 * @returns {string} params.type - Tipo de UI (Tabla)
 * @returns {array} params.table - Tabla de nodos recorridos
 * @returns {array} params.route - Ruta de la búsqueda
 * @returns {number} params.finalNode - Nodo final
 */
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

  // Se inicializa la lista de nodos recorridos
  const nodesTraveled = [{ node: nodeI, revisado: false, previousNode: null }]
  // Bandera para verificar si se ha encontrado el nodo final
  let foundNode = false
  // Se inicializa el nodo actual
  let currentNode = nodeI
  // Bucle de busqueda
  while (!foundNode) {
    // Se cambia al estado a revisado del nodo actual
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
      ? SUCCESSORS[currentNode] // Sentido horario
      : SUCCESSORS[currentNode].toReversed() // Sentido antihorario
    // Si no hay sucesores se termina la busqueda
    if (!nextNodes) {
      break
    }
    // Agregar sucesores a la lista de nodos recorridos
    nextNodes.forEach(successor => {
      // Se verifica si el sucesor ya fue revisado o no
      if (!nodesTraveled.some(node => node.node === successor)) {
        nodesTraveled.push({
          node: successor,
          revisado: false,
          previousNode: currentNode
        })
      }
    })
    // Se busca y actualiza el siguiente nodo a revisar (no revisado)
    currentNode = nodesTraveled.find(node => !node.revisado)?.node
  }
  // Ruta de la busqueda
  const route = [currentNode]
  let flagNode = nodeF
  while (flagNode !== nodeI) {
    // Se busca el nodo previo en la lista de nodos recorridos
    const { previousNode } = nodesTraveled.find(
      node => node.node === flagNode
    )
    route.unshift(previousNode) // Se agrega el nodo al inicio
    flagNode = previousNode
  }

  return {
    type: 'table',
    table: nodesTraveled,
    route,
    finalNode: nodeF
  }
}
