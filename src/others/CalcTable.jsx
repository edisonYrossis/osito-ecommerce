import React from 'react'
import { calcPrice, dollarToDom } from '../helpers/calculatePrice'

function CalcTable({content, type, weight}) {
  return (
    <div>
  <h2 class="text-center text-md font-bold mb-4">Ejemplo de Márgenes</h2>

  <table class="w-full border border-collapse">
    <thead>
      <tr class="bg-blue-200">
        <th class="py-2 text-sm font-semibold">10%</th>
        <th class="py-2 text-sm font-semibold">15%</th>
        <th class="py-2 text-sm font-semibold">20%</th>
      </tr>
    </thead>
    <tbody>
      <tr class="bg-blue-100">
        <td class="py-2 text-xs font-medium text-gray-500">{dollarToDom(calcPrice(content, type, weight, 10))}</td>
        <td class="py-2 text-xs font-medium text-gray-600">{dollarToDom(calcPrice(content, type, weight, 15))}</td>
        <td class="py-2 text-xs font-medium text-gray-800">{dollarToDom(calcPrice(content, type, weight, 20))}</td>
      </tr>
    </tbody>
    <thead>
      <tr class="bg-green-200">
        <th class="py-2 text-sm font-semibold">25%</th>
        <th class="py-2 text-sm font-semibold">30%</th>
        <th class="py-2 text-sm font-semibold">35%</th>
      </tr>
    </thead>
    <tbody>
      <tr class="bg-green-100">   
        <td class="py-2 text-xs font-medium text-gray-500">{dollarToDom(calcPrice(content, type, weight, 25))}</td>
        <td class="py-2 text-xs font-medium text-gray-600">{dollarToDom(calcPrice(content, type, weight, 30))}</td>
        <td class="py-2 text-xs font-medium text-gray-800">{dollarToDom(calcPrice(content, type, weight, 35))}</td>
      </tr>
    </tbody>
  </table>

    </div>
  )
}

export default CalcTable