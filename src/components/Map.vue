<template>
<span></span>
</template>
<script>
import numeral from "numeral";
import leaflet from "leaflet";
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
      state.map = leaflet.map("mapid").setView([0, 20], 1.5);

      leaflet.tileLayer(
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token="+state.token,
        {
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: "mapbox/light-v10",
          tileSize: 512,
          zoomOffset: -1,
          accessToken: state.token,
        }
      ).addTo(state.map);

      // let icon = leaflet.divIcon({
      //   className: 'map-marker',
      //   iconSize:null,
      //   html:`<div>
      //     <svg viewbox="0 0 10 10">
      //       <defs>
      //         <circle id="circle" cx="5" cy="5" r="4" stroke-width="0.5" fill="transparent" />
      //       </defs>
      //       <use xlink:href="#circle" stroke="pink" stroke-dasharray="0,2.09,8.38,30" />
      //       <use xlink:href="#circle" stroke="green" stroke-dasharray="0,10.47,8.38,30" />
      //       <use xlink:href="#circle" stroke="orange" stroke-dasharray="2.09,16.75,6.3" />
      //     </svg>lorem asd asd
      //   </div>`
      // });

      // // leaflet.marker([51.508, -0.11]).addTo(state.map); //reference marker
      // leaflet.marker([51.508, -0.11],{icon: icon}).addTo(state.map);
    }

    return {
      numeral,
    };
  },
};
</script>
