<template>
  <h1>API TEST</h1>
  <el-card style="width:90%;">
    <span style="margin-right: 40px;">交易量数据: 上传csv获取某日的某货币的交易量</span>
    <input type="file" @change="handleFileUpload" />
    <span>Price sum: {{ priceSumFinal }}</span>
  </el-card>
  <el-card style="width:90%;">
    <span style="margin-right: 10px;">ROOTDATA</span>
    <el-button type="primary" @click="rootdataFunc">INPUT：ETH-TEST</el-button>
    <pre v-if="ROOTDATAresult" style="height: 200px; overflow-y: auto;background-color: #f7f7f9;">{{ ROOTDATAresult }}</pre>
  </el-card>
  <el-card style="width:90%;">
    <span style="margin-right: 10px;">CoingGecko</span>
    <el-button type="primary" @click="CoingGeckoFunc">INPUT：bitcoin+usd->TEST</el-button>
    <pre v-if="CoingGeckoresult" style="height: 200px; overflow-y: auto;background-color: #f7f7f9;">{{ CoingGeckoresult }}</pre>
  </el-card>
</template>

<style>
.el-card {
  margin-bottom: 15px;
}
</style>

<script setup>
import {ref} from 'vue'
import axios from 'axios';
import Decimal from 'decimal.js';

/***********************交易量数据********************/ 
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
  
/***********************ROOTDATA********************/ 
let ROOTDATAresult = ref('')

const getrootdata = ()=>{
  axios.post('/rootdata', {
      query: 'ETH'
    }, {
      headers: {
        "apikey": "",
        "language": "en",
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      console.log(response);
      ROOTDATAresult.value = response
    })
    .catch(error => {
      console.error("Error:", error);
    });
}

const rootdataFunc=()=>{
  getrootdata()
  // ROOTDATAresult.value = '以ETH为TOKEN的返回值：';
}

/***********************CoingGecko********************/ 
let CoingGeckoresult = ref('')

const getCoingGeckodata = ()=>{
  const options = {
    method: 'GET',
    url: '/gecko',
    headers: {
      accept: 'application/json',
      'x-cg-demo-api-key': ''
    },
    params: {
      ids: 'bitcoin',
      vs_currencies: 'usd'
    } 
  };
  
  axios(options)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });
}

const CoingGeckoFunc=()=>{
  getCoingGeckodata()
  // ROOTDATAresult.value = '以ETH为TOKEN的返回值：';
}

</script>