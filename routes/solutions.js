const express = require('express');
const router = express.Router();

//Solution Model
let Solution = require('../models/solution');

//User Model
let User = require('../models/user');


//Solution Add Route
router.get("/add", ensureAuthenticated, function(req, res){
    res.render("solution_add", {
        title: "Add Solution"
    });
});

//Project Add Route
router.get("/project/add", function(req, res){
    res.render("projectadd", {
        title: "Add your Project here."
    });
});

//Solution Add Submit POST Route
router.post('/add',function(req, res){
    req.checkBody('title', 'Title is required').notEmpty();
    req.checkBody('skill', 'Skill is required').notEmpty();
    req.checkBody('body', 'Body is required').notEmpty();

    //Get Errors
    let errors = req.validationErrors();

    if(errors){
        res.render('solution_add', {
            title: "Add Solution",
            errors:errors
        });

    } else {
        let solution = new Solution();
        solution.title = req.body.title;
        solution.client = req.user._id;
        solution.skill = req.body.skill;
        solution.body = req.body.body;
    
        solution.save(function(err){
            if(err){
                console.log(err);
                return;
            } else{
                req.flash('success', 'Solution Added');
                res.redirect('/');
            }
        });
        console.log(req.body.title);
        return;

    }


});

// Load Edit Form
router.get('/edit/:id', ensureAuthenticated, function(req,res){
    Solution.findById(req.params.id, function(err, solution){
        if(solution.client != req.user._id){
            req.flash('danger', 'Not Authorized');
            res.redirect('/');
        }
        res.render("solution_edit", {
            title:'Edit Solution',
            solution:solution
         });
    });
});

//Update Solution Edit Submit POST Route
router.post('/edit/:id',function(req, res){
    let solution = {};
    solution.title = req.body.title;
    solution.skill = req.body.skill;
    solution.body = req.body.body;


    let query = {_id:req.params.id}

    Solution.update(query, solution, function(err){
        if(err){
            console.log(err);
            return;
        } else{
            req.flash('success', 'Solution Updated');
            res.redirect('/');
        }
    });
    console.log(req.body.title);
    return;
});

router.delete('/:id', function(req, res){
    let query = {_id:req.params.id}
    Solution.remove(query, function(err){
        if(err){
            console.log(err);
        }
        res.send('Success');
    });

});

// Get Single Solution
router.get('/:id', function(req,res){
    Solution.findById(req.params.id, function(err, solution){
      User.findById(solution.client, function(err, user){
            res.render('solution', {
                solution:solution,
                client:user.name
          });    

        });
        
    });
});

//Access Control
function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        req.flash('danger', 'Please login');
        res.redirect('/users/login');
    }
}

module.exports = router;