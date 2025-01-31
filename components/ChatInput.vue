<template>
  <form @submit.prevent="emit('send', input)" class="border-t border-blue-100 p-6 bg-white shadow-lg">
    <div class="container mx-auto max-w-3xl">
      <div class="flex gap-3">
        <div class="flex-1 relative">
          <input
            v-model="input"
            type="text"
            placeholder="Type your message..."
            class="w-full p-3 pr-12 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-400"
            :disabled="loading"
            :aria-label="loading ? 'Message input (disabled while processing)' : 'Message input'"
          />
          <div 
            class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            aria-hidden="true"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
          </div>
        </div>
        <button
          type="submit"
          class="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors duration-200 font-medium flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          :disabled="loading || !input.trim()"
          :aria-label="loading ? 'Sending message...' : 'Send message'"
        >
          <span>{{ loading ? 'Sending...' : 'Send' }}</span>
          <svg 
            v-if="!loading" 
            class="w-4 h-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
          <svg 
            v-else 
            class="w-4 h-4 animate-spin" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
          </svg>
        </button>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
const input = ref('');
const emit = defineEmits<{
  send: [message: string]
}>();

const props = defineProps<{
  loading: boolean
}>();

watch(() => props.loading, (newVal) => {
  if (!newVal) {
    input.value = '';
  }
});
</script>