<!-- PdfViewer.vue
<template>
  <div class="h-full bg-gray-800 rounded-lg shadow-lg overflow-hidden">
    <div class="flex items-center justify-between py-2 px-4 bg-sky-950">
      <h2 class="text-lg font-semibold">Reader</h2>
      <div class="flex items-center">
        <button class="mr-2 focus:outline-none">
          <svg
            class="h-6 w-6 text-white fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M20,6H4A2,2,0,0,0,2,8V16a2,2,0,0,0,2,2H20a2,2,0,0,0,2-2V8A2,2,0,0,0,20,6Zm0,10H4V8H20Zm-8-5H8a1,1,0,0,0,0,2h4a1,1,0,0,0,0-2Zm4,4H8a1,1,0,0,0,0,2h8a1,1,0,0,0,0-2Z"/>
          </svg>
        </button>
      </div>
    </div>
    <iframe class="w-full h-full bg-gray-900 text-white" :src="pdfUrl !=undefined ? pdf:"></iframe>
  </div>
</template>


<script>
export default {
  props: {
    pdfUrl: {
      type: String,
      required: true,
    },
  },
  mounted() {
    console.log(this.pdfUrl)
  },
}
</script> -->
<template>
  <div class="relative w-full h-full">
    <div class="absolute inset-0 overflow-hidden">
      <canvas ref="pdfCanvas" class="w-full h-full"></canvas>
    </div>
    <div class="absolute bottom-0 right-0 m-2">
      <button @click="prevPage" class="mr-2 px-2 py-1 text-sm font-medium text-white bg-blue-500 rounded-lg focus:outline-none">&lt;</button>
      <button @click="nextPage" class="mr-2 px-2 py-1 text-sm font-medium text-white bg-blue-500 rounded-lg focus:outline-none">&gt;</button>
      <button @click="zoomIn" class="mr-2 px-2 py-1 text-sm font-medium text-white bg-blue-500 rounded-lg focus:outline-none">+</button>
      <button @click="zoomOut" class="px-2 py-1 text-sm font-medium text-white bg-blue-500 rounded-lg focus:outline-none">-</button>
    </div>
  </div>
</template>

<script>
import * as pdfjsLib from 'pdfjs-dist/build/pdf';

export default {
  props: {
    pdfUrl: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      pdfDocument: null,
      pageNumber: 1,
      scale: 1.0,
      canvas: null,
      ctx: null
    }
  },
  mounted() {
    // The workerSrc property shall be specified.
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'libs/pdfjs-3.6.172-dist/build/pdf.worker.js';
    this.$nextTick(() => {
    const canvas = this.$refs.pdfCanvas
    this.canvas = canvas;
    const ctx = canvas.getContext('2d')
    this.ctx = ctx;
    const url = 'test.pdf'

    pdfjsLib.getDocument(url).promise.then(pdf => {
      this.pdf = pdf
      this.currentPage = 1
      this.renderPage(this.currentPage, canvas, ctx)
    })
  })
  },
  methods: {
    async loadPdf() {
      try {
        // const loadingTask = pdfjsLib.getDocument('voxi 1.pdf')
        this.pdfDocument = await pdfjsLib.getDocument('voxi 1.pdf').promise
        this.renderPage(this.pageNumber, this.scale)
      } catch (error) {
        console.error(error)
      }
    },
    renderPage(pageNumber, canvas, ctx) {
      console.log(this.scale)
      const scale = this.scale;
  this.pdf.getPage(pageNumber).then(page => {
    const viewport = page.getViewport({ scale })
    canvas.height = viewport.height
    canvas.width = viewport.width
    const renderContext = {
      canvasContext: ctx,
      viewport: viewport
    }
    page.render(renderContext)
    })
    },
    zoomIn() {
      if (this.scale < 2.0) {
        this.scale += 0.1
        this.renderPage(this.pageNumber, this.canvas, this.ctx)
      }
    },
    zoomOut() {
      if (this.scale > 0.5) {
        this.scale -= 0.1
        this.renderPage(this.pageNumber, this.scale)
      }
    },
        prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--
        const canvas = this.canvas
        const ctx = canvas.getContext('2d')
        this.renderPage(this.currentPage, canvas, ctx)
      }
    },
    nextPage() {
      if (this.currentPage < this.pdf.numPages) {
        this.currentPage++
        const canvas = this.canvas
        const ctx = canvas.getContext('2d')
        this.renderPage(this.currentPage, canvas, ctx)
      }
    }
  }
}
</script>

<style scoped>
canvas {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>