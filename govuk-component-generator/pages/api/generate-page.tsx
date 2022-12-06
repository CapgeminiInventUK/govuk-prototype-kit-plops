// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import nodePlop from 'node-plop';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const plop = await nodePlop('../plopfile.js');

  const {
    'page-name': pageName, withStartButton, plopfile, ...rest
  } = req.body;
  const page = plop.getGenerator(plopfile);

  const results = await page.runActions({ pageName, isStartButton: !!withStartButton, ...rest });

  if (results.failures.length) {
    res.statusCode = 400;
    res.send(results.failures);
    return;
  }

  res.statusCode = 201;
  res.send('OK');
}
