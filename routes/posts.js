const axios = require('axios');
const express = require('express');
const router = express.Router();

router.get('/:tags/:sortBy?/:direction?', function (req, res) {
  //sortBy optional, default val of "id"
  // direction, default "asc"
  // tags=history,tech
  const {tags, sortBy, direction} = req.params;
  //change tagsArr
  const tagsArr = tags.split(',');

  // console.log(tags, sortBy, direction);
  axios
    .get(`https://api.hatchways.io/assessment/blog/posts?tag=science`)
    .then(res => console.log(res.data))
    .catch(err => console.log(err));

  res.status(200).send('hi');
});

module.exports = router;
// at least one tag specified
