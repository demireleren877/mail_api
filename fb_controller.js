const serviceAccount = require('./service-account-key.json');
const admin = require('firebase-admin');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();



async function getDataFirestore(res) {
    const users = [];
    try {
        const colRef = db.collection("users");
        const docs = await colRef.get();
        docs.forEach(element => {
            users.push(element.data())
        });
        res.send(users)
    } catch (error) { }
}

async function signUP(req, res, token) {
    const userResponse = await admin.auth().createUser({
        email: req.body.email,
        password: req.body.password,
        emailVerified: false
    });
    db.collection("users").add({
        "email": req.body.email,
        "name": req.body.name,
        "domain": req.body.domain,
        "purpose": req.body.purpose,
        "token": token
    });
}

module.exports = { getDataFirestore, signUP };