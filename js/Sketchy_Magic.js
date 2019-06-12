export const draw = canvas => {
    const ctx = canvas.getContext('2d');

    drawBg(ctx, canvas);
}

export const drawBg = (ctx, canvas) => {
    ctx.beginPath();
    ctx.rect(canvas.width / 2, canvas.height / 2, 20, 10);

    ctx.fillStyle = "#C1B8B6";
    ctx.fill();
    ctx.closePath();
    ctx.stroke();
}