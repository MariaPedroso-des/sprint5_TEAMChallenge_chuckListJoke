// click , addEventListener, fecth API
//LocalStorage con los chistes traídos con fetch
// Renderizar los chistes en el DOM
//Manejador de click en el botón "Obtener Chiste"
//Una función para obtener un chiste de Chuck Norris desde la API
//Una función para renderizar la lista de chistes en el DOM
//Una función para guardar la lista de chistes en localStorage
//Una función para cargar la lista de chistes desde localStorage




const btnObtenerChiste = document.getElementById('fetchJoke')
const listaChistes = document.getElementById('jokeList')

let chistes = []
chistes = obtenerLocalStorage()
console.log('Chistes cargados desde el local storage', chistes)

renderizarLista()

btnObtenerChiste.addEventListener('click', () => {
  console.log(chistes)
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
    guardarLocalStorage(chistes)
    console.log('guardado')
    renderizarLista()
  })
  .catch (error => {
    console.error('Habido un problema: ', error)
  })
})

const obtenerLocalStorage = () => {
  const chistesGuardados = localStorage.getItem('chuckNorrisJokes')
  return chistesGuardados ? JSON.parse(chistesGuardados) : []
}

const guardarLocalStorage = (chistes) => {
  localStorage.setItem('chuckNorrisJokes', JSON.stringify(chistes))
}

function renderizarLista() {
  listaChistes.innerHTML = ''
  chistes.forEach(textoChiste => {
    
    const li = document.createElement('li')
    li.textContent = textoChiste;

    const btnBorrar = document.createElement('button')
    btnBorrar.textContent = 'Eliminar chiste'
    
    li.appendChild(btnBorrar)
    
    listaChistes.appendChild(li)
  });
};