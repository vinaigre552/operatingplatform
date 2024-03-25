<template>
    <div class="box8">
        <div class="title">
            <p>数据统计</p>
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
            text: '游客消费统计',
            textStyle: {
                color: 'white'
            }
        },
        radar: {
            indicator: [
                {name: '消费', max: 6500},
                {name: '娱乐', max: 8500},
                {name: '交通', max: 9500},
            ]
        },
        series: [
            {
                type: 'radar',
                data:[
                    {
                        value: [4200, 3244, 2444]
                    }
                ]
            }
        ]
    })
})
</script>

<style scoped lang="scss">
.box8{
    width: 100%;
    height: 100%;
    background: url('../../images/dataScreen-main-cb.png') no-repeat;
    background-size: 100% 100%;
    margin-top: 20px;
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