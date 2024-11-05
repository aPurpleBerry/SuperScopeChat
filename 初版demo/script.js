// script.js
// 获取所有侧边栏的菜单项
const portfolioLink = document.getElementById('portfolio-link');
const swapLink = document.getElementById('swap-link');
const findTokenLink = document.getElementById('find-token-link');
const newChatLink = document.getElementById('new-chat-link');
const alertsLink = document.getElementById('alerts-link');
const narrativesLink = document.getElementById('narratives-link');
const tutorialLink = document.getElementById('tutorial-link');

// 获取所有的内容部分
const sections = document.querySelectorAll('.content-section');

// 添加点击事件监听器
portfolioLink.addEventListener('click', () => showSection('portfolio-content'));
swapLink.addEventListener('click', () => showSection('swap-content'));
findTokenLink.addEventListener('click', () => showSection('find-token-content'));
newChatLink.addEventListener('click', () => showSection('new-chat-content'));
alertsLink.addEventListener('click', () => showSection('alerts-content'));
narrativesLink.addEventListener('click', () => showSection('narratives-content'));
tutorialLink.addEventListener('click', () => showSection('tutorial-content'));

// 定义函数来显示选定的内容
function showSection(sectionId) {
    // 隐藏所有内容部分
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // 显示被点击的内容部分
    const activeSection = document.getElementById(sectionId);
    activeSection.classList.add('active');
}

// 默认显示第一个部分（比如 Portfolio 内容）
showSection('portfolio-content');

/************************聊天对话框*************************** */

// 获取相关元素
const chatBox = document.getElementById('chat-box');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');
const questionButtons = document.querySelectorAll('.question-btn');


// 请生成一份分析报告，分析代币OM在Ethereum上的主要看涨和看跌指标
const msg1 = `
## 投资报告：MANTRA DAO (OM)
### 日期：2024-10-10
### 🎯AI 评分：57（中性）

基于市场趋势、历史表现、链上交易以及社交媒体和新闻内容的分析，我们的AI模型为MANTRA DAO (OM) 赋予了57的总体评分。这个评分反映了在未来24到72小时内投资OM的潜在机会和风险。以下是计算此评分时考虑的主要指标。

#### 目标：OM
#### 代币合约：[0x3593d125a4f7849a1b059e64f4517a86dd60c95d](https://etherscan.io/address/0x3593d125a4f7849a1b059e64f4517a86dd60c95d)
#### 价格：$1.42
#### 市值：$1,207,733,254.00
#### 类别：[BNB Chain 生态系统](https://ai.0xscope.com?question=0), [Base 生态系统](https://ai.0xscope.com?question=1), [Cosmos 生态系统](https://ai.0xscope.com?question=2)
#### 链接：[官网](https://www.mantrachain.io/), [Twitter](https://twitter.com/MANTRA_Chain), [Telegram](https://t.me/MANTRA_Chain), [Discord](https://discord.gg/gfks4TwAJV)

#### 📈看涨指标：

- **MACD**：当前MACD线在信号线上方，但MACD柱状图正在收缩。这可能意味着市场仍在上升趋势中，但动能正在减弱，可能是考虑合适卖出机会的好时机。

#### 😐中性指标：

- **布林带**：当前OM代币价格位于中轨和上轨之间，显示出近期相对强劲的表现。中轨可能作为支撑，而上轨可能是短期目标。

- **RSI**：当前RSI为66.02，表明市场状况中性，没有明显的超买或超卖信号。

#### 🏦购买渠道：

- **CEX**：目前，OM交易量最高的中心化交易所是[Slex](https://slex.io/)、[OKX](https://ouxyi.church/join/13065576)和[Binance](https://accounts.suitechsui.io/register?ref=48888228)。

- **DEX**：目前，24小时交易量最高的去中心化交易所是Uniswap V2 (Base)。

我的技术分析基于日线K线图指标，更适合中长期交易者。作为Web3 AI助手，生成的报告仅供参考，不构成投资建议。有关此代币的更多详细信息，请探索推荐的问题。
`

const msg2 = `当然，以下是两个虚构的Web3项目的描述和它们之间关键指标的对比：

### 项目A: CrypToys
**类型**: NFT收藏和交易平台

**描述**: CrypToys是一个基于区块链的数字玩具收藏和交易平台，用户可以购买、销售和交易独特的NFT数字玩具。

**关键指标**:
- **TVL**: $50 million
- **活跃钱包数量**: 10,000
- **集成数量**: 与5个流行钱包和3个去中心化交易所集成
- **开发者和应用程序的数量**: 150开发者，20个相关应用程序
- **交易总数**: 5,000笔/日
- **活跃玩家数量**: 8,000
- **用户平均交易额**: $200
- **GitHub星标数量**: 800
- **dApp收入**: $100,000/月
- **实现的交易价值（TVE）**: $10 million/年
- **社区活跃度**: 高，有活跃的开发者论坛和Discord社区

### 项目B: DeFiDrops
**类型**: 去中心化金融（DeFi）收益聚合平台

**描述**: DeFiDrops是一个DeFi收益聚合平台，允许用户通过流动性挖矿和收益农场优化他们的加密资产收益。

**关键指标**:
- **TVL**: $150 million
- **活跃钱包数量**: 20,000
- **集成数量**: 与10个流行钱包和5个去中心化交易所集成
- **开发者和应用程序的数量**: 300开发者，50个相关应用程序
- **交易总数**: 15,000笔/日
- **活跃玩家数量**: 15,000
- **用户平均交易额**: $500
- **GitHub星标数量**: 1,200
- **dApp收入**: $200,000/月
- **实现的交易价值（TVE）**: $30 million/年
- **社区活跃度**: 非常高，有大型的Telegram群组和定期的社区投票

### 对比:
1. **市场定位**: CrypToys专注于NFT市场，而DeFiDrops专注于DeFi收益聚合。
2. **TVL**: DeFiDrops的总锁定价值高于CrypToys，表明其管理的资产更多。
3. **活跃钱包数量**: DeFiDrops有更多的活跃钱包，表明其用户基础更大。
4. **集成数量**: 虽然两者都有与钱包和DEX的集成，但DeFiDrops的集成数量更多。
5. **开发者和应用程序的数量**: DeFiDrops有更多的开发者和应用程序，表明其生态系统更发达。
6. **交易总数**: DeFiDrops的交易总数更高，表明其平台活动更频繁。
7. **用户平均交易额**: DeFiDrops的用户平均交易额也更高，表明其用户交易的金额更大。
8. **GitHub星标数量**: DeFiDrops有更多的GitHub星标，表明其代码库更受欢迎。
9. **dApp收入**: DeFiDrops的dApp收入更高，表明其商业模式更盈利。
10. **实现的交易价值（TVE）**: DeFiDrops的TVE更高，表明其协议在一段时间内实现的交易价值更大。
11. **社区活跃度**: 两者都有活跃的社区，但DeFiDrops的社区活跃度更高。

这个对比展示了两个虚构项目在不同关键指标上的差异，这些指标可以帮助评估它们在市场中的表现和潜力。
`

const msg3 = `Web3是一个不断发展和创新的领域，涉及到去中心化金融（DeFi）、非同质化代币（NFT）、区块链基础设施、智能合约平台和社交网络等多个方面。以下是一些在Web3领域中表现优秀的项目：

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
const msg4 = `## Investment Report: Uniswap (UNI)
### Date: 2024-10-10

### 🎯AI Score: 61 (neutral) 
Based on an analysis of market trends, historical performance, on-chain transactions, and Twitter and news content, our AI model has assigned Uniswap (UNI) an overall score of 61. This score reflects the potential opportunity and risk of investing in UNI within the next 24h - 72h. Below are the main metrics taken into account to calculate this score.

#### Target: UNI
#### Token Contract: 0x1f9840a85d5af5bf1d1762f925bdaddc4201f984
#### Price: $7.96
#### MKT Cap: $6,008,681,069.00
#### Category: [Andreessen Horowitz (a16z) Portfolio](https://ai.0xscope.com?question=0), [Arbitrum Ecosystem](https://ai.0xscope.com?question=1), [Automated Market Maker (AMM)](https://ai.0xscope.com?question=2)
#### Links: [Website](https://uniswap.org/), [Twitter](https://twitter.com/Uniswap), [Discord](https://discord.gg/FCfyBSbCU5)

#### :chart_with_upwards_trend: Bullish Metrics:

- **MACD**: The current MACD line has crossed above the signal line, creating a golden cross, potentially indicating a buy signal.

- **MA**: The current price of the UNI token is above the Moving Average (MA), and the MA is showing an upward trend, potentially indicating an upward market trend. 

#### :monocle_face: Neutral:

- **Bollinger Bands**: The current UNI token price is between the middle and upper bands, indicating relatively strong recent performance. The middle band may act as support, and the upper band could be a short-term target.

- **RSI**: The current RSI is 55.99, indicating a neutral market condition without clear overbought or oversold signals.

#### :chart_with_downwards_trend: Bearish Metrics:

- **Funding Rate 【🛡️Medium impact】**: UNI's current funding rate is at -0.01% on Binance (Futures), meaning there are more short position holders. This indicates bearish sentiment as they are willing to pay a 0.01% fee to long traders. The total open interest value is currently $51,285,780.14, with a trading volume of $606,334,880.38 in the last 24 hours. [ScopeChat](https://ai.0xscope.com?question=perpetual)

#### :bank: Where to Buy:

- **CEX**: Currently, the centralized exchanges with the highest UNI trading volume are [OKX](https://ouxyi.church/join/13065576), [Bybit](https://www.bybit.com), [Binance](https://accounts.suitechsui.io/register?ref=48888228).

- **DEX**: Currently, the DEX with the highest 24-hour trading volume is Uniswap V3 (Ethereum).

My technical analysis is based on the daily candlestick chart indicators, which are more suitable for medium to long-term traders. As a Web3 AI assistant, reports generated are for reference only, not investment advice. For further details about this token, explore the recommended questions above.`

// 发送消息函数
function sendMessage(messageText) {
  console.log('messageText',messageText);
  
    if (messageText !== "") {
        // 创建用户消息
        const userMessage = document.createElement('div');
        userMessage.classList.add('chat-message', 'user');
        userMessage.textContent = messageText;

        // 将消息添加到聊天框中
        chatBox.appendChild(userMessage);

        // 清空输入框
        chatInput.value = '';

        // 滚动到底部
        chatBox.scrollTop = chatBox.scrollHeight;
        
        // 模拟一个机器人回复
        setTimeout(() => {
            const botMessage = document.createElement('div');
            botMessage.classList.add('chat-message', 'bot');

            if(messageText == '请生成一份分析报告，分析代币OM在Ethereum上的主要看涨和看跌指标') {
              botMessage.innerHTML = marked.parse(msg1);
            } else if (messageText == '给我推荐一些web3领域优秀的项目'){
              botMessage.innerHTML = marked.parse(msg2);
            } else if (messageText == '对比我的项目与他人项目之间的各项指标'){
              botMessage.innerHTML = marked.parse(msg3);
            } else if (messageText == '给我一份以太坊网络上UNI代币的投资报告'){
              botMessage.innerHTML = marked.parse(msg4);
            } else {
              botMessage.textContent = "Bot reply: " + messageText;
            }

            // botMessage.textContent.innerHTML = "Bot reply: " + marked.parse(msg);

            chatBox.appendChild(botMessage);

            // 滚动到底部
            chatBox.scrollTop = chatBox.scrollHeight;
        }, 1000);
    }
}

// 点击发送按钮时发送消息
sendBtn.addEventListener('click', () => sendMessage(chatInput.value));

// 回车键发送消息
chatInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        sendMessage(chatInput.value);
    }
});

// 点击推荐问题按钮自动发送消息
questionButtons.forEach(button => {
    button.addEventListener('click', function() {
        const question = this.textContent;  // 获取点击的推荐问题的文本
        chatInput.value = question;         // 将问题填入输入框
        sendMessage(question);              // 自动发送该问题
    });
});

