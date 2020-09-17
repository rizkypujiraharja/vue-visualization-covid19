<template>
  <div class="w-full sm:w-1/3 sm:px-4 mb-4">
    <div class="rounded-md px-4 py-2 text-white" :class="bgColor">
      <div class="flex justify-between">
        <div class="text-6xl pt-2" :class="iconColor">
          <i class="fas" :class="icon"></i>
        </div>
        <div class="text-right">
          <div class="text-lg">{{title}}</div>
          <div class="text-3xl font-bold">{{ filters.numberWithDot(data.total) }}</div>
          <div class="text-sm flex">
            Today {{ filters.numberWithDot(data.today) }}
            <span
              class="ml-2 bg-white rounded py-0 px-2 text-xs"
              :class="data.diff >= 0 ? 'text-success' : 'text-danger'"
            > {{ data.diff >= 0 ? '+' : '' }}
              {{ filters.numberWithDot(data.diff) }} {{ data.diff >= 0 ? '+ ' : '' }}
              ({{ data.percentage }}%)
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import filters from "./../filters";

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
      filters
    }
  }
};
</script>
