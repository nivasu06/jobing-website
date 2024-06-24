import Jobposting from "../models/jobmodel.js";

class jobing{
    getProducts(req, res, next)
    {
        var postings = Jobposting.getAll();
        res.render('cards', {postings});
        //console.log(postings);
    }
    getrecuriterProducts(req, res, next) {
        var postings = Jobposting.getAll(); // Assuming Jobposting.getAll() fetches all job postings
    
        // Render the 'cardsposted' view and pass 'postings' and 'userEmail' to it
        res.render('cardsposted', { postings: postings, userEmail: req.session.userEmail });
    }
    
    getAddProduct(req, res, next)
    {
        res.render('jobposted', {
        errorMessage: null,
        userEmail: req.session.userEmail,});
    }
    postAddProduct(req, res, next) {
        const { title, desc, location, requirements,salary, companyname, email, phone } = req.body;
        Jobposting.add(title, desc, location, requirements,salary, companyname, email, phone);
        var postings = Jobposting.getAll();
        console.log("this isposting",postings);
        res.render('cards', {
        postings,
        //userEmail: req.session.userEmail,
        });
        //console.log(postings)
    }

    getProductView(req, res, next) {
        // 1. if product exists then return view
        const id = req.params.id;
        const productFound = Jobposting.getById(id);
        if (productFound) {
        res.render('viewdetail', {
            product: productFound,
            errorMessage: null,
            //userEmail: req.session.userEmail,
        });
        }
        // 2. else return errors.
        else {
        res.status(401).send('Product not found');
        }
    }
    getProductupdatedView(req, res, next) {
        // 1. if product exists then return view
        const id = req.params.id;
        const productFound = Jobposting.getById(id);
        if (productFound) {
        res.render('loginviews', {
            product: productFound,
            errorMessage: null,
            userEmail: req.session.userEmail,
        });
        }
        // 2. else return errors.
        else {
        res.status(401).send('Product not found');
        }
    }
    getUpdateProductView(req, res, next) {
        // 1. if product exists then return view
        const id = req.params.id;
        const productFound = Jobposting.getById(id);
        if (productFound) {
        res.render('update-postings', {
            product: productFound,
            errorMessage: null,
            userEmail: req.session.userEmail,
        });
    }
        else {
        res.status(401).send('Product not found');
        }
    }
    postUpdateProduct(req, res) {
        Jobposting.update(req.body); // Update the job posting
        var postings = Jobposting.getAll(); // Get all job postings after update
        res.render('cards', { postings }); // Render the 'cards' view with updated postings
    }
    
    deleteProduct(req, res) {
        const id = req.params.id;
        const productFound = Jobposting.getById(id);
        if (!productFound) {
            return res.status(401).send('Product not found');
        }
        Jobposting.delete(id);
        var postings = Jobposting.getAll();
        res.render('cards', { postings });
    }

}
export default jobing;