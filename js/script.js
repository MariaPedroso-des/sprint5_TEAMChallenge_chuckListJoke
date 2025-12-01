//Click , addEventListener, fetch API
//LocalStorage con los chistes traídos con fetch: getItem y setItem
//Renderizar los chistes en el DOM

//1RO ELEMENTOS DOM
const btnObtenerChiste = document.getElementById('fetchJoke')
const listaChistes = document.getElementById('jokeList')

//2DO LOCALSTORAGE
const getJokes = () => {
  let chistesGuardados = localStorage.getItem('chuckNorrisJokes')
  return chistesGuardados ? JSON.parse(chistesGuardados) : []
}

let chistes = getJokes()                //declaramos esto y no un array vacío porque aquí queremos guardar los datos que están en el localStorage y hemos recuperado con la función getJokes

const setJokes = (chistes) => {        //guardamos los chistes en el localStorage
  localStorage.setItem('chuckNorrisJokes', JSON.stringify(chistes))
}


//3RO, ACTUALIZAMOS DOM. Empezando por limpiar la lista, recorremos chistes con forEach, le pasamos los parámetros, por un lado, lo que recorremos que es el textoChiste y por otro lo que necesitaremos para borrarlos, conociendo su índice gracias al botón que llevará cada chiste.
function renderizarLista() {
  listaChistes.innerHTML = ''
  
  chistes.forEach((textoChiste, index) => {
    
    const li = document.createElement('li')
    li.classList.add('listado')
    li.textContent = textoChiste;
    
    const btnBorrar = document.createElement('button')
    btnBorrar.classList.add('btn-borrar')
    btnBorrar.textContent = 'Eliminar chiste'
    
    btnBorrar.addEventListener('click', () => {
      chistes.splice(index, 1)                //aquí eliminamos el chiste del array global, pasándole el índice(su posición) y la cantidad (1)
      setJokes(chistes)                       //aquí guardamos la versión actualizada del localStorage
      renderizarLista()                       //renderizamos en el DOM
    })
    
    li.appendChild(btnBorrar)
    listaChistes.appendChild(li)
  });
};
renderizarLista()

btnObtenerChiste.addEventListener('click', () => {
  fetch('https://api.chucknorris.io/jokes/random')
  .then(response => {
    if(!response.ok) {
      throw new Error (`Error de red: ${response.status}`);
    }
    return response.json()
  })
  .then (data => {
    chistes.push(data.value)                 //añade chiste al array global(chistes). Como no va a tener nada de primeras, podemos hacer push.
    setJokes(chistes)                       //volvemos a hacer lo de antes, guardamos el array en el localStorage
    renderizarLista()                      //
  })
  .catch (error => {
    console.error('Ha habido un problema: ', error)
  })
})
