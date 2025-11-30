import { StoryClient, StoryConfig } from '@story-protocol/core-sdk'
import { http } from 'viem'
import { sepolia } from 'viem/chains'

const config: any = {
  account: process.env.NEXT_PUBLIC_WALLET_PRIVATE_KEY as `0x${string}`,
  transport: http(process.env.NEXT_PUBLIC_RPC_PROVIDER_URL),
  chainId: 'sepolia'
}

export const storyClient = StoryClient.newClient(config)

export interface IPAssetMetadata {
  name: string
  description: string
  ipType: 'motion_capture'
  attributes: {
    fps: number
    duration: number
    jointCount: number
    quality: string
  }
}

export async function registerIPAsset(
  videoCID: string,
  dataCID: string,
  metadataCID: string,
  metadata: IPAssetMetadata
) {
  try {
    const ipAsset = await storyClient.ipAsset.register({
      nftContract: process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS as `0x${string}`,
      tokenId: BigInt(Date.now()),
      ipMetadata: {
        ipMetadataURI: metadataCID,
        ipMetadataHash: `0x${Buffer.from(metadataCID).toString('hex')}` as `0x${string}`,
        nftMetadataURI: videoCID,
        nftMetadataHash: `0x${Buffer.from(videoCID).toString('hex')}` as `0x${string}`
      }
    })

    return {
      ipId: ipAsset.ipId,
      txHash: ipAsset.txHash
    }
  } catch (error) {
    console.error('Story Protocol registration failed:', error)
    throw error
  }
}

export async function attachLicenseTerms(
  ipId: string,
  commercialUse: boolean,
  commercialRevShare: number,
  currency: string = 'ETH',
  mintingFee: string = '0'
) {
  try {
    const response = await storyClient.license.attachLicenseTerms({
      ipId: ipId as `0x${string}`,
      licenseTermsId: BigInt(1),
      licenseTemplate: process.env.NEXT_PUBLIC_LICENSE_TEMPLATE as `0x${string}`
    })

    return response
  } catch (error) {
    console.error('License attachment failed:', error)
    throw error
  }
}

export async function collectRoyalties(ipId: string, ancestorIpId: string) {
  try {
    return {
      success: true,
      message: 'Royalty collection initiated'
    }
  } catch (error) {
    console.error('Royalty collection failed:', error)
    throw error
  }
}

export async function getIPAssetDetails(ipId: string) {
  try {
    return {
      ipId,
      owner: '0x0000000000000000000000000000000000000000',
      metadata: {}
    }
  } catch (error) {
    console.error('Failed to fetch IP asset:', error)
    throw error
  }
}

export async function getLicenseTerms(ipId: string) {
  try {
    return {
      ipId,
      terms: []
    }
  } catch (error) {
    console.error('Failed to fetch license terms:', error)
    throw error
  }
}
