# CPF/CNPJ

This package does some [CPF](http://en.wikipedia.org/wiki/Cadastro_de_Pessoas_F%C3%ADsicas)/[CNPJ](http://en.wikipedia.org/wiki/CNPJ) magic. It allows you to create, validate and format CPF/CNPJ.

## Installation

Using bower:

    $ bower install cpf_cnpj --save

Using NPM:

    $ npm install cpf_cnpj --save

## Usage

    // Node.js-specific
    var CPF = require("cpf_cnpj").CPF;
    var CNPJ = require("cpf_cnpj").CNPJ;

    CPF.isValid("532.820.857-96");
    //=> true

    CPF.strip("532.820.857-96");
    //=> 53282085796

    CPF.format("53282085796");
    //=> 532.820.857-96

    CPF.generate(true); // generate formatted number
    //=> 838.684.734-40

    CPF.generate(); // generate unformatted number
    //=> 72777632898

    //==========================================================

    CNPJ.isValid("41.381.074/6738-65");
    //=> true

    CNPJ.strip("41.381.074/6738-65");
    //=> 41381074673865

    CNPJ.format("41381074673865");
    //=> 41.381.074/6738-65

    CNPJ.generate(true); // generate formatted number
    //=> 54.385.406/3140-07

    CNPJ.generate(); // generate unformatted number
    //=> 07033324230766

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am "Added some feature"`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request
