class Applyposting {
    constructor(id, name, email, phone, resume) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.resume = resume;
    }

    static getAll() {
        return applies;
    }

    static add(name, email, phone, resume) {
        let newApplies = new Applyposting(
            applies.length + 1,
            name,
            email,
            phone,
            resume
        );
        applies.push(newApplies);
    }

    static getById(id) {
        return applies.find((p) => p.id == id);
    }
}

var applies = [];
export default Applyposting;
