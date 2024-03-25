<template>
    <div ref="map">

    </div>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue'
import * as echarts from 'echarts'
import chinaJSON from './china.json'
let map = ref()
echarts.registerMap('china', chinaJSON)
onMounted(() => {
    let mycharts = echarts.init(map.value)
    mycharts.setOption({
        geo:{
            map: 'china',
            roam: true,
            left: 150,
            top: 150,
            zoom: 1.3,
            label: {
                show: true,
                color: 'white'
            },
            itemStyle: {
                color: 'rgb(50, 109, 222)',
                opacity: 0.8
            },
            emphasis: {
                itemStyle: {
                    color: 'rgb(17, 20, 78)'
                },
                label: {
                    fontSize: 20,
                    color: 'white'
                }
            }
        },
        series: [
            {
                type: 'lines',
                data: [
                    {
                        coords: [
                            [116.405285,39.904989],
                            [114.173355,22.320048]
                        ],
                        lineStyle: {
                            color: 'white',
                            width: 3
                        }
                    },
                    {
                        coords: [
                            [116.405285,39.904989],
                            [87.617733,43.792818]
                        ],
                        lineStyle: {
                            color: 'white',
                            width: 3
                        }
                    }
                ],
                effect: {
                    show: true,
                    symbol: 'arrow',
                    color: 'blue',
                    symbolSize: 10
                }
            }
        ]
    })
})
</script>

<style scoped>
</style>