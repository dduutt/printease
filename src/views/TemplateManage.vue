<template>
  <div class="template-manage">
    <div class="crud-header">
      <el-row :gutter="20">
        <el-col :span="18">
          <el-input
            v-model="searchText"
            placeholder="请输入搜索关键字"
            clearable
            @clear="handleSearch"
          />
        </el-col>
        <el-col :span="6">
          <div class="flex-end">
            <el-button type="primary" @click="openDialog('create')"
              >新增模板</el-button
            >
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- 数据表格 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="name" label="模板名称"></el-table-column>
      <el-table-column prop="description" label="模板描述"></el-table-column>
      <el-table-column prop="createTime" label="创建时间"></el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-switch />
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" @click="openDialog('edit', scope.row)"
            >编辑</el-button
          >
          <el-button size="small" type="danger" @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      class="pagination"
      background
      layout="total, sizes, prev, pager, next"
      :total="total"
      v-model:current-page="currentPage"
      @current-change="handlePageChange"
    />
    <!-- 编辑对话框 -->
    <el-dialog v-model="dialogVisible" :title="dialogTitle">
      <el-form :model="formData" :rules="formRules" ref="formRef">
        <el-form-item label="模板名称" prop="name">
          <el-input v-model="formData.name" placeholder="请输入模板名称" />
        </el-form-item>
        <el-form-item label="模板类型" prop="type">
          <el-button text type="primary" @click="openFileSelector">
            {{ formData.path || "选择模板文件" }}
          </el-button>
        </el-form-item>
        <el-form-item label="模板描述" prop="description">
          <el-input
            v-model="formData.description"
            type="textarea"
            :rows="3"
            placeholder="请输入模板描述"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm">确认</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import { open } from "@tauri-apps/plugin-dialog";
// import { appDir } from '@tauri-apps/api/path';
import { templateAPI } from "../api/template";

const dialogTitle = computed(() => {
  return dialogType.value === "create" ? "新增模板" : "编辑模板";
});
const searchText = ref("");
// 表格数据
const tableData = ref([
  {
    id: 1,
    name: "商品模板1",
    type: "product",
    description: "标准商品标签模板",
    createTime: "2023-08-01 10:00",
  },
]);

// 分页配置
const total = ref(1);
const currentPage = ref(1);

// 对话框控制
const dialogVisible = ref(false);
const dialogType = ref("create");
const formRef = ref(null);
const formData = reactive({
  name: "",
  path: "",
  description: "",
});

// 表单验证规则
const formRules = {
  name: [{ required: true, message: "请输入模板名称", trigger: "blur" }],
  path: [{ required: true, message: "请选择模板路径", trigger: "blur" }],
  description: [{ max: 100, message: "描述最多100个字符", trigger: "blur" }],
};

// 打开对话框
function openDialog(type, row) {
  dialogType.value = type;
  if (type === "edit") {
    Object.assign(formData, row);
  } else {
    formData.name = "";
    formData.type = "";
    formData.description = "";
  }
  dialogVisible.value = true;
}

// 提交表单
async function submitForm() {
  const ok = await formRef.value.validate();
  if (!ok) return;
  const r = await templateAPI.add(
    formData.name,
    formData.path,
    formData.description
  );
  console.log(r);
  // 这里添加实际提交逻辑
  dialogVisible.value = false;
}

// 删除操作
function handleDelete(row) {
  // 这里添加实际删除逻辑
  console.log("Delete row:", row);
}

function handleSearch() {
  // 这里添加搜索逻辑
  console.log("Search text:", searchText.value);
}

// 打开文件选择器
async function openFileSelector() {
  // 这里添加文件选择器逻辑
  const path = await open({
    multiple: false,
    defaultPath: "",
    title: "选择模板文件",
    filters: [
      {
        name: "Excel",
        extensions: ["xlsx"],
      },
    ],
  });
  console.log(path);
  formData.path = path;
}

// 分页变化
function handlePageChange(page) {
  currentPage.value = page;
  // 这里添加分页请求逻辑
}
</script>

<style scoped>
.crud-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;
}

.pagination {
  margin-top: 20px;
  justify-content: flex-end;
}

.el-button + .el-button {
  margin-left: 10px;
}
</style>

<style scoped>
.template-manage {
  width: 100%;
}
</style>
