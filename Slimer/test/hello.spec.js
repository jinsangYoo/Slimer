describe('Hello', () => {
  describe('greeting', () => {
    it('인사 문자열을 반환한다', () => {
      const expectedStr = Hello.message,
        actusalStr = Hello.greeting();

      expect(actusalStr).toBe(expectedStr);
    });
  });
  describe('testJasmine', () => {
    it('testJasmine 문자열이 뭐얌이 아니면 에러를 반환한다.', () => {
      // spyOn(window, 'testJasmine').and.callThrough();

      // expect(window.testJasmine).toHaveBeenCalled();
      console.log(testJasmine());
      expect(testJasmine()).toBe("aa");
    });
  });
});
