# chaos_engine_destructive_tests

Chaos engine runs destructive tests on user defined functions by passing edge case inputs and returning an array of objects with each input detailing the function output(s) and error(s) thrown if any.

# Installation
`npm install chaos_engine_destructive_tests`

# Usage

## Input: Java script object

```
{
    functionToTest (required, type: function): This is the function you wish to test,

    numOfInputs (required, type: Number): The number of inputs you want to pass to the function (cannot be less than the function's arity),

    customInputs (optional, type: Array of array(s)): Any other inputs you would like to experiment with apart from the native destructive inputs passed by the package,

    returnsPromise (optional, type: Boolean): This flag should be set to true if your specified function returns a promise
}
```

## Output: Array of objects
chaos_engine returns an array of objects with each object corresponding to each set of inputs with properties describing the input type, input value, value returned, error name and error message. A boolean error property shows whether or not the set of inputs threw an error e.g. The sample output below shows a set of inputs that triggered an error as well as another set that returned an output.

```
[
    {
        error_name: 'TypeError',
        error_message: 'first.split is not a function',
        error: true,
        input_type: 'Number',
        input_value: '(-1,-1,-1)'
    },
    {
        error: false,
        input_type: 'String',
        input_value: '(@*#$%!-+(),@*#$%!-+(),@*#$%!-+())',
        function_output: [
        '@', '*', '#', '$',
        '%', '!', '-', '+',
        '(', ')'
        ]
    }
]
```

## Examples

### 1. Pass function and Number of inputs
```
const chaos = require('chaos-engine-destructive-tests')

function trialFunction(firstInput, secondInput) {
    firstInput.length * secondInput.length
}

console.log(chaos({functionToTest: trialFunction, numOfInputs: 2}))

output: [
  {
    error: false,
    input_type: 'Number',
    input_value: '(0,0)',
    function_output: undefined
  },
  {
    error: false,
    input_type: 'Number',
    input_value: '(100000000000000000000,100000000000000000000)',  
    function_output: undefined
  },
  {
    error: false,
    input_type: 'Number',
    input_value: '(-100000000000000000000,-100000000000000000000)',
    function_output: undefined
  },
  {
    error: false,
    input_type: 'Number',
    input_value: '(0,0)',
    function_output: undefined
  },
  {
    error: false,
    input_type: 'Number',
    input_value: '(0,0)',
    function_output: undefined
  },
  {
    error: false,
    input_type: 'Number',
    input_value: '(5,5)',
    function_output: undefined
  },
  {
    error: false,
    input_type: 'Number',
    input_value: '(-5,-5)',
    function_output: undefined
  },
  {
    error: false,
    input_type: 'Number',
    input_value: '(1,1)',
    function_output: undefined
  },
  {
    error: false,
    input_type: 'Number',
    input_value: '(-1,-1)',
    function_output: undefined
  },
  {
    error: false,
    input_type: 'String',
    input_value: '(@*#$%!-+(),@*#$%!-+())',
    function_output: undefined
  },
  {
    error: false,
    input_type: 'String',
    input_value: '(dimensions,dimensions)',
    function_output: undefined
  },
  {
    error: false,
    input_type: 'String',
    input_value: '(mdkwieew,mdkwieew)',
    function_output: undefined
  },
  {
    error: false,
    input_type: 'String',
    input_value: '(2933874,2933874)',
    function_output: undefined
  },
  {
    error: false,
    input_type: 'String',
    input_value: '(dkms3223@#dkdm,dkms3223@#dkdm)',
    function_output: undefined
  },
  {
    error: false,
    input_type: 'Array',
    input_value: '(,)',
    function_output: undefined
  },
  {
    error: false,
    input_type: 'Array',
    input_value: '(dude,guy,13832,dk82dk,dude,guy,13832,dk82dk)',
    function_output: undefined
  },
  {
    error: false,
    input_type: 'Array',
    input_value: '(some,random,objects,some,random,objects)',
    function_output: undefined
  },
  {
    error: false,
    input_type: 'Array',
    input_value: '(828,392,18332037,235,828,392,18332037,235)',
    function_output: undefined
  },
  {
    error: false,
    input_type: 'Objects',
    input_value: '([object Object],[object Object])',
    function_output: undefined
  },
  {
    error: false,
    input_type: 'Objects',
    input_value: '([object Object],[object Object])',
    function_output: undefined
  }
] 
```
### 2. Specify additional inputs
Say you would like to pass two sets of custom defined inputs: ('dkdm292993', Infinity), (5, 12) to the function, you should pass them as an array of arrays to the customInputs property as shown below

```
const chaos = require('chaos-engine-destructive-tests')

function trialFunction(firstInput, secondInput) {
    firstInput.length * secondInput.length
}

console.log(chaos({functionToTest: trialFunction, numOfInputs: 2}, customInputs: [['dkdm292993', Infinity], [5, 12]]))

output: [
  {
    error: false,
    input_type: 'Custom input',
    input_value: '(dkdm292993,Infinity)',
    function_output: undefined
  },
  {
    error: false,
    input_type: 'Custom input',
    input_value: '(5,12)',
    function_output: undefined
  },
  {
    error: false,
    input_type: 'Number',
    input_value: '(0,0)',
    function_output: undefined
  },
  {
    error: false,
    input_type: 'Number',
    input_value: '(100000000000000000000,100000000000000000000)',
    function_output: undefined
  },
  {
    error: false,
    input_type: 'Number',
    input_value: '(-100000000000000000000,-100000000000000000000)',
    function_output: undefined
  },
  {
    error: false,
    input_type: 'Number',
    input_value: '(0,0)',
    function_output: undefined
  },
  {
    error: false,
    input_type: 'Number',
    input_value: '(0,0)',
    function_output: undefined
  },
  {
    error: false,
    input_type: 'Number',
    input_value: '(5,5)',
    function_output: undefined
  },
  {
    error: false,
    input_type: 'Number',
    input_value: '(-5,-5)',
    function_output: undefined
  },
  {
    error: false,
    input_type: 'Number',
    input_value: '(1,1)',
    function_output: undefined
  },
  {
    error: false,
    input_type: 'Number',
    input_value: '(-1,-1)',
    function_output: undefined
  },
  {
    error: false,
    input_type: 'String',
    input_value: '(@*#$%!-+(),@*#$%!-+())',
    function_output: undefined
  },
  {
    error: false,
    input_type: 'String',
    input_value: '(dimensions,dimensions)',
    function_output: undefined
  },
  {
    error: false,
    input_type: 'String',
    input_value: '(mdkwieew,mdkwieew)',
    function_output: undefined
  },
  {
    error: false,
    input_type: 'String',
    input_value: '(2933874,2933874)',
    function_output: undefined
  },
  {
    error: false,
    input_type: 'String',
    input_value: '(dkms3223@#dkdm,dkms3223@#dkdm)',
    function_output: undefined
  },
  {
    error: false,
    input_type: 'Array',
    input_value: '(,)',
    function_output: undefined
  },
  {
    error: false,
    input_type: 'Array',
    input_value: '(dude,guy,13832,dk82dk,dude,guy,13832,dk82dk)',
    function_output: undefined
  },
  {
    error: false,
    input_type: 'Array',
    input_value: '(some,random,objects,some,random,objects)',
    function_output: undefined
  },
  {
    error: false,
    input_type: 'Array',
    input_value: '(828,392,18332037,235,828,392,18332037,235)',
    function_output: undefined
  },
  {
    error: false,
    input_type: 'Objects',
    input_value: '([object Object],[object Object])',       
    function_output: undefined
  },
  {
    error: false,
    input_type: 'Objects',
    input_value: '([object Object],[object Object])',       
    function_output: undefined
  }
]

```

### 3. Promises and Asynchronous functions
When passing functions that return promises, always remember to set the returnsPromise property to _true_

```
const chaos = require('chaos_engine_destructive_tests')

function someAsynFunction(firstInput, secondInput) {
   return new Promise((resolve, reject){
      if (firstInput) {
         resolve(secondInput);     
      } else {
         reject(0)
      }
   });
}

console.log(chaos({functionToTest: someAsyncFunction, numOfInputs: 2, returnsPromise: true}))

output: [
  {
    error: false,
    input_type: 'Number',
    input_value: '(0,0)',
    function_output: Promise { <rejected> 0 }
  },
  {
    error: false,
    input_type: 'Number',
    input_value: '(100000000000000000000,100000000000000000000)',
    function_output: Promise { 100000000000000000000 }
  },
  {
    error: false,
    input_type: 'Number',
    input_value: '(-100000000000000000000,-100000000000000000000)',
    function_output: Promise { -100000000000000000000 }
  },
  {
    error: false,
    input_type: 'Number',
    input_value: '(0,0)',
    function_output: Promise { <rejected> 0 }
  },
  {
    error: false,
    input_type: 'Number',
    input_value: '(0,0)',
    function_output: Promise { <rejected> 0 }
  },
  {
    error: false,
    input_type: 'Number',
    input_value: '(5,5)',
    function_output: Promise { 5 }
  },
  {
    error: false,
    input_type: 'Number',
    input_value: '(-5,-5)',
    function_output: Promise { -5 }
  },
  {
    error: false,
    input_type: 'Number',
    input_value: '(1,1)',
    function_output: Promise { 1 }
  },
  {
    error: false,
    input_type: 'Number',
    input_value: '(-1,-1)',
    function_output: Promise { -1 }
  },
  {
    error: false,
    input_type: 'String',
    input_value: '(@*#$%!-+(),@*#$%!-+())',
    function_output: Promise { '@*#$%!-+()' }
  },
  {
    error: false,
    input_type: 'String',
    input_value: '(dimensions,dimensions)',
    function_output: Promise { 'dimensions' }
  },
  {
    error: false,
    input_type: 'String',
    input_value: '(mdkwieew,mdkwieew)',
    function_output: Promise { 'mdkwieew' }
  },
  {
    error: false,
    input_type: 'String',
    input_value: '(2933874,2933874)',
    function_output: Promise { '2933874' }
  },
  {
    error: false,
    input_type: 'String',
    input_value: '(dkms3223@#dkdm,dkms3223@#dkdm)',
    function_output: Promise { 'dkms3223@#dkdm' }
  },
  {
    error: false,
    input_type: 'Array',
    input_value: '(,)',
    function_output: Promise { [] }
  },
  {
    error: false,
    input_type: 'Array',
    input_value: '(dude,guy,13832,dk82dk,dude,guy,13832,dk82dk)',
    function_output: Promise { [Array] }
  },
  {
    error: false,
    input_type: 'Array',
    input_value: '(some,random,objects,some,random,objects)',
    function_output: Promise { [Array] }
  },
  {
    error: false,
    input_type: 'Array',
    input_value: '(828,392,18332037,235,828,392,18332037,235)',
    function_output: Promise { [Array] }
  },
  {
    error: false,
    input_type: 'Objects',
    input_value: '([object Object],[object Object])',
    function_output: Promise { {} }
  },
  {
    error: false,
    input_type: 'Objects',
    input_value: '([object Object],[object Object])',
    function_output: Promise { [Object] }
  }
]

```

## Errors
Most errors are probably due to passing inputs wrongly. Here are a couple of things that could be wrong if you get an error after calling chaos_engine_destructive_tests:

1. Passing a numOfInputs value that is less than the function's number of formal arguments e.g.

```
const chaos = require('chaos_engine_destructive_tests')

function trialFunction(firstInput, secondInput) {
    firstInput.length * secondInput.length
}

console.log(chaos({functionToTest: trialFunction, numOfInputs: 1}))

output: Error: Number of inputs cannot be less than number of formal function parameters
```

2. Validation errors: Passing the wrong variable types will result in an error (refer to the usage section for the appropriate types for each input property) e.g.

```
const chaos = require('chaos_engine_destructive_tests')

function trialFunction(firstInput, secondInput) {
    firstInput.length * secondInput.length
}

console.log(chaos({functionToTest: trialFunction, numOfInputs: 'w'}))

output: ValidationError: number of inputs should be a number
```

In the example below, the second custom input argument is passed as a Number instead of an array
```
const chaos = require('chaos_engine_destructive_tests')

function trialFunction(firstInput, secondInput) {
    firstInput.length * secondInput.length
}

console.log(chaos({functionToTest: trialFunction, numOfInputs: 2, customInputs: [[3,4], 5]}))

output: Error: Custom inputs must be an array of arrays.
```