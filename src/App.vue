<script setup>
// 导入 axios 用于发送 HTTP 请求
// import {  onMounted } from 'vue';
// import axios from 'axios';

// const getdata = ()=>{
//   axios.post('/rootdata', {
//       query: 'BTC'
//     }, {
//       headers: {
//         "apikey": "JNn4uCFRY6kPa4w8prjbjU9xDJxVRtEl",
//         "language": "en",
//         "Content-Type": "application/json"
//       }
//     })
//     .then(response => {
//       console.log(response);
      
//     })
//     .catch(error => {
//       console.error("Error:", error);
//     });
// }
// onMounted(()=>{
//   getdata()
// });


</script>

<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<style scoped>
* {
  padding: 0;
  margin: 0;
}
</style>
