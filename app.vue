<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col">
    <header class="bg-white border-b border-blue-100 p-6 shadow-sm">
      <div class="container mx-auto max-w-3xl flex items-center gap-3">
        <svg class="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
        </svg>
        <h1 class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">AI Chat</h1>
      </div>
    </header>

    <main class="flex-1 overflow-y-auto p-6 container mx-auto max-w-3xl">
      <div class="space-y-6">
        <template v-if="messages.length === 0">
          <div class="flex flex-col items-center justify-center mt-20 space-y-4">
            <svg class="w-16 h-16 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
            </svg>
            <p class="text-gray-500 text-lg font-medium">Start a conversation</p>
            <p class="text-gray-400 text-sm">Type your message below to begin chatting with AI</p>
          </div>
        </template>
        <TransitionGroup 
          name="message"
          class="space-y-4"
        >
          <ChatMessage
            v-for="(message, index) in messages"
            :key="index"
            :message="message.content"
            :is-ai="message.isAi"
          />
        </TransitionGroup>
      </div>
    </main>

    <ChatInput :loading="loading" @send="sendMessage" />
  </div>
</template>

<script setup lang="ts">
interface Message {
  content: string;
  isAi: boolean;
}

const messages = ref<Message[]>([]);
const loading = ref(false);

async function sendMessage(message: string) {
  if (loading.value) return;

  messages.value.push({
    content: message,
    isAi: false
  });

  loading.value = true;

  try {
    const response = await $fetch('/api/chat', {
      method: 'POST',
      body: { message }
    });

    messages.value.push({
      content: response.message,
      isAi: true
    });
  } catch (error: any) {
    messages.value.push({
      content: 'Sorry, something went wrong. Please try again.',
      isAi: true
    });
  } finally {
    loading.value = false;
  }
}
</script>

<style>
.message-enter-active,
.message-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.message-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.message-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>