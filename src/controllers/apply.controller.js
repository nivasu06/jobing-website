import Applyposting from "../models/apply.model.js";
import path from "path";

class APPLYposted {
    getWebsite(req, res, next) {
        res.render('apply', {
            errorMessage: null,
        });
    }

    postADDaplies(req, res, next) {
        const { name, email, phone } = req.body;
        const resume = 'files/' + req.file.filename;
        Applyposting.add(name, email, phone, resume);
        const applies = Applyposting.getAll();
        console.log("this is posting", applies);
        res.render('index', {
            applies,
            //UserEmail: req.session.UserEmail,
        });
    }

    getNumberapplies(req, res, next) {
        const applies = Applyposting.getAll();
        res.render('applicants', { applies });
    }
    getviewResume = (req, res, next) => {
        const resumeId = req.params.id;
        const applicant = Applyposting.getById(resumeId); // Assuming getById fetches applicant details
        if (applicant && applicant.resume) {
            const filePath = path.resolve('public', applicant.resume);
            res.sendFile(filePath, (err) => {
                if (err) {
                    next(err); // Forward any error to the error handling middleware
                }
            });
        } else {
            res.status(404).send('Resume not found');
        }
    };
    
}

export default APPLYposted;
