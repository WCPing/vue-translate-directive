<template>
    <div class="product-page-wrapper" v-trans="{ i18n: i18n }">
        <!-- 顶部菜单工具栏 -->
        <header class="toolbar">
            <el-menu ellipsis class="el-menu-popper-demo" mode="horizontal" style="width: 600px">
                <el-menu-item index="1">home/menu/home</el-menu-item>
                <el-sub-menu index="2">
                    <template #title>home/menu/recommend</template>
                    <el-menu-item index="2-1">home/menu/topCatg</el-menu-item>
                    <el-menu-item index="2-2">home/menu/trend</el-menu-item>
                </el-sub-menu>
                <el-menu-item index="3">home/menu/shoppingCart</el-menu-item>
                <el-menu-item index="4">home/menu/account</el-menu-item>
            </el-menu>

            <div class="lang-sw">
                <select v-model="cuLang" @change="onLangChange">
                    <option value="zh">中文</option>
                    <option value="en">English</option>
                </select>
            </div>
        </header>

        <!-- 搜索栏 -->
        <section class="search-bar">
            <div class="search-container">
                <!-- <input type="text" placeholder="home/search/placeholder" v-model="searchKeyword"
                    @keyup.enter="handleSearch" />
                <button @click="handleSearch">home/search/search</button> -->

                <el-input v-model="searchKeyword" class="w-50 m-2" size="small" placeholder="home/search/placeholder" :suffix-icon="Search" />
            </div>
        </section>

        <!-- 展示区域 -->
        <main class="product-display">
            <Form></Form>
            <ProductList></ProductList>
        </main>
    </div>
</template>
  
<script setup>
import { ref } from 'vue';
import { getCurrentInstance } from 'vue'
import i18nEn from '@/i18n/en/i18n.json'
import i18nZh from '@/i18n/zh/i18n.json'

import ProductList from '@/pages/product-list/productList.vue';
import Form from '@/pages/form/form.vue'
import { Search } from '@element-plus/icons-vue'

// 当前语言
const app = getCurrentInstance()

const searchKeyword = ref('');

const currentLang = window.sessionStorage.getItem('currentLang') || 'zh';
const cuLang = ref('en')

const i18n = currentLang === 'zh' ? i18nZh : i18nEn;

// 搜索处理函数
const handleSearch = () => {
    // 这里应该是调用API进行搜索操作
    console.log('搜索关键词：', searchKeyword.value);
}

const onLangChange = () => {
    window.sessionStorage.setItem('currentLang', cuLang.value)
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
    padding: 3px 15px 3px 0
}

.search-bar {
    height: 50px;
    margin-top: 30px;
}

.search-container input {
    width: 250px
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