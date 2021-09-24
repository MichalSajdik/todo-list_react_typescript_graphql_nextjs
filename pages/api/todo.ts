// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  text: string,
  timestamp: string
}[]



export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json([{ text: 'John Doe' , timestamp: "2012-12-11T22:08:41Z"},{ text: 'John Doe2' , timestamp: "2022-12-11T22:08:41Z"}])
}
