import { Scene } from ".";
import canvasMap, { drawLayer } from "../canvas";
import Music from "../sounds/music";
import gameoverMusic from "../sounds/musics/gameover";
import { getFont } from "../utils";

export default class GameOverScene implements Scene {
  buttonContainer: HTMLDivElement;
  music: Music;
  
  constructor() {
    this.music = new Music(gameoverMusic);
  }

  start = () => {
    this.music.play(false);
    this.#appendButtons();
  }

  update = (time: number) => {
    const layer1 = canvasMap.get('layer1');
    const drawLayer1 = drawLayer(layer1);

    drawLayer1((context, canvas) => {
      context.setTransform(1, 0, 0, 1, canvas.width / 2, canvas.height / 2)
      context.font = getFont(64)
      context.fillText('Game Over', -260, -120);
    });
  }

  end = () => {

  }

  #appendButtons = () => {
    const buttonContainer = document.createElement('div');
    buttonContainer.style.cssText = `
      display: flex;  
      width: 480px;
      margin: 480px auto 0;
      justify-content: space-between;
    `;
    const retryButton = document.createElement('button');
    retryButton.style.cssText = `
      background: none;
      border: none;
      font-size: 40px;
    `;
    retryButton.textContent = 'Retry';
    const menuButton = document.createElement('button');
    menuButton.style.cssText = `
      background: none;
      border: none;
      font-size: 40px;
    `;
    menuButton.textContent = 'Main Menu';
    buttonContainer.append(retryButton);
    buttonContainer.append(menuButton);
    document.body.append(buttonContainer);
  }
}