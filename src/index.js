import Game from './Game';

const game = new Game();

const updateGame = timestamp => {
  requestAnimationFrame(updateGame);

  game.update(timestamp);
  game.render();
};

requestAnimationFrame(updateGame);
