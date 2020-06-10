<template>
  <div class="home">
    <div class="fadein">
      <img alt="ロゴ" src="../assets/logo.png">
      <h1>しりとり最強さん</h1>
      <p>単語を検索することができるサービスです</p>
      <router-link to="/search">検索する</router-link>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped>
img {
  margin: 20px 0;
}
h1 {
  margin-bottom: 10px;
}
p {
  font-size: 20px;
  margin-bottom: 60px;
}
a {
  display: inline-block;
  text-decoration: none;
  font-size: 24px;
  color: #2C3E50;
  width: 180px;
  height: 180px;
  line-height: 180px;
  border-radius: 50%;
  border: double 4px #2C3E50;
  text-align: center;
  overflow: hidden;
  transition: 0.6s;
}
a:hover {
  -webkit-transform: rotateY(360deg);
  transform: rotateY(360deg);
}
</style>
