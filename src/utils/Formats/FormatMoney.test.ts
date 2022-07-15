import { formatyMoney } from './FormatMoney'

describe('FormatMoney', () => {
  it('should return formated money', () => {
    expect(formatyMoney(10.25)).toEqual('$10.25')
  })
})
