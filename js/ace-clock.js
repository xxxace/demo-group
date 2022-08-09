const defaultOptions = {
  with: 300,
  padding: 10,
  scaleOffset: 5,
  hourScale: {
    width: 4,
    height: 15,
  },
  secondScale: {
    width: 1,
    height: 10,
  },
};
class AceClock {
  constructor(options) {
    if (!options.el) {
      throw new Error(`attribute 'el' is required`);
    }

    this.options = Object.assign(defaultOptions, options || {});
    this.parent =
      typeof options.el === "string"
        ? document.querySelector(options.el)
        : options.el;
  }

  mount() {
    const { width } = this.options;
    const canvas = document.createElement("canvas");
    this.ctx = canvas.getContext("2d");
    canvas.width = width;
    canvas.height = width;
    this.canvas = canvas;
    this.parent.append(canvas);

    this.render();
  }

  render() {
    this.tick();
  }

  tick() {
    const { ctx } = this;
    const { width } = this.options;
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      ctx.restore();
      ctx.restore();
      ctx.clearRect(0, 0, width, width);

      const time = new Date();
      this.drawCircle();
      this.drawScale();
      this.drawSecondWise(time.getSeconds());
      this.drawMinuteWise(time.getMinutes());
      this.drawHourWise(time.getHours());
      this.drawCenterPoint();
    }, 997);
  }

  pause() {
    clearInterval(this.timer);
  }

  drawCircle() {
    const { ctx } = this;
    const { width, padding } = this.options;
    const centerPoint = width / 2;

    this.radius = centerPoint;

    if (this.radius * 2 === width) this.radius -= padding;

    ctx.beginPath();
    ctx.arc(centerPoint, centerPoint, this.radius, 0, 2 * Math.PI, false);
    ctx.closePath();
    ctx.stroke();

    ctx.save();
    ctx.translate(centerPoint, centerPoint);
    ctx.rotate((-90 / 180) * Math.PI);
    ctx.save();
  }

  drawCenterPoint() {
    const { ctx } = this;
    ctx.beginPath();
    ctx.arc(0, 0, 8, 0, 2 * Math.PI, false);
    ctx.closePath();
    ctx.fill();
  }

  drawScale() {
    const { ctx, radius } = this;
    const { scaleOffset, hourScale, secondScale } = this.options;

    const x = radius - scaleOffset;
    for (let i = 0; i < 60; i++) {
      const scale = i % 5 === 0 ? hourScale : secondScale;

      ctx.beginPath();
      i && ctx.rotate((6 / 180) * Math.PI);
      ctx.moveTo(x, 0);
      ctx.lineTo(x - scale.height, 0);
      ctx.lineWidth = scale.width;
      ctx.closePath();
      ctx.stroke();
    }
    ctx.restore();
  }

  drawSecondWise(seconds = 0) {
    const { ctx, radius } = this;
    const { padding, hourScale } = this.options;

    ctx.save();
    ctx.rotate(((seconds * 6) / 180) * Math.PI);
    ctx.beginPath();
    ctx.moveTo(radius - padding - hourScale.height, 0);
    ctx.lineTo(0 - hourScale.height, 0);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }

  drawMinuteWise(minutes = 0) {
    const { ctx, radius } = this;
    const { padding, hourScale } = this.options;

    ctx.save();
    ctx.rotate(((minutes * 6) / 180) * Math.PI);
    ctx.beginPath();
    ctx.moveTo(radius - padding - hourScale.height * 3, 0);
    ctx.lineTo(0, 0);
    ctx.lineWidth = 3;
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }

  drawHourWise(hours = 0) {
    const { ctx, radius } = this;
    const { padding, hourScale } = this.options;

    ctx.save();
    ctx.rotate(((hours * 5 * 6) / 180) * Math.PI);
    ctx.beginPath();
    ctx.moveTo(radius - padding - hourScale.height * 4, 0);
    ctx.lineTo(0, 0);
    ctx.lineWidth = 6;
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }
}
