<template>
    <table>
        <thead>
            <tr>
                <th class="timeHead">时间</th>
                <th
                    class="head"
                    v-for="(item, index) in tableHead"
                    :style="{
                        ...styles[index % styles.length],
                        ...(largeCol.includes(item.key)
                            ? { width: '7rem' }
                            : {}),
                    }"
                >
                    {{ item.key }}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in tableData" :key="item['_id']">
                <td class="timeCol">
                    {{ moment(item.createTime).format("MM-DD HH:mm") }}
                </td>
                <td v-for="data in item.data">
                    <!-- {{ data.value }} -->
                    <!-- 时间格式化 -->
                    {{
                        moment(
                            data.value,
                            "YYYY年MM月DD日 HH:mm",
                            true
                        ).isValid()
                            ? moment(data.value, "YYYY年MM月DD日 HH:mm").format(
                                  "MM-DD HH:mm"
                              )
                            : data.value
                    }}
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script setup>
import { defineOptions, defineProps, watchEffect } from "vue";
import moment from "moment";
defineOptions({
    name: "DataTable",
});
const {
    tableHead = [
        { key: "key1" },
        { key: "key2" },
        { key: "key3" },
        { key: "key4" },
        { key: "key5" },
    ],
    tableData = [
        {
            createTime: "2024-11-14 12:00:00",
            data: [
                { key: "key1", value: "value1" },
                { key: "key2", value: "value2" },
                { key: "key3", value: "value3" },
                { key: "key4", value: "value4" },
                { key: "key5", value: "value5" },
                { key: "key6", value: "value6" },
            ],
        },
        {
            createTime: "2024-11-14 13:00:00",
            data: [
                { key: "key1", value: "value1" },
                { key: "key2", value: "value2" },
                { key: "key3", value: "value3" },
                { key: "key4", value: "value4" },
                { key: "key5", value: "value5" },
                { key: "key6", value: "value6" },
            ],
        },
    ],
    largeCol = ["key1"],
} = defineProps(["tableHead", "tableData", "largeCol"]);
const styles = [
    { backgroundColor: "#fdf1ea", color: "rgb(178, 82, 31)" },
    { backgroundColor: "#e8f6f6", color: "rgb(101, 193, 194)" },
    { backgroundColor: "#e9f1fe" },
    { backgroundColor: "#f4e9ea", color: "rgb(160, 47, 49)" },
];
const findValue = (head, table_data) => {
    if (table_data === null) {
        return head.map((item) => ({
            key: item.key,
            value: "--",
        }));
    }
    // 创建一个名称到对象的映射，便于快速查找第二组数据中的对象
    const table_dataMap = new Map();
    table_data.forEach((item) => {
        table_dataMap.set(item.key, item);
    });

    // 创建一个新的数组用于存储合并后的数据
    const mergedDataset = [];

    head.forEach((item1) => {
        if (table_dataMap.has(item1.key)) {
            // 如果第二组数据中存在同名对象，添加到新数组中
            mergedDataset.push(table_dataMap.get(item1.key));
        } else {
            // 如果第二组数据中不存在同名对象，创建一个 value 为 "--" 的新对象并添加到新数组中
            mergedDataset.push({
                key: item1.key,
                value: "--",
            });
        }
    });
    return mergedDataset;
};

watchEffect(() => {
    for (let i = 0; i < tableData.length; i++) {
        tableData[i].data = findValue(tableHead, tableData[i].data);
    }
});
</script>

<style scoped>
.timeHead {
    background-color: #f3f4f6;
    width: 6rem /* 96px */;
    font-weight: 600;
}
.head {
    width: 5rem /* 80px */;
    font-weight: 600;
}
.timeCol {
    background-color: #f3f4f6;
    font-weight: 600;
}
/* Table */
table {
    border-collapse: collapse;
    table-layout: fixed;
    width: 100%;
}
thead {
    position: sticky;
    top: 0;
    z-index: 5;
}
tr {
    border-bottom: 1px solid rgba(236, 236, 236, 0.5);
}
td,
th {
    padding: 8px;
    font-size: 12px;
    text-align: center;
}
td:first-child,
th:first-child {
    position: sticky; /* 固定第一列 */
    left: 0; /* 固定在左侧 */
    z-index: 1; /* 确保在其他内容之上 */
}
</style>
