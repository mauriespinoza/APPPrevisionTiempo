import {crearGrafico} from  "./creaGrafico.js";


const _btnBuscar = document.getElementById('btnBuscar');
const _txtUbicacion = document.getElementById('txtUbicacion');
const URL = 'https://www.meteosource.com/api/v1/free/';
const apiKey = 'sj2c8ibylrapbyosgq0sc2kesz6ayck2ypajpkng';
const URL_FIND_PLACES = URL + 'find_places?text=' ;
const table = document.getElementById('bodyTable');
let localidades = [];
let latitude = '';
let longitud = '';
let IDLocalidad = '';
let DescLocalidad = '';
// let grafico1;
// let grafico2;
// let grafico3;
let elevation = 0;
let unidadMedida= '';
let timezone = '';
let infoGrafico =[];

function localidad(){
    const index = localidades.findIndex((el) => el.place_id == IDLocalidad);
    console.log("index: " + index);
    const localidad = localidades[index];
    console.log("lat: " + localidad.lat  + ' lon: ' + localidad.lon);
    latitude = localidad.lat;
    longitud = localidad.lon;
    DescLocalidad = localidad.name.toUpperCase();
    console.log("DescLocalidad: " + DescLocalidad);
    const URL_FIND_WEATHER = URL + `point?lat=${latitude}&lon=${longitud}&sections=current%2Cdaily&language=en&units=auto&key=${apiKey}`;
    const url = URL_FIND_WEATHER;
    console.log(`url::${url}`);
    
    let infoTemp = [];
    let infoTempGeneral = {};
    const getDataAPI= async ()=>{
        const response = await fetch(url);
        const datos = await response.json();
        
        infoTemp = datos.daily.data;
        infoGrafico = infoTemp;
        //infoTemp = datos.current;
        infoTempGeneral = datos.current;
        elevation = datos.elevation;
        unidadMedida = datos.units;
        timezone = datos.timezone;
        console.log(infoTempGeneral);
        console.log('unidadMedida:',unidadMedida);
    };
    getDataAPI()
    .then((result)=>{
        infoTemp.forEach((element)=>{
            console.log(`info.day::${element.day}`);
            console.log(`info.TempMAx::${element.all_day.temperature_max}`);
        });

      document.getElementById('rowInfo').style.display = 'flex';
      document.getElementById('rowGrafico').style.display = 'block';
      document.getElementById('tabla-contenedor').style.display = 'none';

      let tempMin_1 =   infoTemp[0].all_day.temperature_min;
      let tempMax_1 =  infoTemp[0].all_day.temperature_max;
      let tempMin_2 =   infoTemp[1].all_day.temperature_min;
      let tempMax_2 =  infoTemp[1].all_day.temperature_max;
      let lluvia_1 = infoTemp[0].all_day.precipitation.total;
      let lluviaTipo_1 = infoTemp[0].all_day.precipitation.type;
      let lluvia_2 = infoTemp[1].all_day.precipitation.total;
      let lluviaTipo_2 = infoTemp[1].all_day.precipitation.type;
      console.log("tempMin_1::",tempMin_1);

      
      const alturaLocalidad = document.getElementById('lblAltura');
      const coordenadasLocalidad = document.getElementById('lblCoordenadas');
      alturaLocalidad.innerText = 'Altura: ' + elevation;
      console.log("elevation::",elevation);
      coordenadasLocalidad.innerText = 'Coordenadas Lat: ' + latitude + '   Lon: ' + longitud;
      const date = new Date();   
      let fechaActual =date.getFullYear();
      const fecha  = document.getElementById('lblFecha');
      fecha.innerText = date;
      const obj = infoTempGeneral.temperature;
      console.log(infoTempGeneral.temperature);
      const lblLocalidad= document.getElementById('lblLocalidad');
      //lblLocalidad.innerText = _txtUbicacion.value.toUpperCase();
      lblLocalidad.innerText = DescLocalidad;
      const lblTempActual = document.getElementById('lblTempActual');
      const lblTempMin_1 = document.getElementById('lblTempMin_1');
      const lblTempMin_2 = document.getElementById('lblTempMin_2');
      const lblTempMax_1 = document.getElementById('lblTempMax_1');
      const lblTempMax_2 = document.getElementById('lblTempMax_2');
      lblTempMin_1.innerText = tempMin_1;
      lblTempMin_2.innerText = tempMin_2;
      lblTempMax_1.innerText = tempMax_1;
      lblTempMax_2.innerText = tempMax_2;

      //grid columna lluvias
      const lblLluviaCant_1 = document.getElementById('lblLluviaCant_1');
      const lblLluviaCant_2 = document.getElementById('lblLluviaCant_2');
      const lblLluviaTipo_1 = document.getElementById('lblLluviaTipo_1');
      const lblLluviaTipo_2 = document.getElementById('lblLluviaTipo_2'); 
      lblLluviaCant_1.innerText = lluvia_1;
      lblLluviaCant_2.innerText = lluvia_2;
      lblLluviaTipo_1.innerText = lluviaTipo_1;
      lblLluviaTipo_2.innerText = lluviaTipo_2;
      lblTempActual.innerText=  infoTempGeneral.temperature;

      const labels = infoTemp.map((entry) => entry.day);
      const values = infoTemp.map((entry) => entry.all_day.temperature_max);
      const valuesMin = infoTemp.map((entry) => entry.all_day.temperature_min);

      crearGrafico(infoGrafico);
    });
}

  function selectLocalidad(id){
    console.log("id: " + id);
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
        let x=0;
        const botones=null;
        document.getElementById('tabla-contenedor').style.display = 'flex';
        table.innerHTML ='';
        localidades.forEach((element, index) => {
                console.log(element.name);
                table.innerHTML += `
                <td data-label="Id">${element.place_id}</td>
                <td data-label="Nombre">${element.name}</td>
                <td data-label="Area">${element.adm_area1}</td>
                <td data-label="Provincia">${element.adm_area2}</td>
                <td data-label="Pais">${element.country}</td>
                <td data-label="Seleccionar">
                <button id="button-${index}" class="btn btn-primary">Seleccionar</button>
                </td>
                `;  // <=======
              });
        localidades.forEach((element, index) => {
                document.getElementById(`button-${index}`).addEventListener('click', () =>
                  funcionIntermedia(index)
                );
       });
    });
  });
  const funcionIntermedia = function (index) {    // <=======
    const element = localidades[index];
    console.log(`Click realizado en ${element.place_id}`);
    IDLocalidad = element.place_id;
    localidad();
    //selectLocalidad(element.place_id);
  }