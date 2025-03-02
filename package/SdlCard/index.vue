<template>
    <div class="container">
        <div class="headerContainer">
            <span class="greenBar"></span>
            <div class="title">
                {{ title }}
                <slot name="titleIcon"></slot>
            </div>
            <!-- 右侧功能选项自定义 -->
            <div v-if="$slots.rightTag" class="rightTag">
                &nbsp;<slot name="rightTag"></slot>&nbsp;
            </div>
            <div v-if="$slots.customRight" class="customRight">
                <slot name="customRight"></slot>
            </div>
        </div>
        <div class="contentContainer" id="cardScrollContain">
            <slot name="content"></slot>
        </div>
    </div>
</template>

<script setup>
import { defineOptions, defineProps } from "vue";
const { title = "---" } = defineProps(["title"]);
defineOptions({
    name: "SdlCard",
});
</script>

<style scoped>
.container {
    background-color: #fff;
    margin-top: 0.5rem /* 8px */;
    display: flex;
    flex-direction: column;
    overflow: auto;
    /* height: calc(100% - 0.5rem); */
}
.headerContainer {
    height: 2.5rem /* 40px */;
    display: flex;
    align-items: center;
    padding-left: 0.625rem /* 10px */;
    padding-right: 0.625rem /* 10px */;
    padding-top: 0.25rem /* 4px */;
    padding-bottom: 0.25rem /* 4px */;
}
.greenBar {
    height: 1.75rem /* 28px */;
    width: 0.25rem /* 4px */;
    background-color: #01bb70;
}
.title {
    margin-left: 0.5rem /* 8px */;
    font-size: 0.875rem /* 14px */;
    line-height: 1.5rem /* 24px */;
    height: 1.5rem /* 24px */;
}
.rightTag {
    margin-left: auto;
    background-color: #f5f5f5;
    height: 1.5rem /* 24px */;
    border-radius: 0.75rem /* 12px */;
    text-align: center;
    padding: 0.25rem /* 4px */;
    font-size: 0.75rem /* 12px */;
    line-height: 1rem /* 16px */;
    min-width: 0px;
}
.customRight {
    margin-left: auto;
}
.contentContainer {
    flex: 1 1 0%;
    overflow: auto;
}
</style>
