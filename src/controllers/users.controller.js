import UserModel from "../models/users.model.js";

class UserController {
    homeRedirectController(req, res) {
        res.redirect('/');
    }

    getRegister(req, res) {
        res.render('register');
    }

    getLogin(req, res) {
        res.render('login', { errorMessage: null });
    }

    postRegister(req, res) {
        const { name, email, password } = req.body;
        UserModel.add(name, email, password);
        res.render('login', { errorMessage: null });
    }

    postLogin(req, res) {
        const { email, password } = req.body;
        const user = UserModel.isValidUser(email, password);
        if (!user) {
            return res.render('login', { errorMessage: "Invalid credentials" });
        }
        req.session.userEmail = email;
        res.render('index', {
            userEmail: req.session.userEmail,
        });
    }

    logout(req, res) {
        req.session.destroy((err) => {
            if (err) {
                console.error('Error destroying session:', err);
            }
            res.redirect('/');
        });
    }
}

export default UserController;
