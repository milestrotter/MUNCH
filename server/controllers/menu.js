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
            // console.log('here in the index json controller now!!');
            console.log('results: ', results)
            res.send(JSON.stringify(results));
        });
    },
    mgr: function(req, res){
      res.render('../../client/views/mgr_menu',{ title: 'MANAGER MENU' });
    },
    newItem: function(req, res){
        console.log("*********************************");
        console.log(req.body);
        a = new Menu(req.body);
        a.save(function(err) {
            if (err) {
                res.send(JSON.stringify(err));
            } else {
                console.log('success: created new item');
            }
        });
    },
    removeItem: function(req, res){
        console.log("*********************************");
        console.log(req.body[0]);
        Menu.remove({_id: req.body[0]._id}, function(err, results){
            if (err) {
                res.send(JSON.stringify(err));
            } else {
                console.log('success: removed item!');
            }
        });
    },

    updateMenu: function(req, res){
        console.log("*********************************");
        console.log(req.body._id);
        Menu.update((req.body._id, { $set: req.body }), function(err, results){
            if (err) {
                res.send(JSON.stringify(err));
            } else {
                console.log('success: updated item!');
            }
        });
    },
    
    newOrder: function(req, res){
        console.log("*********************************");
        console.log(req.body);
        a = new Order(req.body);
        a.save(function(err) {
            if (err) {
                res.send(JSON.stringify(err));
            } else {
                console.log('success: created new Order');
            }
        });
// {_id: req.body._id}
    },
}