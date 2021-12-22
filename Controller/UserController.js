const UserController = () => {
  const User = require("./Modals/Users");

  // ==============================================================================
  // ========================== RestFul Api SignUp =============================
  // ==============================================================================
  //TODO
  app.route("/sign-up").post((req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
      if (user) {
        res.json({ message: "user already exist", type: false });
      } else {
        const newUser = new User(req.body);
        newUser.save((err) => {
          err
            ? res.json({ message: "Sign up failed", type: false })
            : res.json({ message: "Sign Up successful", type: true });
        });
      }
    });
  });
  app.route("/login").post((req, res) => {
    User.findOne(
      { email: req.body.email, password: req.body.password },
      (err, user) => {
        if (user) {
          res.json({ message: "Logged in", type: true });
        } else {
          res.json({ message: "Sign up first bedore login", type: false });
        }
        if (err) {
          console.log(err);
        }
      }
    );
  });
};

export default UserController;
