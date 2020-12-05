<template>
  <el-card>
    <div id="chart2" style="width: 100%;height:400px;"></div>
    <el-alert title="第6、7题，学生花时间较多，修改次数较多" type="info" effect="dark" :closable="false"> </el-alert>
  </el-card>
</template>

<script>
var echarts = require('echarts')
export default {
  data() {
    return {
      option2: {
        title: {
          text: '答题动作分析'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: ['次数', '耗时(分钟)']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'value'
          }
        ],
        yAxis: [
          {
            type: 'category',
            axisTick: {
              show: false
            },
            data: ['第1题', '第2题', '第3题', '第4题', '第5题', '第6题', '第7题']
          }
        ],
        series: [
          {
            name: '耗时(分钟)',
            type: 'bar',
            stack: '总量',
            label: {
              show: true
            },
            data: [32, 30, 41, 37, 39, 45, 42]
          },
          {
            name: '次数',
            type: 'bar',
            stack: '总量',
            label: {
              show: true,
              position: 'left'
            },
            data: [-12, -13, -10, -13, -19, -23, -21]
          }
        ]
      }
    }
  },
  mounted() {
    this.chart2()
  },
  methods: {
    chart2() {
      let myChart = echarts.init(document.getElementById('chart2'), 'light')
      myChart.setOption(this.option2)
    }
  }
}
</script>

<style></style>
