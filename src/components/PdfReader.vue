<template>
  <div id="pdfvuer">
    <pdf :src="pdfdata" v-for="i in numPages" :key="i" :id="i" :page="i"
      scale=1 style="width:100%; margin:20px auto;"
        :annotation="true"
        :resize="true"
        @link-clicked="handle_pdf_link">
      <template>
        loading content here...
      </template>
    </pdf>
    <div class="bottom-0 right-0 m-2 pr-0 sticky float-right">
      <button class="px-2 py1 mx-1 font-medium text-white bg-blue-500 rounded-lg hover:outline-black hover:outline-none" @click="page > 1 ? page-- : 1">&#8657;</button>
      <button class="px-2 py1  mx-1 font-medium text-white bg-blue-500 rounded-lg hover:outline-black hover:outline-none" @click="page < numPages ? page++ : 1">&#8659;</button>
    </div>
  </div>
</template>

<script>
import pdfvuer from 'pdfvuer'
// import $ from 'jquery'

export default {
  props : {
    pdfUrl : {
      type : String,
      default(rawProps){
        console.log(rawProps);
        return '';
      }
    }
  },
  components: {
    pdf: pdfvuer
  },
  data () {
    return {
      page: 1,
      numPages: 0,
      pdfdata: undefined,
      errors: [],
      scale: 'page-width'
    }
  },
  computed: {
    formattedZoom () {
        return Number.parseInt(this.scale * 100);
    },
  },
  mounted () {
    console.log(this.pdfUrl);
    this.getPdf()
  },
  watch: {
    show: function (s) {
      if(s) {
        this.getPdf();
      }
    },
    page: function (p) {
      if( window.pageYOffset <= this.findPos(document.getElementById(p)) || ( document.getElementById(p+1) && window.pageYOffset >= this.findPos(document.getElementById(p+1)) )) {
        // window.scrollTo(0,this.findPos(document.getElementById(p)));
        document.getElementById(p).scrollIntoView();
      }
    }
  },
  methods: {
    handle_pdf_link: function (params) {
      // Scroll to the appropriate place on our page - the Y component of
      // params.destArray * (div height / ???), from the bottom of the page div
      var page = document.getElementById(String(params.pageNumber));
      page.scrollIntoView();
    },
    getPdf () {
      var self = this;
      self.pdfdata = pdfvuer.createLoadingTask(this.pdfUrl);
      self.pdfdata.then(pdf => {
        self.numPages = pdf.numPages;
        window.onscroll = function() { 
          changePage() 
        }

        function changePage () {
          var i = 1, count = Number(pdf.numPages);
          do {
            if(window.pageYOffset >= self.findPos(document.getElementById(i)) && 
                window.pageYOffset <= self.findPos(document.getElementById(i+1))) {
              self.page = i
            }
            i++
          } while ( i < count)
          if (window.pageYOffset >= self.findPos(document.getElementById(i))) {
            self.page = i
          }
        }
      }).catch(
        error => alert(error.message)
      );
    },
    findPos(obj) {
      return obj.offsetTop;
    },
    zoomOut(){
      console.log(this.scale);
      this.scale-=1;
    }
  }
}
</script>
<style src="pdfvuer/dist/pdfvuer.css"></style>
<style lang="css" scoped>
  #buttons {
    margin-left: 0 !important;
    margin-right: 0 !important;
  }
  /* Page content */
  .content {
    padding: 16px;
  }
</style>
