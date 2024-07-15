import { State, getVelocity } from './utils.js';
const board = document.querySelector('.board');
const ball = document.querySelector('.ball');
const paddle_1 = document.querySelector('.paddle_1');
const paddle_2 = document.querySelector('.paddle_2');
const score1 = document.querySelector('.player_1_score');
const score2 = document.querySelector('.player_2_score');
const message = document.querySelector('.message');
const board_coord = board.getBoundingClientRect();
let ball_coord = ball.getBoundingClientRect();
let paddle_1_coord = paddle_1.getBoundingClientRect();
let paddle_2_coord = paddle_2.getBoundingClientRect();
let paddle_height = paddle_1_coord.height;
class Game {
    constructor() {
        this.scores = {
            player1: 0,
            player2: 0,
        };
        this.state = State.STOPPED;
        this.bindListeners = () => {
            document.addEventListener('keydown', (event) => {
                const key = event.key;
                switch (key) {
                    case 'Enter':
                        this.state = State.STARTED;
                        message.innerText = 'Game on!';
                        requestAnimationFrame(() => {
                            this.loop(getVelocity());
                        });
                        break;
                    case 'w':
                        paddle_1.style.top = Math.max(paddle_1_coord.top - 0.085 * window.innerHeight, board_coord.top) + "px";
                        paddle_1_coord = paddle_1.getBoundingClientRect();
                        break;
                    case 's':
                        paddle_1.style.top =
                            Math.min(board_coord.bottom - paddle_height, paddle_1_coord.top + window.innerHeight * 0.085) + "px";
                        paddle_1_coord = paddle_1.getBoundingClientRect();
                        break;
                    case 'ArrowUp':
                        paddle_2.style.top =
                            Math.max(board_coord.top, paddle_2_coord.top - window.innerHeight * 0.085) + "px";
                        paddle_2_coord = paddle_2.getBoundingClientRect();
                        break;
                    case 'ArrowDown':
                        paddle_2.style.top =
                            Math.min(board_coord.bottom - paddle_height, paddle_2_coord.top + window.innerHeight * 0.085) + "px";
                        paddle_2_coord = paddle_2.getBoundingClientRect();
                        break;
                }
            });
        };
        this.loop = (velocity) => {
            if (this.state === State.STARTED) {
                // ball touches the top / bottom
                if (ball_coord.top <= board_coord.top
                    ||
                        ball_coord.bottom >= board_coord.bottom) {
                    velocity.y = -velocity.y;
                }
                // ball hits left paddle and bounces off 
                if (ball_coord.left <= paddle_1_coord.right &&
                    ball_coord.top >= paddle_1_coord.top &&
                    ball_coord.bottom <= paddle_1_coord.bottom) {
                    velocity.x = -velocity.x;
                }
                // ball hits right paddle and bounces off 
                if (ball_coord.right >= paddle_2_coord.left &&
                    ball_coord.top >= paddle_2_coord.top &&
                    ball_coord.bottom <= paddle_2_coord.bottom) {
                    velocity.x = -velocity.x;
                }
                // player 1 wins (ball goes off the right edge of the board)
                if (ball_coord.right >= board_coord.right) {
                    this.reset();
                    this.scores.player1++;
                    score1.innerText = this.scores.player1 + '';
                }
                // player 2 wins (ball goes off the right edge of the board)
                if (ball_coord.left <= board_coord.left) {
                    this.reset();
                    this.scores.player2++;
                    score2.innerText = this.scores.player2 + '';
                }
                // move the ball
                console.log('move the ball');
                ball.style.left = ball_coord.left + velocity.x + "px";
                ball.style.top = ball_coord.top + velocity.y + "px";
                ball_coord = ball.getBoundingClientRect();
                requestAnimationFrame(() => {
                    this.loop(velocity);
                });
            }
        };
    }
    // constructor() {
    //     console.log( this.scores );
    // }
    start() {
        // console.log( this.state );
        this.bindListeners();
    }
    reset() {
        this.state = State.STOPPED;
        ball.style.top = '';
        ball.style.left = '';
        ball_coord = ball.getBoundingClientRect();
        message.innerText = 'Press Enter to start';
    }
}
const game = new Game();
game.start();
