const { activity } = require("../../controllers/activity");

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
