;
export var State;
(function (State) {
    State[State["STARTED"] = 0] = "STARTED";
    State[State["STOPPED"] = 1] = "STOPPED";
})(State || (State = {}));
;
export const random = (min, max) => Math.floor(min + Math.random() * (max - min + 1));
export const getVelocity = (min = 3, max = 8) => {
    let x = random(min, max);
    let y = random(min, max);
    const dirX = random(0, 1) === 1 ? -1 : 1;
    x = x * dirX;
    const dirY = random(0, 1) === 1 ? -1 : 1;
    y = y * dirY;
    return {
        // x: x,
        // y: y
        x,
        y
    };
};
