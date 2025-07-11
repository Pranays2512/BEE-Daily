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

function buyproduct(pro_name) {
    return new Promise((resolve, reject) => {
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
            return reject("product not available");
        } else {
            return resolve(Amount);
        }
    });
}

let balance = 200000;
function deduct(amount) {
    return new Promise((resolve, reject) => {   
        if (balance >= amount) {
            balance -= amount;
            return resolve(balance);
        } else {
            return reject("low balance");
        }
    });
}
async function fun() {
    try{
let amount = await buyproduct("moto");
let msg=await deduct(amount);
console.log(msg);
    }catch(err){
        console.log(err);
    }

}
fun()
console.log("abc");

// buyproduct("iphone")
//     .then((amount) => {
//         console.log("amount", amount);
//         return deduct(amount);
//     })
//     .then((Balance) => {
//         console.log("order placed balance", Balance);    
//     })
//     .catch((err) => {     
//         console.log(err);
//     });
// let p= new Promise((resolve, reject) => {
//    resolve("promise resolved");
// });
// p.then((result) => {
//  console.log(result);
//  console.log("promise fulfilled");
// }).catch((error) => {

// });
// let users=[
//     {
//         id: 1,
//         name: "abc",
//         age: 16
//     },
//     {
//         id: 2,
//         name: "yashu",
//         age: 30
//     }
// ]

// function isEligible(id){
//     return new Promise((resolve, reject) => {
//         let user=users.filter((user) => user.id === id);
//     if(!user)return reject("no user found");
//     if(user.age>=18)return resolve("user is eligible");
//     else return reject("user is not eligible");
//     });
    
// }
// isEligible(1).then((result) => {
//     console.log(result);
// }).catch((error) => {
//     console.log(error);
// });

// console.log("abc");