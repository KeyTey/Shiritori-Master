<template>
  <div class="home">
    <div class="fadein">
      <img class="logo" alt="ロゴ" src="../assets/logo.png">
      <h1 class="title">しりとり最強さん</h1>
      <p class="description">0.1秒で単語を検索することができるサービスです</p>
      <div class="link">
        <router-link class="circle" to="/search"></router-link>
        <span class="circle decorate">検索する</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped>
.home {
  width: 80%;
  margin: 0 auto;
}
.logo {
  width: 225px;
  margin-top: 20px;
  margin-bottom: 30px;
}
.title {
  font-size: 2.5rem;
  margin-bottom: 15px;
}
.description {
  font-size: 1.25rem;
  margin-bottom: 60px;
}
.link {
  height: 180px;
  margin-bottom: 40px;
}
.circle {
  position: absolute;
  left: calc(50% - 90px);
  width: 180px;
  height: 180px;
  line-height: 180px;
  border-radius: 50%;
}
.decorate {
  text-decoration: none;
  font-size: 24px;
  border: double 4px #2C3E50;
  transition: 0.6s;
  z-index: -1;
}
.circle:hover + .decorate {
  -webkit-transform: rotateY(360deg);
  transform: rotateY(360deg);
}
@media screen and (max-width: 480px) {
  .logo {
    width: 150px;
    margin-top: 0;
    margin-bottom: 20px;
  }
  .title {
    font-size: 2rem;
  }
  .description {
    font-size: 1.2rem;
    margin-bottom: 40px;
  }
}
</style>
