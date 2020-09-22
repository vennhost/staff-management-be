const express = require("express")
const User = require("../../models/users")
const Salary = require("../../models/salary")
const { basic, adminOnly, getToken } = require("../../utils/auth");
const passport = require("passport");
const mongoose = require("mongoose")

const router = express.Router()

router.get("/", async (req, res) => {
    
    try {
        const users = await User.find({})
        res.send(users)
        
    } catch (error) {
        res.send(error)
        
    }

})

router.get("/:id", async (req, res) => {
    const isIDValid = mongoose.Types.ObjectId.isValid(req.params.id);
  if (isIDValid) {
    try {
        const user = await (await User.findById(req.params.id)).populate("loan");
        user ? res.send(user) : res.status(404).send("No user found!");
        res.send(user)
        
    } catch (error) {
        res.send(error)
        
    }

    }else {
        res.status(404).send("User ID not Valid")
    }

})

router.post("/register", async (req, res) => {
    
    try {
        const user = await User.register({...req.body}, req.body.password)
        const token = getToken({_id: user._id})
        res.send(
            {access_token: token,
                user: user}
        )
        
    } catch (error) {
        res.send(error)
        
    }

})

router.post("/login", passport.authenticate("local"), async (req, res) => {
    const token = await getToken({_id: req.user._id})
    res.send({
        acess_token: token,
        user: req.user
    })
})

router.delete("/:id", async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      
      if (user) {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        res.send({ message: "User Deleted", deletedUser });
      } else {
        res.status(401).send("You are not authorized to delete this User.");
      }
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  });

  module.exports = router;