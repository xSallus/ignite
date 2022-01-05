<template>
  <div id="posts" v-for="post in posts" >
    <Post :post="post" :key="post.id" />
  </div>
</template>

<script>
import Post from '@/components/Post.vue';
import store from '@/store';

export default {
  name: 'Posts',
  data: () => {
    const posts = store.getters.getPosts;
    return {
      posts
    };
  },
  components: { Post }
}
</script>

<style scoped lang="scss">
@import '@/styles/colors.scss';

#posts {
  height: 85vh;
  padding: 2rem;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  @media(min-width:860px) {
    color: $white;
  }

  @media(max-width:1024px) {
    color: $green;
  }

  @media(min-width:1024px) {
    justify-content: center;
    padding: 3.5rem;
    gap: 2rem;
  }
}
</style>
