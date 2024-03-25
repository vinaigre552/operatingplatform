<template>
    <div class="box7">
        <div class="title">
            <p>年度游客量对比</p>
            <p class="bg"></p>
        </div>
        <div class="charts" ref="charts"></div>
    </div>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue'
import * as echarts from 'echarts'
let charts = ref()
onMounted(() => {
    let mycharts = echarts.init(charts.value)
    mycharts.setOption({
        title: {
            text: '散点图',
            left: '40%',
            textStyle: {
                color: 'white'
            }
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            show: false
        },
        grid: {
            left: 20,
            bottom: 30,
            top: 20,
            right: 0
        },
        series: [
            {
                type: 'scatter',
                data: [29, 28, 37, 2, 39, 18, 20, 39, 75],
                symbol: 'diamond',
                symbolSize: 16,
                label: {
                    show: true,
                    position: 'top'
                },
                itemStyle: {
                    color: 'cyan'
                }
            }
        ]
    })
})
</script>

<style scoped lang="scss"> 
.box7{
    width: 100%;
    height: 100%;
    background: url('../../images/dataScreen-main-cb.png') no-repeat;
    background-size: 100% 100%;
    margin: 20px 0;
    .title {
        color: white;
        font-size: 20px;
        margin-left: 20px;
        .bg {
            width: 68px;
            height: 7px;
            background: url(../../images/dataScreen-title.png) no-repeat;
            background-size: 100% 100%;
            margin-top: 10px;
        }
    }
    .charts {
        width: 100%;
        height: 100%;
    }
}
</style>