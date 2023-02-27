// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
    name: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const url = `http://transport.opendata.ch/v1/locations?query=${req.query}`;
    await fetch(url)
        .then(async (resp) => {
            res.status(200).json(await resp.json());
        })
        .catch(({ err }) => {
            res.status(400).json(err);
        });
}
