import { Message } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';

import S3 from 'aws-sdk/clients/s3';
import { IncomingForm } from 'formidable';
import fs from 'fs';
import bcrypt from 'bcrypt';

type Data = {
  url?: string
}

export const config = {
  api: {
    bodyParser: false,
  },
};

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
    const fileData = await new Promise<{ fields: any, files: any }>((resolve, reject) => {
      const form = new IncomingForm({
        multiples: false,
        uploadDir: './uploads/',
        keepExtensions: true,
      });
      form.parse(req, (err, fields, files) => {
        resolve({ fields, files })
      });
    });

    const imageFile = fileData.files.file;
    const tempImagePath = imageFile?.filepath;

    try {
      const image = fs.readFileSync(tempImagePath);
      const uploadedImage = await s3.upload({
        Bucket: process.env.AWS_S3_BUCKET as string,
        Key: `${bcrypt.hashSync(Date.now().toString() + (Math.random() + 1).toString(36).substring(2), 10).replace(/\//g, "slash").replace(/\./g, '-')}.${imageFile.originalFilename.split('.').pop()}`,
        Body: image,
      }).promise();

      fs.unlinkSync(tempImagePath);

      res.status(200).json({
        url: uploadedImage.Location,
      });
    } catch (error) {
      console.log(error)
      res.status(500).end();
    }
  }
}
