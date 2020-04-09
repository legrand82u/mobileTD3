import Vue from 'nativescript-vue'
import App from './components/App'
import RadListView from "nativescript-ui-listview/vue";

Vue.use(RadListView);
new Vue({
    render: function (h) {
        return h('Frame', [h(App)]);
    }
}).$start();
