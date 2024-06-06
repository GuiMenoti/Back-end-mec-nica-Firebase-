const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const serviceAccount = require('./mecanica-fluxo-firebase-adminsdk-tajcd-561341e710.json'); 

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const app = express();
app.use(bodyParser.json());

app.delete('/deleteUser/:uid', (req, res) => {
  const uid = req.params.uid;
  admin.auth().deleteUser(uid)
    .then(() => {
      res.status(200).send('User deleted successfully');
    })
    .catch(error => {
      res.status(500).send('Error deleting user: ' + error);
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
