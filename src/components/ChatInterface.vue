<template>
  <div class="chat-interface">
    <div class="chat-message">
      <p>Hey there! It looks like you're interested in the financing history of Llama...</p>
      <table>
        <tr>
          <th>Project Name</th>
          <th>Investment Date</th>
          <th>Round Name</th>
          <th>Investment Value</th>
          <th>Valuation</th>
          <th>Investors</th>
        </tr>
        <tr>
          <td>Llama</td>
          <td>2023-11-06</td>
          <td>Seed</td>
          <td>$6,000,000</td>
          <td>N/A</td>
          <td>Will Gaybrick, Elad Gil, Sina Habibian...</td>
        </tr>
      </table>
    </div>

    <div class="suggested-indicators">
      <button>Give me a token unlock dashboard</button>
      <button>Show me the top BRC-20 tokens</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChatInterface"
};
</script>

<style scoped>
/* 添加适当的样式 */
</style>
