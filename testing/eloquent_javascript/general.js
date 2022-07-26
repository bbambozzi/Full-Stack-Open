function randInt(begin, endInclude) {
    begin -= 1;
    let seed = (Math.random() * (endInclude - begin)) + begin;
    return Math.floor(seed) + 1;
}



console.log(randInt(1, 10))
console.log(randInt(1, 10))
console.log(randInt(1, 10))
console.log(randInt(1, 10))
console.log(randInt(1, 10))
console.log(randInt(1, 10))
