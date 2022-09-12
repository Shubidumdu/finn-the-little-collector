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
  zzfx(...[0.3, , 1384, 0.02, 0.01, 0, , 1.36, 8.5, , , , , , 15, , , , 0.01]);
};

const soundCorrect = () => {
  zzfx(
    ...[
      0.4,
      0.01,
      496,
      0.05,
      0.21,
      0.47,
      ,
      1.42,
      ,
      -4.7,
      146,
      0.1,
      0.15,
      ,
      ,
      ,
      0.12,
      0.76,
      0.11,
      0.28,
    ],
  );
};

const soundWrong = () => {
  zzfx(
    ...[
      0.4,
      ,
      455,
      ,
      0.07,
      0.07,
      ,
      0.09,
      ,
      -0.2,
      ,
      ,
      0.04,
      0.8,
      33,
      0.4,
      0.29,
      0.85,
      0.09,
    ],
  );
};

export default playEffectSound;
