import './index.scss';
import Game from './game';
import { createCanvas } from './canvas';

createCanvas('layer0');
createCanvas('layer1');
createCanvas('layer2');
createCanvas('layer3');

createCanvas('bg');

const game = new Game();

game.start();
