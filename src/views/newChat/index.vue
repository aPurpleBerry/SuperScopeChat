<template>
  <div class="banner">New Chat</div>
  <div class="chatmain">
    <!-- 推荐问题按钮 -->
    <div id="recommended-questions" class="recommended-questions">
        <button class="question-btn" @click="sendQuestion('请生成一份分析报告，分析BitCoin主要看涨和看跌指标')">请生成一份分析报告，分析BitCoin主要看涨和看跌指标</button>
        <button class="question-btn" @click="sendQuestion('介绍一下BitCoin')">介绍一下BitCoin</button>
        <button class="question-btn" @click="sendQuestion('给我推荐一些web3领域优秀的项目')">给我推荐一些web3领域优秀的项目</button>
        <button class="question-btn" @click="sendQuestion('有关bitcoin的链上数据')">有关bitcoin的链上数据</button>
    </div>

    <!-- 聊天对话框 -->
    <div id="chat-box" class="chat-box">
      <!-- 渲染消息 -->
      <div v-for="(message, index) in messages" :key="index" :class="['chat-message', message.type]">
        <span v-html="message.content"></span>
      </div>
    </div>

    <!-- 聊天输入区 -->
    <div class="chat-input-section">
      <input type="text" id="chat-input" placeholder="Type your message here..." v-model="userQuestion" />
      <button id="send-btn" @click="sendBtnFunc">Send</button>

      <!-- <input type="file" @change="handleFileUpload" />
      <p>Price sum: {{ priceSumFinal }}</p> -->
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import {marked} from 'marked';
import axios from 'axios';

const analyRepo = [
  {
    'token': 'BitCoin', 
    'AIScore': 0.4775508, //综合评分
    'explain': {
      'feat0': {'feat': 'CDLEVENINGSTAR', 'data': [0.0]}, 
      'feat1': {'feat': 'CDLMORNINGDOJISTAR', 'data': [0.0]}, 
      'feat2': {'feat': 'CDLEVENINGDOJISTAR', 'data': [0.0]},
      'feat3': {'feat': 'Hourly', 'data': [0.0]}, 
      'feat4': {'feat': 'ULTOSC', 'data': [0.5578889753118449]}, 
      'feat5': {'feat': 'MA_Ratio', 'data': [0.020335385268506]}, 
      'feat6': {'feat': 'Z_score', 'data': [-0.5503426873776425]}, 
      'feat7': {'feat': 'MA_Ratio_short', 'data': [0.037419211672362]}, 
      'feat8': {'feat': 'RSI', 'data': [0.5515217187833727]}, 
      'feat9': {'feat': 'boll', 'data': [0.4460836133859971]}
    }
  },
  {
    'token': 'dYdXDYDX', 
    'AIScore': 0.426398, 
    'explain': {
      'feat0': {'feat': 'CDLSPINNINGTOP', 'data': [-1.0]}, 
      'feat1': {'feat': 'zsVol', 'data': [0.3919789837077522]}, 
      'feat2': {'feat': 'Hourly', 'data': [0.0]}, 
      'feat3': {'feat': 'PR_MA_Ratio_short', 'data': [0.0167782438401189]}, 
      'feat4': {'feat': 'Z_score', 'data': [-0.4707129808511444]}, 
      'feat5': {'feat': 'ULTOSC', 'data': [0.499067854931114]}, 
      'feat6': {'feat': 'MA_Ratio', 'data': [-0.0835269298223231]}, 
      'feat7': {'feat': 'PR_MA_Ratio', 'data': [-0.0331920747265545]}, 
      'feat8': {'feat': 'boll', 'data': [0.4923267383141622]}, 
      'feat9': {'feat': 'RSI', 'data': [0.4888654689851]}
    }
  }
]

function generateTokenAnalysisReport(tokenData) {
  const { token, AIScore, explain } = tokenData;
  let report = `### Token Analysis Report for ${token}\n\n`;
  report += `#### AI Score\n`;
  report += `- **AIScore**: ${AIScore} (AIScore indicates the overall sentiment towards the token based on various technical indicators.)\n\n\n`;

  report += `#### Bullish Indicators\n`;
  report += `- **ULTOSC**: ${explain.feat4.data[0].toFixed(2)} (Ultimate Oscillator above 50 indicates bullish momentum.)\n`;
  report += `- **MA_Ratio**: ${explain.feat5.data[0].toFixed(2)} (Positive MA_Ratio suggests upward trend strength.)\n`;
  report += `- **RSI**: ${explain.feat8.data[0].toFixed(2)} (RSI above 50 indicates bullish sentiment.)\n`;
  report += `- **Bollinger Bands**: ${explain.feat9.data[0].toFixed(2)} (Price above the middle band can indicate a bullish trend.)\n\n`;

  report += `#### Bearish Indicators\n`;
  report += `- **Z_score**: ${explain.feat6.data[0].toFixed(2)} (A significantly negative Z_score may indicate an oversold condition.)\n`;
  report += `- **MA_Ratio_short**: ${explain.feat7.data[0].toFixed(2)} (Negative MA_Ratio_short could suggest a bearish short-term trend.)\n`;
  report += `- **RSI**: ${explain.feat8.data[0].toFixed(2)} (RSI below 50 indicates bearish sentiment.)\n`;
  report += `- **Bollinger Bands**: ${explain.feat9.data[0].toFixed(2)} (Price below the middle band can indicate a bearish trend.)\n\n`;

  report += `#### Additional Insights\n`;
  let CDLPatternData = Object.keys(explain).reduce((acc, key) => {
    const feature = explain[key];
    if (feature.feat.startsWith('CDL')) {
      acc.push(`${feature.feat}: ${feature.data[0]}`);
    }
    return acc;
  }, []);
  report += `- **CDL Patterns**: ${CDLPatternData.length > 0 ? CDLPatternData.join(', ') : 'No significant patterns detected'} (Candlestick patterns like Evening Star or Morning Star can signal potential trend reversals.)\n`;

  let volumeData = 'Volume data not available';
  if ('feat1' in explain && explain.feat1.feat === 'zsVol') {
    volumeData = `zsVol: ${explain.feat1.data[0].toFixed(2)}`;
  }
  report += `- **Volume**: ${volumeData} (Volume analysis can provide insights into the strength of a trend.)\n\n`;

  report += `#### Conclusion\n`;
  report += `Based on the analysis of various technical indicators, ${token} exhibits both bullish and bearish signals. The overall sentiment is influenced by the interplay of these indicators, and traders should consider the broader market context when making decisions.`;

  return report;
}

const msgWeb3Proj = `Web3是一个不断发展和创新的领域，涉及到去中心化金融（DeFi）、非同质化代币（NFT）、区块链基础设施、智能合约平台和社交网络等多个方面。以下是一些在Web3领域中表现优秀的项目：

1. **DeFi（去中心化金融）**：
   - **Aave**：一个分散的、非托管的流动性市场协议，用户可以存入或借出加密资产。
   - **Uniswap**：一个流行的去中心化交易所（DEX），允许用户交换ERC-20代币。
   - **PancakeSwap**：建立在Binance智能链上的DeFi平台，提供交换、流动性挖掘和NFT收集等功能。

2. **NFT（非同质化代币）**：
   - **OpenSea**：一个去中心化的NFT市场，用户可以创建、购买和出售NFT。
   - **Rarible**：一个去中心化的NFT创作和交易平台，强调社区所有权和治理。

3. **基础设施和工具**：
   - **MetaMask**：一个流行的以太坊钱包和浏览器扩展，允许用户访问去中心化应用（DApp）。
   - **Infura**：提供API访问以太坊和IPFS网络，以便开发者可以更容易地构建和扩展他们的DApp。

4. **社交网络和DAO（去中心化自治组织）**：
   - **DAOstack**：一个为创建和管理DAO提供的框架，使用户能够参与去中心化的治理。
   - **Steemit**：一个去中心化的博客和社交媒体平台，用户可以通过发布内容和参与社区治理来获得奖励。

5. **游戏和其他应用**：
   - **Axie Infinity**：一个基于区块链的游戏，玩家可以培养、战斗和交易虚拟生物Axies。
   - **Decentraland**：一个去中心化的虚拟世界，用户可以购买土地、建造建筑和参与各种虚拟活动。

6. **区块链基础设施**：
   - **Polkadot**：一个旨在实现跨链互操作性的平台，允许不同的区块链网络相互通信和交换价值。
   - **Cosmos**：另一个跨链平台，专注于创建一个区块链互联网，其中不同的区块链可以轻松地连接和交互。

这些项目代表了Web3领域的多样性和创新性，它们正在推动去中心化技术和应用的发展。
`
function generateBitcoinReport(data) {
  const {
    introduce,
    name,
    logo,
    active,
    rootdataurl,
    id,
    type,
    marketData
  } = data;

  let report = `### ${name} (Bitcoin) 介绍报告\n\n`;
  report += `**名称：** ${name}\n`;
  // report += `**符号：** BTC\n`;
  // report += `**状态：** ${active ? '活跃' : '非活跃'}\n`;
  report += `\n**官方网站：** [${name} on RootData](${rootdataurl})\n`;
  // report += `**项目ID：** ${id}\n`;
  // report += `**类型：** ${type}\n\n`;
  report += ` \n**简介：** ${introduce}\n\n`;
  
  report += `**市场数据：**\n`;
  report += `  - **当前价格（USD）：** $${marketData.price_usd}\n`;
  report += `  - **市值（USD）：** $${marketData.market_cap_usd.toFixed(2)}\n`;
  report += `  - **24小时交易量（USD）：** $${marketData.volume_usd_24h.toFixed(2)}\n`;
  report += `  - **24小时价格变化：** ${((marketData.price_change_24h) * 100).toFixed(2)}%\n`;
  report += `  - **最后更新时间：** ${marketData.last_updated_at}\n\n`;

  report += `**技术特点：**\n`;
  report += `  - **去中心化：** ${name}网络不受单一实体控制，确保了其去中心化的特性。\n`;
  report += `  - **开源：** ${name}的代码对所有人开放，任何人都可以参与和贡献。\n`;
  report += `  - **安全性：** 交易通过强大的密码学技术进行验证，确保安全性。\n`;
  report += `  - **透明性：** 所有交易都记录在区块链上，任何人都可以查看。\n\n`;

  report += `**用途：**\n`;
  report += `  - 作为价值储存手段。\n`;
  report += `  - 用于在线和离线交易。\n`;
  report += `  - 作为一种投资工具。\n\n`;

  report += `**市场表现：**\n`;
  report += `  - ${name}作为第一个也是最知名的加密货币，其价格和市值一直受到全球投资者的密切关注。\n\n`;

  report += `**未来发展：**\n`;
  report += `  - 随着区块链技术的发展和加密货币的普及，${name}预计将继续在全球金融体系中扮演重要角色。\n\n`;

  report += `**结论：**\n`;
  report += `  - ${name}不仅是加密货币的先驱，也是去中心化金融运动的象征。随着技术的进步和全球接受度的提高，${name}的潜力和影响力将继续增长。`;

  return report;
}

// 示例合并后的数据
const mergedBitcoinData = {
  "introduce": "Bitcoin is a decentralized digital currency without a central bank or single administrator. It can be sent from user to user on the peer-to-peer bitcoin network without the need for intermediaries. Transactions are verified by network nodes through cryptography and recorded in a public distributed ledger called a blockchain. The cryptocurrency was invented in 2008 by an unknown person or group of people using the name Satoshi Nakamoto. Its implementation was released as open-source software in 2009 and began to be used then.",
  "name": "Bitcoin",
  "logo": "https://public.rootdata.com/images/b6/1666341517173.jpg",
  "active": true,
  "rootdataurl": "https://www.rootdata.com/Projects/detail/Bitcoin?k=Mg==",
  "id": 2,
  "type": 1,
  "marketData": {
    "price_usd": 67086,
    "market_cap_usd": 1326399443445.7039,
    "volume_usd_24h": 36794869003.11751,
    "price_change_24h": 0.5045008519485522,
    "last_updated_at": new Date(1729756204 * 1000).toLocaleString() // 将UNIX时间戳转换为本地日期和时间
  }
};

// 介绍Bitcoin
const bitcoinData = generateBitcoinReport(mergedBitcoinData);

const messages = ref([]); // 聊天记录数组
const userQuestion = ref(''); // 用户输入的内容

// 与通义千问交互分析问题种类
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
        console.log('函数内='+response.data.choices[0].message.content);
        

        return response.data.choices[0].message.content;
    } catch (error) {
        console.log(`错误信息：${error.message}`);
        console.log("请参考文档：https://help.aliyun.com/zh/model-studio/developer-reference/error-code");
        return null;
    }
}

// 发送问题的函数
const sendQuestion = (question) => {
  // 显示用户的问题
  messages.value.push({
    type: 'user',
    content: question,
  });

  // 模拟机器人回复
  setTimeout(async() => {
    let botReply = '';
    if (question.includes('请生成一份分析报告，分析BitCoin主要看涨和看跌指标')) {
      botReply = marked.parse(generateTokenAnalysisReport(analyRepo[0]))
    } else if (question.includes('介绍一下BitCoin')) {
      botReply = marked.parse(bitcoinData)
    } else if (question.includes('给我推荐一些web3领域优秀的项目')) {
      botReply = marked.parse(msgWeb3Proj)
    } else if (question.includes('有关bitcoin的链上数据')) {
      botReply = '有关bitcoin的链上数据';
    } else {
      // 默认回复
      
      botReply = await getChatCompletion(`请判断以下问题的意图类型：${question}。
      如果是咨询类问题，请回答1；
      如果是数据分析类问题，请回答2；
      如果是技术支持与开发类问题，请回答3；
      如果是投资与风险分析类问题，请回答4；
      如果是合规与安全类问题，请回答5；
      如果是市场动态与新闻类问题，请回答6；
      请按照[数字, 其他补充] 的格式来回复。`)
      // botReply = '这是关于“' + question + '”的自动回复';
      botReply += '<br><br>目前这个问题暂时处在处理分析问题种类的阶段：1咨询类，2数据分析类，3技术支持与开发类，4投资与风险分析类，5合规与安全类，6市场动态与新闻类。'
      console.log('botReply = '+botReply);
    }
    
    

    // 将回复添加到消息数组中
    messages.value.push({
      type: 'bot',
      content: botReply,
    });

    // 滚动到底部
    scrollToBottom();
  }, 500); // 模拟延迟
};

// 滚动到底部的函数
const scrollToBottom = () => {
  const chatBox = document.getElementById('chat-box');
  chatBox.scrollTop = chatBox.scrollHeight;
};

// 点击发送按钮时的函数
const sendBtnFunc = () => {
  if (userQuestion.value.trim()) {
    // 调用发送问题的函数
    sendQuestion(userQuestion.value);
    userQuestion.value = ''; // 清空输入框
  }
};


</script>

<style>
.banner {
  width: 100%;
  height: 40px;
  font-weight: bolder;
  text-align: center;
  border-bottom: #444 0.1px solid;
  margin-bottom: 5px;
}
.chatmain {
  width: 80%;
  margin: 0 auto;
}
.recommended-questions {
  margin-bottom: 15px;
}

.recommended-questions .question-btn {
  margin: 5px;
  padding: 8px 12px;
  background-color: #444;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
}

.recommended-questions .question-btn:hover {
  background-color: #29b564;
}

.chat-box {
  width: 98%;
  height: 500px;
  background-color: #222;
  border-radius: 10px;
  padding: 10px;
  overflow-y: auto;
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.chat-input-section {
  display: flex;
  gap: 10px;
}
#chat-input {
  flex-grow: 1;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #333;
  color: white;
}

#send-btn {
  padding: 10px 15px;
  background-color: #29b564;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
}

.chat-message {
  background-color: #444;
  color: white;
  padding: 8px 12px;
  border-radius: 5px;
  max-width: 70%;
  word-wrap: break-word;
  margin-bottom: 5px;
}

.chat-message.user {
  align-self: flex-end;
  background-color: #29b564;
}

.chat-message.bot {
  align-self: flex-start;
}
</style>