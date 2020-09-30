// const { Activity } = require("../../models");

module.exports = async (req, res) => {
  const { Activity } = require(__base + "models");

  let activity = await Activity.create({
    name: req.body.name,
    intro: req.body.intro,
    participationCriteria: req.body.participationCriteria,
    rule: req.body.rule,
    skillSet: req.body.skillSet,
    numberOfPeople: req.body.numberOfPeople,
    location: req.body.location,
  });
  if (!activity) {
    return res.status(403).send({ message: "It's fail to store" });
  } else {
    return res
      .status(201)
      .send({ message: "It's completed to store Successfully" });
  }
};

// const { Activity } = require(__base + "models"); 를 전역으로 빼서 사용해주세요. 운영체제? 문제
