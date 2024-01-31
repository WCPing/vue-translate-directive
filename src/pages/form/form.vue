<template>
    <div class="test-form-container">
        <!-- <div class="field">
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
        </div> -->
        <el-form :model="form" label-width="120px">
            <el-form-item label="form/chooseBrand">
                <el-select v-model="form.region" placeholder="form/selTip">
                    <el-option label="Nike" value="1" />
                    <el-option label="361" value="2" />
                    <el-option label="form/ANTA" value="3" />
                    <el-option label="form/PIKE" value="4" />
                </el-select>
            </el-form-item>

            <el-form-item label="form/chooseBrand">
                <el-checkbox-group v-model="form.type">
                    <el-checkbox label="form/ANTA" name="type" />
                    <el-checkbox label="form/PIKE" name="type" />
                </el-checkbox-group>
            </el-form-item>

            <el-form-item label="form/chooseBrand">
                <el-radio-group v-model="form.resource">
                    <el-radio label="form/ANTA" />
                    <el-radio label="form/PIKE" />
                </el-radio-group>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onSubmit">form/submit</el-button>
                <el-button>form/cancel</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script setup>
import { ref, reactive } from 'vue';
import { ElMessage } from 'element-plus'
import { translateKey } from 'packages/vue-translate-directive'

const form = reactive({
    name: '',
    region: '',
    date1: '',
    date2: '',
    delivery: false,
    type: [],
    resource: '',
    desc: '',
})

const selectVal = ref('1')

const onSubmit = () => {
    // alert('form/successTip')
    ElMessage({
        message: translateKey('form/successTip'),
        type: 'success',
    })
}


</script>

<style>
.test-form-container {
    margin: 20px 0;
}

.test-form-container .field {
    margin-top: 10px;
}
</style>