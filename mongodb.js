const {MongoClient, ObjectID} = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

const id = new ObjectID()

MongoClient.connect(connectionURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (error, client) => {
    if (error) {
        return console.log("Unable to connect to the database");
    }

    const db = client.db(databaseName)

    db.collection('users').findOne({name: "Vishal Kumar"},(error,result) => {
        if(error){
            console.log("Unable to find..!");
        }else{
            console.log(result);
        }
    })    



})