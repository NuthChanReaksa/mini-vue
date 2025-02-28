<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-bold text-gray-900">Register for Mobile Banking</h2>
      </div>
      <UserForm isRegister @submit="handleRegister" />
      <div class="text-sm text-center">
        <router-link to="/" class="font-medium text-indigo-600 hover:text-indigo-500">
          Already have an account? Sign in
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';
import UserForm from '../components/UserForm.vue';
import type { UserRequest, UserUpdateRequest } from '../interfaces/user';

const {registerUser} = useAuthStore();
const router = useRouter();

async function handleRegister(user: UserRequest) {
  try {

    let  testingUserData = {
      "username": user.username,
      "fullName": user.fullName,
      "gender": user.gender,
      "pin": "898989",
      "email": user.email,
      "password": user.password,
      "profileImage": "https://example.com/profile.jpg",
      "phoneNumber": "+85512345678",
      "cityOrProvince": "Phnom Penh",
      "khanOrDistrict": "Toul Kork",
      "sangkatOrCommune": "Sangkat Boeung Kak 2",
      "employeeType": "Full-time",
      "companyName": "Tech Solutions Co.",
      "mainSourceOfIncome": "Salary",
      "monthlyIncomeRange": 1500,
      "studentCardId": "STU123456789",
      "roles": [
        "USER"
      ]
    }
    await  registerUser(testingUserData as UserRequest )
        .then((response)=> {
          console.log("Response : ", response )
          router.push("/");
        })
        .catch(error => console.log("Handle exception error : " , error));

  } catch (error) {
    alert('Registration failed. Please try again.');
  }
}

</script>