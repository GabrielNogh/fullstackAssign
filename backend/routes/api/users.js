const express = require("express");
const router = express.Router();
const axios = require("axios");

const { body, validationResult } = require("express-validator");
const isValidIsraeliID = require("../../utils/validateIsraelID");
const User = require("../../models/User.js");

// @route  Get api/users
// @desc   get users from DB
// @access Public (for authorize)
router.get("/", async (req, res) => {
  try {
    const getUsers = await User.find({});
    res.status(200).json(getUsers);
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .send("An Error accured while trying to retrieve users list");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const userToDelete = req.params.id;
    const deleteHim = await User.deleteOne({
      identificationNumber: userToDelete,
    });
    console.log(deleteHim.deletedCount);
    if (deleteHim?.deletedCount > 0) {
      res.status(200).send(`successfuly deleted ${userToDelete}`);
    } else {
      res.status(404).send("Not Found");
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

// @route  Post api/users
// @desc   Register user
// @access Public (for authorize)
router.post(
  "/",
  [
    body("firstname").not().isEmpty(),
    body("lastname").not().isEmpty(),
    body("phone").not().isEmpty(),
    body("ip").not().isEmpty().isIP(),
    body("identificationNumber").custom((value) => {
      return isValidIsraeliID(value);
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstname, lastname, identificationNumber, phone, ip } = req.body; // destruction

    try {
      let ipInformationResponse = await axios.get(
        `http://ip-api.com/json/${ip}`
      );
      // check if given id is in db
      let findIfUserExists = await User.findOne({
        identificationNumber,
      });

      if (!findIfUserExists) {
        const { country, city } = await ipInformationResponse.data;
        const newUser = new User({
          firstname: firstname,
          lastname: lastname,
          identificationNumber: identificationNumber,
          phone: phone,
          ip: ip,
          country: country,
          city: city,
        });
        const userSaved = await newUser.save();
        if (userSaved) {
          res.status(200).send(newUser);
        }
      } else {
        res
          .status(422)
          .send("Identification Number exists already, please contact support");
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("something went wrong" + error);
    }
  }
);

module.exports = router;
