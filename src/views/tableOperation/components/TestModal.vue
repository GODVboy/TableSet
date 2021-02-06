<template>
  <a-modal
    :title="tableToggle === 'create' ? '新建' : '更新'"
    :visible="visible"
    :width="600"
    @cancel="handleClose"
    @ok="handleOk"
    :ok-button-props="{ props: { loading } }"
    destroyOnClose
    :zIndex="1200"
  >
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 14 }"
    >
      <a-form-model-item label="名称：" prop="name">
        <a-input v-model="form.name"></a-input>
      </a-form-model-item>
      <a-form-model-item label="年龄：">
        <a-input v-model="form.age"></a-input>
      </a-form-model-item>
      <a-form-model-item label="联系电话：">
        <a-input v-model="form.phone"></a-input>
      </a-form-model-item>
      <a-form-model-item label="地址：" prop="address">
        <a-input v-model="form.address"></a-input>
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>

<script>
import { addTestInfo, editTestMes } from "@/api/test";
export default {
  name: "TestModal",
  props: {
    tableToggle: {
      type: String,
      default: "create",
    },
    visible: {
      type: Boolean,
      default: false,
    },
    form: {
      type: Object,
      required: true,
    },
    handleClose: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      rules: {
        name: [
          {
            required: true,
            message: "名称不能为空",
            trigger: "blur",
          },
        ],
        request_url: [
          {
            required: true,
            message: "地址不能为空",
            trigger: "blur",
          },
        ],
      },
      loading: false,
    };
  },
  methods: {
    handleOk() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          const key = "submit";
          if (this.tableToggle === "create") {
            // 注意，此处用的是ant-design-vue的提示组件，具体请查看main.js中的配置
            this.$message.loading({ content: "创建中...", key });
            this.loading = true;
            addTestInfo({
              ...this.form,
            })
              .then((res) => {
                this.$message.success({ content: "创建成功", key });
                this.handleClose();
                this.loading = false;
                // 重新请求一次表格数据
                this.$emit("addSuccess");
              })
              .catch((err) => {
                this.$message.error({
                  content: (err && err.message) || "创建失败",
                  key,
                });
                this.loading = false;
              });
          } else {
            this.$message.loading({ content: "更新中...", key });
            this.loading = true;
            editTestMes({
              ...this.form,
            })
              .then((res) => {
                this.$message.success({ content: "更新成功", key });
                this.handleClose();
                this.loading = false;
                // 重新请求一次表格数据
                this.$emit("editSuccess");
              })
              .catch((err) => {
                this.$message.error({
                  content: (err && err.message) || "更新失败",
                  key,
                });
                this.loading = false;
              });
          }
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
