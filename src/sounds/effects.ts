import { zzfx } from './libs/zzfx';

type SoundType = 'move';

const playEffectSound = (type: SoundType) => {
  switch (type) {
    case 'move':
      soundMove();
  }
};

const soundMove = () => {
  zzfx(
    ...[
      2.35,
      ,
      377,
      ,
      ,
      0.11,
      1,
      2.31,
      ,
      -4.9,
      ,
      ,
      ,
      0.5,
      ,
      0.4,
      0.1,
      0.68,
      0.08,
    ],
  );
};

export default playEffectSound;
