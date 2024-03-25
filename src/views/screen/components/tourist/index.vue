<template>
    <div class="box">
        <div class="title">
            <p>实时游客统计</p>
            <p class="bg"></p>
            <p class="right">可预约总量<span>9998</span></p>
        </div>
        <div class="number">
            <span v-for="(item, index) in people" :key="index">{{ item }}</span>
        </div>
        <div class="charts" ref="charts"></div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import 'echarts-liquidfill'
let people = ref('215908人')
let charts = ref()
onMounted(() => {
    let mycharts = echarts.init(charts.value)
    mycharts.setOption({
        series: {
            type: 'liquidFill',
            data: [0.6, 0.4],
            radius: '80%'
        },
        grid: {
            left: 0
        }
    })
})
</script>

<style scoped lang="scss">
.box {
    background: url(../../images/dataScreen-main-lb.png) no-repeat;
    background-size: 100% 100%;
    margin-top: 10px;

    .title {
        color: white;
        font-size: 20px;
        margin-left: 20px;
        .right {
            float: right;

            span {
                color: rgb(205, 134, 21);
            }
        }

        .bg {
            width: 68px;
            height: 7px;
            background: url(../../images/dataScreen-title.png) no-repeat;
            background-size: 100% 100%;
            margin-top: 10px;
        }
    }

    .number {
        margin-top: 40px;
        display: flex;
        padding: 10px;

        span {
            flex: 1;
            height: 48px;
            text-align: center;
            line-height: 48px;
            background: url(../../images/total.png) no-repeat;
            background-size: 100% 100%;
            color: #29fcff;
            font-size: 20px;
        }
    }
    .charts{
        width: 100%;
        height: 250px;
    }
}</style>