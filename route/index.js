const express = require('express');
const cRoute = express.Router();
const courseController = require('../controller');

cRoute.route('/course').get(courseController.readAll);
cRoute.route('/course:id').get(courseController.readSingle);

cRoute.route('/course').post(courseController.create);
cRoute.route('/course:id').patch(courseController.update);
cRoute.route('/course:id').delete(courseController.delete);

module.exports = cRoute;
