import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

const uri = path.join(process.cwd(), 'public/server.json')
export default async (req:NextApiRequest, res:NextApiResponse) => {
	const file = fs.readFileSync(uri)
	const { genres } = JSON.parse(file)

 if(!genres?.length) {
	 return res.status(404).end('Invalid JSON file')
 }

	return res.status(200).json({ genres: genres })
}
