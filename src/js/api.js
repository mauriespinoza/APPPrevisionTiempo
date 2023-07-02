const _btnBuscar = document.getElementById('btnBuscar');
const _txtUbicacion = document.getElementById('txtUbicacion');
const URL = 'https://www.meteosource.com/api/v1/free/';
const apiKey = 'sj2c8ibylrapbyosgq0sc2kesz6ayck2ypajpkng';
const URL_FIND_PLACES = URL + 'find_places?text=' ;
const table = document.getElementById('bodyTable');
let localidades = [];
let latitude = '';
let longitud = '';


function localidad(){
    console.log('hola mundo');
}

  function selectLocalidad(id){
    const index = localidades.findIndex((el) => el.place_id == id);
    console.log("index: " + index);
    const localidad = localidades[index];
    console.log("lat: " + localidad.lat  + ' lon: ' + localidad.lon);
    this.latitude = localidad.lat;
    this.longitud = localidad.lon;
  }

  _btnBuscar.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('evento click');
    const url =URL_FIND_PLACES + `${_txtUbicacion.value}&language=en&key=${apiKey}`;
    console.log(`url::${url}`);
    const getData = async () => {
      const response = await fetch(url);
      const data = await response.json();
      localidades = data;
      console.log(`data::${localidades}`);
    };
    getData().then((result) => {
        console.log(result);
        localidades.forEach((element) => {
                console.log(element.name);
                table.innerHTML += `
                <td data-label="Nombre">${element.name}</td>
                <td data-label="Area">${element.adm_area1}</td>
                <td data-label="Provincia">${element.adm_area2}</td>
                <td data-label="Pais">${element.country}</td>
                <td data-label="Seleccionar">
                  <button onclick="selectLocalidad(${element.place_id})" class="btn btn-primary">Seleccionar</button>
                </td>
                `;
              });
    });
  
  });