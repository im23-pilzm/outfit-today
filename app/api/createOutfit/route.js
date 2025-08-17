import prisma from '../../../lib/prisma';

export async function GET() {
  try {
    const clothingPieces = await prisma.clothingPiece.findMany()
    return Response.json(clothingPieces)
  } catch (error) {
    return Response.json({ error: 'Failed to fetch clothing pieces' }, { status: 500 })
  }
}