var echarts = require("echarts");
const { createCanvas } = require("canvas");
const fs = require('fs')

if(process.argv.length !== 3) {
  console.log("Specify number of points.")
  process.exit()
}

N = Number(process.argv[2])

function make_scatter(data) {
  const canvas = createCanvas(1024, 768);
  const chart = echarts.init(canvas);
  
  options = {
    grid: {
      right: 70,
      bottom: 70,
    },
    xAxis: [{}],
    yAxis: [{}],

    animation: false,
    series: [
      {
        type: "scatter",
        data: data,
        dimensions: ["x", "y"],
        symbolSize: 3,
        itemStyle: {
          opacity: 0.4,
        },
        blendMode: "source-over",
        large: true,
        largeThreshold: 500,
      },
    ],
  };

  chart.setOption(options);
  
  const out = fs.createWriteStream("./scatter.png")
  canvas.createPNGStream().pipe(out)
}

make_scatter(Array.from({length: N}, () => [Math.random(), Math.random()]));