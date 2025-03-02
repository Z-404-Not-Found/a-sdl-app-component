import { Loading } from "vant";
import DataTable from "./DataTable/index.vue";
import DataTags from "./DataTags/index.vue";
import AsyncDataEcharts from "./AsyncDataEcharts/index.vue";
import SdlCard from "./SdlCard/index.vue";

const components = [DataTable, DataTags, AsyncDataEcharts, SdlCard];

const install = function (Vue) {
    Vue.use(Loading);
    components.map((component) => {
        Vue.component(component.name, component);
    });
};

if (typeof window !== "undefined" && window.Vue) {
    install(window.Vue);
}

const SDLAppCom = { install };

export { SDLAppCom, DataTable, DataTags, AsyncDataEcharts, SdlCard }; // 按需导出每个组件
