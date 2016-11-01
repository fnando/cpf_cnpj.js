const cnpj = require("../lib/cnpj");
const expect = require("chai").expect;
const {describe, it} = require("mocha");

describe("CNPJ", () => {
  it("blacklists common numbers", () => {
    expect(cnpj.isValid("00000000000000")).not.to.be.ok;
    expect(cnpj.isValid("11111111111111")).not.to.be.ok;
    expect(cnpj.isValid("22222222222222")).not.to.be.ok;
    expect(cnpj.isValid("33333333333333")).not.to.be.ok;
    expect(cnpj.isValid("44444444444444")).not.to.be.ok;
    expect(cnpj.isValid("55555555555555")).not.to.be.ok;
    expect(cnpj.isValid("66666666666666")).not.to.be.ok;
    expect(cnpj.isValid("77777777777777")).not.to.be.ok;
    expect(cnpj.isValid("88888888888888")).not.to.be.ok;
    expect(cnpj.isValid("99999999999999")).not.to.be.ok;
  });

  it("rejects falsy values", () => {
    expect(cnpj.isValid("")).not.to.be.ok;
    expect(cnpj.isValid(null)).not.to.be.ok;
    expect(cnpj.isValid(undefined)).not.to.be.ok;
  });

  it("validates formatted strings", () => {
    expect(cnpj.isValid("54.550.752/0001-55")).to.be.ok;
  });

  it("validates unformatted strings", () => {
    expect(cnpj.isValid("54550752000155")).to.be.ok;
  });

  it("validates messed strings", () => {
    expect(cnpj.isValid("54550[752#0001..$55")).to.be.ok;
  });

  it("strictly validates strings", () => {
    expect(cnpj.isValid("54550[752#0001..$55", true)).not.to.be.ok;
    expect(cnpj.isValid("54.550.752/0001-55", true)).to.be.ok;
    expect(cnpj.isValid("54550752000155", true)).to.be.ok;
  });

  it("returns stripped number", () => {
    var number = cnpj.strip("54550[752#0001..$55");
    expect(number).to.eql("54550752000155");
  });

  it("returns formatted number", () => {
    var number = cnpj.format("54550752000155");
    expect(number).to.eql("54.550.752/0001-55");
  });

  it("generates formatted number", () => {
    var number = cnpj.generate(true);

    expect(number).to.match(/^(\d{2}).(\d{3}).(\d{3})\/(\d{4})-(\d{2})$/);
    expect(cnpj.isValid(number)).to.be.ok;
  });

  it("generates unformatted number", () => {
    var number = cnpj.generate();

    expect(number).to.match(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/);
    expect(cnpj.isValid(number)).to.be.ok;
  });
});
