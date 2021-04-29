type ParamType = "none" | "event" | "buy";

type NotExposedCurrency = {
  init: (type: ParamType, value: string) => ACParams;
  DEFAULT: ParamType;
};

type ACParams = {
  type: ParamType;
  name: string;
};

let ACParams: NotExposedCurrency = {
  DEFAULT: "none",
  init(type = ACParams.DEFAULT, name: string): ACParams {
    return { type, name };
  },
};

export { ACParams };
