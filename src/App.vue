<template>
  <div class="container py-4 text-gray-700">
    <div class="flex justify-between mb-4">
      <div class="text-xl pt-2 font-bold">Visualization Covid-19</div>
      <div class="relative">
        <select
          v-model="state.selectedCountry"
          @change="loadSummary()"
          class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        >
          <option value="all">All Countries</option>
          <option
            v-for="(country, key) in state.countries"
            :key="key"
            :value="country.name"
          >{{country.name}}</option>
        </select>
        <div
          class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
        >
          <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
    </div>

    <div class="flex flex-wrap sm:-mx-4">
      <summary-card
        :data="state.summary.confirmed"
        :icon="'fa-procedures'"
        :title="'Total Confirmed'"
        :iconColor="'text-orange-300'"
        :bgColor="'bg-warning'"
      />

      <summary-card
        :data="state.summary.recovered"
        :icon="'fa-running'"
        :title="'Total Recovered'"
        :iconColor="'text-teal-300'"
        :bgColor="'bg-success'"
      />

      <summary-card
        :data="state.summary.death"
        :icon="'fa-skull-crossbones'"
        :title="'Total Death'"
        :iconColor="'text-red-400'"
        :bgColor="'bg-danger'"
      />
    </div>

    <div class="flex flex-wrap sm:-mx-4 mt-4">
      <div class="w-full sm:w-2/3 sm:px-4 mb-4">
        <div class="bg-white rounded-md px-4 py-2 shadow-top mb-4" style="height: 175px;">
          <chart-data :country="state.selectedCountry"/>
        </div>
        <div class="bg-white rounded-md px-4 py-2 shadow-top mt-4" style="height: 410px;" id="mapid">
          <Map :data="[]" />
        </div>
      </div>

      <div class="w-full sm:w-1/3 sm:px-4 mb-4">
        <div
          class="bg-white rounded-md px-4 py-2 shadow-top overflow-y-auto"
          style="height: 600px;"
        >
          <data-countries :dataCountries="state.dataCountries" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive } from "vue";
import SummaryCard from "./components/SummaryCard.vue";
import DataCountries from "./components/DataCountries.vue";
import ChartData from "./components/ChartData.vue";
import Map from "./components/Map.vue";

export default {
  name: "App",
  setup() {
    const state = reactive({
      selectedCountry: "all",
      countries: [],
      summary: {
        confirmed: {},
        recovered: {},
        death: {},
      },
      dataCountries: [],
    });

    onMounted(() => {
      loadCountry();
      loadSummary();
    });

    function loadCountry() {
      Promise.all([getCountries(), getCountries(true)]).then(function (values) {
        const [countryToday, countryYesterday] = values;
        setCounties(countryToday, countryYesterday);
      });
    }

    function loadSummary() {
      Promise.all([getSummary(), getSummary(true)]).then(function (values) {
        const [summaryToday, summaryYesterday] = values;
        state.summary = setSummary(summaryToday, summaryYesterday);
      });
    }

    function getUrlSummary() {
      if (state.selectedCountry === "all") {
        return "https://disease.sh/v3/covid-19/all?yesterday=";
      }
      return `https://disease.sh/v3/covid-19/countries/${state.selectedCountry}?strict=true&yesterday=`;
    }

    function getCountries(yesterday = false) {
      return fetch(
        "https://disease.sh/v3/covid-19/countries?sort=todayCases&yesterday=" +
          yesterday
      ).then((response) => response.json());
    }

    function getSummary(yesterday = false) {
      const url = getUrlSummary() + yesterday;
      return fetch(url).then((response) => response.json());
    }

    function setCounties(today, yesterday) {
      state.countries = today
        .map((country) => {
          return {
            name: country.country,
            info: country.countryInfo,
          };
        })
        .sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));

      state.dataCountries = today.map((country) => {
        const countryYesterday = yesterday.find(
          (p) => p.country == country.country
        );

        return {
          name: country.country,
          flag: country.countryInfo.flag,
          data: setSummary(country, countryYesterday),
        };
      });
    }

    function setSummary(today, yesterday) {
      return {
        confirmed: {
          today: today.todayCases,
          yesterday: yesterday.todayCases,
          total: today.cases,
          diff: today.todayCases - yesterday.todayCases,
          percentage: (
            ((today.todayCases - yesterday.todayCases) / yesterday.todayCases) *
            100
          ).toFixed(2),
        },
        recovered: {
          today: today.todayRecovered,
          yesterday: yesterday.todayRecovered,
          total: today.recovered,
          diff: today.todayRecovered - yesterday.todayRecovered,
          percentage: (
            ((today.todayRecovered - yesterday.todayRecovered) /
              yesterday.todayRecovered) *
            100
          ).toFixed(2),
        },
        death: {
          today: today.todayDeaths,
          yesterday: yesterday.todayDeaths,
          total: today.deaths,
          diff: today.todayDeaths - yesterday.todayDeaths,
          percentage: (
            ((today.todayDeaths - yesterday.todayDeaths) /
              yesterday.todayDeaths) *
            100
          ).toFixed(2),
        },
      };
    }

    return {
      state,
      loadSummary,
      // dropdownCountries
    };
  },
  components: {
    SummaryCard,
    DataCountries,
    ChartData,
    Map
  },
};
</script>

<style>
body {
  font-family: "Nunito", sans-serif;
}
</style>