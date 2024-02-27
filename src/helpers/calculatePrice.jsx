import {main_p_type, main_p_data} from '../data/main_p_data'

export const calcPrice = ( price, type, weight, profit) => {
const dollar = main_p_data.dollar
const courrierFee = main_p_data.weight_fee/dollar

const totalWeight = weight * courrierFee

const calcType = (a) => {
    const found = main_p_type.find(n => n.name === a)
    if(found){
       const pType = found.value
        return pType/dollar
    }
}

const profitCalc = (p, n) => {
const porcentage = n / 100 
const r = p / (1 - porcentage)
return r
}

const result = calcType(type) + price + totalWeight 

const total = profitCalc(result, profit)

return total.toFixed(2)

}

export const dollarToDom = (value) => {
    const dollar = main_p_data.dollar
    const result = value * dollar
    return `RD$${result.toFixed(2)}`
}