<template>
  <div class="container py-4 text-gray-800">
    <div class="flex justify-between mb-4">
      <div class="text-lg font-bold">Dashboard Covid-19</div>

      <select>
        <option value="">All Countries</option>
      </select>
    </div>

    <div class="flex flex-wrap sm:-mx-4">
      <div class="w-full sm:w-1/3 sm:px-4 mb-4">
        <div class="bg-red-400">&nbsp;</div>
      </div>
      <div class="w-full sm:w-1/3 sm:px-4 mb-4">
        <div class="bg-red-400">&nbsp;</div>
      </div>
      <div class="w-full sm:w-1/3 sm:px-4 mb-4">
        <div class="bg-red-400">&nbsp;</div>
      </div>
    </div>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
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