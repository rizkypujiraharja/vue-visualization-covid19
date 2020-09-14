<template>
  <div class="container py-4 text-gray-700">
    <div class="flex justify-between mb-4">
      <div class="text-xl pt-2 font-bold">Dashboard Covid-19</div>

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
          <div class="text-lg text-right">Recovey</div>
          <div class="flex justify-between">
            <div class="text-5xl">
              <i class="fas fa-procedures"></i>
            </div>
            <div>
              <div class="text-3xl font-bold">100.000</div>
              <div class="text-sm flex">
                New 100.000
                <span class="ml-2 bg-white rounded text-success py-0 px-2 text-xs">+100</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full sm:w-1/3 sm:px-4 mb-4">
        <div class="bg-success rounded-md px-4 py-2 text-white">
          <div class="text-lg text-right">Recovey</div>
          <div class="flex justify-between">
            <div class="text-5xl">
              <i class="fas fa-procedures"></i>
            </div>
            <div>
              <div class="text-3xl font-bold">100.000</div>
              <div class="text-sm flex">
                New 100.000
                <span class="ml-2 bg-white rounded text-success py-0 px-2 text-xs">+100</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full sm:w-1/3 sm:px-4 mb-4">
        <div class="bg-danger rounded-md px-4 py-2 text-white">
          <div class="text-lg text-right">Recovey</div>
          <div class="flex justify-between">
            <div class="text-5xl">
              <i class="fas fa-procedures"></i>
            </div>
            <div>
              <div class="text-3xl font-bold">100.000</div>
              <div class="text-sm flex">
                New 100.000
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