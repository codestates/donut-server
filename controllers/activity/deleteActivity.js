const { activity } = require("../../models/activity");
// 생성한 유저에게만 권한, 요청을 보낸 사람이 액티비티의 주인인지 확인하는 것
module.exports = (req, res) => {
  activity
    .destroy({
      truncate: true,
      where: {
        id: req.param.id,
      },
    })
    .then((result) => {
      if (result === 1) {
        res.sendStatus(204);
      } else {
        res.status(404).json({ message: "record not found" });
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};
