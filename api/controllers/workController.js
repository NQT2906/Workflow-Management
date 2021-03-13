var Works = require('../models/workModel');

function getWorks(res) {
    Works.find(function(err, data) {
        if (err) res.status(500).json(err);
        else res.json(data);
    });
};

module.exports = function(app) {
    app.get('/api/works', function(req, res) {
        getWorks(res);
    });

    // app.get('/api/todo/:id', function(req, res) {
    //     Works.findById({__id: req.params.id, function(err, data) {
    //         if (err) return res.status(500).json(err);
    //         else res.json(data);
    //     }});
    // });

    app.post('/api/work', function(req, res) {
        var work = {
            intro: req.body.intro,
            link: req.body.link,
            status: req.body.status,
            content: req.body.content,
            deadline: req.body.deadline,
            timeRegister: req.body.timeRegister,
        };

        Works.create(work, function(err, data) {
            if (err) return res.status(500).json(err);
            else getWorks(res);
        });
    });

    app.put('/api/work', function(req, res) {
        if (!req.body._id) {
            res.status(500).send('ID is required!!!');
        }
        Works.update({_id: req.body._id}, {
            intro: req.body.intro,
            status: req.body.status,
            content: req.body.content,
            link: req.body.link,
            // deadline: req.body.deadline,
        }, function(err, data) {
            if (err) return res.status(500).json(err);
            else getWorks(res);
        });
    });

    app.delete('/api/work/:id', function(req, res) {
        Works.remove({_id: req.params.id}, function(err, data) {
            if (err) return res.status(500).json(err);
            else getWorks(res);
        });
    });
}