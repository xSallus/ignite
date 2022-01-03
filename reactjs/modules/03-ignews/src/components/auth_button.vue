<template>
    <button v-if="isLoggedIn" id="btn-login" @click="handleAuth">
      <img src="../assets/images/github-icon-green.svg" alt="github" />
      <span>{{ user }}</span>
    </button>
    <button v-else id="btn-login" @click="handleAuth">
      <img src="../assets/images/github-icon-yellow.svg" alt="github" />
      <span>sign in</span>
    </button>
</template>

<script>
import store from '@/store';

export default {
  name: 'AuthButton',
  data: ()=>({
    isLoggedIn: store.state.session.isLoggedIn,
    user: store.state.session.user.username
  }),
  methods: {
    handleAuth() {
      store.dispatch('auth_change');
      console.log(this.user)
    }
  }
}
</script>
