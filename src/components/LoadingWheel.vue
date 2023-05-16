<template>
  <div id="progress" v-if="!loaded" class=" mx-auto justify-center flex mt-60">
    <div
  class="inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
  role="status">
  <span
    class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
    >Loading...</span
  >
</div>
<!-- <span class="sr-only">Loading...</span> -->
</div>
</template>

<script>
export default {
  props : {
    loaded : {
      type : Boolean,
      default(){
        return false;
      }
    }
  },
  components : {}
}
</script>