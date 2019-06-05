// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// ================================================================================
const axios = require('axios'); // convenient library to run http requests
const express = require("express"); 
const app = express();
// Port is defined below to accept either the hosting environment's server or local host 8080
const PORT = process.env.PORT || 8080;


function preamble() {
	let data = '';
	//call the initial endpoint to get relevant data, instrunctions 
	axios.get('https://interview.adpeai.com/api/v1/get-task')

            .then(function(response) {
            	//we take the data from the endpoint and feed it into the calc function
            	data = calc(response.data);
            	console.log("--here is our calculator's result!")
            	console.log(" "+ data.left + " " + data.operation + " " + data.right + " = " + " " + data.result);

                //take the result of our calculator and hit the submit task endpoint
            	axios.post('https://interview.adpeai.com/api/v1/submit-task', {
            		id:data.id,
            		result:data.result
            	})
                     //the submit task endpoint will return a 200, 400, or 500; 
                     // Success, bad id or result, or id not found, respectively           	
            	    .then(function (response) {
            	    	console.log("Here is your grade")
            	    	console.log(response.status);
            	    	console.log(response.data);
            	    })
            	    .catch(function(error){
            	    	console.log(error);
            	    })

            	    
             })
            .catch(function(error) {
            	console.log(error)
            })
};

function calc(data) {
//the following is an object to be built out and sent back to preamble()
    let solution = {
    	id: data.id,
    	left:data.left,
    	right:data.right,
    	operation:'',
    	result: ''
    }
//based on the operation, perform the calculation
    switch(data.operation) {
   	    case "addition":
   	        solution.operation = '+'
            solution.result = data.left + data.right;
            break;   
        case "subtraction":
            solution.operation = '-'
            solution.result = data.left - data.right;
            break;  
        case "division":
            solution.operation = '/'
            solution.result = data.left / data.right;
            break;    
        case "multiplication":
            solution.operation = '*'
            solution.result = data.left * data.right;
            break;        
        case "remainder":
            solution.operation = '%'
            solution.result = data.left % data.right;
            break;     
    }
    return solution;
};


app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
  preamble();
});


//https://interview.adpeai.com/api/v1/get-task
//https://interview.adpeai.com/api/v1/submit-task