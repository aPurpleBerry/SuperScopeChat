<template>
  <div class="question-list">
    <p>Before Trading, Ask Scopechat</p>
    <p>Notice: Enter your question in the input box...</p>

    <div class="recommended-questions">
      <button @click="openChat">Show me the financing record of Llama.</button>
      <button>Give me an investment report for the token BBT on the BSC network.</button>
      <button>Give me an investment report for the token VISTA on the Ethereum network.</button>
      <button>Smart Money top performing tokens on the BSC network.</button>
    </div>
  </div>
</template>

<script>
export default {
  emits: ['start-chat'],
  methods: {
    openChat() {
      // 触发父组件的方法，切换到聊天模式
      this.$emit('start-chat');
    }
  }
};
</script>

<style scoped>
/* 添加适当的样式 */
</style>
