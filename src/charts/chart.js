const canvas = document.getElementById('graficoTemperatura');

let grafico;
export const crearGraficoTemp = (data) => {
    if (grafico) {
        grafico.destroy()
    }
    grafico = new Chart(canvas, {
        type: 'bar',
        data: {
            labels: data.fechas,
            datasets: [{
                label: data.type,
                data: data.info
            },]
        }
    })
}