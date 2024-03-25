<template>
    <div class="box5">
        <div class="title">
            <p>未来七天趋势图</p>
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
            text: '游客访问量趋势'
        },
        // x/y轴
        xAxis: {
            type: 'category',
            boundaryGap: false,
            splitLine: {
                show: false
            },
            axisTick: {
                show: true
            },
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
            axisLine: {
                show: true
            },
            splitLine: {
                show: false
            },
            axisTick: {
                show: true
            }
        },
        series: [
            {
                type: 'line',
                data: [120, 240, 78, 367, 367, 32,89],
                smooth: true,
                areaStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0, 
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0, color: 'orange'
                        },
                        {
                            offset: 1, color: 'blue'
                        }
                    ]

                    }
                }
            }
        ],
        grid: {
            left: 40,
            right: 10,
            bottom: 20,
            top: 0
        }
    })
})
</script>

<style scoped lang="scss">
.box5{
    width: 100%;
    height: 100%;
    background: url('../../images/dataScreen-main-cb.png') no-repeat;
    background-size: 100% 100%;
    margin: 0px 20px;
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
        height: 210px;
    }
}
</style>