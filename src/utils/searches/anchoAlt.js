import { SUCCESSORS } from '../graph'

/**
 * Búsqueda a lo ancho
 * @param {number} params.nodeI - Nodo inicial
 * @param {number} params.nodeF - Nodo final
 * @param {string} params.direction - Direccion de la búsqueda
 * @returns {object} - Resultado de la búsqueda
 */
export function searchAncho ({ nodeI, nodeF, direction }) {
  // Validaciones iniciales
  if (nodeI === nodeF) {
    return {
      type: 'table',
      table: [{ node: nodeF, revisado: true, previousNode: 0 }],
      route: [nodeF]
    }
  }

  if (nodeI > 27 || nodeF > 27) {
    return {
      route: [],
      table: [{ node: nodeI, revisado: false, previousNode: 0 }],
      finalNode: nodeF
    }
  }

  const visited = new Set()
  const queue = [{ node: nodeI, revisado: true, previousNode: 0 }]
  const nodesTraveled = []

  let foundNode = null

  while (queue.length > 0) {
    console.log(queue)
    const current = queue.shift()

    if (visited.has(current.node)) continue
    visited.add(current.node)

    const nextNodes = direction === 'normal'
      ? SUCCESSORS[current.node]
      : SUCCESSORS[current.node].toReversed()

    if (!nextNodes) continue

    // Encolar sucesores
    nextNodes.forEach(neighbor => {
      if (!visited.has(neighbor)) {
        queue.push({
          node: neighbor,
          revisado: true,
          previousNode: current.node
        })
      }
    })

    // Guardar paso actual
    nodesTraveled.push({
      node: current.node,
      revisado: current.revisado,
      previousNode: current.previousNode
    })

    // Verifica si es el nodo meta
    if (current.node === nodeF) {
      foundNode = current
      break
    }
  }

  // Reconstruir ruta desde el nodo final al inicial
  const finalPath = []
  let currentNode = foundNode
  while (currentNode) {
    finalPath.unshift({
      node: currentNode.node,
      previousNode: currentNode.previousNode
    })
    currentNode = nodesTraveled.find(n => n.node === currentNode.previousNode)
  }

  if (!foundNode) {
    return {
      type: 'table',
      table: nodesTraveled,
      route: []
    }
  }

  return {
    type: 'table',
    table: nodesTraveled,
    route: finalPath
  }
}
