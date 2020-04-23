const mongoose = require('mongoose')
var bcrypt = require('bcrypt');
SALT_WORK_FACTOR = 10;

var userSchema = new mongoose.Schema({
firstName: { type: String, required: true, maxlength: 20, minlength: 3 },
lastName: { type: String, required: true, maxlength: 20, minlength: 3 },
password: { type: String, required: true, minlength: 8 },
dob: { type: Date, required: true, min: new Date('1995-01-01') },
gender: { type: String, enum: ['m', 'f'] },
email: { type: String, match: /.+@.+\..+/, unique: true, index: true },
phoneNo: { type: String, maxlength: 11, minlength: 11, required: true, unique:true,}
})
userSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});
userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};
const userModel = mongoose.model('User', userSchema)
module.exports = userModel