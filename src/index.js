const inputsObject = require('./inputs.json')

const optionsSchema = require('./validator')

function passInputsToFunction(functionToTest, input){
    try{
        return functionToTest(...input)
    }catch(err){
        return {error_name: err.name, error_message: err.message}
    }
}

async function passInputsToAsyncFunction (functionToTest, input) {
    try{
        return await functionToTest(...input)
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

    const validation = optionsSchema.validate(options)
    if(validation.error) {
        throw new Error(validation.error)
    }

    const funcToTest = options.functionToTest
    const inputCount = options.numOfInputs

    if(inputCount < funcToTest.length) throw new Error("Number of inputs cannot be less than number of formal function parameters")

    let responseArray = []

    if(options.customInputs) {
        const customInputs = options.customInputs;
        for(eachInput in customInputs) {
            if(!Array.isArray(customInputs[eachInput])) throw new Error("Custom inputs must be an array of arrays.")
            if(customInputs[eachInput].length < funcToTest.length) throw new Error("The length of each set of inputs cannot be less than number of formal function parameters.")
            const testResults = options.returnsPromise ? passInputsToAsyncFunction(funcToTest, customInputs[eachInput]) : passInputsToFunction(funcToTest, customInputs[eachInput])
            const responseObject = generateResponseObject(testResults, 'Custom input', customInputs[eachInput])
            responseArray.push(responseObject)
        }
    }

    for(const inputTypes in inputsObject) {
        for (let j in inputsObject[inputTypes]) {
            let inputArray = []
            for(let i = 0; i < inputCount; i++) {
                inputArray.push(inputsObject[inputTypes][j])
            }
            const testResults = options.returnsPromise ? passInputsToAsyncFunction(funcToTest, inputArray) : passInputsToFunction(funcToTest, inputArray)
            const responseObject = generateResponseObject(testResults, inputTypes, inputArray)
            responseArray.push(responseObject)
        }
    }
    
    return responseArray
}

module.exports = runDestructiveTests;