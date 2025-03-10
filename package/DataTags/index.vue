<template>
    <div class="dataTagsContainer">
        <div
            class="tagContainer"
            v-for="i in Math.ceil(dataTags.length / 4)"
            :style="dataTags.length > 4 ? {} : { justifyContent: 'center' }"
        >
            <div class="tag" v-for="item in dataTags.slice((i - 1) * 4, i * 4)">
                <div class="tagValue">
                    <!-- {{ item.value }} -->
                    <!-- 时间格式化 -->
                    {{
                        moment(
                            item.value,
                            "YYYY年MM月DD日 HH:mm",
                            true
                        ).isValid()
                            ? moment(item.value, "YYYY年MM月DD日 HH:mm").format(
                                  "MM-DD HH:mm"
                              )
                            : item.value
                    }}
                </div>
                <div class="tagKey">
                    {{ item.key }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineOptions, defineProps } from "vue";
import moment from "moment";
const {
    dataTags = [
        {
            key: "key1",
            value: "value1",
        },
        {
            key: "key2",
            value: "value2",
        },
    ],
} = defineProps(["dataTags"]);
defineOptions({
    name: "DataTags",
});
</script>

<style scoped>
.dataTagsContainer {
    display: flex;
    flex-direction: column;
    padding-top: 0.5rem /* 8px */;
    padding-bottom: 0.5rem /* 8px */;
    overflow-y: auto;
}
.tagContainer {
    display: flex;
    flex-wrap: wrap;
}
.tag {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 25%;
    height: 2.5rem /* 40px */;
    margin-top: 0.5rem /* 8px */;
    margin-bottom: 0.5rem /* 8px */;
    padding-left: 0.5rem /* 8px */;
    padding-right: 0.5rem /* 8px */;
}
.tag:not(:last-child) {
    border-right-width: 1px;
    border-color: rgb(229, 231, 235);
}
.tagValue {
    width: 100%;
    text-align: center;
    font-size: 0.875rem /* 14px */;
    line-height: 1.25rem /* 20px */;
    color: #01bb70;
}
.tagKey {
    width: 100%;
    text-align: center;
    font-size: 0.75rem /* 12px */;
    line-height: 1rem /* 16px */;
    color: rgb(107, 114, 128, 0.75);
}
</style>
