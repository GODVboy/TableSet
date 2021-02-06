<template>
  <a-drawer
    width="60%"
    placement="right"
    title="任务详情"
    :closable="false"
    :visible="visible"
    @close="handleClose"
    :destroy-on-close="true"
    class="details-drawer"
  >
    <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
      <!-- 在此处定义真实的表单项 -->
      <a-form-model-item label="名字：">
        {{ form.name }}
      </a-form-model-item>
      <a-form-model-item label="年龄：">
        {{ form.age }}
      </a-form-model-item>
      <a-form-model-item label="联系电话：">
        {{ form.phone }}
      </a-form-model-item>
      <a-form-model-item label="地址：">
        {{ form.address }}
      </a-form-model-item>
    </a-form-model>
  </a-drawer>
</template>

<script>
import { getTestDetail } from "@/api/test";
export default {
  name: "DetailsDrawer",
  props: {
    tableid: {
      type: String,
      required: true,
    },
    visible: {
      type: Boolean,
      default: false,
    },
    handleClose: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      form: {
        name: "",
        age: "",
        phone: "",
        address: "",
      },
    };
  },
  watch: {
    tableid: {
      handler: function (newValue, oldValue) {
        this.getDetails(newValue);
      },
      immediate: true,
    },
  },
  methods: {
    getDetails(id) {
      const key = "fetching";
      this.$message.loading({ content: "获取中...", key, duration: 0 });
      getTestDetail(id)
        .then((res) => {
          this.form = res.data;
          this.$message.success({ content: "获取成功", key });
        })
        .catch((err) => {
          this.$message.error({ content: (err && err.message) || "获取失败" });
        });
    },
  },
};
</script>


