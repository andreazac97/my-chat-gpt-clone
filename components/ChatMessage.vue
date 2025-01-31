<template>
  <div 
    :class="[
      'p-5 rounded-2xl max-w-[85%] transition-all duration-200',
      isAi ? 'bg-white shadow-sm ml-0' : 'bg-blue-500 text-white ml-auto'
    ]"
  >
    <div class="flex items-center gap-2 mb-2">
      <div 
        :class="[
          'p-1.5 rounded-lg',
          isAi ? 'bg-blue-100' : 'bg-blue-400'
        ]"
      >
        <svg 
          v-if="isAi" 
          class="w-4 h-4 text-blue-500" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
        </svg>
        <svg 
          v-else 
          class="w-4 h-4 text-white" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
        </svg>
      </div>
      <span 
        :class="[
          'text-sm font-medium',
          isAi ? 'text-gray-600' : 'text-blue-50'
        ]"
      >
        {{ isAi ? 'AI Assistant' : 'You' }}
      </span>
    </div>
    <p 
      :class="[
        'leading-relaxed',
        isAi ? 'text-gray-700' : 'text-white'
      ]"
    >
      {{ message }}
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  message: string;
  isAi: boolean;
}>();
</script>