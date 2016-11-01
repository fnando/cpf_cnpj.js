var cnpj = require("../lib/cnpj");
var expect = require("chai").expect;

describe("CNPJ", function() {
  it("blacklists common numbers", function() {
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

  it("rejects falsy values", function() {
    expect(cnpj.isValid("")).not.to.be.ok;
    expect(cnpj.isValid(null)).not.to.be.ok;
    expect(cnpj.isValid(undefined)).not.to.be.ok;
  });

  it("validates formatted strings", function() {
    expect(cnpj.isValid("54.550.752/0001-55")).to.be.ok;
  });

  it("validates unformatted strings", function() {
    expect(cnpj.isValid("54550752000155")).to.be.ok;
  });

  it("validates messed strings", function() {
    expect(cnpj.isValid("54550[752#0001..$55")).to.be.ok;
  });

  it("returns stripped number", function() {
    var number = cnpj.strip("54550[752#0001..$55");
    expect(number).to.eql("54550752000155");
  });

  it("returns formatted number", function() {
    var number = cnpj.format("54550752000155");
    expect(number).to.eql("54.550.752/0001-55");
  });

  it("generates formatted number", function() {
    var number = cnpj.generate(true);

    expect(number).to.match(/^(\d{2}).(\d{3}).(\d{3})\/(\d{4})-(\d{2})$/);
    expect(cnpj.isValid(number)).to.be.ok;
  });

  it("generates unformatted number", function() {
    var number = cnpj.generate();

    expect(number).to.match(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/);
    expect(cnpj.isValid(number)).to.be.ok;
  });

  it("should be possible to pass CNPJ.strip as parameter to other function", function (done) {
    var executeStrip = function (strip) {
      var number = strip("54550[752#0001..$55");
      expect(number).to.eql("54550752000155");
      done();
    };

    executeStrip(cnpj.strip);
  });

  it("should be possible to pass CNPJ.format as parameter to other function", function (done) {
    var executeFormat = function (format) {
      var number = format("54550752000155");
      expect(number).to.eql("54.550.752/0001-55");
      done();
    };

    executeFormat(cnpj.format);
  });

  it("should be possible to pass CPF.isValid as parameter to other function", function (done) {
    var executeIsValid = function (isValid) {
      expect(isValid("54.550.752/0001-55")).to.be.ok;
      done();
    };

    executeIsValid(cnpj.isValid);
  });

  it("should be possible to pass CPF.generate as parameter to other function", function (done) {
    var executeGenerate = function (generate) {
      var number = generate(true);

      expect(number).to.match(/^(\d{2}).(\d{3}).(\d{3})\/(\d{4})-(\d{2})$/);
      expect(cnpj.isValid(number)).to.be.ok;
      done();
    };

    executeGenerate(cnpj.generate);
  });
});
