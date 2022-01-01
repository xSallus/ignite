<template>
    <button v-if="session" id="btn-login">
      <img src="../assets/images/github-icon-green.svg" alt="github" />
      <span>xSallus</span>
    </button>
    <button v-else id="btn-login">
      <img src="../assets/images/github-icon-yellow.svg" alt="github" />
      <span>sign in</span>
    </button>
</template>

<script>
export default {
  name: 'AuthButton',
  props: ['session'],
  methods: {},
}
</script>
