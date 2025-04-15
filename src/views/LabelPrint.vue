<template>
  <div class="common-layout">
    <el-form :inline="true" :model="formData" class="printForm">
      <el-row>
        <el-col :span="8">
          <el-form-item label="打印模板" prop="labelTemplate">
            <el-select v-model="formData.labelTemplate" filterable placeholder="请选择打印模板">
              <el-option v-for="item in labelTemplates" :key="item.id" :label="item.name" :value="item.data" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="索引" prop="labelData">
            <el-select v-model="formData.labelData" remote :remote-method="searchRemoteLabelData" filterable
              placeholder="Select">
              <el-option v-for="item in labelTemplateDatas" :key="item.id" :label="item.name" :value="item.data" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="打印机" prop="printer">
            <el-select v-model="formData.printer" placeholder="请选择打印机">
              <el-option v-for="item in printers" :key="item" :label="item" :value="item" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="副本数量" prop="copies">
            <el-input-number v-model="formData.copies" :min="1" :max="100" />
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="标签数量" prop="num">
            <el-input-number v-model="formData.num" :min="1" :max="100" />
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item>
            <el-button type="primary" @click="print">Query</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { printer } from '../api/printer';

const defaultFormData = {
  labelTemplate: '',
  labelData: {},
  printer: '',
  defaultPrintConfig: {
    copies: 1,
    num: 1
  }
}

const formData = reactive({ ...defaultFormData })
const labelTemplates = ref([])
const labelTemplateDatas = ref([])
const printers = ref([])

async function print() {
  console.log("print")
}

async function searchRemoteLabelData(query) {
  console.log("searchRemoteLabelData")
}

onMounted(async () => {
  printers.value = await printer.list()
})

</script>

<style scoped>
.common-layout {
  height: 100%;
  display: flex;
  width: 100%;
}

.printForm .el-form-item {
  width: 90%;
}
</style>