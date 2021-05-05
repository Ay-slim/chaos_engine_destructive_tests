// Validate that input is a function
// Validate that number of inputs is an integer and specify a maximum value
// Add is_promise flag and use it to add await as needed when dealing with a function that returns a promise
// Make functionToTest and inputCount required fields
// Validate that custom input matches arity

const inputsObject = require('./inputs.json')

const testFunc = (first, second, third, fourth = false) => {
    return first.split('')
}

function passInputsToFunction(functionToTest, input){
    try{
        return functionToTest(...input)
    }catch(err){
        return {error_name: err.name, error_message: err.message}
    }
}

async function passInputsToAsyncFunction(functionToTest, input){
    try{
        const asyncResult = await functionToTest(...input)
        return asyncResult
    }catch(err){
        return {error_name: err.name, error_message: err.message}
    }
}

function generateResponseObject(testResults, inputTypes, inputArray) {
    if(typeof testResults === 'object' && testResults.error_name && testResults.error_message) {
        testResults['error'] = true;
        testResults['input_type'] = inputTypes
        testResults['input_value'] = `(${inputArray})`
        return testResults
    }else {
        return { 
            error: false,
            input_type: inputTypes,
            input_value: `(${inputArray})`,
            function_output: testResults
        }
    }
}
function runDestructiveTests(options){
    const funcToTest = options.functionToTest
    const inputCount = options.numOfInputs

    if(inputCount < funcToTest.length) throw new Error("Number of inputs cannot be less than number of formal function parameters")

    let responseArray = []

    if(options.customInputs) {
        const customInputs = options.customInputs;
        for(eachInput in customInputs) {
            if(!Array.isArray(customInputs[eachInput])) throw new Error("Custom inputs must be an array of arrays.")
            if(customInputs[eachInput].length < funcToTest.length) throw new Error("The length of each set of inputs cannot be less than number of formal function parameters.")
            const testResults = options.isPromise ? passInputsToAsyncFunction(funcToTest, customInputs[eachInput]) : passInputsToFunction(funcToTest, customInputs[eachInput])
            const responseObject = generateResponseObject(testResults, 'Custom input', customInputs[eachInput])
            responseArray.push(responseObject)
        }
    }

    for(const inputTypes in inputsObject) {
        //console.log(inputTypes)
        for (let j in inputsObject[inputTypes]) {
            //console.log(inputsObject[inputTypes][j])
            let inputArray = []
            for(let i = 0; i < inputCount; i++) {
                inputArray.push(inputsObject[inputTypes][j])
            }
            //console.log(inputArray)
            const testResults = options.isPromise ? passInputsToAsyncFunction(funcToTest, inputArray) : passInputsToFunction(funcToTest, inputArray)
            //const testResults = passInputsToFunction(funcToTest, inputArray)
            const responseObject = generateResponseObject(testResults, inputTypes, inputArray)
            responseArray.push(responseObject)
        }
    }
    //console.log(responseArray)
}

// console.log(passInputsToFunction(testFunc, [5]))
console.log(runDestructiveTests({functionToTest: testFunc, numOfInputs: 3, customInputs: [['a', 'b', 2], ['five', 'three', null], 2]}))