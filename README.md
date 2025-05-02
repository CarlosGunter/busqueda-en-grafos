# Algoritmos de Búsqueda en Grafos

Se implementan algunas técnicas de búsqueda en un grafo ya definido en la aplicación. Actualmente se encuentran los siguientes algoritmos implementados.
#### Búsqueda a ciegas:
- Búsqueda a lo ancho.
- Búsqueda en profundidad.
#### Búsqueda informada:
- Búsqueda escalada simple.
- Búsqueda escalada máxima pendiente.
- Búsqueda primero mejor.


### Se debe ingresar:
- Tipo de búsqueda.
- Nodo inicial.
- Nodo final.
- Sentido de la búsqueda.
  - Horario.
  - Antihorario.

## Como resultado se obtiene:
### Para la búsqueda a ciegas:
- Tabla con:
  - Nodos listados.
  - Nodos revisados.
  - Nodo antecesor del nodo revisado.
- Camino encontrado.
### Para la búsqueda informada:
- Nodos visitados.
- Nodos hijos de cada nodo visitado.
- Distancia entre nodos visitados o entre el nodo final.
- Camino encontrado.

## Grafo:
![Grafo](src/assets/images/mapa_grafo.jpg)

## Tabla de distancias:
![Tabla](src/assets/images/tabla_grafo.png)
