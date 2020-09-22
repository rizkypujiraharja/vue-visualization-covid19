<template>
  <div class="w-full sm:w-1/3 sm:px-4 mb-4">
    <div class="rounded-md px-4 py-2 text-white" :class="bgColor">
      <div class="flex justify-between">
        <div class="text-6xl pt-2" :class="iconColor">
          <i class="fas" :class="icon"></i>
        </div>
        <div class="text-right">
          <div class="text-lg">{{title}}</div>
          <div class="text-3xl font-bold">{{ numeral(data.total).format('0,0') }}</div>
          <div class="text-sm flex">
            <span class="font-bold">Today {{ numeral(data.today).format('0,0') }}</span>
            <span class="ml-2 bg-white rounded py-0 px-2 text-xs" :class="data.diff >= 0 ? 'text-success' : 'text-danger'">
              <span class="fa" :class="data.diff >= 0 ? 'fa-arrow-up' : 'fa-arrow-down'"></span>
              {{ numeral(data.diff).format('0,0') }}
              ({{ data.percentage }}%)
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import numeral from "numeral";

export default {
  name: "SummaryCard",
  props: {
    data: Object,
    title: String,
    icon: String,
    iconColor: String,
    bgColor: String,
  },

  setup() {
    return {
      numeral
    }
  }
};
</script>
