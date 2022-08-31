import { GameObject } from '..';
import canvas, { drawLayer } from '../../canvas';
import { getLinearPosition } from '../../utils';

export default class Pool implements GameObject {
  constructor() {}

  #draw = drawLayer(canvas.get('bg'));

  init = () => {};

  update = (time: DOMHighResTimeStamp) => {
    this.#draw((
      context,
      canvas,
    ) => {
      // 바닥
      context.beginPath();
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.fillStyle = '#f7f8f8'
      context.fillRect(0, 0, canvas.width, canvas.height);

      // 하늘
      context.beginPath();
      context.setTransform(1, 0, 0, 1, 0, 0);
      const grad1 = context.createLinearGradient(0, 0, 0, innerHeight / 3);
      grad1.addColorStop(0, '#c4f0f7');
      grad1.addColorStop(0.4, '#fff');
      grad1.addColorStop(0.5, '#fff');
      grad1.addColorStop(1, '#cff7fd');
      context.fillStyle = grad1;
      context.fillRect(0, 0, canvas.width, 200);
      context.closePath();

      const delta1 = Math.sin(time / 200) / 50;
      const per1 = canvas.width / 1500;
      context.setTransform(1 * per1, 0, 0, Math.min(0.6 * per1, 1.2) + delta1, 0, 120);
      const pool = new Path2D();
      pool.moveTo(1513, 0);
      pool.lineTo(1513, 185.5);
      pool.bezierCurveTo(1396, 271, 1125.5, 294.564, 1016, 265.5);
      pool.bezierCurveTo(906.5, 236.436, 731.5, 294, 677, 321);
      pool.bezierCurveTo(622.5, 348, 279, 381.54, 270.5, 323.02);
      pool.bezierCurveTo(262, 264.5, 53.3475, 255.524, 0, 242.086);
      pool.lineTo(0, 0);
      pool.lineTo(1513, 0);
      const grad5 = context.createLinearGradient(0, 0, 0, innerHeight / 3);
      grad5.addColorStop(0, '#cff7fd');
      grad5.addColorStop(.15, '#50effa');
      grad5.addColorStop(.3, '#50effa');
      grad5.addColorStop(.4, '#8ceffa');
      grad5.addColorStop(.5, '#8ceffa');
      grad5.addColorStop(.7, '#dbfdfb');
      grad5.addColorStop(1, '#dbfdfb');
      context.fillStyle = grad5;
      context.fill(pool);

      // person 이동 영역
      context.beginPath();
      context.setTransform(1, 0, -0.5, 1, canvas.width / 2 - 280, 240);
      context.strokeRect(0, 0, 800, 600);
      context.closePath();

      const cloud = new Path2D();
      cloud.moveTo(25.6165, 8.85822);
      cloud.bezierCurveTo(22.2172, 8.85822, 18.8012, 8.7563, 15.4037, 8.85822);
      cloud.bezierCurveTo(7.85636, 9.08464, 1.42826, 17.1362, 0.592265, 24.1493);
      cloud.bezierCurveTo(0.0884702, 28.3755, 2.37828, 31.5619, 6.54505, 32.6129);
      cloud.bezierCurveTo(10.6042, 33.6369, 15.08, 33.415, 19.1982, 33.022);
      cloud.bezierCurveTo(24.847, 32.4829, 30.2347, 31.336, 35.2933, 28.6914);
      cloud.bezierCurveTo(37.8802, 27.3391, 42.308, 25.4637, 43.9968, 22.8656);
      cloud.bezierCurveTo(44.1577, 22.618, 44.3867, 22.3687, 44.4059, 22.0616);
      cloud.bezierCurveTo(44.4091, 22.0105, 44.4059, 23.6631, 44.4059, 24.0928);
      cloud.bezierCurveTo(44.4059, 26.6478, 47.2274, 27.6237, 49.3995, 28.0002);
      cloud.bezierCurveTo(52.5919, 28.5536, 55.8151, 28.4394, 57.6656, 25.3765);
      cloud.bezierCurveTo(58.0463, 24.7465, 58.2919, 21.9245, 58.3851, 23.2747);
      cloud.bezierCurveTo(58.6052, 26.4673, 61.8799, 28.4521, 64.7328, 29.1005);
      cloud.bezierCurveTo(68.0009, 29.8433, 71.582, 28.6258, 73.1824, 25.5317);
      cloud.bezierCurveTo(73.981, 23.9877, 73.4957, 24.9723, 74.2968, 26.3075);
      cloud.bezierCurveTo(76.8638, 30.5858, 82.1012, 31.8906, 86.5127, 29.5378);
      cloud.bezierCurveTo(88.9019, 28.2636, 91.0424, 26.1879, 92.4796, 23.8954);
      cloud.bezierCurveTo(92.8955, 23.2319, 93.2335, 22.5029, 93.4952, 21.7653);
      cloud.bezierCurveTo(93.5654, 21.5675, 93.4546, 21.1588, 93.6645, 21.1588);
      cloud.bezierCurveTo(93.7512, 21.1588, 93.6868, 21.333, 93.7209, 21.4127);
      cloud.bezierCurveTo(93.9554, 21.9599, 94.4488, 22.2957, 94.9481, 22.5835);
      cloud.bezierCurveTo(97.0986, 23.8227, 99.6538, 24.2133, 102.1, 24.2903);
      cloud.bezierCurveTo(106.061, 24.4151, 112.407, 22.6558, 111.579, 17.3501);
      cloud.bezierCurveTo(111.149, 14.5889, 107.37, 14.1881, 105.147, 14.5007);
      cloud.bezierCurveTo(104.613, 14.5758, 103.42, 15.4907, 104.442, 15.9113);
      cloud.bezierCurveTo(105.503, 16.3484, 104.795, 10.3448, 104.611, 9.93029);
      cloud.bezierCurveTo(101.889, 3.7879, 92.8501, 3.67228, 87.2321, 3.83644);
      cloud.bezierCurveTo(84.7659, 3.90851, 78.9878, 4.03853, 77.7246, 7.02443);
      cloud.bezierCurveTo(77.5917, 7.33837, 77.8468, 6.91091, 77.7387, 6.5025);
      cloud.bezierCurveTo(77.1136, 4.1413, 74.4763, 2.98863, 72.3783, 2.29887);
      cloud.bezierCurveTo(65.2923, -0.030799, 54.4134, -0.610086, 48.3415, 4.52764);
      cloud.bezierCurveTo(46.8686, 5.77393, 45.9501, 7.2314, 45.5344, 9.11213);
      cloud.bezierCurveTo(45.4643, 9.42896, 45.2472, 10.206, 45.5485, 10.0855);
      cloud.bezierCurveTo(45.8393, 9.96915, 45.6575, 8.85972, 45.619, 8.66074);
      cloud.bezierCurveTo(45.375, 7.40018, 44.089, 6.75431, 42.9953, 6.34733);
      cloud.bezierCurveTo(40.1956, 5.30561, 37.1088, 5.32529, 34.1648, 5.30348);
      cloud.bezierCurveTo(32.0996, 5.28818, 29.9111, 5.12539, 27.8594, 5.44454);
      cloud.bezierCurveTo(26.3433, 5.68038, 25.6924, 7.31093, 25.3767, 8.73127);
      cloud.bezierCurveTo(25.189, 9.57584, 26.1271, 10.3817, 26.8861, 10.3817);
      cloud.closePath();

      context.beginPath();
      context.setTransform(
        .7,
        0,
        0,
        .8,
        getLinearPosition({
          x: canvas.width / 2,
          maxWidth: canvas.width,
          time: time / 120,
          offset: 200,
        }),
        60,
      );
      context.fillStyle = '#fff';
      context.fill(cloud);
      context.setTransform(
        1,
        0,
        0,
        1,
        getLinearPosition({
          x: canvas.width / 2 + 300,
          maxWidth: canvas.width,
          time: time / 60,
          offset: 100,
        }),
        20,
      );
      context.scale(1.1, 1);
      context.fillStyle = '#fff';
      context.fill(cloud);
      context.setTransform(
        1,
        0,
        0,
        1,
        getLinearPosition({
          x: canvas.width / 2 + 1300,
          maxWidth: canvas.width,
          time: time / 55,
          offset: 120,
        }),
        10,
      );
      context.scale(1.2, 1.1);
      context.fillStyle = '#fff';
      context.fill(cloud);
      context.transform(1, 0, 0, 1, -20, 0);
      context.scale(0.4, 0.6);
      context.fillStyle = '#fff';
      context.fill(cloud);
    });
  };

  remove = () => {
    this.#draw((context, canvas) => {
      context.clearRect(0, 0, canvas.width, canvas.height);
    });
  };
}
