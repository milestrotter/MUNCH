var mongoose = require('mongoose');
var Menu = mongoose.model('Menu');
var Order = mongoose.model('Order');

module.exports = {
	  index: function(req, res) { 
        // console.log("This is the req: ", req);
        res.render('../../client/views/menu',{ title: 'MENU' });
    },
    getMenu: function(req, res){
        Menu.find({}, function(err, results) {
            // console.log('here in the index json controller now!!');
            // console.log('results: ', results)
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
        query = req.body._id;
        Menu.update({ _id: query }, { $set: req.body }, function(err, db_data){
            if (err) {
                res.send(JSON.stringify(err));
            } else {
                console.log('success: updated item: ', db_data);
                res.send(db_data)
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
    },
}