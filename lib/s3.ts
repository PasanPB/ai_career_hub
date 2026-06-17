import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const REGION = process.env.AWS_REGION || 'us-east-1'

const s3 = new S3Client({ region: REGION })

export async function getPresignedUploadUrl(key: string, contentType = 'application/pdf', expiresIn = 3600) {
  if (!process.env.S3_BUCKET) throw new Error('S3_BUCKET not configured')
  const command = new PutObjectCommand({ Bucket: process.env.S3_BUCKET, Key: key, ContentType: contentType })
  return getSignedUrl(s3, command, { expiresIn })
}

export default s3
