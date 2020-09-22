<template>
  <span></span>
</template>
<script>
import numeral from "numeral";
import L from "leaflet";
import "leaflet.minichart/dist/leaflet.minichart.js";
// import "leaflet/dist/leaflet.css";
import { onMounted, reactive, watch } from "vue";

export default {
  name: "Map",
  props: {
    dataCountries: Array,
    country: Object,
  },

  setup(props) {
    const state = reactive({
      map: null,
      token:
        "pk.eyJ1Ijoicml6a3lwdWppcmFoYXJqYSIsImEiOiJjanlzY3B1eWwwa2t3M25zZTdoOHoyYTRuIn0.YhB_LzKqbkkX06APhURm-Q",
    });

    onMounted(() => {
      drawMap();
    });

    watch(
      () => props.dataCountries,
      () => {
        drawMap();
      }
    );

    watch(
      () => props.country,
      () => {
        setCenter();
      }
    );

    function drawMap() {
      if (state.map != null) {
        state.map.remove();
      }

      state.map = L.map("mapid").setView([0, 20], 1.5);

      L.tileLayer(
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=" +
          state.token,
        {
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: "mapbox/dark-v10",
          tileSize: 512,
          zoomOffset: -1,
          accessToken: state.token,
        }
      ).addTo(state.map);

      let minichartCountries = {};

      let arrConfirmed = props.dataCountries.map(
        (country) => country.data.confirmed.total
      );
      let maxConfirmed = Math.max(...arrConfirmed);

      props.dataCountries.forEach((country) => {
        let scoresDiff = [
          country.data.confirmed.total,
          country.data.recovered.total,
          country.data.death.total,
        ];

        let width =
          (60 * Math.sqrt(country.data.confirmed.total)) /
          Math.sqrt(maxConfirmed);

        minichartCountries[country.name] = L.minichart(country.coordinate, {
          properties: country,
          data: scoresDiff,
          type: "pie",
          colors: [
            "rgb(248 159 28 / 0.5)",
            "rgb(63 196 182 / 0.5)",
            "rgb(231 29 54 / 0.5)",
          ],
          width: width <= 7 ? 7 : width,
        });
        state.map.addLayer(minichartCountries[country.name]);

        minichartCountries[[country.name]].on("click", function (e) {
          setPopup(e.target.options.properties);
        });
      });
    }

    function setCenter() {
      if (props.country != "all") {
        state.map.flyTo(
          new L.LatLng(props.country.info.lat, props.country.info.long)
        );
      }
    }

    function setPopup(country) {
      function numberWithDot(x) {
          return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      }

      L.popup()
        .setLatLng(country.coordinate)
        .setContent(`
            <center><img class="w-24 h-auto rounded-sm mb-2" src="${country.flag}" />
            <p class="text-lg text-gray-700 leading-none font-semibold">${country.name}</p></center>
            <div class="divide-y divide-gray-400 text-md">
              <div class="py-2 text-warning">Confirmed : <b>${numberWithDot(country.data.confirmed.total)}</b></div>
              <div class="py-2 text-success">Recovered : <b>${numberWithDot(country.data.recovered.total)}</b></div>
              <div class="py-2 text-danger">Death : <b>${numberWithDot(country.data.death.total)}</b></div>
            </div>
        `)
        .openOn(state.map);
    }

    return {
      numeral,
    };
  },
};
</script>

