<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-bold text-gray-900">Register for Mobile Banking</h2>
      </div>
      <UserForm :isRegister="true" @submit="handleRegister" />
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

const  authStore= useAuthStore();
const router = useRouter();

// async function handleRegister(user: UserRequest) {

//   try {

//     let  testingUserData = {
//       "username": user.username,
//       "fullName": user.fullName,
//       "gender": user.gender,
//       "pin": "898989",
//       "email": user.email,
//       "password": user.password,
//       "profileImage": "https://example.com/profile.jpg",
//       "phoneNumber": "+85512345678",
//       "cityOrProvince": "Phnom Penh",
//       "khanOrDistrict": "Toul Kork",
//       "sangkatOrCommune": "Sangkat Boeung Kak 2",
//       "employeeType": "Full-time",
//       "companyName": "Tech Solutions Co.",
//       "mainSourceOfIncome": "Salary",
//       "monthlyIncomeRange": 1500,
//       "studentCardId": "STU123456789",
//       "roles": [
//         "ADMIN"
//       ]
//     }
//     console.log("User REQUEST data : ",testingUserData)
//     await  authStore.registerUser(testingUserData as UserRequest )
//         .then((response)=> {
//             console.log("Response : ", response )
//              router.push("/");
//         })
//         .catch(error => console.log("Handle exception error : " , error));

//   } catch (error) {
//     alert('Registration failed. Please try again.');
//   }
// }
async function handleRegisterII(user: UserRequest  ) {
  try {
    // Constructing testingUserData according to UserRequest structure
    const testingUserData: UserRequest = {
      username: user.username,
      fullName: user.fullName,
      gender: user.gender,
      pin: "898989",
      email: user.email,
      password: user.password,
      profileImage: "https://example.com/profile.jpg",
      phoneNumber: "+85512345678",
      cityOrProvince: "Phnom Penh",
      khanOrDistrict: "Toul Kork",
      sangkatOrCommune: "Sangkat Boeung Kak 2",
      employeeType: "Full-time",
      companyName: "Tech Solutions Co.",
      mainSourceOfIncome: "Salary",
      monthlyIncomeRange: 1500,
      studentCardId: "STU123456789",
      roles: ["ADMIN"]
    };

    console.log("User REQUEST data:", testingUserData);

    // Call registerUser method from the auth store
    const response = await authStore.registerUser(testingUserData);

    console.log("Response:", response);
    router.push("/");
 

  } catch (error) {
    console.log("Handle exception error:", error);
    alert('Registration failed. Please try again.');
  }
}
async function handleRegister(user: UserRequest | UserUpdateRequest) {
  try {
    let userData: UserRequest | UserUpdateRequest;

    if ('username' in user) {
      // It's a UserRequest
      const  registerData = user as UserRequest
      userData = {
        username: registerData.username || '', // username should be required here
        fullName: registerData.fullName || '',
        gender: registerData.gender || '',
        pin: '898989', // Static PIN, replace as needed
        email: registerData.email || '',
        password: registerData.password || '',
        profileImage: registerData.profileImage || 'https://example.com/profile.jpg',
        phoneNumber: registerData.phoneNumber || '',
        cityOrProvince: registerData.cityOrProvince || '',
        khanOrDistrict: registerData.khanOrDistrict || '',
        sangkatOrCommune: registerData.sangkatOrCommune || '',
        employeeType: registerData.employeeType || '',
        companyName: registerData.companyName || '',
        mainSourceOfIncome: registerData.mainSourceOfIncome || '',
        monthlyIncomeRange: registerData.monthlyIncomeRange || 0,
        studentCardId: registerData.studentCardId || '',
        roles: ['ADMIN'], // Example roles
      };
    } else {
      // It's a UserUpdateRequest
      const  updateData = user as UserUpdateRequest
      userData = {
        fullName: updateData.fullName || '',
        gender: updateData.gender || '',
        profileImage: updateData.profileImage || '',
        phoneNumber: updateData.phoneNumber || '',
        cityOrProvince: updateData.cityOrProvince || '',
        khanOrDistrict: updateData.khanOrDistrict || '',
        sangkatOrCommune: updateData.sangkatOrCommune || '',
        employeeType: updateData.employeeType || '',
        companyName: updateData.companyName || '',
        mainSourceOfIncome: updateData.mainSourceOfIncome || '',
        monthlyIncomeRange: updateData.monthlyIncomeRange || 0,
        studentCardId: updateData.studentCardId || '',
      };
    }

    console.log('User Request Data:', userData);

    // Call registerUser method from the auth store
    const response = await authStore.registerUser(userData as UserRequest);
    console.log('Registration Response:', response);

    // Redirect to login or home page after successful registration
    router.push('/');
  } catch (error) {
    console.log('Registration Error:', error);
    alert('Registration failed. Please try again.');
  }
}
</script>