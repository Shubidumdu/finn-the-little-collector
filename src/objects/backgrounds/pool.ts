import { GameObject } from '..';
import canvas, { drawLayer } from '../../canvas';

export default class Pool implements GameObject {
  constructor() {}

  init = () => {};

  update = (time: DOMHighResTimeStamp) => {
    this.#draw((
      context,
      canvas,
    ) => {
      context.beginPath();
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.fillStyle = '#f5e6dc'
      context.fillRect(0, 0, canvas.width, canvas.height);

      context.beginPath();
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.fillStyle = '#c4f0f7';
      context.fillRect(0, 0, canvas.width, 240);
      context.closePath();
      
      context.beginPath();
      context.setTransform(1, 0, 0, 1, 0, 140);
      context.fillStyle = '#031005';
      context.fillRect(0, 0, canvas.width, 100);
      context.beginPath();
      context.transform(1, 0, 0, 1, 0, -10);
      context.fillStyle = '#009e15';
      context.fillRect(0, 0, canvas.width, 100);
      context.transform(1, 0, 0, 1, 0, -10);
      context.fillStyle = '#4dd000';
      context.fillRect(0, 0, canvas.width, 100);
      context.closePath();
      
      context.beginPath();
      context.setTransform(1, 0, 0.5, 1, canvas.width / 2 - 500, 240);
      context.strokeRect(0, 0, 800, 600);
      context.closePath();

      const pool = new Path2D();
      pool.moveTo(598.5, 234.5);
      pool.bezierCurveTo(639.7, 114.1, 504.333, 4.16666, 436, 0.499992);
      pool.lineTo(1492.5, 0);
      pool.bezierCurveTo(1872, 11.5, 2548.5, 54.5, 2540.5, 234.5);
      pool.bezierCurveTo(2532.5, 414.5, 2101, 591.582, 1936, 627.5);
      pool.bezierCurveTo(1862.5, 643.5, 654.833, 716.167, 0.5, 729.5);
      pool.bezierCurveTo(292, 572.5, 557.3, 354.9, 598.5, 234.5);
      pool.closePath();

      context.beginPath();
      context.setTransform(1, 0, 0, 1, canvas.width / 2 - 1300, 292);
      context.fillStyle = '#49e5fb';
      context.fill(pool);
      context.transform(1, 0, 0, 1, 0, 20);
      context.fillStyle = '#54fff2';
      context.fill(pool);
      context.transform(1, 0, 0, 1, 0, -20);
      context.stroke(pool);
      context.closePath();

      const bush = new Path2D();
      bush.moveTo(0, 0);
      bush.bezierCurveTo(13.4458, 1.77682, 24.9779, 0.748982, 35.7585, 4.18529);
      bush.bezierCurveTo(54.3657, 10.1163, 74.9283, 25.5113, 77.6991, 46.292);
      bush.bezierCurveTo(77.9911, 48.4818, 78.2028, 47.6065, 79.8584, 46.0428);
      bush.bezierCurveTo(83.8117, 42.3092, 88.6962, 37.3164, 94.2262, 36.1183);
      bush.bezierCurveTo(101.669, 34.5058, 110.433, 42.5884, 115.238, 47.1225);
      bush.bezierCurveTo(119.334, 50.9875, 122.201, 55.4417, 124.374, 60.5767);
      bush.bezierCurveTo(125.758, 63.8493, 127.499, 59.8285, 130.104, 58.7496);
      bush.bezierCurveTo(143.309, 53.2811, 154.842, 61.4253, 161.497, 72.1207);
      bush.bezierCurveTo(162.195, 73.2422, 163.503, 72.6367, 164.57, 72.3699);
      bush.bezierCurveTo(168.726, 71.331, 173.291, 70.4954, 177.526, 71.7055);
      bush.bezierCurveTo(184.129, 73.5919, 186.157, 80.7633, 187.492, 86.6961);
      bush.bezierCurveTo(187.556, 86.9795, 188.289, 93.2017, 188.738, 93.1326);
      bush.bezierCurveTo(197.899, 91.7231, 205.64, 96.2797, 209.874, 104.22);
      bush.bezierCurveTo(210.421, 105.246, 210.83, 107.428, 211.909, 106.255);
      bush.bezierCurveTo(214.001, 103.98, 218.23, 103.27, 221.086, 104.012);
      bush.bezierCurveTo(229.614, 106.227, 232.625, 116.801, 233.336, 124.443);
      bush.bezierCurveTo(233.606, 127.346, 233.419, 130.745, 233.087, 133.661);
      bush.bezierCurveTo(232.924, 135.092, 231.758, 138.624, 233.045, 137.98);
      bush.bezierCurveTo(239.424, 134.791, 253.605, 120.405, 259.622, 131.377);
      bush.bezierCurveTo(259.689, 131.501, 260.712, 134.362, 260.95, 134.243);
      bush.bezierCurveTo(265.113, 132.161, 268.718, 128.864, 273.283, 127.183);
      bush.bezierCurveTo(280.837, 124.402, 287.878, 129.056, 291.762, 135.53);
      bush.bezierCurveTo(292.711, 137.111, 294.044, 145.587, 295.458, 146.451);
      bush.bezierCurveTo(295.73, 146.617, 309.964, 130.456, 310.366, 130.09);
      bush.bezierCurveTo(321.899, 119.559, 335.852, 114.047, 347.116, 128.512);
      bush.bezierCurveTo(354.078, 137.454, 356.451, 149.122, 358.369, 159.988);
      bush.bezierCurveTo(358.532, 160.912, 358.826, 162.722, 358.826, 160.985);
      bush.lineTo(0, 162.722);
      bush.closePath();

      context.beginPath();
      context.setTransform(1.5, 0, 0, 1, 0, -40);
      context.fillStyle = '#004f31';
      context.fill(bush);
      context.transform(1.02, 0, 0, 1, 0, 0);
      context.fillStyle = '#043c26';
      context.stroke(bush);
      context.closePath();

      const hill = new Path2D();
      hill.moveTo(595.884, 8.43995);
      hill.bezierCurveTo(691.649, -10.9801, 797.643, 29.3659, 875.13, 85.8244);
      hill.bezierCurveTo(874.099, 86.2714, 873.07, 86.7185, 872.04, 87.1655);
      hill.lineTo(871.984, 87.1898);
      hill.bezierCurveTo(870.786, 87.7104, 869.587, 88.2307, 868.389, 88.7503);
      hill.bezierCurveTo(852.718, 95.5478, 837.081, 102.228, 821.072, 107.663);
      hill.bezierCurveTo(802.688, 113.904, 784.125, 114.474, 764.703, 114.474);
      hill.bezierCurveTo(763.875, 114.474, 763.203, 115.146, 763.203, 115.974);
      hill.bezierCurveTo(763.203, 116.803, 763.875, 117.474, 764.703, 117.474);
      hill.bezierCurveTo(784.135, 117.474, 803.141, 116.919, 822.036, 110.504);
      hill.bezierCurveTo(838.176, 105.024, 853.916, 98.298, 869.583, 91.5026);
      hill.bezierCurveTo(870.705, 91.016, 871.827, 90.529, 872.948, 90.0421);
      hill.lineTo(873.222, 89.9231);
      hill.bezierCurveTo(887.684, 83.6432, 902.105, 77.3808, 916.819, 72.0177);
      hill.bezierCurveTo(992.129, 44.5684, 1076.05, 76.7717, 1144.77, 110.43);
      hill.bezierCurveTo(1144.92, 110.501, 1145.07, 110.547, 1145.22, 110.568);
      hill.bezierCurveTo(1169.67, 124.577, 1207.53, 145.436, 1242.29, 162.842);
      hill.bezierCurveTo(1259.78, 171.599, 1276.5, 179.492, 1290.34, 185.2);
      hill.bezierCurveTo(1296.55, 187.759, 1302.19, 189.886, 1307.07, 191.455);
      hill.bezierCurveTo(1302.41, 191.443, 1296.69, 191.429, 1290, 191.413);
      hill.bezierCurveTo(1266.93, 191.356, 1232.18, 191.274, 1188.41, 191.172);
      hill.bezierCurveTo(1100.88, 190.969, 977.266, 190.688, 838.853, 190.375);
      hill.bezierCurveTo(582.861, 189.798, 276.244, 189.113, 53.6148, 188.617);
      hill.bezierCurveTo(122.376, 180.475, 188.734, 158.994, 254.027, 135.675);
      hill.bezierCurveTo(304.881, 117.513, 355.094, 97.4395, 405.239, 77.3935);
      hill.bezierCurveTo(420.795, 71.1748, 436.344, 64.9587, 451.904, 58.8032);
      hill.bezierCurveTo(460.77, 55.2958, 469.672, 51.669, 478.614, 48.0258);
      hill.lineTo(478.614, 48.0258);
      hill.bezierCurveTo(516.87, 32.44, 555.853, 16.5577, 595.884, 8.43995);
      hill.closePath();

      context.beginPath();
      context.setTransform(1, 0, 0, 1, canvas.width / 2, -68);
      context.globalAlpha = .7;
      context.fillStyle = '#002116';
      context.fill(hill);
      context.transform(1.05, 0, 0, 1, -20, 0);
      context.fillStyle = '#002016';
      context.stroke(hill);
      context.closePath();

      const parasol = new Path2D();
      parasol.moveTo(1, 32.5019);
      parasol.lineTo(37.5, 50.0019);
      parasol.bezierCurveTo(53.1667, 38.8352, 103.5, 22.2019, 179.5, 45.0019);
      parasol.lineTo(195, 32.5019);
      parasol.bezierCurveTo(167.199, 9.23635, 89.9362, -23.115, 3.29788, 33.6036);
      parasol.rect(3, 33.5019, 2, 32);
      parasol.rect(37.5, 49.0019, 2, 32);
      parasol.rect(177.5, 44.0019, 2, 32);
      parasol.rect(193, 32.5019, 2, 32);
      parasol.closePath();

      context.beginPath();
      context.setTransform(2, 0, 0, 2, canvas.width - 60, 100);
      context.scale(-1, 1);
      context.globalAlpha = 1;
      context.fillStyle = '#fff';
      context.fill(parasol);
    });
  };

  remove = () => {
    this.#draw((context, canvas) => {
      context.clearRect(0, 0, canvas.width, canvas.height);
    });
  };

  #draw = drawLayer(canvas.get('bg'));
}
