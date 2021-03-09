#!/usr/bin/nodejs


// -------------- load packages -------------- //
var express = require('express')
var app = express();

var hbs = require('hbs');


// -------------- express initialization -------------- //

// tell express that the view engine is hbs
app.set('view engine', 'hbs');

// serve files from the static directory (https://expressjs.com/en/starter/static-files.html)
// the following line is a directive to serve all files in all subfolders 
app.use(express.static(__dirname + '/static'))

// -------------- creation of variables -------------- //
var numberFacts = [
    ['Zero is zero', ' 0 = 0', ' 0 * 0 = 0'],
    ['One is the first whole number', ' 1+1-1=1', ' 1*1=1'],
    ['Two is the number of hands I have', ' sqrt(2+2) = 2', ' 2+2-2=2'],
    ['There are five letters in three', ' the square of 3 is 9', ' 3 is a cool number'],
    ['Four is a perfect square', ' four is the number of wheels most consumer grade cars have', ' bruh has four letters in it'],
    ['Five is my favorite number', ' 25 is the square of 5', ' 5-5=0'],
    ['Six has three numbers', ' 2*3=6', ' 6^2=36'],
    ['Seven is a prime number', ' 10-3=7', ' seven has five letters in it'],
    ['I have eight fingers excluding thumbs', ' 8^2=64', ' 8+8-8=8'],
    ['Nine is a perfect square', ' 3+2+1+3=9', ' 100-91=9'],
    ['Ten is the number of fingers I have', ' 2*5=10', ' ten has 3 letters in it']
]


// -------------- express 'get' handlers -------------- //

app.get('/', function(req, res){

    // render the template
    console.log("default page accessed");
    res.render('index');

});

app.get('/labs', function(req, res){

    // render the template
    res.render('labs');

});

app.get('/:page_as_var', function(req, res){
    var number = Number(req.params.page_as_var);
    //console.log(number)

    if (isNaN(number)){
        //Load the Page here
        //console.log(number+" was not considered a number")
        res.render('undefined')
    }
    else if(number>10 || number<0){
        res.send('INVALID INPUT: Your number was either lower than 0 or greater than 10! Cringe!')
    }
    else if(!isNaN(req.query.num_facts)){  // number facts is numerisized!
        if(req.query.num_facts>0 && req.query.num_facts<=3){
            var dict_facts = {
                chosenNumber : number,
                factsList : numberFacts[number].slice(0,req.query.num_facts),
                numberOfFacts : req.query.num_facts
            }
            if(req.query.format == "json"){  // json format is requested
                res.send(dict_facts)
            }
            else{res.render('numbers', dict_facts)}
        }
        else{res.send('INVALID INPUT: You requested an invalid number of facts! Request a number more than 0 and at most 3! Cringe!')}
    }
    else{
        var dict_facts = {
            chosenNumber : number,
            factsList : numberFacts[number],
            numberOfFacts : 3
        }
        //console.log(numberFacts)
        //console.log(dict_facts)
        //console.log(number+" was considered a number")
        if (req.query.format == "json"){  // json format is requested
            res.send(dict_facts)
        }
        else{res.render('numbers',dict_facts)}
        
    }
})



/*
function choosePage(req, res){

    // render the template
    if (req.query.type  == "dog"){
        console.log("dog page accessed from pet");
        return res.render('dogImage' );
    }
    else if (req.query.type == "cat"){
        console.log("cat page accessed from pet");
        return res.render('catImage' );
    }
    else{
        console.log("undefined page accessed from pet");
        return res.render('undefined');
    }
    //TODO: query empty

}*/

// -------------- listener -------------- //
// // The listener is what keeps node 'alive.' 

var listener = app.listen(process.env.PORT || 80, process.env.HOST || "0.0.0.0", function() {
    console.log("Express server started");
});
