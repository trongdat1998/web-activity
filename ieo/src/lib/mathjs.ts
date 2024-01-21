import core from "mathjs/core";

const math = core.create();

//math.import(require("mathjs/lib"));
math.import(require("mathjs/lib/function/arithmetic/add"));
math.import(require("mathjs/lib/function/arithmetic/subtract"));
math.import(require("mathjs/lib/function/arithmetic/multiply"));
math.import(require("mathjs/lib/function/arithmetic/divide"));
math.import(require("mathjs/lib/function/string/format"));
math.import(require("mathjs/lib/type/chain"));
math.import(require("mathjs/lib/type/bignumber"));
math.import(require("mathjs/lib/function/arithmetic/pow"));

math.config({ number: "BigNumber" });

export default math;
