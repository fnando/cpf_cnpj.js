;(function(commonjs){
  // Blacklist common values.
  var BLACKLIST = [
      "00000000000"
    , "11111111111"
    , "22222222222"
    , "33333333333"
    , "44444444444"
    , "55555555555"
    , "66666666666"
    , "77777777777"
    , "88888888888"
    , "99999999999"
    , "12345678909"
  ];

  var verifierDigit = function(numbers) {
    numbers = numbers
      .split("")
      .map(function(number){ return parseInt(number, 10); })
    ;

    var modulus = numbers.length + 1;

    var multiplied = numbers.map(function(number, index) {
      return number * (modulus - index);
    });

    var mod = multiplied.reduce(function(buffer, number){
      return buffer + number;
    }) % 11;

    return (mod < 2 ? 0 : 11 - mod);
  };

  var CPF = {};

  CPF.format = function(number) {
    return this.strip(number).replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
  };

  CPF.strip = function(number) {
    return (number || "").toString().replace(/[^\d]/g, "");
  };

  CPF.isValid = function(number) {
    var stripped = this.strip(number);

    // CPF must be defined
    if (!stripped) { return false; }

    // CPF must have 11 chars
    if (stripped.length !== 11) { return false; }

    // CPF can't be blacklisted
    if (BLACKLIST.indexOf(stripped) >= 0) { return false; }

    var numbers = stripped.substr(0, 9);
    numbers += verifierDigit(numbers);
    numbers += verifierDigit(numbers);

    return numbers.substr(-2) === stripped.substr(-2);
  };

  CPF.generate = function(formatted) {
    var numbers = "";

    for (var i = 0; i < 9; i++) {
      numbers += Math.floor(Math.random() * 9);
    }

    numbers += verifierDigit(numbers);
    numbers += verifierDigit(numbers);

    return (formatted ? this.format(numbers) : numbers);
  };

  if (commonjs) {
    module.exports = CPF;
  } else {
    window.CPF = CPF;
  }
})(typeof(exports) !== "undefined");
