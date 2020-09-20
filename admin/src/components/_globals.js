import Vue from "vue";
// 这里的注册名，必须是小写，并且在调用的时候，也要小写
import CommonTable from "./CommonTable";
import CreateForm from "./CreateForm";
import DataTemplate1 from "./DataTemplate1";
import EditForm from "./EditForm";
Vue.component("common-table", CommonTable);
Vue.component("create-form", EditForm);
Vue.component("dt1", DataTemplate1);
Vue.component("edit-form", CreateForm);
