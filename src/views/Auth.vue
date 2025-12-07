<script setup>
import { ref } from "vue";
import LoginForm from "../components/auth/LoginForm.vue";
import RegisterForm from "../components/auth/RegisterForm.vue";

/**
 * Auth page component for login and registration.
 *
 * State:
 * - tab: Tracks the active tab, either "login" or "register".
 *
 * Methods:
 * - switchTab(to): Switches the active tab to the specified value.
 *
 * Components:
 * - LoginForm: The login form component.
 * - RegisterForm: The registration form component.
 *
 * Template:
 * - Displays tab buttons to toggle between login and register.
 * - Conditionally renders LoginForm or RegisterForm based on the active tab.
 */

const tab = ref("login");

function switchTab(to) {
  tab.value = to;
}
</script>

<template>
  <main>
    <div class="max-w-md mx-auto p-6 mt-16 bg-white rounded shadow">
      <div class="flex justify-around mb-4">
        <button
          :class="[
            'px-4 py-2',
            tab === 'login' ? 'border-b-2 border-yellow-500 font-semibold' : '',
          ]"
          @click="switchTab('login')"
        >
          Login
        </button>

        <button
          :class="[
            'px-4 py-2',
            tab === 'register'
              ? 'border-b-2 border-yellow-500 font-semibold'
              : '',
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
  </main>
</template>
