<template>
    <div class="box6">
        <div class="title">
            <p>热门景区排行</p>
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
    // 组件挂载完毕
    let mycharts = echarts.init(charts.value)
    mycharts.setOption({
        title: {
            text: '景区排行',
            left: '50%',
            textStyle: {
                color: 'orange',
                fontSize: 20
            },
            subtext: '各大景区',
            subtextStyle: {
                color: 'orange',
                fontSize: 15
            }
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {

        },
        grid: {
            left: 20,
            right: 20,
            bottom: 20
        },
        series: [
            {
                type: 'bar',
                data: [10, 20, 30, 40, 50],
                label: {
                    show: true,
                    position: 'insideTop'
                },
                showBackground: true,
                backgroundStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0, 
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0, color: 'white'
                        },
                        {
                            offset: 1, color: '#ccc'
                        }
                    ]

                    }
                }
            },
            {
                type: 'line',
                data: [8, 16, 24, 37, 43],
                lineStyle: {
                    color: 'blue'
                }
            }
        ],
        tooltip: {
            show: true
        }
    })
})
</script>

<style scoped lang="scss">
.box6{
    width: 100%;
    height: 100%;
    background: url('../../images/dataScreen-main-cb.png') no-repeat;
    background-size: 100% 100%;
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