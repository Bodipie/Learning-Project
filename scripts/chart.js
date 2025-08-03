const canvas = document.getElementById('barChart');
const ctx = canvas.getContext('2d');

function getRandomColor() {
  const r = Math.floor(Math.random() * 156) + 100;
  const g = Math.floor(Math.random() * 156) + 100;
  const b = Math.floor(Math.random() * 156) + 100;
  return `rgb(${r}, ${g}, ${b})`;
}

let bars = [];

function addBar(event) {
  event.preventDefault();

  const label = document.getElementById('labelInput').value.trim();
  const value = parseInt(document.getElementById('valueInput').value);

  if (label === '' || isNaN(value)) {
    alert('Please enter a valid label and value.');
    return;
  }

  bars.push({ label, value, currentHeight: 0, color: getRandomColor() });

  animateBars();

  document.getElementById('labelInput').value = '';
  document.getElementById('valueInput').value = '';
}

function drawBars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const barWidth = 50;
  const gap = 30;
  const maxBarHeight = canvas.height - 50;

  bars.forEach((bar, index) => {
    const x = 50 + index * (barWidth + gap);
    const height = bar.currentHeight;
    const y = canvas.height - height - 20;

    ctx.fillStyle = bar.color;;
    ctx.fillRect(x, y, barWidth, height);

    ctx.fillStyle = '#000';
    ctx.font = '14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(bar.label, x + barWidth / 2, canvas.height - 5);

    ctx.fillStyle = '#fff';
    if (height > 20) {
      ctx.fillText(bar.value, x + barWidth / 2, y + 20);
    }
  });
}

function animateBars() {
  let stillAnimating = false;

  bars.forEach(bar => {
    if (bar.currentHeight < bar.value) {
      bar.currentHeight += 2;
      if (bar.currentHeight > bar.value) {
        bar.currentHeight = bar.value;
      }
      stillAnimating = true;
    }
  });

  drawBars();

  if (stillAnimating) {
    requestAnimationFrame(animateBars);
  }
}