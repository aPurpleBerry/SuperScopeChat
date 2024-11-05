<!-- <template>
  <div>
    apitest
  </div>
</template>

<script setup>

</script>

<style scoped>

</style> -->

<template>
  <div>
    <input type="file" @change="handleFileUpload" />
    <p>Price sum: {{ priceSumFinal }}</p>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import Decimal from 'decimal.js';

let priceSumFinal = ref(0)

const handleFileUpload=(event)=> {
  // 获取用户选择的文件
  const file = event.target.files[0];

  // 创建一个新的FileReader对象
  const reader = new FileReader();

  // 监听文件读取完成事件
  reader.onload = () => {
    // 将读取的文件内容传递给处理CSV数据的函数
    parseCSVData(reader.result);
  };

  // 读取文件内容
  reader.readAsText(file);
}

const parseCSVData = (data)=>{
  // 解析CSV文件内容，并将其转换为对应的数据结构
  // 例如，将CSV中的每一行转换为一个对象
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

  console.log(csvData);
  

  // // 在控制台中打印CSV数据
  // console.log(csvData[1].price);
  // console.log(csvData.length);
  // console.log(typeof csvData[1].price);
  
  
  // let priceSum = parseInt(0);
  // console.log(typeof priceSum);
  
  // for(let i=1; i<csvData.length; i++) {
  //   priceSum += parseFloat(csvData[i].price)
  // }
  // console.log(priceSum);

  
  // 初始化 priceSum 为 Decimal 类型
  let priceSum = new Decimal(0);
  console.log(typeof priceSum); // 输出：object

  for (let i = 1; i < 100; i++) {
    // 使用 Decimal 来处理每个 price 值
    let priceDecimal = new Decimal(csvData[i].price);
    priceSum = priceSum.plus(priceDecimal);
  }

  console.log(priceSum.toString()); // 输出：将 Decimal 转换为字符串
  priceSumFinal.value = priceSum.toString()

  }
  
</script>