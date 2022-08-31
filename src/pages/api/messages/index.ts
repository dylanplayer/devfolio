import { Message } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession } from 'next-auth/next';
import { getSession } from 'next-auth/react';
import { authOptions } from '../auth/[...nextauth]';
import { prisma } from '../../../../db';

type Data = {
  messages?: Message[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const session = await unstable_getServerSession(req, res, authOptions)

  if (req.method == 'POST') {
    const data = req.body;
    const message = await prisma.message.create({ data: {
      name: data.name,
      email: data.email,
      message: data.message,
    }});
    res.status(200);
    res.end;
  } else {
    const session = await getSession({ req });
    if (session) {
      const messages = await prisma.message.findMany();
      res.status(200).json({
        messages: messages,
      });
    } else {
      res.status(401);
      res.end();
    }
  }
}
