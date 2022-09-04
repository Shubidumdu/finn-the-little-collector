import store from '../store';
import { zzfx } from './libs/zzfx';

type SoundType = 'pick';

const playEffectSound = (type: SoundType) => {
  if (!store.isSoundOn) return;
  switch (type) {
    case 'pick':
      soundPick();
  }
};

const soundPick = () => {
  zzfx(...[.3,,1384,.02,.01,0,,1.36,8.5,,,,,,15,,,,.01]);
};

export default playEffectSound;
