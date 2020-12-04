const {
    MongoClient,
    ObjectID
} = require('mongodb')

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

    // db.collection('tasks').deleteMany({
    //     _id: ObjectID("5fca0cd037750834a497413b")
    // }).then((data) => {
    //     console.log(`Inserted documents count: ${data.insertedCount} and Update document Count: ${data.upsertedCount} and Modified Documentes ${data.modifiedCount}\nDeleted Count: ${data.deletedCount}`);
    // }).catch((error) => {
    //     console.log(error);
    // })



})