# 批量mintZRX

## 使用

本地需安装nodejs,没有安装的去[nodejs官网](https://nodejs.org/en/)下载安装，装`18.10.0`

### 安装依赖

```shell
npm install
```

### 编译合约

```shell
npm run compile
```

### 复制.env.example文件，并把复制的文件改名成.env，把.env文件里的内容填写完整

```shell
cp .env.example  .env
```

### 在Goerli测试链上mint（请先确认.env里面的信息正确）

```shell
npm run goerliMint
```

### 运行主链上mint（请先确认.env里面的信息正确）

```shell
npm run mainMint
```
