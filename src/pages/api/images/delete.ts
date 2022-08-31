import { Message } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';

import S3 from 'aws-sdk/clients/s3';

type Data = {
  url?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const session = await unstable_getServerSession(req, res, authOptions);

  const s3 = new S3({
    apiVersion: '2012-10-17',
    region: 'us-west-1',
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
  });

  if (req.method == 'POST') {
    console.log(JSON.parse(req.body).key)

    try {
      const response = await s3.deleteObject({
        Bucket: process.env.AWS_S3_BUCKET as string,
        Key: JSON.parse(req.body).key as string,
      }).promise();

      res.status(200).end();
    } catch (error) {
      console.log(error)
      res.status(500).end();
    }
  }
}
