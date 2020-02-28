const firebase = require("@firebase/testing");
const fs = require("fs");

class FirestoreEmulatorProvider {
    constructor(projectId, rulesFilePath = 'firestore.rules') {
        this.projectId = projectId;
        this.rules = fs.readFileSync(rulesFilePath, 'utf8')
    }

    getProjectID() {
        return this.projectId
    }

    async loadRules() {
        return firebase.loadFirestoreRules({
            projectId: this.getProjectID(),
            rules: this.rules,
        })
    }

    getFirestore() {
        return firebase.initializeTestApp({
            projectId: this.getProjectID(),
        }).firestore()
    }

    getFirestoreWithAuth(uid = "test_user", email = "test_user@dummy.mail") {
        return firebase.initializeTestApp({
            projectId: this.getProjectID(),
            auth: {uid: uid, email: email},
        }).firestore()
    }

    getAdminFirestore() {
        return firebase.initializeAdminApp({projectId: this.getProjectID()}).firestore()
    }

    async cleanup() {
        return Promise.all(firebase.apps().map(app => app.delete()))
    }
}

module.exports = FirestoreEmulatorProvider;