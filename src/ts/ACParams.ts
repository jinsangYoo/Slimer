type ParamType = 'none' | 'event' | 'buy'

type NotExposedCurrency = {
  init: (type: ParamType, value: string) => ACParams
  TYPE: {
    DEFAULT: ParamType
    EVENT: ParamType
    BUY: ParamType
  }
}

type ACParams = {
  type: ParamType
  name: string
}

const ACParams: NotExposedCurrency = {
  TYPE: {
    DEFAULT: 'none',
    EVENT: 'event',
    BUY: 'buy',
  },
  init(type = ACParams.TYPE.DEFAULT, name: string): ACParams {
    return { type, name }
  },
}

export default ACParams
