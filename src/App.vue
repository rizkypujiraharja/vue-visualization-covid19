<template>
  <div class="container py-4 text-gray-700">
    <div class="flex justify-between mb-4">
      <div class="text-xl pt-2 font-bold">Visualization Covid-19</div>
      <div class="relative">
        <select class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
          <option>All Countries</option>
          <option>Indonesia</option>
          <option>Japan</option>
        </select>
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>
    </div>

    <div class="flex flex-wrap sm:-mx-4">
      <div class="w-full sm:w-1/3 sm:px-4 mb-4">
        <div class="bg-warning rounded-md px-4 py-2 text-white">
          <div class="flex justify-between">
            <div class="text-6xl pt-3 text-orange-300">
              <i class="fas fa-procedures"></i>
            </div>
            <div>
              <div class="text-lg">Total Confirmed</div>
              <div class="text-3xl font-bold">{{ filters.numberWithDot(state.summary.confirmed.total) }}</div>
              <div class="text-sm flex">
                New {{ filters.numberWithDot(state.summary.confirmed.today) }}
                <span class="ml-2 bg-white rounded text-success py-0 px-2 text-xs">+100</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full sm:w-1/3 sm:px-4 mb-4">
        <div class="bg-success rounded-md px-4 py-2 text-white">
          <div class="flex justify-between">
            <div class="text-6xl pt-3 text-teal-300">
              <i class="fas fa-running"></i>
            </div>
            <div>
              <div class="text-lg text-right">Total Recovered</div>
              <div class="text-3xl font-bold">{{ filters.numberWithDot(state.summary.recovered.total) }}</div>
              <div class="text-sm flex">
                New {{ filters.numberWithDot(state.summary.recovered.today) }}
                <span class="ml-2 bg-white rounded text-success py-0 px-2 text-xs">+100</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full sm:w-1/3 sm:px-4 mb-4">
        <div class="bg-danger rounded-md px-4 py-2 text-white">
          <div class="flex justify-between">
            <div class="text-6xl pt-3 text-red-400">
              <i class="fas fa-skull-crossbones"></i>
            </div>
            <div>
              <div class="text-lg text-right">Total Death</div>
              <div class="text-3xl font-bold">{{ filters.numberWithDot(state.summary.death.total) }}</div>
              <div class="text-sm flex">
                New {{ filters.numberWithDot(state.summary.death.today) }}
                <span class="ml-2 bg-white rounded text-success py-0 px-2 text-xs">+100</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-wrap sm:-mx-4 mt-4">
      <div class="w-full sm:w-2/3 sm:px-4 mb-4">
        <div class="bg-white rounded-md px-4 py-2 shadow-top">
          &nbsp;
        </div>
      </div>
      <div class="w-full sm:w-1/3 sm:px-4 mb-4">
        <div class="bg-white rounded-md px-4 py-2 shadow-top">
          &nbsp;
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { onMounted, reactive } from 'vue'
import filters from "./filters"
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  setup() {

    const state = reactive( {
      summary: {
        confirmed:{},
        recovered:{},
        death:{}
      }
    })

    onMounted(async () => {
      const today = getSummary();
      const yesterday = getSummary(true);

      setSummary(today, yesterday)
    })

    async function getSummary(yesterday = false) {
      const summary = await fetch('https://disease.sh/v3/covid-19/all?yesterday='+yesterday)
      return summary.json()
    }

    function setSummary(today, yesterday) {
      state.summary.confirmed = {
        today: today.todayCases,
        yesterday: yesterday.todayCases,
        total: today.cases
      }

      state.summary.recovered = {
        today: today.todayRecovered,
        yesterday: yesterday.todayRecovered,
        total: today.recovered
      }

      state.summary.death = {
        today: today.todayDeaths,
        yesterday: yesterday.todayDeaths,
        total: today.deaths
      }
    }

    return {
      state,
      filters
    }
  },
  components: {
    // HelloWorld
  }
}
</script>

<style>
body{
  font-family: 'Nunito', sans-serif;
}
</style>