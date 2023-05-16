<template>
  <div class="flex flex-col h-full w-max-full bg-gray-800 text-white">
    <div class="flex items-center justify-between py-2 px-4 bg-sky-950">
      <h2 class="text-lg font-semibold">Chat</h2>
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
        <button class="focus:outline-none">
          <svg
            class="h-6 w-6 text-white fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M3,6H21V8H3ZM3,11H16v2H3ZM3,16H21v2H3Z"/>
          </svg>
        </button>
      </div>
    </div>
    <div class="flex-1 overflow-y-auto p-4">
      <div class="flex flex-col">
        <div class="p-2"  v-for="{id, text, isMe} in messages" :key="id">
          <div v-if="isMe" class="flex items-center">
            <div class="h-6 w-6 bg-blue-500 rounded-full mr-3"></div>
            <div class="flex-1 bg-gray-700 rounded-lg p-3">
              <p class="text-sm">{{ text }}</p>
            </div>
          </div>
          <div v-else class="flex items-center justify-end mt-4">
            <div class="flex-1 bg-blue-500 rounded-lg p-3 ml-auto">
              <p class="text-sm text-white">{{ text }}</p>
            </div>
            <div class="h-6 w-6 bg-gray-700 rounded-full ml-3"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="p-4">
      <div class="flex items-center">
        <input
          v-model="newMessage"
          class="flex-1 bg-gray-700 rounded-full py-2 px-3 mr-2 focus:outline-none w-10"
          type="text"
          placeholder="Enter your message..."
          @keypress.enter="sendMessage"
        >
        <button @click.prevent="sendMessage" class="bg-blue-500 hover:bg-blue-600 rounded-full py-2 px-4 text-white font-semibold focus:outline-none">
          <div class="md:hidden">Send</div>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messages: [
        { id: 1, text: 'Hey there!', isMe: false },
        { id: 2, text: 'Hi!', isMe: true },
        { id: 3, text: 'How are you?', isMe: false },
        { id: 4, text: 'I\'m good, thanks!', isMe: true },
        { id: 5, text: 'What have you been up to?', isMe: false },
        { id: 6, text: 'Not much, just working on some projects.', isMe: true },
      ],
      newMessage: '',
    }
  },
  methods: {
    sendMessage() {
      console.log(`lsdjnds ${this.newMessage}`)
      if (this.newMessage.trim() === '') return
      this.messages.push({ id: this.messages.length + 1, text: this.newMessage, isMe: true })
      this.newMessage = ''
    },
  },
}
</script>
