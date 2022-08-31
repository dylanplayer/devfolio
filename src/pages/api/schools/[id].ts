import type { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession } from 'next-auth/next';
import { getSession } from 'next-auth/react';
import { authOptions } from '../auth/[...nextauth]';
import { prisma } from '../../../../db';
import SchoolData from '../../../types/SchoolData';

type Data = {
  schools?: SchoolData[]
  school?: SchoolData
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const session = await unstable_getServerSession(req, res, authOptions)

  if (req.method == 'POST') {
    const data = req.body;
    const school = await prisma.school.update({
      where: {
        id: req.query?.id as string,
      },
      data: {
        name: data.name,
        degree: data.degree,
        timeframe: data.timeframe,
        url: data.url,
        img: data.img,
      },
      select: {
        id: true,
        name: true,
        degree: true,
        timeframe: true,
        url: true,
        img: true,
      }
    });
    res.send({
      school: school,
    });
    res.end;
  } else {
    const session = await getSession({ req });
    if (session) {
      const schools = await prisma.school.findMany({
        select: {
          id: true,
          name: true,
          degree: true,
          timeframe: true,
          url: true,
          img: true,
        }
      });
      res.status(200).json({
        schools: schools,
      });
    } else {
      res.status(401);
      res.end();
    }
  }
}
