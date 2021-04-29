import { ACParams } from "./ts/ACParams";
import { ACS } from "./ts/ACS";

let Slimer = {
  send(value: ACParams): void {
    ACS.getInstance().send(value);
  },
};

Slimer.send({ type: "event", name: "아옹 index.ts" });
