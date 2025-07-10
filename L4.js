let products = [
    {
        name: "samsung",
        amount: 70000,
        quantity: 10
    },
    {
        name: "iphone",
        amount: 100000,
        quantity: 1
    }
];

function buyproduct(pro_name, cb) {
    let flag = false;
    let Amount = null;
    for (let product in products) { 
        if (products[product].name == pro_name && products[product].quantity > 0) {
            console.log("product is available");
            flag = true;
            products[product].quantity -= 1; 
            Amount = products[product].amount;
            break;
        }
    }
    if (!flag) {
        cb("product not available", null);
    } else {
        cb(null, Amount);
    }
    
}
let balance=2000000;
    function deduct(amount, cb) {
        if (balance >= amount) {
            balance -= amount;
            cb(null, balance);
        } else {
            cb("low balance", null);
        }
    }   
buyproduct("samsung", function (err, amount) {
    if (err) return console.log(err);
    console.log("amount", amount);
    deduct(amount,function (err, Balance) {
        if (err) return console.log(err);
        console.log("order placed , balance", Balance);
    });
});
