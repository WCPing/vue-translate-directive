<template>
    <div class="product-page-wrapper" v-trans>
        <!-- 顶部菜单工具栏 -->
        <header class="toolbar">
            <nav>
                <ul class="menu-list">
                    <li><a target="_blank">首页</a></li>
                    <li><a target="_blank">新品推荐</a></li>
                    <li><a target="_blank">热门分类</a></li>
                    <li><a target="_blank">购物车</a></li>
                    <li><a target="_blank">我的账户</a></li>
                </ul>
            </nav>
            <div class="lang-sw">
                <select v-model="cuLang">
                    <option value="zh">中文</option>
                    <option value="en">English</option>
                </select>
            </div>
        </header>

        <!-- 搜索栏 -->
        <section class="search-bar">
            <div class="search-container">
                <input type="text" placeholder="搜索您喜欢的品牌" v-model="searchKeyword" @keyup.enter="handleSearch" />
                <button @click="handleSearch">搜索</button>
            </div>
        </section>

        <!-- 展示区域 -->
        <main class="product-display">
            <ProductList></ProductList>
        </main>
    </div>
</template>
  
<script setup>
import { ref } from 'vue';
import ProductList from '@/pages/product-list/productList.vue';

// 当前语言
const cuLang = ref('zh')

const searchKeyword = ref('');

// 搜索处理函数
const handleSearch = () => {
    // 这里应该是调用API进行搜索操作
    console.log('搜索关键词：', searchKeyword.value);
}
</script>
  
<style scoped lang="css">
/* 添加相应的CSS样式 */
.product-page-wrapper {
    width: 600px;
}

.toolbar {
    width: 100%;
    height: 40px;
    line-height: 40px;
    position: relative;
}

.lang-sw {
    position: absolute;
    top: 2px;
    right: 0px;
}

.toolbar ul {
    display: flex;
}

.toolbar ul li {
    padding: 3px 20px 3px 0
}

.search-bar {
    height: 50px;
    margin-top: 10px;
}

.product-display {
    height: 500px
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity .5s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>