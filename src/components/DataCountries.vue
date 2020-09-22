<template>
  <div class="divide-y divide-gray-400">
    <div
      class="flex items-center mb-2 pt-2"
      v-for="(country, key) in dataCountries"
      :key="key"
    >
      <img class="w-10 h-auto rounded-sm mr-4" :src="country.flag" :alt="country.name" />
      <div class="text-sm">
        <p class="text-gray-700 leading-none font-semibold">{{ country.name }}</p>
        <p class="text-gray-600 text-sm">
          Today {{ numeral(country.data.confirmed.today).format('0,0') }}
          <span
            class="ml-2 text-xs"
            :class="country.data.confirmed.diff >= 0 ? 'text-success' : 'text-danger'"
          >
            {{ country.data.confirmed.diff >= 0 ? '+' : '' }}
            {{ numeral(country.data.confirmed.diff).format('0,0') }}
            ({{ country.data.confirmed.diff >= 0 ? '+' : '' }}{{country.data.confirmed.percentage }}%)
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>

import numeral from "numeral";

export default {
  name: "DataCountries",
  props: {
    dataCountries: Array,
  },

  setup() {
    return {
      numeral,
    };
  },
};
</script>
