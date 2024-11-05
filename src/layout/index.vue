<template>
  <div class="common-layout">
    <el-container>
      <el-aside class="layout_menu">
        <div class="logo">SuperScopeChat</div>
        <el-menu
          :default-active="$route.path"
          :router="true"
          active-text-color="#29b564"
          background-color="#1e1e1e"
          text-color="#fff"
        >
          <el-menu-item index="/portfolio">
            <el-icon><icon-menu /></el-icon>
            <span>Portfolio</span>
          </el-menu-item>
          <el-menu-item index="3" disabled>
            <el-icon><document /></el-icon>
            <span>Disabled Navigator</span>
          </el-menu-item>
          <el-menu-item index="/newchat">
            <el-icon><setting /></el-icon>
            <span>New Chat</span>
          </el-menu-item>
          <el-menu-item index="/apitest">
            <el-icon><icon-menu /></el-icon>
            <span>Api Test</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="layout_main" >
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
let $route = useRoute()
</script>

<style scoped>
.logo {
  height: 80px;
  width: 100%;
  /* background-color: #fff; */
  line-height: 80px;
  font-size: 1.5em;
  font-weight: bolder;
  color: #29b564;
  text-align: center;
}
.common-layout {
  width: 100vw;
  height: 100vh;
  background-color: #000;
}

.layout_menu{
  width: 250px;
  height: 100vh;
  background-color: #1e1e1e;
}

.layout_main {
  width: calc(100vw - 250px);
  height: 100vh;
  color: #fff;
  /* background-color: red; */
}

.el-menu{
  border-right: none !important;
}
</style>