<template>
  <PbHeader/>
  <RouterView></RouterView>

</template>

<script>
import PbHeader from './components/PbHeader.vue';
// import ChatUI from './components/ChatUI.vue';
// import PdfReader from './components/PdfReader.vue';

export default {
  name: 'App',
  components: { PbHeader },
  data() {
    return {
      menuItems: [
        { text: 'Home', to: '/' },
        { text: 'About', to: '/about' },
        { text: 'Contact', to: '/contact' },
      ],
      rightMenuItems: [
        { text: 'Login', to: '/login' },
        { text: 'Signup', to: '/signup' },
      ],
      inputText: '',
      pdfUrl : '/Users/vishnuchopra/Downloads/P45_Vishnu_Chopra.pdf'
    }
  },
  methods: {
    sendMessage() {
      // Handle sending the message here
    },
  },
}
</script>

<style>
/* Add your custom styles here */
</style>
