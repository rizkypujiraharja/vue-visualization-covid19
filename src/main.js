import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import 'leaflet/dist/leaflet.css';
import numeral from "numeral";

numeral.register("locale", "id", {
    delimiters: {
        thousands: ".",
        decimal: ","
    },
    abbreviations: {
        thousand: "K",
        million: "M",
        billion: "B",
        trillion: "T"
    },
    currency: {
        symbol: "Rp. "
    }
});

numeral.locale('id');
createApp(App).mount('#app')
