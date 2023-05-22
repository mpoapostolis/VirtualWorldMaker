import { Material } from '@/lib/materials/types'
import { getPocketBase } from '@/lib/pocketBase'
import { NextApiRequest, NextApiResponse } from 'next'

export async function getMaterials(_req: NextApiRequest, res: NextApiResponse) {
  const pb = await getPocketBase()
  const records = await pb.collection('materials').getFullList<Material>(200 /* batch size */, {
    sort: '-created',
  })
  res.status(200).json(
    records.map((obj) => ({
      ...obj,
      map: obj?.map && `${process.env.PB_URL}api/files/${obj?.collectionId}/${obj?.id}/${obj?.map}`,
      displacement:
        obj?.displacement && `${process.env.PB_URL}api/files/${obj?.collectionId}/${obj?.id}/${obj?.displacement}`,
      metalness: obj?.metalness && `${process.env.PB_URL}api/files/${obj?.collectionId}/${obj?.id}/${obj?.metalness}`,
      normal: obj?.normal && `${process.env.PB_URL}api/files/${obj?.collectionId}/${obj?.id}/${obj?.normal}`,
      roughness: obj?.roughness && `${process.env.PB_URL}api/files/${obj?.collectionId}/${obj?.id}/${obj?.roughness}`,
      preview: obj?.preview && `${process.env.PB_URL}api/files/${obj?.collectionId}/${obj?.id}/${obj?.preview}`,
    })),
  )
}