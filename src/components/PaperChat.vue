<template>
<div class="container mx-auto p-4 bg-gray-900 text-white">
  <div class="flex justify-between">
    <div class="w-1/3 mr-4 bg-gray-800 rounded-lg shadow-lg">
      <ChatUI class="h-screen w-max-full " />
    </div>
    <div class="w-2/3 bg-gray-800 px-4 rounded-lg shadow-lg">
      <PdfReader class="h-screen overflow-y-scroll" :pdf-url="getPdfUrl()"/>
    </div>
  </div>
</div>
</template>

<script>
import ChatUI from './ChatUI.vue';
import PdfReader from './PdfReader.vue';

export default {
  name: 'PaperChat',
  components: { ChatUI, PdfReader },
  data() {
    return {
      pdfUrl : ""
    }
  },
  methods: {
    sendMessage() {
      // Handle sending the message here
    },
    getPdfUrl(){
      const encodedUrl = this.$route.params.p;
      return decodeURIComponent(encodedUrl);
    }
  }
};

</script>