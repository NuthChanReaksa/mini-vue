import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { AuthResponse } from '../interfaces/auth';
import type { UserResponse } from '../interfaces/user';
import { login, refreshToken, register, getCurrentUser } from '../api/auth';
import router from "../router";

export const useAuthStore = defineStore('auth', () => {
    const user = ref<AuthResponse | null>(null);
    const currentUser = ref<UserResponse | null>(null);

    const isAuthenticated = ref(false);
    // const isAuthenticated = false ;
    // Initialize function should be defined before it's returned
    function initialize() {
        const token = localStorage.getItem('token');
        const refreshTokenValue = localStorage.getItem('refreshToken');
        const userData = localStorage.getItem('userData');

        if (!token || !refreshToken || !userData || !refreshTokenValue) {
            logout();
            isAuthenticated.value = false;
            return;
        }
        const parsedUserData = JSON.parse(userData);
        const userId = parsedUserData.userId || parsedUserData.id || "";

        if (!userId) {
            console.warn("Invalid user data, clearing localStorage.");
            logout();
            return;
        }

        user.value = {
            userId: userId, // Ensure userId is set correctly
            accessToken: token,
            refreshToken: refreshTokenValue
        };

        isAuthenticated.value = true;
        currentUser.value = parsedUserData;
    }

    // fetchUserProfile function should be defined before it's returned
    async function fetchUserProfile() {
        try {
            const userData = await getCurrentUser();
            currentUser.value = userData;
            if(!userData) {
                logout(); 
                return; 
            }

            // Store user data in localStorage for persistence
            localStorage.setItem('userData', JSON.stringify(userData));

            // Update userId in user object if needed
            if (user.value && userData.id) {
                user.value.userId = userData.id;
            }
        } catch (error) {
            console.error('Failed to fetch user profile:', error);
            throw error;
        }
    }

    async function loginUser(credentials: { email: string; password: string }) {
        console.log("logini User is triggered ")
        try {
            const response = await login(credentials);

            // Assuming response has userId, accessToken, and refreshToken
            user.value = {
                userId: response.userId, // Include userId from response
                accessToken: response.accessToken,
                refreshToken: response.refreshToken
            };

            localStorage.setItem('token', response.accessToken);
            localStorage.setItem('refreshToken', response.refreshToken);
            localStorage.setItem('userData', JSON.stringify(response));

            await fetchUserProfile();

            // When we login succeessfully , this will set to true for the automatically routing 
            isAuthenticated.value = true;
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    }

    async function registerUser(userData: import('../interfaces/user').UserRequest) {
        try {
            const response = await register(userData)
            return response
        } catch (error) {
            console.error('Registration failed:', error);
            throw error;
        }
    }

    async function refresh() {
        if (!user.value?.refreshToken) return;
        try {
            const response = await refreshToken({ refreshToken: user.value.refreshToken });
            user.value = response;
            localStorage.setItem('token', response.accessToken);
            localStorage.setItem('refreshToken', response.refreshToken);
        } catch (error) {
            console.error('Token refresh failed:', error);
            logout();
        }
    }

    function logout() {

        console.log("Logging out...");
        user.value = null;
        currentUser.value = null;
        isAuthenticated.value = false;
        console.log("After logout - isAuthenticated:", isAuthenticated.value);
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userData');
        router.push('/');

    }

    return {
        user,
        currentUser,
        isAuthenticated,
        loginUser,
        registerUser,
        refresh,
        logout,
        fetchUserProfile,
        initialize
    };
});