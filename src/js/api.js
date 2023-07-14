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
let grafico1;
let grafico2;
let grafico3;
let elevation = 0;
let unidadMedida= '';
let timezone = '';
function localidad(){
    console.log('hola mundo');
    const index = localidades.findIndex((el) => el.place_id == IDLocalidad);
    console.log("index: " + index);
    const localidad = localidades[index];
    console.log("lat: " + localidad.lat  + ' lon: ' + localidad.lon);
    latitude = localidad.lat;
    longitud = localidad.lon;
    const URL_FIND_WEATHER = URL + `point?lat=${latitude}&lon=${longitud}&sections=current%2Cdaily&language=en&units=auto&key=${apiKey}`;
    const url = URL_FIND_WEATHER;
    console.log(`url::${url}`);
    
    let infoTemp = [];
    let infoTempGeneral = {};
    const getDataAPI= async ()=>{
        const response = await fetch(url);
        const datos = await response.json();

        infoTemp = datos.daily.data;
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
      //   //MOSTRAR DIV OCULTOS
      // const  rowInfo = document.getElementById('rowInfo');
      // const  rowGrafico = document.getElementById('rowGrafico');
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
      //   infoTemp.forEach((element)=>{
      //     console.log(`info::${element.daily.data.day}`);
      //     console.log(`info::${element.daily.data.all_day.temperature_max}`);
      // });
      
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
      lblLocalidad.innerText = _txtUbicacion.value.toUpperCase();
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

      // const lblResumen = document.getElementById('lblResumen');
      // const lblCubierto = document.getElementById('lblCubierto');
      // const lblPrecipitacion = document.getElementById('lblPrecipitacion');
      // const iconTiempo = document.getElementById('iconTiempo');
       lblTempActual.innerText=  infoTempGeneral.temperature;
      // lblResumen.innerText = 'Resumen ' + infoTempGeneral.summary;
      // lblCubierto.innerText = 'Cubierto ' + infoTempGeneral.cloud_cover + ' %';
      // lblPrecipitacion.innerText = 'Lluvias ' + infoTempGeneral.precipitation.total + ' m/m';
      // iconTiempo.src = `assets/icon/weather_icons/set01/big/${infoTempGeneral.icon_num}.png`;
      
      
      // infoTempGeneral.forEach((element)=>{
        //       console.log(`info::${element.temperature}`);
        //       //console.log(`info::${element.all_day.temperature_max}`);
        // });
        //lblTempMax.value = infoTempGeneral[0].current.temperature;
        // lblTempMax.value =infoTempGeneral.temperature
        // console.log('lblTempMax::' + lblTempMax.value);
        const labels = infoTemp.map((entry) => entry.day);
        const values = infoTemp.map((entry) => entry.all_day.temperature_max);
        const valuesMin = infoTemp.map((entry) => entry.all_day.temperature_min);
        // const labels = infoTemp.map((entry) => entry.daily.data.day);
        // const values = infoTemp.map((entry) => entry.daily.data.all_day.temperature_max);
        // const valuesMin = infoTemp.map((entry) => entry.daily.data.all_day.temperature_min);
        if (grafico1) {
          grafico1.destroy();
        }
        document.getElementById("grafico").style.height = "400px"
        const ctx = document.getElementById("graficoTemperatura").getContext("2d");
        // document.getElementById("graficoTemperatura").style.width = "900px";
        grafico1 = new Chart(ctx, {
              type: "bar",
              data: {
                labels: labels,
                datasets: [
                  {
                    label: "Fecha",
                    data: valuesMin,
                    // backgroundColor: "rgba(0, 123, 255, 0.5)",
                    backgroundColor: "red",
                    borderRadius: Number.MAX_VALUE,
                    borderWidth: 3,
                  },
                  {
                    label: "Fecha",
                    data: values,
                    backgroundColor: "rgba(0, 123, 255, 0.5)",
                    borderWidth: 3,
                  },
                ],
              },
              
            });
            // const speed = infoTemp.map((entry) => entry.all_day.wind.speed);
            // const ctx_2 = document.getElementById("graficoVelocidadViento").getContext("2d");
            // if (grafico2) {
            //   grafico2.destroy();
            // }
            // grafico2 = new Chart(ctx_2, {
            //   type: "line",
            //   data: {
            //     labels: labels,
            //     datasets: [
            //       {
            //         label: "Fecha",
            //         data: speed,
            //         backgroundColor: "rgba(0, 123, 255, 0.5)",
            //         borderWidth: 3,
            //       },
            //     ],
            //   },
            //   option:{
            //     responsive: true,
            //     title: {
            //         display: true,
            //         text: 'Pronóstico del tiempo, Proximos 7 días'
            //     }
            //   },
            // });
            // const precipitation = infoTemp.map((entry) => entry.all_day.precipitation.total);
            // const ctx_3 = document.getElementById("graficoLLuvias").getContext("2d");
            // if (grafico3) {
            //   grafico3.destroy();
            // }
            // grafico3 = new Chart(ctx_3, {
            //   type: "line",
            //   data: {
            //     labels: labels,
            //     datasets: [
            //       {
            //         label: "Fecha",
            //         data: precipitation,
            //         backgroundColor: "rgba(0, 123, 255, 0.5)",
            //         borderWidth: 3,
            //       },
            //     ],
            //   },
            // });
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