import { zzfxP } from './libs/zzfx';
import zzfxM from './libs/zzfxM';
class Music {
  player: AudioBufferSourceNode;
  buffer: any;

  constructor(music: any[]) {
    this.buffer = zzfxM(...music);
  }

  play = (loop = false) => {
    this.player = zzfxP(...this.buffer);
    this.player.loop = loop;
  };

  stop = () => {
    this.player.stop();
  };
}

export default Music;
