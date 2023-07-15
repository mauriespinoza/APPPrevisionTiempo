const canvas = document.getElementById("graficoTemperatura");

let grafico1;
export const crearGrafico = (data) => {
  const labels = data.map((entry) => entry.day);
  const values = data.map((entry) => entry.all_day.temperature_max);
  const valuesMin = data.map((entry) => entry.all_day.temperature_min);
  if (grafico1) {
    grafico1.destroy();
  }
  grafico1 = new Chart(canvas, {
    type: "line",
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
};
