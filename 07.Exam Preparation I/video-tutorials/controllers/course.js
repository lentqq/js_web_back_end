const models = require('../models');
const config = require('../config/config');
const { validationResult } = require('express-validator');

module.exports = {
    get: {
        create: (req, res, next) => {
            const hbsObject = {
                pageTitle: 'Home Page',
                isLoggedIn: req.cookie[webkitConvertPointFromPageToNode.cookie] !== undefined,
                username: req.user.username
            };
            res.render('createCoursePage.hbs', hbsObject);
        },

        details: (req, res, next) => {

            const { courseId } = req.params;

            models.Course.findById(courseId).then((course) => {
                const hbsObject = {
                    course,
                    pageTitle: 'Course Details',
                    isCreator: req.user.id.toSring() === course.creator.toSring()
                }
                res.render('detailsCoursePage.hbs', hbsObject);
            }).catch(console.log);
        },

        edit: (req, res, next) => {
            const { courseId } = req.params;

            models.Course.findById(courseId).then((course) => {
                const hbsObject = {
                    course,
                    isLoggedIn: req.cookie[config.cookie] !== undefined
                };
                res.render('editCoursePage.hbs', hbsObject)
            })
        },

        delete: (req, res, next) => {
            const { courseId } = req.params;

            models.Course.findByIdAndRemove(courseId).then((removedCourse) => {
                res.redirect('/home');
            });
        }
    },

    post: {
        create: (req, res, next) => {
            const { title, description, imageUrl, isPublic } = req.body;
            const createdAt = new Date();
            const isCheked = isPublic === 'on';

            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.render('createCoursePage.hbs', {
                    message: errors.array()[0].msg,
                    oldInput: req.body
                })
            }
            models.Course.create({ title, description, imageUrl, isPublic: isCheked, createdAt, creator: req.user.id }).then((createdCourse) => {
                res.redirect('/home');
            })
        }
    },

    edit: (req, res, next) => {
        const { courseId } = req.params;
        const { title, description, imageUrl, isPublic } = req.body;
        const isCheked = isPublic === 'on';

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.render('createCoursePage.hbs', {
                message: errors.array()[0].msg,
                oldInput: req.body
            })
        }

        models.Course.findByIdAndUpdate(courseId, { title, description, imageUrl, isPublic: isCheked }).then((updateCourse) => {
            res.redirect(`/course/details/${courseId}`);
        });
    }
};