<template>
    <div class="box">
        <div class="title">
            <p>年龄比例</p>
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
        tooltip: {
    trigger: 'item'
  },
  legend: {
    top: '10%',
    right: '20px',
    orient: 'vertical',
    textStyle: {
        color: 'white',
        fontSize: '14'
    }
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: true,
        position: 'inside',
        color: 'white'
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 1048, name: '军事' },
        { value: 735, name: '新闻' },
        { value: 580, name: '直播' },
        { value: 484, name: '娱乐' },
        { value: 300, name: '财经' }
      ]
    }
  ]
    })
})
</script>

<style scoped lang="scss">
.box{
    background: url(../../images/dataScreen-main-lb.png) no-repeat;
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
    .charts{
        width: 100%;
        height: 250px;
        margin-top: 20px;
    }
}
</style>