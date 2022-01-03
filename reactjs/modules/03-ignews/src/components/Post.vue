<template>
  <div class="post" >
    <h1>{{ post.title }}</h1>
    <span>by {{ post.author }}</span>
    <p>{{ post.content.preview }}</p>
    <p>...</p>
  </div>
</template>

<script>
export default {
  name: 'Post',
  props: ['post'],
  methods: {},
  components: {}
}
</script>

<style scoped lang="scss">
@import '@/styles/colors.scss';

.post {
  height: 3rem;
  width: 9rem;
  max-width: 95vw;
}

@keyframes SlideInPost {
  from {
    left: -200%;
  }

  to {
    left: 0;
  }
}
</style>
