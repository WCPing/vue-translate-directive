<template>
    <div class="product-page-container" v-trans>
        <!-- 左侧产品列表 -->
        <div class="product-list-container">
            <h3>product/prodList</h3>
            <ul class="product-list">
                <li v-for="product in productList" :key="product.id" @click="selectProduct(product)">
                    {{ product.name }}
                </li>
            </ul>
        </div>

        <!-- 右侧产品介绍 -->
        <div class="product-detail-container">
            <h3>product/prodDetail</h3>
            <div class="product-desc" v-if="selectedProduct">
                <p>{{ selectedProduct.description }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import i18nEn from '@/i18n/en/i18n.json'

const prodI18n = { product: i18nEn.product }

// const curLang = window.sessionStorage.getItem('currentLang') || 'zh'

// const importFn = curLang === 'zh' ? import('@/i18n/zh/i18n.json') : import('@/i18n/en/i18n.json')

// importFn.then((data) => {
//     console.log(data)
//     prodI18n.value = { product: data.product }
//     console.log( prodI18n.value);
// })

// 示例数据
const productDatas = [
    { id: 1, name: 'product/prodA', description: 'product/prodADesc' },
    { id: 2, name: 'product/prodB', description: 'product/prodBDesc' },
    // 更多产品...
];

// 当前选中的产品
const selectedProduct = ref(null);

// 产品列表
const productList = ref(productDatas);

// 选择产品的回调函数
const selectProduct = (product) => {
    selectedProduct.value = product;
}
</script>

<style>
.product-page-container {
    display: flex;
}

.product-list-container,
.product-detail-container {
    padding: 20px;
    border: 1px solid #f2f2f2;
}

.product-list-container {
    width: 30%;
    /* 根据实际需求调整宽度 */
    border-right: 1px solid #ccc;
    /* 添加分割线 */
}

.product-detail-container {
    width: 70%;
}

.product-list,
.product-desc {
    margin-top: 20px;
}
</style>