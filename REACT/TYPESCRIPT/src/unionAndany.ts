let subs : number | string = '1M'

let apiRequest : "pending" | 'success' | 'error' = 'pending'


let airlineSeat : 'aisle' | 'window' | 'middle' = 'aisle'

airlineSeat = 'aisle'

const orders = ['12','20','29','42','50']

let currentOrder:string | undefined;

for(let order of orders){
    if(order === '29'){
        currentOrder = order
        break
    }
    currentOrder = "11";
}



console.log(currentOrder);