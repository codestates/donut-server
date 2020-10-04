const { activity } = require("../../models/activity");
const { ActivityParticipants } = require("../../models/activity");

/*
  지원하기 버튼을 눌렀을 때 DB에 저장해야 한다.
  해당 데이터를 activityParticipant에 저장해야 한다.
*/

module.exports = (req, res) => {
  const participant = req.body.users.id;
  /* ActivityParticipants에 저장한다. */
  ActivityParticipants.findOrCreate({
    where: {
      id: participant,
    },
  })
    .spread((result) => {
      res
        .status(201)
        .json({ message: "join request is processed completely" }, result);
    })
    .catch((err) => {
      res.status(403).send({ message: "the join request is failed" });
      console.error(err);
    });
};
