<template>
  <div class="post" >
    <h1>{{ post.title }}</h1>
    <span>by {{ post.author }}</span>
    <p>{{ post.content.preview }}</p>
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
  height: 7rem;
  width: 75rem;
  max-width: 95vw;
  padding: 0.85rem;
  border: 1px solid $white;
  border-radius: 8px;
  
  display: grid;
  grid-template-areas: "top top top top by" "bt bt bt bt .";
  grid-template-columns: repeat(4, 3fr) 1fr;
  grid-template-rows: repeat(2, 2fr);

  animation: SlideInPost 2s 1 ease;

  h1 {
    grid-area: top;
    font-size: 1.5rem;
  }

  span {
    grid-area: by;
  }

  p {
    grid-area: bt;
  }

  @media(max-width: 860px) {
    height: 15vh;
  }
 }

@keyframes SlideInPost {
  from {
    transform: translateX(-200%);
  }

  to {
    transform: translateX(0);
  }
}
</style>
