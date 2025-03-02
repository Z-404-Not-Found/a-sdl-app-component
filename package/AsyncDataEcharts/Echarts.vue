<template>
    <div ref="chartRef" class="echarts" />
</template>

<script setup>
import { onMounted, ref } from "vue";
import * as echarts from "echarts";
const {
    echartsData,
    nameList,
    indexList,
    yAxisNameList,
    selectList,
    lineList,
    maxMinList,
    colorList,
} = defineProps([
    "echartsData",
    "nameList",
    "indexList",
    "yAxisNameList",
    "selectList",
    "lineList",
    "maxMinList",
    "colorList",
]);

let option = {
    tooltip: {
        trigger: "axis",
        textStyle: {
            fontSize: 12,
        },
        axisPointer: {
            type: "cross",
            label: {
                precision: 0,
                fontSize: 10,
            },
        },
    },
    legend: {
        itemWidth: 10,
        itemHeight: 10,
        right: 16,
        icon: "rect",
        textStyle: {
            fontSize: 10,
        },
        selected: {},
        data: [],
    },
    grid: {
        left: "12%",
        right: "12%",
        bottom: "16%",
        top: "20%",
    },
    xAxis: {},
    yAxis: [],
    series: [],
};

const xFn = (timeList) => {
    let xAxisBase = {
        type: "category",
        data: timeList,
        axisLabel: {
            color: "rgb(107,114,128,0.75)",
            fontSize: 10,
        },
        axisTick: { show: false },
    };
    option.xAxis = xAxisBase;
};

const yFn = (index, name, min, max) => {
    let yAxisBase = {
        type: "value",
        name: name,
        axisLabel: {
            color: "rgb(107,114,128,0.75)",
            fontSize: 10,
        },
        offset: index ? 32 * (index - 1) : 0,
        axisTick: { show: false },
        axisLine: {
            show: true,
        },
        splitLine: {
            show: false,
        },
        nameTextStyle: {
            fontSize: 10,
            color: "rgb(107,114,128,0.75)",
        },
    };
    if (min !== "" && max !== "") {
        yAxisBase.min = min;
        yAxisBase.max = max;
    }
    option.yAxis.push(yAxisBase);
};

const seriesFn = (dataList, index, name, line) => {
    let seriesBase = {
        name: name,
        data: dataList,
        type: line ? "line" : "bar",
        smooth: true,
        symbolSize: 6,
        symbol: "circle",
        showSymbol: false,
        yAxisIndex: index,
    };
    option.series.push(seriesBase);
};

const selectFn = (nameList, selectList) => {
    nameList.forEach((name, index) => {
        option.legend.selected[name] = selectList[index];
    });
};

const createOption = (
    echartsData,
    nameList,
    colorList,
    indexList,
    selectList,
    yAxisNameList,
    lineList,
    maxMinList
) => {
    if (colorList) {
        option.color = colorList;
    }
    const maxIndex = Math.max(...indexList);
    if (maxIndex !== 0) {
        option.grid.right = (maxIndex - 1) * 8 + 12 + "%";
    }
    xFn(echartsData.get("time"));
    let indexCur = 0;
    let createdYIndex = [];
    nameList.forEach((name, index) => {
        option.legend.data.push(name);
        if (indexCur !== indexList[index] || index === 0) {
            if (!createdYIndex.includes(indexList[index])) {
                if (!maxMinList) {
                    yFn(indexList[index], yAxisNameList[index], "", "");
                    indexCur = indexList[index];
                    createdYIndex.push(indexList[index]);
                } else {
                    yFn(
                        indexList[index],
                        yAxisNameList[index],
                        maxMinList[index][0],
                        maxMinList[index][1]
                    );
                    indexCur = indexList[index];
                    createdYIndex.push(indexList[index]);
                }
            }
        }
        if (lineList) {
            seriesFn(
                echartsData.get(name),
                indexList[index],
                name,
                lineList[index]
            );
        } else {
            seriesFn(echartsData.get(name), indexList[index], name, 1);
        }
    });
    if (selectList) {
        selectFn(nameList, selectList);
    }
    return option;
};

const chartRef = ref(null);

onMounted(() => {
    let myChart = echarts.init(chartRef.value);
    myChart.setOption(
        createOption(
            echartsData,
            nameList,
            colorList,
            indexList,
            selectList,
            yAxisNameList,
            lineList,
            maxMinList
        )
    );
});
</script>

<style scoped>
.echarts {
    width: 100%;
    height: 16rem /* 256px */;
}
</style>
