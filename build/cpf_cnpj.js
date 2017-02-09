;(function(commonjs){

  var STRICT_STRIP_REGEX = /[.-]/g;
  var LOOSE_STRIP_REGEX = /[^\d]/g;
  
  var SPECIAL_BLACKLIST = [
    '12345678909'
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

  var isInt = function(number) {
    return Number(number) === number && number % 1 === 0;
  }

  var checkBlacklist = function(numbers) {

    var total_digits = Math.floor(Math.log10(numbers)) + 1;

    if(isFinite(total_digits) === false){ return true; }

    var common_numbers = "";

    for(var i = 0; i < total_digits; i++) {
        common_numbers += "1";
    }

    var check_is_integer = numbers / parseInt(common_numbers);

    if(isInt(check_is_integer)){
      return true;
    }

    return false;

  }

  var CPF = {};

  CPF.format = function(number) {
    return this.strip(number).replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
  };

  CPF.strip = function(number, strict) {
    var regex = strict ? STRICT_STRIP_REGEX : LOOSE_STRIP_REGEX;
    return (number || "").toString().replace(regex, "");
  };

  CPF.isValid = function(number, strict) {
    var stripped = this.strip(number, strict);

    // CPF must be defined
    if (!stripped) { return false; }

    // CPF must have 11 chars
    if (stripped.length !== 11) { return false; }

    // CPF can't be blacklisted
    if (checkBlacklist(stripped) || SPECIAL_BLACKLIST.indexOf(stripped) >= 0) {
      return false;
    }

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

;(function(commonjs){

  var STRICT_STRIP_REGEX = /[-\/.]/g;
  var LOOSE_STRIP_REGEX = /[^\d]/g;

  var verifierDigit = function(numbers) {
    var index = 2;
    var reverse = numbers.split("").reduce(function(buffer, number) {
      return [parseInt(number, 10)].concat(buffer);
    }, []);

    var sum = reverse.reduce(function(buffer, number) {
      buffer += number * index;
      index = (index === 9 ? 2 : index + 1);
      return buffer;
    }, 0);

    var mod = sum % 11;
    return (mod < 2 ? 0 : 11 - mod);
  };


  var isInt = function(number) {
    return Number(number) === number && number % 1 === 0;
  }

  var checkBlacklist = function(numbers) {

    var total_digits = Math.floor(Math.log10(numbers)) + 1;

    if(isFinite(total_digits) === false){ return true; }

    var common_numbers = "";

    for(var i = 0; i < total_digits; i++) {
        common_numbers += "1";
    }

    var check_is_integer = numbers / parseInt(common_numbers);

    if(isInt(check_is_integer)){
      return true;
    }

    return false;

  }

  var CNPJ = {};

  CNPJ.format = function(number) {
    return this.strip(number).replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");
  };

  CNPJ.strip = function(number, strict) {
    var regex = strict ? STRICT_STRIP_REGEX : LOOSE_STRIP_REGEX;
    return (number || "").toString().replace(regex, "");
  };

  CNPJ.isValid = function(number, strict) {
    var stripped = this.strip(number, strict);

    // CNPJ must be defined
    if (!stripped) { return false; }

    // CNPJ must have 14 chars
    if (stripped.length !== 14) { return false; }

    // CNPJ can't be blacklisted
    if (checkBlacklist(stripped)) { return false; }

    var numbers = stripped.substr(0, 12);
    numbers += verifierDigit(numbers);
    numbers += verifierDigit(numbers);

    return numbers.substr(-2) === stripped.substr(-2);
  };

  CNPJ.generate = function(formatted) {
    var numbers = "";

    for (var i = 0; i < 12; i++) {
      numbers += Math.floor(Math.random() * 9);
    }

    numbers += verifierDigit(numbers);
    numbers += verifierDigit(numbers);

    return (formatted ? this.format(numbers) : numbers);
  };

  if (commonjs) {
    module.exports = CNPJ;
  } else {
    window.CNPJ = CNPJ;
  }
})(typeof(exports) !== "undefined");
