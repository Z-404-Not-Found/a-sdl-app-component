<template>
    <div class="container">
        <component
            v-if="Echarts"
            :is="Echarts"
            :echartsData="echartsData"
            :nameList="nameList"
            :colorList="colorList"
            :indexList="indexList"
            :yAxisNameList="yAxisNameList"
            :selectList="selectList"
            :lineList="lineList"
            :maxMinList="maxMinList"
        />
        <div v-else class="loading">
            <van-loading size="48px" vertical>加载中...</van-loading>
        </div>
    </div>
</template>

<script setup>
import {
    ref,
    defineAsyncComponent,
    shallowRef,
    watch,
    defineOptions,
} from "vue";
import moment from "moment";
const {
    echartsResData,
    nameList,
    indexList,
    yAxisNameList,
    selectList,
    lineList,
    maxMinList,
    colorList,
    dataMap,
} = defineProps([
    "echartsResData",
    "nameList",
    "indexList",
    "yAxisNameList",
    "selectList",
    "lineList",
    "maxMinList",
    "colorList",
    "dataMap",
]);

defineOptions({
    name: "AsyncDataEcharts",
});

const Echarts = shallowRef(null);
const processResData = (echartsData, nameList) => {
    let data = echartsData;
    let map = new Map();
    nameList.forEach((item) => {
        map.set(item, []);
    });
    map.set("time", []);
    for (let i = data.length - 1; i >= 0; i--) {
        let dataCur = data[i].data;
        map.get("time").push(
            moment(data[i].createTime).format("MM-DD HH:mm").replace(" ", "\n")
        );
        dataCur.forEach((item) => {
            if (map.has(item.key)) {
                map.get(item.key).push(Number(item.value));
            }
        });
    }
    return map;
};

const echartsData = ref();

watch(
    () => echartsResData,
    (newVal) => {
        if (newVal) {
            echartsData.value = processResData(newVal, nameList);
            Echarts.value = defineAsyncComponent(() => import("./Echarts.vue"));
        }
    }
);

watch(
    () => dataMap,
    (newVal) => {
        if (newVal) {
            echartsData.value = dataMap;
            Echarts.value = defineAsyncComponent(() => import("./Echarts.vue"));
        }
    }
);
</script>

<style scoped>
.container {
    height: 100%;
}
.loading {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
