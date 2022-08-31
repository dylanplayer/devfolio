import type { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession } from 'next-auth/next';
import { getSession } from 'next-auth/react';
import { authOptions } from '../auth/[...nextauth]';
import { prisma } from '../../../../db';
import ProjectData from '../../../types/ProjectData';

type Data = {
  projects?: ProjectData[]
  project?: ProjectData
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const session = await unstable_getServerSession(req, res, authOptions)

  if (req.method == 'POST') {
    const data = req.body;
    const project = await prisma.project.update({
      where: {
        id: req.query?.id as string,
      },
      data: {
        title: data.title,
        description: data.description,
        img: data.img,
        live: data.live,
        code: data.code
      },
      select: {
        id: true,
        title: true,
        description: true,
        img: true,
        code: true,
        live: true,
      }
    });
    res.send({
      project: project,
    });
    res.end;
  } else {
    const session = await getSession({ req });
    if (session) {
      const projects = await prisma.project.findMany({
        select: {
          id: true,
          title: true,
          description: true,
          img: true,
          code: true,
          live: true,
        }
      });
      res.status(200).json({
        projects: projects,
      });
    } else {
      res.status(401);
      res.end();
    }
  }
}
