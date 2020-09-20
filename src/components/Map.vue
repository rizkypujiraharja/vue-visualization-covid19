<template>
<span></span>
</template>
<script>
import numeral from "numeral";
import L from "leaflet";
import 'leaflet/dist/leaflet.css'
import 'leaflet.minichart/dist/leaflet.minichart.js'
import { onMounted, reactive } from "vue";

export default {
  name: "Map",
  props: {
    data: Array,
  },

  setup() {
    const state = reactive({
      map: null,
      token: "pk.eyJ1Ijoicml6a3lwdWppcmFoYXJqYSIsImEiOiJjanlzY3B1eWwwa2t3M25zZTdoOHoyYTRuIn0.YhB_LzKqbkkX06APhURm-Q"
    });

    onMounted(() => {
      drawMap();
    });

    function drawMap() {
      state.map = L.map("mapid").setView([0, 20], 1.5);

      L.tileLayer(
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token="+state.token,
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

      var data = [
        {"year":2015,"country":"Australia","math":100,"reading":100,"science":100,"lon":133.7751,"lat":-25.2744},
        {"year":2015,"country":"Austria","math":200,"reading":200,"science":200,"lon":14.5501,"lat":47.5162},
        {"year":2015,"country":"Belgium","math":300,"reading":300,"science":300,"lon":4.4699,"lat":50.5039},
      ];
      let minichartCountries = {}
      data.forEach(country => {
        let scoresDiff = [
          country.math,
          country.reading,
          country.science
        ];
        minichartCountries[country.country] = L.minichart([country.lat, country.lon], {
            data: scoresDiff,
            type:'pie',
            colors: ['#FF9F1C', '#2EC4B6', '#E71D36'],
            width: 20 * Math.sqrt(scoresDiff.reduce((a, b) => a + b, 0)) / Math.sqrt(300)
        });
        state.map.addLayer(minichartCountries[country.country]);
      })

    }

    return {
      numeral,
    };
  },
};
</script>
