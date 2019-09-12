const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../model/user');
const keys = require('../model/keys');
const validateRegisterInput = require('../validation/signup');
const validateLoginInput = require('../validation/login');
// signup controller
exports.signup = (req, res) =>{
  const { errors, isValid } = validateRegisterInput(req.body);
  if(!isValid) {
      return res.status(400).json(errors);
  }
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
});
bcrypt.genSalt(10, (err, salt) => {
  console.log(salt)
  bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser
          .save()
          .then(user => res.json(user))
          .catch(err => console.log(err))
  });
});
}
//login controller
exports.login = (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
    if(!isValid) {
        return res.status(400).json(errors);
    }
    const {email, password} = req.body;
    // const password = req.body.password;

    //Check if the user email exists at all in database
    User.findOne({where:{ email }}).then(user => {
        if (!user) {
            errors.email = 'User not found';
            return res.status(404).json({email: 'User not found'});
        }

        //Compare password hash saved in database with the password provided in the req.body
        bcrypt.compare(password, user.password).then(isMatch => {
            console.log(password)
            console.log(user.password)
          if(isMatch) {

                // if User is matched, then create JWT Payload
                const payload = { id: user.id, username: user.username };

                // signed JWT token to be sent to server
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    { expiresIn: 3600 },
                    (err, token) => {
                      res.json({
                        success: true,
                        token: 'Bearer ' + token
                      });
                    }
                  );
                } else {
                errors.password = 'Password Incorrect';
                return res.status(400).json(errors);
            }
        });
    });
}


