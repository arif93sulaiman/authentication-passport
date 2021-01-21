const keys = require('./secret')

module.exports = {
    MongoURI:`mongodb+srv://${keys.keys.MONGODB_PASS}:${keys.keys.MONGODB_USER}@authentication.xbvpv.mongodb.net/<dbname>?retryWrites=true&w=majority` 
}