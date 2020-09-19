<template>
  <canvas id="myChart" height="100%"></canvas>
</template>

<script>
import Chart from "chart.js";
import numeral from "numeral";
import { onMounted, reactive, watch } from "vue";

export default {
  name: "ChartData",
  props: {
    country: String,
  },

  setup(props) {
    const state = reactive({
      histories: [],
      chart: null,
    });

    watch(
      () => props.country,
      () => {
        drawChart();
      }
    );

    onMounted(() => {
      drawChart();
    });

    async function drawChart() {
      state.histories = await loadHistory();
      if (props.country !== "all") {
        state.histories = state.histories.timeline;
      }
      const labels = Object.keys(state.histories.cases);
      const confirmed = Object.values(state.histories.cases);
      const recovered = Object.values(state.histories.recovered);
      const death = Object.values(state.histories.deaths);
      setChart(labels, confirmed, recovered, death);
    }

    function getUrlHistory() {
      if (props.country === "all") {
        return "https://disease.sh/v3/covid-19/historical/all?lastdays=all";
      }
      return `https://disease.sh/v3/covid-19/historical/${props.country}?lastdays=all`;
    }

    function loadHistory() {
      const url = getUrlHistory();
      return fetch(url).then((response) => response.json());
    }

    function setChart(labels, confirmed, recovered, death) {
      state.chart == null ? "" : state.chart.destroy();
      const ctx = document.getElementById("myChart").getContext("2d");
      state.chart = new Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Confirmed",
              data: confirmed,
              borderColor: "#FF9F1C",
              fill: false,
            },
            {
              label: "Recovered",
              data: recovered,
              borderColor: "#2EC4B6",
              fill: false,
            },
            {
              label: "Death",
              data: death,
              borderColor: "#E71D36",
              fill: false,
            },
          ],
        },
        options: {
          legend: false,
          scales: {
            yAxes: [
              {
                gridLines: {
                  color: "rgba(0, 0, 0, 0)",
                },
                ticks: {
                  callback: function (value) {
                    return numeral(value).format("0a");
                  },
                },
              },
            ],
            xAxes: [
              {
                gridLines: {
                  color: "rgba(0, 0, 0, 0)",
                },
              },
            ],
          },
          elements: {
            point: {
              radius: 0,
            },
            line: {
              borderWidth: 1,
            },
          },
          tooltips: {
            enabled: true,
            mode: "x-axis",
            callbacks: {
              label: function (tooltipItem, data) {
                let label = data.datasets[tooltipItem.datasetIndex].label || "";

                if (label) {
                  label += ": ";
                }
                label += numeral(tooltipItem.yLabel).format('0,0');
                return label;
              },
            },
          },
        },
      });
    }
  },
};
</script>
