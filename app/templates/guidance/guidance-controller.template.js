module.exports = function (router) {
  router.get('/{{kebabCase pageName }}', (req, res) => {
    res.render('{{kebabCase pageName}}.njk');
  });

  router.post('/{{kebabCase pageName }}', (req, res) => {
    res.redirect('/next-page')
  });
}
