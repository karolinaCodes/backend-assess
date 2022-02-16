const axios = require('axios');
const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
  res.status(400).json({error: 'Tags parameter is required'});
});

router.get('/:tags/:sortBy?/:direction?', function (req, res) {
  const {tags = ' ', sortBy = 'id', direction = 'asc'} = req.params;

  const errorString = '';

  if (!tags) {
    console.log('eher2');
    res.json('error');
  }
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

  Promise.all(
    tagsArr.map(tag =>
      axios.get(
        `https://api.hatchways.io/assessment/blog/posts?tag=${tag}&sortBy=${sortBy}&direction=${direction}`
      )
    )
  )
    .then(all => {
      [one, two] = all;
      const allPosts = [...one.data.posts, ...two.data.posts];

      // filter out duplicate blog posts
      const ids = allPosts.map(el => el.id);
      const filtered = allPosts.filter(
        ({id}, index) => !ids.includes(id, index + 1)
      );

      res.status(200).send(filtered);
    })
    .catch(err => console.log(err));
});

module.exports = router;
