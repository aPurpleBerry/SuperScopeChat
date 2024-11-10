<template>
  portfolio-暂时用作读取csv的测试部分
  <div>
    <button @click="uploadCSV">Upload CSV</button>
    <p v-if="priceSumFinal">Price sum: {{ priceSumFinal }}</p>
    <p v-else-if="isProcessing">Processing...</p>
    <p v-else>No file uploaded yet.</p>
  </div>
  <h2>实时 BTC/USDT 价格</h2>
  <p id="price">加载中...</p>
  <button @click="test">测试binance</button>
  <button @click="test2">测试shangguigu</button>
  <button @click="test3">测试qianwen</button>
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

/*************************binance******************************* */
// const ws = new WebSocket('wss://stream.binance.com:9443/ws/ethusdt@trade')
//    // 当有新消息时触发
//    ws.onmessage = (event) => {
//       const trade = JSON.parse(event.data)
//       const price = trade.p; // 获取价格信息

//       // 在页面中显示价格
//       document.getElementById('price').textContent = `当前价格: ${parseFloat(price).toFixed(2)} USDT`;
//     }

//     // 当 WebSocket 连接关闭时触发
//     ws.onclose = () => {
//       console.log("WebSocket 连接已关闭");
//     }
//上述是成功的代码,需要外网



// import { WebsocketClient } from 'binance';
// const API_KEY = 'HCrcAeAOhBHwaOg4qJXCYOl7PKUNwYfnqtdDBn7OrDQ99i9UEEXqAFLjQ3jGIdKH';
// const API_SECRET = 'LPDTAQmcjrkfXjkvOExzeUactivatedCpcJFS6xKsmyyMMbfvyC2gb7lWlpBPiVJbaW2GDri';

// // optionally override the logger
// // const logger = {
// //   ...DefaultLogger,
// //   silly: (...params) => {},
// // };

// const wsClient = new WebsocketClient(
//   {
//     api_key: API_KEY,
//     api_secret: API_SECRET,
//     beautify: true,
//     // Disable ping/pong ws heartbeat mechanism (not recommended)
//     // disableHeartbeat: true
//   },
//   // logger,
// );

// wsClient.subscribeIsolatedMarginUserDataStream('BTCUSDT');

import axios from 'axios';
async function getBTCPrice() {
  try {
    // const response = await axios.get('https://api.binance.com/api/v3/ticker/price', {
    //   params: { symbol: 'BTCUSDT' }
    // });
    const response = await axios.get('/binance/api/v3/ticker/price', {
      params: { symbol: 'BTCUSDT' }
    });
    console.log('当前 BTC 价格:', response);
  } catch (error) {
    console.error('获取价格时出错:', error);
  }
}

const test = ()=> {
  getBTCPrice()
}


async function getGuiGU() {
  try {
    const response = await axios.get('/atguigu/admin/product/baseSaleAttrList', {
    });
    console.log('auguigu', response);
  } catch (error) {
    console.error('auguigu:', error);
  }
}

const test2 = () =>{
  getGuiGU()
}


async function getChatCompletion(userMessage) {
  console.log('qianwen');
  
    const apiKey = "";  // 若没有配置环境变量，请将 "sk-xxx" 替换为你的实际 API Key
    // const baseURL = "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions";
    
    try {
        const response = await axios.post(
            '/qianwen',
            {
                model: "qwen-plus",  // 模型列表：https://help.aliyun.com/zh/model-studio/getting-started/models
                messages: [
                    { role: "system", content: "You are a helpful assistant." },
                    { role: "user", content: userMessage }
                ]
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${apiKey}`
                }
            }
        );
        console.log(response.data.choices[0].message.content);
        

        return response.data.choices[0].message.content;
    } catch (error) {
        console.log(`错误信息：${error.message}`);
        console.log("请参考文档：https://help.aliyun.com/zh/model-studio/developer-reference/error-code");
        return null;
    }
}

const test3 = ()=>{
  getChatCompletion('三天两夜的深圳行程')
}
</script>