import { useState } from 'react'
import { searchStrategy } from '../utils/searches-strategy'

/**
 * Hook que se encarga de obtener los resultados de búsqueda a través
 * de los datos del formulario
 */
export function useSearch () {
  // Estado que recibe el objeto del algoritmo
  const [result, setResult] = useState(null)
  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new window.FormData(e.target)
    // Se extraen los valores introducidos en el formulario
    const {
      searchType,
      initialNode,
      finalNode,
      direction
    } = Object.fromEntries(formData.entries())
    // Se convierten los valores
    const searchTypeStr = searchType.toString()
    // Se resta 1 a los nodos para ajustar el rango de 0 a 27
    const initialNodeInt = parseInt(initialNode) - 1
    const finalNodeInt = parseInt(finalNode) - 1
    const directionStr = direction.toString()
    // Se realiza la busqueda utilizando el algoritmo correspondiente
    const searchResult = searchStrategy({
      searchType: searchTypeStr,
      nodeI: initialNodeInt,
      nodeF: finalNodeInt,
      direction: directionStr
    })
    console.log(searchResult)
    // Se actualiza el estado con el resultado de la busqueda
    setResult(searchResult)
  }

  return {
    result,
    handleSubmit
  }
}
