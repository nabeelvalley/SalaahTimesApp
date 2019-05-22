const admin = require('firebase-admin');

const serviceAccount = require('../firestore-credentials.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const saveMasjid = async (masjid) => {
    const docRef = db.collection('masaajid').doc(masjid.key);

    const masjidRef = await docRef.set(masjid);
    return masjidRef
}

const getAllTimes = async () => {
    var collectionRef = db.collection('masaajid');
    var times = await collectionRef.get()
    return times
}

const updateMasjd = async (masjid) => {
    var document = db.collection('masaajid').doc(masjid.key)
    document.set(masjid)
}


module.exports = {
    saveMasjid, getAllTimes, updateMasjd
}