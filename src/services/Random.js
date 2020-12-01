const randomNumber = (min,max) => {
    return parseInt(Math.random() * (max - min) + min);
}

export { randomNumber };