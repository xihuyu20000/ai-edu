<template>
  <el-card class="box-card  center">
    <div id="chart1" style="width: 100%;height:400px;"></div>
    <el-alert title="第6、7、8题错误人数较多" type="info" effect="dark" :closable="false"> </el-alert>
  </el-card>
</template>

<script>
var echarts = require('echarts')
var colors = ['#5793f3', '#d14a61', '#675bba']
export default {
  data() {
    return {
      option1: {
        title: {
          text: '正答数据分析'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        grid: {
          right: '20%'
        },
        toolbox: {
          feature: {}
        },
        legend: {
          data: ['正答人数', '错答人数', '正确率']
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {
              alignWithLabel: true
            },
            data: ['第1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12题']
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '正答人数',
            min: 0,
            max: 250,
            position: 'right',
            axisLine: {
              lineStyle: {
                color: colors[0]
              }
            },
            axisLabel: {
              formatter: '{value} 人'
            }
          },
          {
            type: 'value',
            name: '错答人数',
            min: 0,
            max: 250,
            position: 'right',
            offset: 80,
            axisLine: {
              lineStyle: {
                color: colors[1]
              }
            },
            axisLabel: {
              formatter: '{value} 人'
            }
          },
          {
            type: 'value',
            name: '正确率',
            min: 0,
            max: 25,
            position: 'left',
            axisLine: {
              lineStyle: {
                color: colors[2]
              }
            },
            axisLabel: {
              formatter: '{value} %'
            }
          }
        ],
        series: [
          {
            name: '正答人数',
            type: 'bar',
            data: [2, 4, 7, 23, 25, 76, 135, 162, 32, 20, 6, 3]
          },
          {
            name: '错答人数',
            type: 'bar',
            yAxisIndex: 1,
            data: [2, 5, 9, 26, 28, 70, 175, 182, 48, 18, 6, 2]
          },
          {
            name: '正确率',
            type: 'line',
            yAxisIndex: 2,
            data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
          }
        ]
      }
    }
  },
  mounted() {
    this.chart1()
  },
  methods: {
    chart1() {
      let myChart = echarts.init(document.getElementById('chart1'))
      myChart.setOption(this.option1)
    }
  }
}
</script>

<style></style>
