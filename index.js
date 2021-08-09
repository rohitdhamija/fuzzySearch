var express = require("express");
const Fuse = require('fuse.js')
var lstAirportNames = require("./airportlst");



var app = express();

const options = {
    includeScore: true,
    threshold: 0.3
  
  }

const fuse = new Fuse(lstAirportNames.airportList, options);

const port=process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Server running on port 3000");
 });

app.get("/findItems", (req, res, next) => {
    const resolvedEntity = req.query.resolvedEntity;

    console.log(resolvedEntity);

    var entityToSearch = resolvedEntity.replace('airport','');

    console.log(entityToSearch);

    const result = fuse.search(entityToSearch);
    var airportObj = []
    console.log("we found: "+result.length+ " related entities.");
    for(var i=0; i<result.length; i++)
    {
       console.log(result[i].item);
       airportObj.push(result[i].item);
    }
    console.log(result);
    res.json(airportObj);
   });