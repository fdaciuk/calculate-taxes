;(function () {
 'use strict'

  function toMoney (value) {
    return (+value).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })
  }

  function calculateTaxes ({ value, installments, installmentValue, percentage }) {
    return installments !== ''
      ? calculateTaxesByInstallmentsNumber({ installments, value, percentage })
      : calculateTaxesByInstallmentsValue({ installmentValue, value, percentage })
  }

  function calculateTaxesByInstallmentsNumber ({ value, installments, percentage }) {
    value = value || 0
    installments = installments || 1
    percentage = percentage || 0
    const taxesPercentage = +percentage * +installments
    const total = +value + (+value * +taxesPercentage * 0.01)

    return calculate({
      value,
      installments,
      installmentValue: total / installments,
      taxesPercentage: taxesPercentage,
      total: total
    })
  }

  function calculateTaxesByInstallmentsValue ({ value, installmentValue, percentage }) {
    value = value || 0
    percentage = percentage || 0
    let installments = Math.ceil(value / installmentValue) || 1

    let taxesPercentage = +percentage * +installments
    let total = +value + (+value * +taxesPercentage * 0.01)
    let newInstallmentValue = total / installments

    while (newInstallmentValue > installmentValue) {
      installments = installments + 1
      taxesPercentage = +percentage * +installments
      total = +value + (+value * +taxesPercentage * 0.01)
      newInstallmentValue = total / installments
    }

    return calculate({
      value,
      installments,
      installmentValue: newInstallmentValue,
      taxesPercentage: taxesPercentage,
      total: total
    })
  }

  function calculate ({
    value,
    installments,
    installmentValue,
    taxesPercentage,
    total
  }) {
    return {
      value: toMoney(value),
      installmentsQuantity: installments,
      installmentValue: toMoney(installmentValue),
      taxesPercentage: taxesPercentage.toFixed(2),
      taxesValue: toMoney(total - value),
      totalToPay: toMoney(total)
    }
  }

  window.calculateTaxes = calculateTaxes
})()
