class OrderBook {
    constructor(symbol) {
        this.symbol = symbol;
        this.bids = [];
        this.ask = [];
        this.currentPrice = null;
        this.trades = [];
    }

    _sort(side) {
        if (side == "BUY") {
            this.bids.sort((a, b) => {
                if (a.price != b.price) {
                    return b.price - a.price;  // desc
                }
                return a.timeStamp - b.timeStamp;
            });
        } else {
            this.ask.sort((a, b) => {
                if (a.price != b.price) {
                    return a.price - b.price;  // asc
                }
                return a.timeStamp - b.timeStamp;
            });
        }
    }

    placeOrder(price, quantity, type, side, userName) {

        let newOrder = {
            symbol: this.symbol,
            orderId: Math.floor(Math.random() * 1000000),
            side: side,
            type: type,
            price: price || null,
            originalQty: quantity,
            executedQty: 0,
            remainingQty: quantity,
            user: userName,
            timeStamp: Date.now(),
        };

        if (newOrder.type == "LIMIT") {
            let result = this._LimitMatch(newOrder);

            if (result.remainingQty > 0) {
                if (result.side == "BUY") {
                    this.bids.push(result);
                } else {
                    this.ask.push(result);
                }
                this._sort(result.side);
            }
        } else {
            this._MarketMatch(newOrder);
        }
    }


    _LimitMatch(order) {

        if (order.side == "BUY") {

            let askArr = this.ask;

            while (order.remainingQty > 0 && askArr.length > 0) {
                let top = askArr[0];

                if (top.price <= order.price) {

                    let buyQuantity = Math.min(top.remainingQty, order.remainingQty);

                    // update --> order
                    order.executedQty += buyQuantity;
                    order.remainingQty -= buyQuantity;

                    // update top
                    top.executedQty += buyQuantity;
                    top.remainingQty -= buyQuantity;

                    this.currentPrice = top.price;
                    this.trades.push({ price: top.price, quantity: buyQuantity });

                    if (top.remainingQty == 0) {
                        askArr.shift();
                    }
                } else {
                    break;
                }
            }
            return order;
        }


        else if (order.side == "SELL") {

            let bidArr = this.bids;

            while (order.remainingQty > 0 && bidArr.length > 0) {

                let top = bidArr[0];

                if (top.price >= order.price) {

                    let sellQuantity = Math.min(order.remainingQty, top.remainingQty);

                    // update --> order
                    order.executedQty += sellQuantity;
                    order.remainingQty -= sellQuantity;

                    // update --> top
                    top.executedQty += sellQuantity;
                    top.remainingQty -= sellQuantity;

                    this.currentPrice = top.price;
                    this.trades.push({ price: top.price, quantity: sellQuantity });

                    if (top.remainingQty == 0) {
                        bidArr.shift();
                    }
                } else {
                    break;
                }
            }
            return order;
        }

        else {
            return "invalid order side"
        }
    }


    _MarketMatch(order) {

        if (order.side === "BUY") {

            let askArr = this.ask;

            while (order.remainingQty > 0 && askArr.length > 0) {

                let top = askArr[0];
                let qty = Math.min(order.remainingQty, top.remainingQty);

                order.executedQty += qty;
                order.remainingQty -= qty;

                
                top.executedQty += qty;
                top.remainingQty -= qty;

                if (top.remainingQty === 0) askArr.shift();
            }

            if (order.remainingQty > 0)
                console.log(`BUY Market Order partially filled. Remaining: ${order.remainingQty}`);

            return order;
        }


        else if (order.side === "SELL") {

            let bidArr = this.bids;

            while (order.remainingQty > 0 && bidArr.length > 0) {

                let top = bidArr[0];
                let qty = Math.min(order.remainingQty, top.remainingQty);

                order.executedQty += qty;
                order.remainingQty -= qty;

                top.executedQty += qty;
                top.remainingQty -= qty;


                if (top.remainingQty === 0) bidArr.shift();
            }

            if (order.remainingQty > 0)
                console.log(`SELL Market Order partially filled. Remaining: ${order.remainingQty}`);

            return order;
        }

        else {
            console.log("Invalid side for market order");
        }
    }
}



let BTCUSDOrderBook = new OrderBook("BTC_USD");

BTCUSDOrderBook.placeOrder("100", 5, "LIMIT", "BUY", "abcd");
BTCUSDOrderBook.placeOrder("101", 10, "LIMIT", "BUY", "abcd");
BTCUSDOrderBook.placeOrder("99", 5, "LIMIT", "BUY", "abcd");

console.log(BTCUSDOrderBook);

BTCUSDOrderBook.placeOrder("102", 5, "LIMIT", "SELL", "abcd");
BTCUSDOrderBook.placeOrder("103", 5, "LIMIT", "SELL", "abcd");
BTCUSDOrderBook.placeOrder("104", 5, "LIMIT", "SELL", "abcd");

console.log(BTCUSDOrderBook);

BTCUSDOrderBook.placeOrder("101", 3, "LIMIT", "SELL", "abcd");

console.log(BTCUSDOrderBook);
