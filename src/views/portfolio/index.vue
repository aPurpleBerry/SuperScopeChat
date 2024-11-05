<template>
  portfolio-暂时用作读取csv的测试部分
  <div>
    <button @click="uploadCSV">Upload CSV</button>
    <p v-if="priceSumFinal">Price sum: {{ priceSumFinal }}</p>
    <p v-else-if="isProcessing">Processing...</p>
    <p v-else>No file uploaded yet.</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Decimal from 'decimal.js';

const priceSumFinal = ref('');
const isProcessing = ref(false);

const uploadCSV = () => {
  // 创建一个指向本地文件的 URL
  const csvFileUrl = new URL('./BTCUSDT_250328-aggTrades-2024-11-04.csv', import.meta.url);
  const csvFile = document.createElement('input');
  csvFile.setAttribute('type', 'file');
  csvFile.setAttribute('value', csvFileUrl.href);

  // 模拟文件选择事件
  const event = new Event('change', { bubbles: true, cancelable: true });
  csvFile.dispatchEvent(event);

  // 处理文件上传
  handleFileUpload(event);
};

const handleFileUpload = (event) => {
  if (!event.target.files.length) return;

  isProcessing.value = true;
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    parseCSVData(reader.result);
  };
  reader.onerror = () => {
    alert('Error reading file');
  };
  reader.readAsText(file);
};

const parseCSVData = (data) => {
  const rows = data.split('\n');
  const headers = rows[0].split(',');
  const csvData = [];

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i].split(',');
    const rowData = {};
    for (let j = 0; j < headers.length; j++) {
      rowData[headers[j]] = row[j];
    }
    csvData.push(rowData);
  }

  let priceSum = new Decimal(0);
  for (let i = 1; i < csvData.length; i++) {
    let priceDecimal = new Decimal(csvData[i].price);
    priceSum = priceSum.plus(priceDecimal);
  }

  priceSumFinal.value = priceSum.toString();
  isProcessing.value = false;
};
</script>