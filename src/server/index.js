var express = require('express');
const request = require('request');
var bodyParser = require('body-parser');
const os = require('os');

var app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));





app.use(express.static('dist'));
app.get('/api/getUsername', 
(req, res) => res.send({ 
            username: os.userInfo().username 
        }
    ));

    app.get('/api/rooms', function(req, res) {
        var location = req.query.location;
        var checkin_date = req.query.checkin_date;
        var checkout_date = req.query.checkout_date;
        
        var url = "https://api.sandbox.amadeus.com/v1.2/hotels/search-airport?apikey=KFL3hYZyIAOiggufyTGD4FVYtLb0vE33&location="+location+"&check_in="+checkin_date+"&check_out="+checkout_date
    
        console.log("url: "+ url);
        request(url, { json: true }, (err, res2, body) => {
                if (err) { return console.log(err); }
                var currentCount = 3;
                var resultArray = [];
                if (body.results.length < 3)
                {
                    currentCount = body.results.length;
                }
    
                for ( var i=0;i<currentCount;i++ ) {
                    var currentLocation = { name : body.results[i].property_name,
                        address : body.results[i].address.line1 + ", " + body.results[i].address.city + ", " +body.results[i].address.region + ", " +body.results[i].address.country+ ", " +body.results[i].address.postal_code,
                        price : body.results[i].total_price.currency + " " + body.results[i].total_price.amount,
                    };
    
                    //getting phone number
                    for(var j= 0;j< body.results[i].contacts.length;j++) {
                        if ( body.results[i].contacts[j].type == 'PHONE' ) {
                            currentLocation.phone = body.results[i].contacts[j].detail;
                        }
                    }
    
                    resultArray.push(currentLocation);
                    
                }
                res.send( resultArray );
            });
        
    });


app.listen(8080, () => console.log('Listening on port 8080!'));
