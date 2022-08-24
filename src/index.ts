import './index.scss';
import Game from './game';
import { createCanvas } from './canvas';

createCanvas('layer1');
createCanvas('layer2');

const game = new Game();

game.start();
