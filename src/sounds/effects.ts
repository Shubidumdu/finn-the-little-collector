import store from '../store';
import { zzfx } from './libs/zzfx';

type SoundType = 'pick' | 'correct' | 'wrong';

const playEffectSound = (type: SoundType) => {
  if (!store.isSoundOn) return;
  switch (type) {
    case 'pick':
      soundPick();
      break;
    case 'correct':
      soundCorrect();
      break;
    case 'wrong':
      soundWrong();
      break;
  }
};

const soundPick = () => {
  zzfx(...[.3,,1384,.02,.01,0,,1.36,8.5,,,,,,15,,,,.01]);
};

const soundCorrect = () => {
  zzfx(...[.6,,128,.01,.01,.09,,1.46,-14,,,,,,,.1,.01,.43,.04]);
}

const soundWrong = () => {
  zzfx(...[.4,,455,,.07,.07,,.09,,-0.2,,,.04,.8,33,.4,.29,.85,.09]);
}

export default playEffectSound;
