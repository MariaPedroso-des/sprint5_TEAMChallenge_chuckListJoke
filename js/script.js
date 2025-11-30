// click , addEventListener, fetch API
//LocalStorage con los chistes traídos con fetch
// Renderizar los chistes en el DOM
//Manejador de click en el botón "Obtener Chiste"
//Una función para obtener un chiste de Chuck Norris desde la API
//Una función para renderizar la lista de chistes en el DOM
//Una función para guardar la lista de chistes en localStorage
//Una función para cargar la lista de chistes desde localStorage




const btnObtenerChiste = document.getElementById('fetchJoke')
const listaChistes = document.getElementById('jokeList')


btnObtenerChiste.addEventListener('click', () => {
  fetch('https://api.chucknorris.io/jokes/random')
  .then(response => {
    if(!response.ok) {
      throw new Error ('Error de red');
    }
    const data = response.json();
    return data
  })
  .then (data => {
    chistes.push(data.value)
    setJokes(chistes)
    console.log('guardado')
    renderizarLista()
  })
  .catch (error => {
    console.error('Ha habido un problema: ', error)
  })
})


const getJokes = () => {
  let chistesGuardados = localStorage.getItem('chuckNorrisJokes')
  return chistesGuardados ? JSON.parse(chistesGuardados) : []
}

let chistes = getJokes()

const setJokes = (chistes) => {
  localStorage.setItem('chuckNorrisJokes', JSON.stringify(chistes))
}


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
      chistes.splice(index, 1)
      setJokes(chistes)
      renderizarLista()
    })
    
    li.appendChild(btnBorrar)
    
    listaChistes.appendChild(li)
  });
};
renderizarLista()