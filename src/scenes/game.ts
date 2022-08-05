import { Scene } from ".";
import Player from "../objects/player";
import Music from "../sounds/music";
import gameMusic from "../sounds/musics/game";

export default class GameScene implements Scene {
  player: Player;
  music: Music;

  constructor() {
    this.player = new Player();
    this.music = new Music(gameMusic);
  }

  start = () => {
    this.music.play(true);
  };

  update = (time: number) => {
    this.player.update(time);
  };

  end = () => {};
}
