const fibonacci = function(number){
    if(Math.abs(number) <= 2){
        return 1;
    }else{
        return fibonacci(Math.abs(number)-1) + fibonacci(Math.abs(number) - 2);
    }
}
console.log(fibonacci(45));
console.log(fibonacci(-15));
ß