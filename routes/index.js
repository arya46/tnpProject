const express = require('express');

const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const adminController = require('../controllers/adminController');

const { catchErrors } = require('../handlers/errorHandlers');

router.get('/', userController.home );

//Router user login
router.post('/user', authController.login);
//User registration
router.post('/register', catchErrors(userController.register), authController.login);
// Display home/welcome page
router.get('/user/welcome', authController.isLoggedIn, userController.welcome);

// router.post('/test/:q', authController.isLoggedIn, userController.timerCheck, catchErrors(userController.submitAnswer));
// router.get('/test/:q', authController.isLoggedIn, userController.timerCheck,  userController.testPage);

router.get('/start-test', authController.isLoggedIn, catchErrors(userController.startTest));

//Get last test score
router.post('/get-score', catchErrors( userController.getScore ) );
router.get('/get-score', userController.renderScore);

//Post the test mark to db after test and exit
router.post('/test/score/:score', authController.isLoggedIn, catchErrors(userController.saveScore), authController.logout);
router.get('/logout', authController.logout);

//Route to add a question
router.post('/question/add', authController.isAdmin, catchErrors(adminController.addQuestion));
//Route to edit a question (by :id)
router.post('/question/:id', authController.isAdmin, catchErrors(adminController.updateQuestion));
//Route to see all questions
router.get('/questions', authController.isAdmin, catchErrors(adminController.getQuestions) );
//Route to delete a question
router.get('/question/delete/:id', authController.isAdmin, catchErrors(adminController.deleteQuestion));
//Route to delete all questions
router.get('/question/delete-all', authController.isAdmin, catchErrors(adminController.deleteAllQuestion));

/* All Routes Go Here */
//Route to see all registered candidates
router.get('/users', authController.isAdmin, catchErrors(adminController.getUsers));
//Route to delete all registered people
router.get('/user/delete-all', authController.isAdmin, catchErrors(adminController.deleteAllUser));
//Route to delete a registered user by :id
router.get('/user/delete/:id', authController.isAdmin, catchErrors(adminController.deleteUser));
/* ------------------ADMIN ROUTES------------------**/          

//Admin Login Submit
router.post('/admin-login', authController.adminLogin);
//Admin Dashboard Panel
router.get('/admin', authController.isAdmin, adminController.adminDashboard);
//Admin Logout
router.get('/admin-logout', authController.adminLogout);

// router.get('/a', userController.loadQuestions);
// router.get('/b', authController.b);

module.exports = router;
