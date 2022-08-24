import './index.scss';
import Game from './game';
import { createCanvas } from './canvas';

createCanvas('layer1');
createCanvas('playInfo', { height: 100, style: { height: 'auto', zIndex: '10' } });

const game = new Game();

game.start();
