// app.js (or your main application file)
import express from "express";
import path from "path";
import ejsLayouts from 'ejs-layouts';
import bodyParser from "body-parser";
import session from 'express-session';
import { auth } from "./src/middleware/auth.js";
import UserController from "./src/controllers/users.controller.js";
import jobing from "./src/controllers/jobcontroller.js";
import APPLYposted from "./src/controllers/apply.controller.js";
import { uploadFile } from "./src/middleware/fileupload.js";
import { setLastposted } from "./src/middleware/lastposted.js";
import cookieParser from "cookie-parser";

const app = express();
const userController = new UserController();
const apply = new APPLYposted();
const jober = new jobing();
app.use(express.static('public'));
app.use(cookieParser());
app.use(session({
    secret: 'nivasu',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));


// View engine setup
app.set("view engine", "ejs");
app.set("views", path.resolve("src", "views"));
//app.use(ejsLayouts);
// Middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Session middleware

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

// Public routes
app.get('/home', userController.homeRedirectController);
app.get('/register', userController.getRegister);
app.get('/login', userController.getLogin);
app.post('/register', userController.postRegister);
app.post('/login', userController.postLogin);

// Protected routes (require authentication)
app.get('/logout', userController.logout); // Logout does not require authentication
app.get('/jobpost', auth, jober.getAddProduct); // Example: Protecting /jobpost route
app.post('/jobpost', auth, jober.postAddProduct); // Example: Protecting POST /jobpost route
app.get('/jobcard', jober.getProducts);
app.get('/details-card',auth, jober.getrecuriterProducts);
app.get('/details/:id', setLastposted, jober.getProductView);
app.get('/details-card/:id', setLastposted, jober.getProductupdatedView);
app.get('/update/:id',  jober.getUpdateProductView); // Example: Protecting /update/:id route
app.post('/update/:id',  jober.postUpdateProduct); // Example: Protecting POST /update/:id route
app.post('/delete/:id', jober.deleteProduct); // Example: Protecting POST /delete/:id route
app.get('/apply', apply.getWebsite);
app.post('/resume', uploadFile.single('resume'), apply.postADDaplies);
app.get('/resume', apply.getNumberapplies);
app.get('/resume/:id', apply.getviewResume);
// app.get('/search', (req, res) => {
//     const searchText = req.query.q;
    
//     postings.find({ $text: { $search: searchText } })
//         .then(posts => {
//             res.render('search-results', { results: posts, searchText });
//         })
//         .catch(err => {
//             console.error('Error searching:', err);
//             res.status(500).send('Error searching');
//         });
// });

// export default app;
// import app from "./index.js";
app.listen(3001, () => {
  console.log("server is running on port 3000");
});
