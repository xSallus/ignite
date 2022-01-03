<template>
  <div id="home">
    <h3>Hey welcome,</h3>
    <h1>News about<p>the <span>Dev</span> world</p></h1>
    <h2>Get access to all publications<p>for ${{ price }}/month</p></h2>
    <button id="btn-subscribe">Subscribe now</button>
  </div>
</template>

<script>
import store from '@/store';

export default {
  name: 'Home',
  mounted: () => {
    store.dispatch('get_posts');
  },
  computed: {
    price() {
      return 4.91
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/colors.scss';

#home {
  height: 85vh;
  padding: 2rem;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  gap: 1.8rem;

  background: url('../assets/images/woman.svg') no-repeat;
  background-position: bottom;
  color: $white;
  
  h1 {
    font-size: 2.5rem;

    p span {
      color: $blue;
    }
  }

  h2 {
    font-size: 1rem;

    p {
      color: $blue;
    }
  }

  #btn-subscribe {
    width: 10rem;
    height: 2.5rem;
    margin-top: 2.5rem;
    background: $yellow;
    color: $blue-dark;
    font-weight: 600;
    font-size: 1rem;
    border-style: solid;
    border-color: $blue-dark;
    border-width: 0 2px 2px 0;
    border-radius: 99px;
    transition: all 0.25s ease;
  }

  @media(min-width:860px) {
    background-size: contain;
    background-position: 95% 50%;
  }

  @media(max-width:1024px) {
    #btn-subscribe  {
      &:active {
        background: $green;
      }
    }
  }

  @media(min-width:1024px) {
    background-position: 85% 50%;
    justify-content: center;
    padding: 3.5rem;
    gap: 2rem;

    h1 {
      font-size: 3rem;
    }

    h2 {
      font-size: 1.35rem;
    }

    h3 {
      font-size: 1rem;
    }

    #btn-subscribe {
      border: none;

      &:hover {
        filter: brightness(0.8);
      }
    }
  }
}
</style>
