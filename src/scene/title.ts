import { globalState } from '..';
import { drawLayer1 } from '../canvas';
import {
  addTitleEventListener,
  removeTitleEventListener,
} from '../events/title';
import { getFont } from '../font';
import { titleMusicPlay } from '../sounds/music';
import { degreeToRadian } from '../utils';

const SELECTED_TEXT_COLOR = '#E5FF3F';
const NORMAL_TEXT_COLOR = '#FFF';

const stars: {
  x: number;
  y: number;
  dx: number;
  dy: number;
  radius: number;
}[] = [];

export const updateTitle = () => {};

export const titleState = {
  index: 0,
  openGuide: false,
};

const drawRoach = (time: number) => {
  drawLayer1((context, canvas) => {
    // shadow
    context.setTransform(
      1,
      0,
      0,
      2,
      canvas.width / 2,
      canvas.height / 2 + 20 + 1 * Math.sin(time / 80),
    );
    context.filter = 'blur(4px)';
    context.ellipse(0, 50, 60, 5, 0, 0, degreeToRadian(360));
    context.fillStyle = '#222';
    context.fill();
  });
  drawLayer1((context, canvas) => {
    context.setTransform(1, 0, 0, 1, canvas.width / 2, canvas.height / 2);
    context.globalAlpha = 0.3;
    context.fillStyle = '#ffa';
    context.filter = 'blur(2px)';
    context.beginPath();
    context.ellipse(0, 120, 120, 20, 0, 0, degreeToRadian(360));
    context.fill();
    context.closePath();
  });
  drawLayer1((context, canvas) => {
    // body
    context.setTransform(
      1,
      0,
      0,
      2,
      canvas.width / 2,
      canvas.height / 2 + 20 + 10 * Math.sin(time / 80),
    );
    context.arc(0, 0, 40, 0, degreeToRadian(360));
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
    context.fillStyle = '#6A3D3D';
    context.fill();
  });
  drawLayer1((context, canvas) => {
    // eyes
    context.setTransform(
      1,
      0,
      0,
      1,
      canvas.width / 2,
      canvas.height / 2 + 20 + 10 * Math.sin(time / 80),
    );
    context.fillStyle = '#000';
    context.arc(-10, -40, 5, 0, degreeToRadian(360));
    context.arc(10, -40, 5, 0, degreeToRadian(360));
    context.fill();
  });
  drawLayer1((context, canvas) => {
    // mouth
    context.setTransform(
      1,
      0,
      0,
      1,
      canvas.width / 2,
      canvas.height / 2 + 20 + 10 * Math.sin(time / 80),
    );
    context.arc(0, -20, 10, 0, degreeToRadian(180));
    context.fillStyle = '#000';
    context.fill();
  });
  drawLayer1((context, canvas) => {
    // arms
    context.setTransform(
      1,
      0,
      0,
      1,
      canvas.width / 2,
      canvas.height / 2 + 20 + 10 * Math.sin(time / 80),
    );
    context.moveTo(-25, 10);
    context.quadraticCurveTo(
      -40 - 10 * Math.sin(time / 80),
      -20 - 10 * Math.sin(time / 80),
      -25 - 20 * Math.sin(time / 80),
      -60 - 10 * Math.sin(time / 80),
    );
    context.moveTo(25, 10);
    context.quadraticCurveTo(
      40 + 10 * Math.sin(time / 80),
      -20 - 10 * Math.sin(time / 80),
      25 + 20 * Math.sin(time / 80),
      -60 - 10 * Math.sin(time / 80),
    );
    context.stroke();
  });
  drawLayer1((context, canvas) => {
    // legs
    context.setTransform(1, 0, 0, 1, canvas.width / 2, canvas.height / 2);
    context.moveTo(-20, 70 + 10 * Math.sin(time / 80));
    context.quadraticCurveTo(-40, 80, -40, 100 + 20);
    context.moveTo(20, 70 + 10 * Math.sin(time / 80));
    context.quadraticCurveTo(40, 80, 40, 100 + 20);
    context.stroke();
  });
  drawLayer1((context, canvas) => {
    // feelers
    context.setTransform(
      1,
      0,
      0,
      1,
      canvas.width / 2,
      canvas.height / 2 + 20 + 10 * Math.sin(time / 80),
    );
    context.moveTo(-10, -60);
    context.quadraticCurveTo(
      -20 - 5 * Math.sin(time / 80),
      -120 + 5 * Math.sin(time / 80),
      -40 - 5 * Math.sin(time / 80),
      -80 + 5 * Math.sin(time / 80),
    );
    context.moveTo(10, -60);
    context.quadraticCurveTo(
      20 + 5 * Math.sin(time / 80),
      -120 + 5 * Math.sin(time / 80),
      40 + 5 * Math.sin(time / 80),
      -80 + 5 * Math.sin(time / 80),
    );
    context.stroke();
  });
  drawLayer1((context, canvas) => {
    // light
    context.setTransform(1, 0, 0, 1, canvas.width / 2, canvas.height / 2);
    context.globalAlpha = 0.3;
    context.fillStyle = '#ffa';
    context.filter = 'blur(2px)';
    context.beginPath();
    context.moveTo(-120, 120);
    context.lineTo(-40, -250);
    context.lineTo(40, -250);
    context.lineTo(120, 120);
    context.ellipse(0, 120, 120, 20, 0, 0, degreeToRadian(360));
    context.fill();
    context.closePath();
  });
  drawLayer1((context, canvas) => {
    // astroship
    context.setTransform(1, 0, 0, 1, canvas.width / 2, canvas.height / 2);
    context.beginPath();
    context.fillStyle = '#fff';
    context.shadowOffsetY = 6;
    context.shadowColor = '#000';
    context.ellipse(0, -240, 240, 20, 0, 0, degreeToRadian(360));
    context.fillStyle = '#fff';
    context.fill();
    context.closePath();
    context.beginPath();
    context.shadowOffsetX = 8;
    context.shadowOffsetY = 0;
    context.ellipse(
      0,
      -250,
      120,
      60,
      0,
      degreeToRadian(180),
      degreeToRadian(360),
    );
    context.fillStyle = '#D5D471';
    context.fill();
    context.closePath();
    context.beginPath();
    context.ellipse(
      0,
      -250,
      120,
      10,
      0,
      degreeToRadian(0),
      degreeToRadian(360),
    );
    context.shadowOffsetX = 8;
    context.shadowOffsetY = 1;
    context.fillStyle = '#C4C639';
    context.fill();
    context.closePath();
  });
};

export const drawTitle = (time: number) => {
  drawTitleBackground(time);
  drawLayer1((context, canvas) => {
    drawRoach(time);
  });
  drawLayer1((context, canvas) => {
    context.setTransform(1, 0, 0, 1, canvas.width / 2, canvas.height / 2 - 160);
    context.textBaseline = 'middle';
    context.textAlign = 'center';
    context.font = getFont(48);
    context.fillStyle = '#fff';
    context.shadowOffsetX = 6;
    context.shadowOffsetY = 6;
    context.shadowColor = '#000';
    context.fillText('ASTROACH', 0, 0);
  });
  drawLayer1((context, canvas) => {
    context.setTransform(1, 0, 0, 1, canvas.width / 2, canvas.height / 2 + 200);
    context.textBaseline = 'middle';
    context.textAlign = 'center';
    context.shadowColor = '#000';
    context.shadowOffsetX = 4;
    context.shadowOffsetY = 4;
    context.font = getFont(24);
    context.beginPath();
    if (titleState.index === 0) context.fillStyle = SELECTED_TEXT_COLOR;
    else context.fillStyle = NORMAL_TEXT_COLOR;
    context.fillText('START', -240, 0);
    context.closePath();
    context.beginPath();
    if (titleState.index === 1) context.fillStyle = SELECTED_TEXT_COLOR;
    else context.fillStyle = NORMAL_TEXT_COLOR;
    context.fillText('MUSIC', 0, 0);
    context.closePath();
    context.beginPath();
    if (titleState.index === 2) context.fillStyle = SELECTED_TEXT_COLOR;
    else context.fillStyle = NORMAL_TEXT_COLOR;
    context.fillText('GUIDE', 240, 0);
    context.closePath();
    context.beginPath();
    if (titleState.index === 1) context.fillStyle = SELECTED_TEXT_COLOR;
    else context.fillStyle = NORMAL_TEXT_COLOR;
    context.font = getFont(20);
    if (globalState.music) context.fillText('ON', 0, 40);
    else context.fillText('OFF', 0, 40);
    context.closePath();
  });
  if (titleState.openGuide) drawGuide(time);
};

export const drawGuide = (time: number) => {
  drawLayer1((context, canvas) => {
    context.setTransform(1, 0, 0, 1, canvas.width / 2, canvas.height / 2);
    context.globalAlpha = 0.9;
    context.fillRect(
      -canvas.width / 2,
      -canvas.height / 2,
      canvas.width,
      canvas.height,
    );
    context.fillStyle = '#fff';
    context.font = getFont(18);
    context.textBaseline = 'middle';
    context.textAlign = 'center';
    context.fillText('Arrow keys - Move', 0, -120);
    context.fillText('S key - Attack on left tile', 0, -90);
    context.fillText('D key - Attack on right tile', 0, -60);
  });
  drawLayer1((context, canvas) => {
    context.strokeStyle = '#0F0';
    context.shadowColor = '#FFF';
    context.shadowOffsetX = 8;
    context.shadowOffsetY = 8;
    context.setTransform(1, 0, -0.5, 1, canvas.width / 2, canvas.height / 2);
    context.fillStyle = '#fac800';
    context.fillRect(-220, 0, 120, 40);
    context.setTransform(1, 0, -0.5, 1, canvas.width / 2, canvas.height / 2);
    context.fillStyle = '#fa2b00';
    context.fillRect(-180, 80, 120, 40);
  });
  drawLayer1((context, canvas) => {
    context.setTransform(1, 0, 0, 1, canvas.width / 2, canvas.height / 2);
    context.fillStyle = '#fff';
    context.font = getFont(16);
    context.fillText('Yellow tile', -60, 20);
    context.fillText('Red tile', -60, 100);
    context.font = getFont(12);
    context.fillText('means the position enemy will move to', -60, 42);
    context.fillText('means the position enemy will attack to', -60, 120);
    context.textBaseline = 'middle';
    context.textAlign = 'center';
    context.fillText('Press S or D key to back to title', 0, 180);
  });
};

const drawTitleBackground = (time: number) => {
  drawLayer1((context, canvas) => {
    context.beginPath();
    const lingrad = context.createLinearGradient(0, 0, 0, innerHeight);
    lingrad.addColorStop(0.4, '#161C26');
    lingrad.addColorStop(0.48, '#594438');
    lingrad.addColorStop(0.5, '#F2B872');
    lingrad.addColorStop(0.7, '#D99B66');
    context.fillStyle = lingrad;
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.closePath();
  });
  drawLayer1((context, canvas) => {
    context.fillStyle = '#fff';
    if (!stars.length) {
      for (let i = 0; i < 50; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * (canvas.height / 3);
        const dx = (Math.random() - 0.5) * 0.5;
        const dy = (Math.random() - 0.5) * 0;
        const radius = Math.random() * 2 + 1;
        stars.push({
          x,
          y,
          dx,
          dy,
          radius,
        });
      }
    }
    stars.forEach(({ x, y, dx, dy, radius }, idx) => {
      const positionX = x + dx * 2;
      const positionY = y + dy * 2;
      if (positionX < 0) stars[idx].dx = -dx;
      if (positionY < 0) stars[idx].dy = -dy;
      if (positionX > canvas.width) stars[idx].dx = -dx;
      if (positionY > canvas.height) stars[idx].dy = -dy;
      stars[idx].x = positionX;
      stars[idx].y = positionY;
      context.beginPath();
      context.arc(positionX, positionY, radius, 0, degreeToRadian(360));
      context.fill();
      context.closePath();
    });
  });
};

export let titleMusic: AudioBufferSourceNode;

export const startTitleMusic = () => {
  titleMusic = titleMusicPlay();
  titleMusic.loop = true;
};

export const stopTitleMusic = () => {
  titleMusic.stop();
};

export const startTitleScene = () => {
  globalState.sceneType = 0;
  if (globalState.music) startTitleMusic();
  addTitleEventListener();
};

export const endTitleScene = () => {
  if (globalState.music) stopTitleMusic();
  removeTitleEventListener();
};
