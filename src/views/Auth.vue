<script setup>
import { ref } from "vue";
import LoginForm from "../components/auth/LoginForm.vue";
import RegisterForm from "../components/auth/RegisterForm.vue";

const tab = ref("login");

function switchTab(to) {
  tab.value = to;
}
</script>

<template>
  <div class="max-w-md mx-auto p-6 mt-16 bg-white rounded shadow">
    <div class="flex justify-around mb-4">
      <button
        :class="[
          'px-4 py-2',
          tab === 'login' ? 'border-b-2 border-blue-500 font-semibold' : '',
        ]"
        @click="switchTab('login')"
      >
        Login
      </button>

      <button
        :class="[
          'px-4 py-2',
          tab === 'register' ? 'border-b-2 border-blue-500 font-semibold' : '',
        ]"
        @click="switchTab('register')"
      >
        Register
      </button>
    </div>

    <div v-if="tab === 'login'">
      <LoginForm />
    </div>

    <div v-else>
      <RegisterForm />
    </div>
  </div>
</template>
