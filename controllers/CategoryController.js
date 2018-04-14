const Sequelize = require('sequelize');
const winston = require('winston');

module.exports = function(app) {
    let Category = app.models.schema.category;

    let CategoryController = {
        index: function(req, res) {
            Category.findAll({})
            .then(function(categories) {
                winston.log('Success at getting all the tweets in the DB');
                res.status(200).json(categories);
            })
            .catch(err => {
                winston.error(err);
                res.json(err);
            });
        },

        create: function(req, res) {
            Category.create({
                name: req.body.name || null
            })
            .then(newCategory => {
                winston.log('Created a new category');
                res.status(200).json(newCategory);
            })
            .catch(err => {
                winston.error(err);
                res.json(err);
            });
        },

        view: function(req, res) {
            let categoryId = req.params.categoryId;
            Category.findById(req.params.categoryId,{})
                .then(category => {
                    if (!category) {
                        return res.status(404).json({
                            message: 'Category Not Found'
                        });
                    }

                    res.status(200).json(category);
                })
                .catch(err => {
                    res.json(err);
                })
        },

        update: function(req, res) {
            Category.findById(req.params.categoryId, {})
                .then(category => {
                    if (!category) {
                        return res.status(404).json({
                            message: 'Category Not Found'
                        });
                    }

                    category
                        .update({
                            name: req.body.name || category.name
                        })
                        .then(() => res.status(200).json(category))
                        .catch(err => {
                            res.status(400).json(err);
                        })
                })
                .catch(err => {
                    res.json(err);
                })
        },

        delete: function(req, res) {
            Category.findById(req.params.categoryId)
                .then(category => {
                    if (!category) {
                        return res.status(400).json({
                            message: 'Category Not Found'
                        });
                    }

                    return category
                        .destroy()
                        .then(() => res.status(200).json({
                            message: 'Category deleted successfully'
                        }))
                        .catch(err => {
                            res.status(400).json(err);
                        })
                })
                .catch(err => {
                    res.json(err);
                })
        }

    }

    return CategoryController;
};