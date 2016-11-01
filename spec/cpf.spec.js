var cpf = require("../lib/cpf");
var expect = require("chai").expect;

describe("CPF", function() {
  it("blacklists common numbers", function() {
    expect(cpf.isValid("00000000000")).not.to.be.ok;
    expect(cpf.isValid("11111111111")).not.to.be.ok;
    expect(cpf.isValid("22222222222")).not.to.be.ok;
    expect(cpf.isValid("33333333333")).not.to.be.ok;
    expect(cpf.isValid("44444444444")).not.to.be.ok;
    expect(cpf.isValid("55555555555")).not.to.be.ok;
    expect(cpf.isValid("66666666666")).not.to.be.ok;
    expect(cpf.isValid("77777777777")).not.to.be.ok;
    expect(cpf.isValid("88888888888")).not.to.be.ok;
    expect(cpf.isValid("99999999999")).not.to.be.ok;
    expect(cpf.isValid("12345678909")).not.to.be.ok;
  });

  it("rejects falsy values", function() {
    expect(cpf.isValid("")).not.to.be.ok;
    expect(cpf.isValid(null)).not.to.be.ok;
    expect(cpf.isValid(undefined)).not.to.be.ok;
  });

  it("validates formatted strings", function() {
    expect(cpf.isValid("295.379.955-93")).to.be.ok;
  });

  it("validates unformatted strings", function() {
    expect(cpf.isValid("29537995593")).to.be.ok;
  });

  it("validates messed strings", function() {
    expect(cpf.isValid("295$379\n955...93")).to.be.ok;
  });

  it("strictly validates strings", function() {
    expect(cpf.isValid("295$379\n955...93", true)).not.to.be.ok;
    expect(cpf.isValid("295.379.955-93", true)).to.be.ok;
    expect(cpf.isValid("29537995593", true)).to.be.ok;
  });

  it("returns stripped number", function() {
    var number = cpf.strip("295.379.955-93");
    expect(number).to.eql("29537995593");
  });

  it("returns formatted number", function() {
    var number = cpf.format("29537995593");
    expect(number).to.eql("295.379.955-93");
  });

  it("generates formatted number", function() {
    var number = cpf.generate(true);

    expect(number).to.match(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/);
    expect(cpf.isValid(number)).to.be.ok;
  });

  it("generates unformatted number", function() {
    var number = cpf.generate();

    expect(number).to.match(/^\d{3}\d{3}\d{3}\d{2}$/);
    expect(cpf.isValid(number)).to.be.ok;
  });
});
