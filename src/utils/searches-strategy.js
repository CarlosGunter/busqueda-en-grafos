// Se importan los algoritmos de busqueda
import { searchMaxPend } from './searches/max-pend'

// Aqui se definen los algoritmos de busqueda a utilizar
// * La clave es el valor que tiene en el formulario
// * El valor es la funcion que se ejecutara
const strategys = {
  maxPend: searchMaxPend
}

/**
 *
 * @param {string} searchType - Tipo de busqueda a realizar
 * @param {number} initialNode - Nodo inicial
 * @param {number} finalNode - Nodo final
 * @param {string} direction - Direccion de la busqueda
 * @returns {Object} - Resultado de la busqueda
 */
export function searchStrategy ({
  searchType,
  nodeI,
  nodeF,
  direction
}) {
  // Se obtiene el algoritmo a utilizar
  const algorithm = strategys[searchType]
  // Se ejecuta el algoritmo y se retorna el resultado
  return algorithm({ nodeI, nodeF, direction })
}
