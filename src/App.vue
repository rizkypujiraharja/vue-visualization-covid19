<template>
  <div class="container py-4 text-gray-700">
    <div class="flex justify-between mb-4">
      <div class="text-xl pt-2 font-bold">Visualization Covid-19</div>
      <div class="relative">
        <select
          class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        >
          <option value="all">All Countries</option>
          <option v-for="(country, key) in state.countries" :key="key" :value="country.code">{{country.name}}</option>
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
        <div class="bg-white rounded-md px-4 py-2 shadow-top">&nbsp;</div>
      </div>
      <div class="w-full sm:w-1/3 sm:px-4 mb-4">
        <div class="bg-white rounded-md px-4 py-2 shadow-top">&nbsp;</div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive } from "vue";
import SummaryCard from './components/SummaryCard.vue'

export default {
  name: "App",
  setup() {
    const state = reactive({
      countries: [],
      summary: {
        confirmed: {},
        recovered: {},
        death: {},
      },
      dataCountries: []
    });

    onMounted(() => {
      Promise.all([getSummary(), getSummary(true), getCountries(), getCountries(true)]).then(function (values) {
        const [summaryToday, summaryYesterday, countryToday, countryYesterday] = values;
        setSummary(summaryToday, summaryYesterday);
        setCounties(countryToday, countryYesterday);
      });
    });

    function getCountries(yesterday = false) {
      return fetch(
        "https://disease.sh/v3/covid-19/countries?yesterday=" + yesterday
      ).then((response) => response.json());
    }

    function getSummary(yesterday = false) {
      return fetch(
        "https://disease.sh/v3/covid-19/all?yesterday=" + yesterday
      ).then((response) => response.json());
    }

    function setCounties(today, yesterday){
      state.countries = today.map(country => {
        return {
          name: country.country,
          code: country.countryInfo.iso2 || country.country
        }
      })

      console.log(yesterday)
    }

    function setSummary(today, yesterday) {
      state.summary = {
        confirmed: {
          today: today.todayCases,
          yesterday: yesterday.todayCases,
          total: today.cases,
          diff: today.cases - yesterday.cases,
          percentage: today.cases / yesterday.cases
        },
        recovered: {
          today: today.todayRecovered,
          yesterday: yesterday.todayRecovered,
          total: today.recovered,
          diff: today.recovered - yesterday.recovered,
          percentage: today.recovered / yesterday.recovered
        },
        death: {
          today: today.todayDeaths,
          yesterday: yesterday.todayDeaths,
          total: today.deaths,
          diff: today.deaths - yesterday.deaths,
          percentage: today.deaths / yesterday.deaths
        },
      };
    }

    return {
      state,
      // dropdownCountries
    };
  },
  components: {
    SummaryCard
  },
};
</script>

<style>
body {
  font-family: "Nunito", sans-serif;
}
</style>