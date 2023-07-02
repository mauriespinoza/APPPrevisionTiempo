const _btnBuscar = document.getElementById('btnBuscar');
const _txtUbicacion = document.getElementById('txtUbicacion');
const URL = 'https://www.meteosource.com/api/v1/free/';
const apiKey = 'sj2c8ibylrapbyosgq0sc2kesz6ayck2ypajpkng';
const URL_FIND_PLACES = URL + 'find_places?text=' ;
const table = document.getElementById('bodyTable');
let localidades = [];
let latitude = '';
let longitud = '';

const searchWeatherforLocation = async(e)=>{
    e.preventDefault();
    const URL = 'https://www.meteosource.com/api/v1/free/';
    //https://www.meteosource.com/api/v1/free/point?lat=33.73257S&lon=70.74281W&sections=current%2Cdaily&language=en&units=auto&key=sj2c8ibylrapbyosgq0sc2kesz6ayck2ypajpkng
    const apiKey = 'sj2c8ibylrapbyosgq0sc2kesz6ayck2ypajpkng';
    let lat ='33.73257S';
    let lon = '70.74281W';
    const URL_FIND_WEATHER = URL + `point?lat=${lat}&lon=${lon}&sections=current%2Cdaily&language=en&units=auto&key=${apiKey}`;
    const _txtUbicacion = document.getElementById('txtUbicacion');
    const url = URL_FIND_WEATHER;
    console.log(`url::${url}`);
    
    let infoTemp = [];
    const getDataAPI= async ()=>{
        const response = await fetch(url);
        const datos = await response.json();
        infoTemp = datos.daily.data;
    };
    getDataAPI()
    .then((result)=>{
        infoTemp.forEach((element)=>{
            console.log(`info::${element.day}`);
            console.log(`info::${element.all_day.temperature_max}`);
            
        });
        const labels = infoTemp.map((entry) => entry.day);
        const values = infoTemp.map((entry) => entry.all_day.temperature_max);
        const valuesMin = infoTemp.map((entry) => entry.all_day.temperature_min);
        const ctx = document.getElementById("graficoTemperatura").getContext("2d");
            const myChart = new Chart(ctx, {
              type: "bar",
              data: {
                labels: labels,
                datasets: [
                  {
                    label: "Fecha",
                    data: valuesMin,
                    backgroundColor: "rgba(0, 123, 255, 0.5)",
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
            const speed = infoTemp.map((entry) => entry.all_day.wind.speed);
            const ctx_2 = document.getElementById("graficoVelocidadViento").getContext("2d");
            const myChart_2 = new Chart(ctx_2, {
              type: "line",
              data: {
                labels: labels,
                datasets: [
                  {
                    label: "Fecha",
                    data: speed,
                    backgroundColor: "rgba(0, 123, 255, 0.5)",
                    borderWidth: 3,
                  },
                ],
              },
              option:{
                responsive: true,
                title: {
                    display: true,
                    text: 'Pronóstico del tiempo, Proximos 7 días'
                }
              },
            });
            const precipitation = infoTemp.map((entry) => entry.all_day.precipitation.total);
            const ctx_3 = document.getElementById("graficoLLuvias").getContext("2d");
            const myChart_3 = new Chart(ctx_3, {
              type: "line",
              data: {
                labels: labels,
                datasets: [
                  {
                    label: "Fecha",
                    data: precipitation,
                    backgroundColor: "rgba(0, 123, 255, 0.5)",
                    borderWidth: 3,
                  },
                ],
              },
            });
    });
   
};

_btnBuscar.addEventListener('click',searchWeatherforLocation);
