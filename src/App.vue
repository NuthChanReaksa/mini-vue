<template>
  <div class="min-h-screen bg-gray-100">

    <nav class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Left Side (Logo) -->
          <div class="flex items-center">
            <!-- Uncomment this if you want to show a logo -->
            <!-- <div class="flex-shrink-0 flex items-center">
              <img class="h-10 w-auto" src="./assets/logo.png" alt="Mobile Banking" />
            </div> -->
          </div>

          <!-- Centered Navigation Links -->
          <div v-if="authStore.isAuthenticated" class="flex-1 flex justify-center items-center space-x-10">
            <router-link
                to="/dashboard"
                class="border-b-2 border-transparent px-2 pb-2 text-lg font-semibold text-gray-600 hover:border-indigo-500 hover:text-gray-800"
            >
              Dashboard
            </router-link>
            <router-link
                to="/users"
                class="border-b-2 border-transparent px-2 pb-2 text-lg font-semibold text-gray-600 hover:border-indigo-500 hover:text-gray-800"
            >
              Users
            </router-link>
            <router-link
                to="/accounts"
                class="border-b-2 border-transparent px-2 pb-2 text-lg font-semibold text-gray-600 hover:border-indigo-500 hover:text-gray-800"
            >
              Accounts
            </router-link>
          </div>

          <!-- Right Side (User Info & Logout) -->
          <div v-if="authStore.isAuthenticated" class="flex items-center">
        <span class="text-lg text-gray-700 mr-4 font-semibold">
          {{ authStore.currentUser?.username }}
        </span>
            <button
                @click="authStore.logout"
                class="ml-4 px-4 py-2 rounded-md text-lg font-semibold text-gray-700 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>


    <router-view />
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from './stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

if (!authStore.isAuthenticated && router.currentRoute.value.path !== '/' && router.currentRoute.value.path !== '/register') {
  router.push('/');
}
</script>