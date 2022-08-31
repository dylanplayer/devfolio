import type { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession } from 'next-auth/next';
import { getSession } from 'next-auth/react';
import ProjectData from '../../../types/ProjectData';
import { authOptions } from '../auth/[...nextauth]';
import { prisma } from '../../../../db';
import JobData from '../../../types/JobData';

type Data = {
  jobs?: JobData[]
  job?: JobData
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const session = await unstable_getServerSession(req, res, authOptions)

  if (req.method == 'POST') {
    const data = req.body;
    const job = await prisma.job.create({
      data: {
        company: data.company,
        title: data.title,
        description: data.description,
        timeframe: data.timeframe,
        url: data.url,
        img: data.img,
      },
      select: {
        id: true,
        company: true,
        title: true,
        description: true,
        timeframe: true,
        url: true,
        img: true,
      }
    });
    res.send({
      job: job,
    });
    res.end;
  } else {
    const session = await getSession({ req });
    if (session) {
      const jobs = await prisma.job.findMany({
        select: {
          id: true,
          company: true,
          title: true,
          description: true,
          timeframe: true,
          url: true,
          img: true,
        },
      });
      res.status(200).json({
        jobs: jobs,
      });
    } else {
      res.status(401);
      res.end();
    }
  }
}
