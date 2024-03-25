<template>
    <div class="box1">
        <div class="title">
            <p>男女比例</p>
            <p class="bg"></p>
        </div>
        <div class="sex">
            <div class="man">
                <img src="../../images/man.png" alt=""/>
            </div>
            <div class="woman">
                <img src="../../images/woman.png" alt=""/>
            </div>
        </div>
        <div class="rate">
                <p>男士58%</p>
                <p>女士42%</p>
        </div>
        <div class="charts" ref="charts">

        </div>
    </div>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue'
import * as echarts from 'echarts'
let charts = ref()
onMounted(() => {
    console.log(charts)
    let mycharts = echarts.init(charts.value)
    mycharts.setOption({
        xAxis: {
            show: false,
            min: 0,
            max: 100
        },
        yAxis: {
            show: false,
            type: 'category'
        },
        series: [{
            type: 'bar',
            data: [58],
            barWidth: 20,
            z: 100,
            itemStyle: {
                borderRadius: 20,
                color: 'skyblue'
            }
 
        },
        {
            type: 'bar',
            data: [100],
            barWidth: 20,
            barGap: '-100%',
            itemStyle: {
                borderRadius: 20,
                color: 'pink'
            }
        }
    ],
        grid: {
            left: 0,
            right: 0
        }
    })
})
</script>

<style scoped lang="scss">
.box1 {
    width: 100%;
    height: 100%;
    background: url(../../images/dataScreen-main-lb.png) no-repeat;
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
    .sex {
        display: flex;
        justify-content: center;
        .man{
            margin: 20px;
            width: 111px;
            height: 115px;
            background: url(../../images/man-bg.png) no-repeat;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .woman{
            margin: 20px;
            width: 111px;
            height: 115px;
            background: url(../../images/woman-bg.png) no-repeat;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
    .rate {
        display: flex;
        margin: 0 130px;
        justify-content: space-between;
        color: white;
    }
    .charts {
        width: 100%;
        height: 20px;
        margin-top:10px;
    }
}
</style>