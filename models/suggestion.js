const mongoose = require('mongoose');

const schema = mongoose.Schema;

const suggestionSchema = new schema ({
    message:{type: String, required: true},
    date:{type: String,},
    userid:{ type: mongoose.Types.ObjectId, required: true, ref: "user" },

})

module.exports = mongoose.model('suggestion', suggestionSchema);