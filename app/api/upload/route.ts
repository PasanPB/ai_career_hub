import { NextResponse } from 'next/server'
import { getPresignedUploadUrl } from '../../../lib/s3'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { filename, contentType = 'application/pdf' } = body || {}
    if (!filename) return NextResponse.json({ error: 'filename required' }, { status: 400 })

    const key = `${Date.now()}-${filename.replace(/[^a-zA-Z0-9._-]/g, '_')}`
    const url = await getPresignedUploadUrl(key, contentType)

    return NextResponse.json({ url, key })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || String(err) }, { status: 500 })
  }
}
