const facebookScraper = require('../facebookScraper')

const express = require('express')
const router = express.Router()

const admin = require('firebase-admin');

var serviceAccount = require('../firestore-credentials.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

var db = admin.firestore();

const bodyParser = require('body-parser')

router.use(bodyParser())

router.post('/', (req, res) => {
    const content = req.body.posts.data[0].message
    const salaahTimes = facebookScraper(content)
    salaahTimes.forEach(masjid => {
        var docRef = db.collection('masaajid').doc(masjid.key);

        var setAda = docRef.set(masjid);

    })
    res.json(salaahTimes)
})

module.exports = router
