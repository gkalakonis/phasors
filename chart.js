let chart;

function createChart(x, y) {
  const ctx = document.getElementById('myChart').getContext('2d');
  if (chart) chart.destroy();

  const angleRadians = Math.atan2(y, x);

  chart = new Chart(ctx, {
    type: 'scatter',
    data: {
      datasets: [{
        label: 'Phasor',
        data: [{ x: 0, y: 0 }, { x, y }],
        showLine: true,
        borderColor: '#007bff',
        backgroundColor: '#007bff',
        borderWidth: 3,
        pointRadius: 6,
        pointBackgroundColor: '#ffffff',
        pointBorderColor: '#007bff',
        pointHoverRadius: 8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          title: {
            display: true,
            text: 'X Axis',
            font: { size: 16, weight: 'bold' }
          },
          grid: { color: '#e0e0e0' },
          min: Math.min(0, x) - 1,
          max: Math.max(0, x) + 1
        },
        y: {
          title: {
            display: true,
            text: 'Y Axis',
            font: { size: 16, weight: 'bold' }
          },
          grid: { color: '#e0e0e0' },
          min: Math.min(0, y) - 1,
          max: Math.max(0, y) + 1
        }
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#333',
          titleFont: { weight: 'bold' },
          bodyFont: { size: 14 },
          cornerRadius: 4
        },
        angleArc: {
          theta: angleRadians
        }
      }
    },
    plugins: [{
      id: 'angleArc',
      afterDraw(chart, args, options) {
        const { ctx, chartArea, scales } = chart;
        const radius = 40;

        const originX = scales.x.getPixelForValue(0);
        const originY = scales.y.getPixelForValue(0);

        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(255, 165, 0, 0.8)';
        ctx.lineWidth = 2;

        // Draw angle arc
        ctx.arc(originX, originY, radius, 0,options.theta, false);
        ctx.stroke();plugins: [{
  id: 'angleArc',
  afterDraw(chart, args, options) {
    const { ctx, scales } = chart;

    // Get origin in pixel space
    const originX = scales.x.getPixelForValue(0);
    const originY = scales.y.getPixelForValue(0);

    // Get target point in pixel space
    const pointX = scales.x.getPixelForValue(x);
    const pointY = scales.y.getPixelForValue(y);

    // Calculate angle in canvas coordinates
    const dx = pointX - originX;
    const dy = pointY - originY;
    const thetaCanvas = Math.atan2(dy, dx); // Canvas angle

    const radius = 40; // arc radius in pixels

    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(255, 165, 0, 0.8)';
    ctx.lineWidth = 2;

    // Draw arc from 0 to thetaCanvas
    ctx.arc(originX, originY, radius, 0, thetaCanvas, thetaCanvas < 0);
    ctx.stroke();

    // Draw label
    const labelAngle = thetaCanvas / 2;
    const labelX = originX + (radius + 10) * Math.cos(labelAngle);
    const labelY = originY + (radius + 10) * Math.sin(labelAngle);
    ctx.fillStyle = 'orange';
    ctx.font = '14px sans-serif';
    ctx.fillText('θ', labelX, labelY);
    ctx.restore();
  }
}]


        // Add angle label
        const labelX = originX + (radius + 10) * Math.cos(options.theta / 2);
        const labelY = originY + (radius + 10) * Math.sin(options.theta / 2);
        ctx.fillStyle = 'orange';
        ctx.font = '14px sans-serif';
        ctx.fillText('θ', labelX, labelY);

        ctx.restore();
      }
    }]
  });
}
