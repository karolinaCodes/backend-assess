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

  if (tagsArr.length === 1) {
    return axios
      .get(
        `https://api.hatchways.io/assessment/blog/posts?tag=${tags}&sortBy=${sortBy}&direction=${direction}`
      )
      .then(res => console.log('hi'))
      .catch(err => console.log(err));
  }

  const urlArr = tagsArr.map(
    tag =>
      `https://api.hatchways.io/assessment/blog/posts?tag=${tag}&sortBy=${sortBy}&direction=${direction}`
  );
  console.log(
    tagsArr.map(tag => {
      console.log(tag);
      return axios.get(
        `https://api.hatchways.io/assessment/blog/posts?tag=${tag}&sortBy=${sortBy}&direction=${direction}`
      );
    })
  );

  Promise.all(
    tagsArr.map(tag => {
      console.log(tag);
      console.log(sortBy);
      console.log(direction);
      return axios.get(
        `https://api.hatchways.io/assessment/blog/posts?tag=${tag}&sortBy=${sortBy}&direction=${direction}`
      );
    })
  ).then(all => {
    [one, two] = all;
    console.log([...one.data.posts, ...two.data.posts]);
    res.status(200).send([...one.data.posts, ...two.data.posts]);
  });
});

module.exports = router;
// at least one tag specified
