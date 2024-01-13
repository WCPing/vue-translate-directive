<template>
    <div class="test-form-container">
        <div class="field">
            <span>form/chooseBrand</span>
            <select v-model="selectVal">
                <option value="1">Nike</option>
                <option value="2">361</option>
                <option value="3">form/ANTA</option>
                <option value="4">form/PIKE</option>
            </select>
        </div>
        <div class="field">
            <span>form/feedback</span>
            <textarea cols="10" rows="1" placeholder="form/feedbackPlaceholder"></textarea>
        </div>
        <div class="field">
            <button>form/submit</button>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';

const selectVal = ref('1')


</script>

<style>
.test-form-container {
    margin: 20px 0;
}

.test-form-container .field {
    margin-top: 10px;
}
</style>