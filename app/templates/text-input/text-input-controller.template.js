module.exports = function (router) {
  router.get('/{{kebabCase pageName }}', (req, res) => {
    res.render('{{kebabCase pageName}}.njk');
  });

  /*
    TODO Handle form submission here.
    For a page with no inputs just redirect to next page
    */
  router.post('/{{kebabCase pageName }}', (req, res) => {
    res.redirect('/next-page')
  });
}
