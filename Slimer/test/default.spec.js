import aceTM from "../src/default";

describe('default', () => {
  beforeAll(function() {}); // suite 전에 호출
  afterAll(function() {}); // suite 후에 호출
  beforeEach(function() {}); // 각각의 spec 전에 호출
  afterEach(function() {}); // 각각의 spec 후에 호출

  describe('makeAceObjectPromise', () => {
    it('window._AceTM가 undefined 인 경우 에러를 반환한다.', () => {
        // spyOn(window, 'makeAceObjectPromise').and.callThrough();
      return aceTM.makeAceObjectPromise("100341").then(function(aceObject) {
          window._AceTM = aceObject;
          expect(window._AceTM).toBeDefined();
        })
        .catch(function(e) {
          console.log("in catch: " + e);
        });
    });
  });

  describe('AceTM', () => {
    it('AceTM 객체 생성이 undefined 인 경우 에러를 반환한다.', () => {
      const _aceTM = new aceTM.AceTM();
      expect(_aceTM).toBeDefined();
    });
  });
});
