const mongoose = require("mongoose");

const connectDB = () => mongoose.connect("mongodb+srv://bojan123:bojan123@test-app-kpqfk.mongodb.net/test?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    poolSize: 10,
    useFindAndModify: false
}).then(() => {
    console.log("DB Connected !!!");
}).catch(err => {
    console.log(err.reason);
})

module.exports = connectDB;