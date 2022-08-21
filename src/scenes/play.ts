import { Scene } from '.';
import Player from '../objects/player';
import { PlayInfo } from '../layers';
import Music from '../sounds/music';
import gameMusic from '../sounds/musics/game';

export default class PlayScene implements Scene {
  info: PlayInfo;
  music: Music;
  player: Player;
  stage: number = 0;
  timeout: number = 10;

  constructor() {
    this.info = new PlayInfo();
    this.player = new Player();
    this.music = new Music(gameMusic);
  }

  start = () => {
    this.info.init({
      stage: this.stage,
      timeout: this.timeout,
    });

    this.player.init({
      speed: 10,
      position: {
        x: 50,
        y: 50,
      },
    });
    // this.music.play(true);
  };

  update = (time: number) => {
    this.info.update(time);
    this.player.update(time);
  };

  end = () => {
    this.player.remove();
    this.music.stop();
  };
}
