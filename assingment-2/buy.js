const {read,write} = require("/Users/pranay./Documents/GitHub/BEE-Daily/L7(file_handeling)/IO/io.js")
let uname = process.argv[2];
let pname = process.argv[3];
async function buy(uname,pname){
    const users =await  read("./users.txt")
    const products = await  read("./products.txt")

    const user = users.filter(ele=>ele.name===uname  )
    console.log(user)
    if(user.length==0)console.log(" no user ")
        
    const product = products.filter(ele=> ele.name===pname  )
    if(product.length==0)console.log(" no product")
    let orders = await  read("./orderHistory.txt");
    if(!orders)orders = []
    orders.push({
        name:user[0].name,
        product:product[0].name,
    })
    


    console.log(await write("./orderHistory.txt",JSON.stringify(orders)))

        
}


buy(uname,pname)