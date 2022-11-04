const express = require('express')

const router = express.Router()
const nodePlop = require('node-plop')

router.get('/guidance-page', async (req, res) => {
  res.render('guidance-page.njk');
})

router.post('/guidance-page', async (req, res) => {
  const plop = await nodePlop('./node_modules/govuk-prototype-kit-plops/plopfile.js');
  const guidancePage = plop.getGenerator('guidance-page');
  const { pageName, isStartButton } = req.body;

  const results = await guidancePage.runActions({ pageName, isStartButton })

  res.send(results);
})

module.exports = router
