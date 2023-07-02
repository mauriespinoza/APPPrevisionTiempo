let localidades=[];
        const searchLocation = async()=>{
            const URL = 'https://www.meteosource.com/api/v1/free/';
            const apiKey = 'sj2c8ibylrapbyosgq0sc2kesz6ayck2ypajpkng';
            const URL_FIND_PLACES = URL + 'find_places?text=' ;
            const _txtUbicacion = document.getElementById('txtUbicacion');
            const url =URL_FIND_PLACES + `${_txtUbicacion.value}&language=en&key=${apiKey}`;
            console.log(`url::${url}`);
            

            const response = await fetch(url);
            const datos = await response.json();
            return datos;
        };
        function localidad(){
            console.log('function localidad');
            //console.log(`localidad::${place_id}`);
           /* let localidad = this.localidades.findIndex((elem) => elem.place_id = id);
            let lat = localidad.lat;
            let lon = localidad.lon;
            console.log(`lat::${lat} lon::${lon}`);*/
        }
        function seleccion(){
            console.log('seleccion()');
            searchLocation().then(result =>{
                localidades = result;
                const table = document.getElementById('bodyTable');
                localidades.forEach((element) => {
                console.log(element.name);
                let id = Math.random();
                table.innerHTML += `
                <td data-label="Id">${id}</td>
                <td data-label="Nombre">${element.name}</td>
                <td data-label="Area">${element.adm_area1}</td>
                <td data-label="Provincia">${element.adm_area2}</td>
                <td data-label="Pais">${element.country}</td>
                <td data-label="Seleccionar">
                  <button onclick="localidad()" class="btn btn-primary">Seleccionar</button>
                </td>
                `;
              });
            });
            
        }