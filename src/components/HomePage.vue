<template>
  <div class="bg-gray-900 text-white min-h-screen">
    <div class="container mx-auto p-4">
      <h1 class="text-4xl font-bold mb-4">Welcome to my Paperboi</h1>
      <p class="text-lg mb-4">Your personal research assistant</p>
      <div class="mx-auto w-full flex flex-row justify-items-center">

        <input v-model="pdfUrl" type="url" name="pdfUrl" id="" class="float-none w-1/2 bg-gray-800 mr-7">
        <router-link :to="paperRoute" class="bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg">Go to Dashboard</router-link>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name : 'HomePage',
  data(){
    return {
      pdfUrl : ''
    }
  },
  computed : {
    paperRoute() {
      if (this.pdfUrl.length > 0){
        
        return `/paper/${encodeURIComponent(this.pdfUrl)}`;
      }
      return '/';
    }
  },
  components: {
  }
};
</script>

<style scoped>

.container {
  max-width: 1024px;
}

h1 {
  color: #fff;
}

p {
  color: #ccc;
}
</style>
