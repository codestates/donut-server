const { activity } = require("../../models/activity");
const { ActivityParticipants } = require("../../models/activity");

/* 사용자가 activity를 클릭했을 때 */
module.exports = (req, res) => {
  const userId = req.param.id;
  activity
    .findOne({
      where: {
        id: userId,
      },
    })
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(404).send({ message: "invaild request!" }, err);
    });
};
