class Jobposting {
    constructor(id, title, desc, location, requirements,salary, companyname, email, phone) {
        this.id = id;
        this.title = title;
        this.desc = desc;
        this.location = location;
        this.requirements = requirements;
        this.salary=salary;
        this.companyname = companyname;
        this.email = email;
        this.phone = phone;
    }

    
    static getById(id) {
        return products.find((p) => p.id == id);
    }

    static getAll() {
        return postings;
    }

    static update(postupdate) {
        const index = postings.findIndex((p) => p.id == postupdate.id);
        if (index !== -1) {
            postings[index] = postupdate;
        }
    }

    static delete(id) {
        const index = postings.findIndex((p) => p.id == id);
        if (index !== -1) {
            postings.splice(index, 1);
        }
    }

    static add(title, desc, location, requirements,salary, companyname, email, phone) {
        let newpost = new Jobposting(
            postings.length + 1, title, desc, location, requirements,salary, companyname, email, phone);
        postings.push(newpost);
    }

    static getById(id) {
        return postings.find((p) => p.id == id);
    }
}

let postings = [
    new Jobposting(1, "Full Stack Developer", "Must have some experience", "Mumbai", "Java, Python, HTML, CSS","2K-25K", "Openview", "nivasuravikumar@gmail.com", "9989389645")
];

export default Jobposting;
