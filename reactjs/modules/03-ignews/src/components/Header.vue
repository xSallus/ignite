<template>
  <header>
    <h3>{{ title }}</h3>
    <div id="burger" @click="toggleMenu">
      <div />
    </div>
    <div id="nav" class="desktop">
      <ul>
        <router-link to="/">Home</router-link>
        <router-link to="/posts">Posts</router-link>
        <router-link to="/about">About</router-link>
      </ul>
      <AuthButton />
    </div>

    <div v-bind:class="{ 'hide': isHidden }" id="nav" class="mobile">
      <ul>
        <router-link to="/">Home</router-link>
        <router-link to="/posts">Posts</router-link>
        <router-link to="/about">About</router-link>
      </ul>
      <AuthButton />
      <button id="btn-close" @click="toggleMenu">.</button>
    </div>
  </header>
</template>

<script>
import AuthButton from './auth_button.vue';

export default {
  name: 'Header',
  data() {
    return {
      isHidden: true,
      title: '_igNews_',
    }
  },
  methods: {
    toggleMenu() {
      this.isHidden = !this.isHidden;
    }
  },
  components: { AuthButton }
}
</script>

<style scoped lang="scss">
@import '@/styles/colors.scss';

header {
  width: inherit;
  height: 10vh;
  padding: 0.75rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid $gray300;
  gap: 3.5rem;

  #burger {
    width: 30px;
    height: 30px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;

    & > div {
      width: inherit;
      height: 6px;
      background: $white;
      border-radius: 9px;

      &::after {
        content: "";
        width: inherit;
        height: inherit;
        border-radius: inherit;
        background: inherit;
        position: absolute;
        left: 0;
        transform: translateY(-200%);
      }

      &::before {
        content: "";
        width: inherit;
        height: inherit;
        border-radius: inherit;
        background: inherit;
        position: absolute;
        left: 0;
        transform: translateY(200%);
      }
    }

    @media(min-width:860px) {
      display: none;
    }
  }

  #nav {
    display: flex;

    ul {
      display: flex;
      gap: 1rem;
      list-style: none;

      a {
        font-weight: bold;
        color: $gray300;
        text-decoration: none;
        position: relative;
        transition: all 0.5s ease;

        &.router-link-exact-active {
          color: $white;

          @media(min-width: 1024px) {
            &::after {
              content: "";
              position: absolute;
              width: 105%;
              height: 2px;
              background: $yellow;
              bottom: -121%;
              left: -4%;
            }
          }
        }
      }
    }
    
    #btn-login {
      padding: 0.2rem 1rem;
      width: 9rem;
      height: 2.25rem;
      background: $gray600;
      color: $white;
      border-radius: 99px;
      border: none;
      display: flex;
      align-items: center;
      justify-content: space-between;
      transition: border-color 0.25s ease;
    }

    &.desktop {
      flex: 1;
      justify-content: space-between;
      align-items: center;

      ul {
        gap: 2rem;
      }

      #btn-login {
        border-bottom: 1px solid rgba(0,0,0,1);
        height: 2rem;

        &:hover {
          border-color: $yellow;
        }
      }

      @media(max-width: 860px) {
        display: none;
      }
    }

    &.mobile {
      flex-direction: column;
      gap: 2rem;

      position: absolute;

      width: 100%;
      height: 40vh;

      top: 0;
      left: 0;

      background: $gray400;
      align-items: center;
      justify-content: center;

      transition: all 2s ease;
      transform: translateY(0);

      &.hide {
        transform: translateY(-200%);
      }

      #btn-login {
        &:active {
          border: 1px solid $yellow;
        }
      }

      ul {
        flex-direction: column;
        width: 60%;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;

        a {
          color: $gray300;
          font-weight: 600;
          font-size: 2.25rem;
          font-family: 'Poppins', sans-serif;
        }
      }

      #btn-close {
        position: relative;
        width: 25px;
        height: 25px;
        font-size: 0;
        margin: 0 auto;
        background: transparent;
        border: none;

        &::after {
          content: "";
          width: inherit;
          height: 6px;
          border-radius: 9px;
          background: $black;
          position: absolute;
          left: 0;
          transform: translate(-10%, -50%) rotate(-45deg);
        }

      &::before {
          content: "";
          width: inherit;
          height: 6px;
          border-radius: 9px;
          background: $black;
          position: absolute;
          left: 0;
          transform: translate(-10%, -50%) rotate(45deg);
        }
      }

      @media(min-width: 860px) {
        display: none;
      }
    }
  }

  @media(min-width: 1024px) {
    padding: 1rem 3.5rem;
  }
}

@keyframes SlideIn {
  from {
    top: -50%;
  }

  to {
    top: 0;
  }
}
</style>
