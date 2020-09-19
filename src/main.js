import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
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
        symbol: "Rp. " //The currency for UAE is called the Dirham
    }
});

numeral.locale('id');
createApp(App).mount('#app')
