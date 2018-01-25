
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const adminController = require('../controllers/adminController');

const { catchErrors } = require('../handlers/errorHandlers');

router.get('/', userController.home );

//Router user login
router.post('/user', authController.login);
router.post('/register', catchErrors(userController.register), userController.displayThanks);
// Display home/welcome page
router.get('/user/welcome', authController.isLoggedIn, userController.welcome);

router.post('/test/:q', authController.isLoggedIn, catchErrors(userController.submitAnswer));
router.get('/test/:q', authController.isLoggedIn, userController.testPage );
router.get('/start-test/',authController.isLoggedIn, catchErrors(userController.startTest));
router.post('/get-score', catchErrors( userController.getScore ) );
router.get('/logout', authController.logout);

//Route to add a question
router.post('/question/add', catchErrors(adminController.addQuestion));
//Route to edit a question (by :id)
router.post('/question/:id', authController.isAdmin, catchErrors(adminController.updateQuestion));
//Route to see all questions
router.get('/questions',  catchErrors(adminController.getQuestions) );
//Route to delete a question
router.post('/question/delete/:id', authController.isAdmin, catchErrors(adminController.deleteQuestion));
//Route to delete all questions
router.post('/question/delete-all', authController.isAdmin, catchErrors(adminController.deleteAllQuestion));

/* All Routes Go Here */
//Route to see all registered candidates
router.get('/users', authController.isAdmin, catchErrors(adminController.getUsers));
//Route to delete all registered people
router.post('/user/delete-all', authController.isAdmin, catchErrors(adminController.deleteAllUser));
//Route to delete a registered user by :id
router.post('/user/delete/:id', authController.isAdmin, catchErrors(adminController.deleteUser));
/* ------------------ADMIN ROUTES------------------**/          

//Admin Login Submit
router.post('/admin-login', authController.adminLogin, adminController.adminDashboard);
//Admin Dashboard Panel
router.get('/admin', adminController.adminDashboard);
//Admin Logout
router.post('/admin-logout', authController.adminLogout);

router.get('/a', authController.a);
router.get('/b', authController.b);

module.exports = router;
