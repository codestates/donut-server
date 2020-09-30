const { activity } = require("../../controllers/activity");

/* edit activities scenario
  권한설정
  // 생성한 유저에게만 권한, 요청을 보낸 사람이 액티비티의 주인인지 확인하는 것
*/
module.exports = (req, res) => {
  activity
    .update({
      where: {
        id: req.body.id,
      },
      default: {
        name: name,
        intro: intro,
        participationCriteria: participationCriteria,
        rule: rule,
        numberOfPeople: numberOfPeople,
        location: location,
        createAt: createAt,
        updatedAt: updatedAt,
      },
    })
    .then((result) => {
      res.status(204).json(result);
    })
    .catch((err) => {
      res.status(403).json(err);
    });
};
