import Vue from 'vue'
// 这里的注册名，必须是小写，并且在调用的时候，也要小写
import CommonTable from './CommonTable'
import CommonTree from './CommonTree'
import CreateForm from './CreateForm'
import DataTemplate1 from './DataTemplate1'
import DataTemplate2 from './DataTemplate2'
import EditForm from './EditForm'
Vue.component('common-table', CommonTable)
Vue.component('common-tree', CommonTree)
Vue.component('create-form', EditForm)
Vue.component('dt1', DataTemplate1)
Vue.component('dt2', DataTemplate2)
Vue.component('edit-form', CreateForm)

import FormTextline from './form/FormTextline.vue'
import FormTextarea from './form/FormTextarea.vue'
import FormSelectList from './form/FormSelectList.vue'
import FormRadio from './form/FormRadio.vue'
Vue.component('form-textline', FormTextline)
Vue.component('form-textarea', FormTextarea)
Vue.component('form-select-list', FormSelectList)
Vue.component('form-radio', FormRadio)
