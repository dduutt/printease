<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <el-form :inline="true" :model="templateConfig" class="templateConfig">
          <el-row>
            <el-col :span="6">
              <el-form-item label="打印模板">
                <el-select v-model="printTemplate" value-key="id" placeholder="请选择打印模板" clearable>
                  <el-option v-for="item in printTemplates" :key="item.id" :label="item.name" :value="item.data" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="标签模板">
                <el-select v-model="labelTemplate" value-key="id" placeholder="请选择标签模板" clearable>
                  <el-option v-for="item in labelTemplates" :key="item.id" :label="item.name" :value="item.data" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item label="数据索引">
                <el-select v-model="templateData" multiple filterable remote reserve-keyword placeholder="请输入关键字"
                  remote-show-suffix :remote-method="remoteTemplateDataSearch">
                  <el-option v-for="item in remoteTemplateDatas" :key="item.id" :label="item.dataIndex"
                    :value="item.data" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-form-item>
                <el-button type="primary" @click="print">打印</el-button>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="5">
              <el-form-item label="打印份数">
                <el-input-number v-model="templateConfig.copies" :min="1" :max="100" :step="1" />
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="标签数量">
                <el-input-number v-model="templateConfig.num" :min="1" :max="100" :step="1" />
              </el-form-item>
            </el-col>

            <el-col :span="5">
              <el-form-item label="标签数量">
                <el-input-number v-model="templateConfig.num" :min="1" :max="100" :step="1" />
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="标签数量">
                <el-input-number v-model="templateConfig.num" :min="1" :max="100" :step="1" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-header>
      <el-main>Main</el-main>
    </el-container>
  </div>
</template>

<script setup>

import { ref, reactive } from 'vue'

// 默认标签模板数据
const defaultTemplateData = [
  {
    label: "生产日期",
    key: "生产日期",
    value: "2023-01-01",
  },
  {
    label: "规格",
    key: "规格",
    value: "TR 1x0.16",
  },
]

const defaultRemoteTemplateDatas = [
  {
    id: 1,
    name: "模板名称",
    dataIndex: '1',
    data: defaultTemplateData
  },
  {
    id: 2,
    name: "模板名称",
    dataIndex: '11',
    data: defaultTemplateData
  },
  {
    id: 3,
    name: "模板名称",
    dataIndex: '111',
    data: defaultTemplateData
  },
]

const defaultPrintTemplates = [
  {
    id: 1,
    name: '模板1',
    data: '1'
  },
  {
    id: 2,
    name: '模板2',
    data: '2'
  },
]

const defaultLabelTemplates = [
  {
    id: 1,
    name: '标签1',
    data: '路径1'
  },
  {
    id: 2,
    name: '标签2',
    data: '路径2'
  },
]

const defaultTemplateConfig = {
  copies: 1,
  num: 1,
}


const templateConfig = reactive(defaultTemplateConfig)
const printTemplates = reactive(defaultPrintTemplates)
const labelTemplates = reactive(defaultLabelTemplates)
const remoteTemplateDatas = ref(defaultRemoteTemplateDatas)
const printTemplate = ref("")
const labelTemplate = ref("")
// 标签模板数据
const templateData = ref(defaultTemplateData)


function print() {
  alert("打印")
}

function remoteTemplateDataSearch(query = "") {
  console.log("remoteTemplateDataSearch", query)
}

</script>

<style scoped>
.templateConfig .el-form-item {
  width: 90%;

}
</style>