// src/pages/api/auth.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');
  res.status(401).end(`Auth Required`);
}