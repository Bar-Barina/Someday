<template>
  <section class="balls-animation">
    <h1>Click to reset</h1>
    <canvas id="canvas"></canvas>
  </section>
</template>

<script>
export default {
  name: "BallsAnimation",
  created() {
    this.canvas = document.getElementById("canvas")
    this.ctx = this.canvas.getContext("2d")
    let allCircle = [];
  for (let i = 0; i < 100; i++) {
    let radius = Math.floor((Math.random() * 3 + 2) * 7);  
    let x = Math.max(radius, Math.random() * this.canvas.width - radius);
    let y = Math.random() * this.canvas.height - radius;
    let dx = Math.random() * 3 + 1;
    let dy = Math.random() * 3 + 1;
    allCircle.push(new Circle(x, y, dx, dy, radius, 0, 0, 0, 0));
  }
  ctx.clearRect(0, 0, 100, 100);
    for (let i = 0; i < allCircle.length; i++) {
      allCircle[i].update();
    }
    requestAnimationFrame(init);
  },
  data() {
    return {
      canvas:null ,
      ctx: null,
      gravity: 0.3,
      speed: 0.5,
      colors: [
        "#ffffff",
        "#BB999C",
        "#9999C3",
        "#7B8CDE",
        "#C0E6DE",
        "#0c2d48",
        "#b1d4e0",
      ],
    };
  },
  methods: {
    Circle(x, y, dx, dy, radius, v, flag, flag2) {
      this.x = x;
      this.y = y;
      this.dx = dx;
      this.dy = dy;
      this.radius = radius;
      this.draw;
      this.update;
      this.v = v;
      this.flag = flag;
      this.flag2 = flag2;
      this.color = colors[Math.floor(Math.random() * 7)];
      this.gravity = Math.max(Math.random(), 0.1);

      this.draw = function () {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, Math.PI * 2, false);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
      };

      this.update = function () {
        if (this.x + this.radius > this.canvas.width) {
          this.dx = -this.dx;
        } else if (this.x - this.radius < 0) {
          this.dx = -this.dx;
        }
        this.x += this.dx;

        if (this.y + this.dy + this.radius > this.canvas.height) {
          this.dy = -this.dy * 0.9;
        } else {
          this.dy += speed;
        }

        this.y += this.dy;

        if (
          this.y + this.radius > this.canvas.height &&
          this.flag == 0 &&
          this.flag2 == 0
        ) {
          this.v = this.v * -0.9;
          if (Math.abs(this.v) < 3) {
            this.v = 0;
            this.y = this.canvas.height - this.radius;
            this.flag2 = 1;
          }
          this.flag = 1;
        }

        if (this.flag2 == 0) {
          this.dy = this.v * 0.4;
          this.y += this.dy;
          this.v += speed;

          if (this.y + this.radius <= this.canvas.height) {
            this.flag = 0;
          }
        }
        this.draw();
      };
    },

  },
  computed: {},
};
</script>

<style>
:root {
  font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;

  color-scheme: light dark;
  color: rgba(255, 255, 255, 0.87);


  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
}
.canvas {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100px;
  height: 100px;
  /* z-index: -1; */
}
</style>