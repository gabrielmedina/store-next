export const formatyMoney = (money: number): string => {
  const formatMoney = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  })

  return formatMoney.format(money)
}
