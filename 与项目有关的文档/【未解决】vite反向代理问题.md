@[TOC]
# 可行
## 网页直接访问，数据正常返回
在地址栏输入 `https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT `返回数据正确
![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/5604c43a31794a4da756c6a6a3a895d3.png)
## 不使用反向代理，直接用axios可以得到数据

```javascript
import axios from 'axios';
async function getBTCPrice() {
  try {
    const response = await axios.get('https://api.binance.com/api/v3/ticker/price', {
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

test是某个按钮的返回函数
```
![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/0e99a31531694e339a5dbc46b9b26ae5.png)
## postman测试也正常
![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/ac04522008bf41cba529d8958bfd86fd.png)

# 不行-vite反向代理出问题
### case1
- vite.config.js
```javascript
     '/binance':{
        target: 'https://api.binance.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/binance/, '')
      },
```
- 测试的vue文件中

```javascript
import axios from 'axios';
async function getBTCPrice() {
  try {
  //这里注释掉的是可以的（axios直接发送请求+没有用vite代理）
    // const response = await axios.get('https://api.binance.com/api/v3/ticker/price', {
    //    params: { symbol: 'BTCUSDT' }
    //  });
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
```

- 浏览器中报错
![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/b6b6034bedec49daafca44f8dd16ab94.png)
- vs code控制台报错
![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/aa2bc233f6b047f3b985604f54d055f6.png)
### 命令行测试
CMD执行： `curl -k http://localhost:5173/binance/api/v3/ticker/price?symbol=BTCUSDT`
> 空白 + vs code控制台报错

![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/2fdce6457fae4683a5c7ee4e66fa881a.png)

![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/f11e2976c8244c1386c5399cf2255af4.png)

