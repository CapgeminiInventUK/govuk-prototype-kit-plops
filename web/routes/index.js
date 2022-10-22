const express = require('express')

const router = express.Router()
const nodePlop = require('node-plop')

router.get('/start', async (req, res) => {
  res.render('index.njk');
})

router.post('/start', async (req, res) => {
  const plop = await nodePlop('./node_modules/govuk-prototype-kit-plops/plopfile.js');
  const guidancePage = plop.getGenerator('guidance-page');
  console.log(req.body)
  const { pageName, isStartButton } = req.body;

  const results = await guidancePage.runActions({ pageName, isStartButton })

  console.log(results);
  res.send(results);
})

module.exports = router
