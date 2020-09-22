const express = require('express');
const router = express.Router();
const Salary = require("../../models/salary");
const User = require("../../models/users");
const {
  basic,
  adminOnly,
  getToken
} = require("../../utils/auth");

router.get('/', async (req, res) => {

  try {

    const mySort = { createdAt: -1 }
    const salary = await Salary.find({}).sort(mySort)
    res.send(salary)

  } catch (error) {
    console.log(error)
    res.send(error)
  }
});

router.get('/:id', async (req, res) => {

  try {
    const salary = await (await Salary.findById(req.params.id));
    res.send(salary)

  } catch (error) {
    console.log(error)
    res.send(error)
  }
});

router.get('/user/:userId', async (req, res) => {

  try {
    const user = req.body.user
    const salary = await (await Salary.find({user: req.params.userId}));
    console.log(req.params.userId)
    console.log(user)
    res.send(salary)

  } catch (error) {
    console.log(error)
    res.send(error)
  }
});

/* router.get('/totals', async (req, res) => {

  try {
    const loans = await Loan.aggregate(
      [{
        $group : {
            
            total : {
                $sum : "$amount"
            }
        }
    }],callback
    )
    res.send(loans)

  } catch (error) {
    console.log(error)
    res.send(error)
  }
}); */

router.post("/", async (req, res) => {
  try {

    let salary = new Salary({
      ...req.body
    });

    await salary.save();
      console.log(req.body)
    await User.findByIdAndUpdate(req.body.user._id, {
      $push: {
        salary: loan._id
      }
    })


    salary = await Salary.findById(loan._id).populate("user");
    res.send(salary);
  } catch (error) {
    console.log(error)
    res.status(500).send(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const salaryEdit = await Salary.findByIdAndUpdate(
      req.params.id,
      {
        $set: { ...req.body }
      },
      { new: true }
    );
    res.send(salaryEdit);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const salary = await Salary.findById(req.params.id);
    
    if (salary) {
      const deletedSalary = await Salary.findByIdAndDelete(req.params.id);
      res.send({ message: "Salary Deleted", deletedSalary });
    } else {
      res.status(401).send("You are not authorized to delete this Loan.");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = router;