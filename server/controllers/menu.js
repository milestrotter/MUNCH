var mongoose = require('mongoose');
var Menu = mongoose.model('Menu');
var Order = mongoose.model('Order');

module.exports = {
	index: function(req, res) {
		// Menu.remove({}, function(err, results) {});
		// Menu.create({
  //               name: "Chicken",
		// 		description: "A standard chicken",
		// 		price: "13"
  //           },
  //           {
  //               name: "Steak",
  //               description: "The best steak",
  //               price: "25"
  //           },
  //           {
  //               name: "Salad",
  //               description: "It's a salad... what do you expect?",
  //               price: "12"
  //           },
  //           {
  //               name: "Fish",
  //               description: "A subpar fish",
  //               price: "16"
  //           });  
        res.render('../../client/views/menu',{ title: 'MENU' });
    },
    getMenu: function(req, res){
        Menu.find({}, function(err, results) {
            console.log('here in the index json controller now!!');
            console.log('results: ', results)
            res.send(JSON.stringify(results));
        });
    },
    newOrder: function(req, res){
        console.log("*********************************");
        console.log(req.body);
        var a = new Order(req.body);
        a = new Order(request.body);
        a.save(function(err) {
            if (err) {
                response.send(JSON.stringify(err));
            } else {
                console.log('success: created new Order');
            }
        });
        // Order.insert({req.body}, function(err, results) {
        //     console.log('here in the index json controller now!!');
        //     console.log('results: ', results);
        //     res.send(JSON.stringify(results));
        // });
    },
}