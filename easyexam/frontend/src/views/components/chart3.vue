<template
  ><el-card class="box-card  center">
    <div id="chart3" style="width: 100%;height:400px;"></div>
    <el-alert title="mybatis部分掌握不好" type="info" effect="dark" :closable="false"> </el-alert>
  </el-card>
</template>

<script>
var echarts = require('echarts')
export default {
  data() {
    return {
      option3: {
        title: {
          text: '错误知识点分布'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['正答人数', '错答人数']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.1]
        },
        yAxis: {
          type: 'category',
          data: ['jdbc', 'mysql', 'html和css和js', 'spring', 'mybatis', 'jsp和servlet']
        },
        series: [
          {
            name: '正答人数',
            type: 'bar',
            data: [19, 23, 31, 12, 13, 18],
            itemStyle: {
              normal: {
                label: {
                  show: true, //开启显示
                  position: 'right', //在上方显示
                  textStyle: {
                    //数值样式
                    color: 'black',
                    fontSize: 14
                  }
                }
              }
            }
          },
          {
            name: '错答人数',
            type: 'bar',
            data: [8, 3, 9, 10, 13, 3],
            itemStyle: {
              normal: {
                label: {
                  show: true, //开启显示
                  position: 'right', //在上方显示
                  textStyle: {
                    //数值样式
                    color: 'black',
                    fontSize: 14
                  }
                }
              }
            }
          }
        ]
      }
    }
  },
  mounted() {
    this.chart3()
  },
  methods: {
    chart3() {
      let myChart = echarts.init(document.getElementById('chart3'))
      myChart.setOption(this.option3)
    }
  }
}
</script>

<style></style>
