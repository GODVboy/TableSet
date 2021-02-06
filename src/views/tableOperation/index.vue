<template>
  <div class="dashboard-container">
    <a-row style="margin-bottom: 16px">
      <a-col :span="14" :push="5">
        <a-input-search placeholder="搜索..." size="large" />
      </a-col>
      <a-col class="advanced-search-label" :span="3" :push="7">
        <a-button type="primary" icon="plus" @click="addTest"> 新增 </a-button>
      </a-col>
    </a-row>
    <a-alert
      v-if="search"
      style="margin-bottom: 16px"
      :message="'下列展示“' + search + '”的搜索结果'"
      type="info"
      show-icon
    />
    <div class="white-content">
      <a-table
        class="break-table"
        :columns="columns"
        :data-source="data"
        :row-key="(record) => record.id"
        :pagination="pagination"
        :loading="loading"
        size="small"
      >
        <template slot="operation" slot-scope="operation, record">
          <a-button
            type="primary"
            size="small"
            shape="circle"
            icon="form"
            @click="editTest(record)"
          ></a-button
          >&nbsp;
          <a-button
            type="danger"
            size="small"
            shape="circle"
            icon="delete"
            @click="deleteTest(record)"
          ></a-button
          >&nbsp;
          <a-button
            type="primary"
            size="small"
            shape="circle"
            icon="profile"
            @click="detailTest(record)"
          ></a-button>
        </template>
      </a-table>
    </div>
    <test-modal
      v-if="form"
      :visible="toggleVisible"
      :tableToggle="tableToggle"
      :handleClose="handleAddClose"
      :form="form"
      @addSuccess="toggleTask"
      @editSuccess="toggleTask"
    ></test-modal>

    <test-drawer
      v-if="tableid"
      :tableid="tableid"
      :visible="detailVisible"
      :handleClose="handleDetailClose"
    ></test-drawer>
  </div>
</template>

<script>
import { getTestList, deleteTestMes } from "@/api/test";
import TestDrawer from "./components/TestDrawer";
import TestModal from "./components/TestModal";
import cloneDeep from "lodash/cloneDeep";
export default {
  components: { TestDrawer, TestModal },
  data() {
    return {
      search: "",
      pagination: {
        current: 1,
        pageSize: 10,
        showSizeChanger: true,
        showQuickJumper: true,
      },
      columns: [
        {
          title: "name",
          dataIndex: "name",
          scopedSlots: { customRender: "name" },
        },
        {
          title: "age",
          dataIndex: "age",
          scopedSlots: { customRender: "age" },
        },
        {
          title: "phone",
          dataIndex: "phone",
          scopedSlots: { customRender: "phone" },
        },
        {
          title: "address",
          dataIndex: "address",
          scopedSlots: { customRender: "address" },
        },
        {
          title: "操作",
          dataIndex: "operation",
          scopedSlots: { customRender: "operation" },
        },
      ],
      loading: false,
      // 这里是写了一条假表格数据，但只能看，实际使用接口别忘了清空data
      data: [
        {
          id: 1,
          name: "ha",
          age: 13,
          phone: "123131",
          address: "dadddada",
        },
      ],
      detailVisible: false,
      toggleVisible: false,
      tableToggle: "",
      tableid: null,
      form: null,
    };
  },
  // 由于写了一条假数据，所以关了created
  // created() {
  //   this.getTableList();
  // },
  methods: {
    getTableList(data) {
      this.loading = true;
      getTestList({
        page_num: this.pagination.current,
        page_size: this.pagination.pageSize,
        ...data,
      })
        .then((res) => {
          this.data = res.data;
          this.pagination = {
            ...this.pagination,
            total: response.data.total,
          };
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
        });
    },
    detailTest(record) {
      this.detailVisible = true;
      this.tableid = record.id;
    },
    addTest() {
      this.form = {
        name: "",
        age: "",
        phone: "",
        address: "",
      };
      this.toggleVisible = true;
      this.tableToggle = "create";
    },
    editTest(model) {
      if (!model) return;
      // 此处使用了第三方库 lodash 中的深拷贝方法
      this.form = cloneDeep(model);
      this.tableToggle = "update";
      this.toggleVisible = true;
    },
    deleteTest(model) {
      this.$confirm({
        title: "警告",
        content: "你确定删除该任务吗？",
        onOk: () => {
          const key = "delete";
          this.$message.loading({ content: "删除中...", key });
          return deleteTestMes(model.id)
            .then((res) => {
              this.$message.success({ content: "删除成功", key });
              this.getTableList();
            })
            .catch((err) => {
              this.$message.error({
                content: (err && err.message) || "删除失败",
                key,
              });
            });
        },
      });
    },
    toggleTask() {
      this.getTableList();
    },
    handleAddClose() {
      this.toggleVisible = false;
    },
    handleDetailClose() {
      this.detailVisible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    padding: 20px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.dashboard-container {
  background-color: #f2f2f2;
  min-height: calc(100vh - 50px);
}
.white-content {
  background-color: #ffffff;
  padding: 16px;
}
.advanced-search-label {
  margin-top: 5px;
}
</style>
