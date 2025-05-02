import { SUCCESSORS } from '../graph'

/**
 * Búsqueda en profundidad
 * @param {number} params.nodeI - Nodo inicial
 * @param {number} params.nodeF - Nodo final
 * @param {string} params.direction - Direccion de la búsqueda
 * @returns {object} - Resultado de la búsqueda
 * @returns {string} params.type - Tipo de UI (Tabla)
 * @returns {array} params.table - Tabla de nodos recorridos
 * @returns {array} params.route - Ruta de la búsqueda
 * @returns {number} params.finalNode - Nodo final
 */
export function searchProfundidad ({ nodeI, nodeF, direction }) {
  // Validación de caso trivial: inicio y fin son iguales
  if (nodeI === nodeF) {
    return {
      type: 'table',
      table: [{ node: nodeI, revisado: true, previousNode: null }],
      route: [nodeI],
      finalNode: nodeF
    }
  }

  // Validación de nodos fuera de rango
  if (nodeI > 27 || nodeF > 27) {
    return {
      type: 'table',
      route: [],
      table: [{ node: nodeI, revisado: false, previousNode: null }],
      finalNode: nodeF
    }
  }

  const nodesTraveled = [] // Registro de nodos recorridos con metadatos
  const visited = new Set() // Conjunto para búsqueda rápida de nodos visitados
  const stack = [{ node: nodeI, prev: null }] // Pila de DFS inicializada con el nodo inicial
  let foundNode = false // Bandera de éxito para saber si encontramos el nodo final

  // Búsqueda en profundidad
  while (stack.length > 0 && !foundNode) {
    const { node, prev } = stack.pop()

    // Si ya fue visitado, lo saltamos
    if (visited.has(node)) continue

    visited.add(node)
    nodesTraveled.push({ node, revisado: true, previousNode: prev })

    // Verificación de éxito
    if (node === nodeF) {
      foundNode = true
      break
    }

    // Obtener sucesores en el orden indicado
    const successors = direction === 'normal'
      ? SUCCESSORS[node]
      : SUCCESSORS[node]?.toReversed()

    // Agregar sucesores a la pila si no han sido visitados
    if (successors) {
      for (const succ of successors) {
        if (!visited.has(succ)) {
          stack.push({ node: succ, prev: node })
        }
      }
    }
  }

  // Si no se encontró el nodo final, retornar sin ruta
  if (!foundNode) {
    return {
      type: 'table',
      table: nodesTraveled,
      route: [],
      finalNode: nodeF
    }
  }

  // Reconstrucción de la ruta desde el nodo final hacia el inicial usando un mapa de padres
  const route = []
  let current = nodeF
  while (current !== null) {
    route.unshift(current)
    const entry = nodesTraveled.find(n => n.node === current)
    current = entry?.previousNode ?? null
  }

  return {
    type: 'table',
    table: nodesTraveled,
    route,
    finalNode: nodeF
  }
}
