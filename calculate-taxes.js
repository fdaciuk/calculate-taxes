;(function () {
 'use strict'

  function toMoney (value) {
    return (+value).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })
  }

  function calculateTaxes ({ value = 0, installments = 1, percentage = 0 }) {
    const taxesPercentage = +percentage * +installments
    const total = +value + (+value * +taxesPercentage * 0.01)

    return {
      value: toMoney(value),
      installmentsQuantity: installments,
      installmentValue: toMoney(total / installments),
      taxesPercentage: taxesPercentage.toFixed(2),
      taxesValue: toMoney(total - value),
      totalToPay: toMoney(total)
    }
  }

  window.calculateTaxes = calculateTaxes
})()
