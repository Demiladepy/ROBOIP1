export interface MotionQualityMetrics {
  overallScore: number
  smoothness: number
  coverage: number
  naturalness: number
  completeness: number
  marketValue: string
}

export interface AITags {
  activityType: string[]
  bodyParts: string[]
  difficulty: string
  useCase: string[]
}

export function calculateQualityScore(metadata: any): MotionQualityMetrics {
  const fps = metadata.fps || 30
  const duration = metadata.duration || 0
  const jointCount = metadata.joint_count || 0
  const totalFrames = metadata.total_frames || 0

  const smoothnessScore = Math.min(100, (fps / 60) * 100)

  const coverageScore = jointCount >= 25 ? 100 : (jointCount / 25) * 100

  const completenessScore = totalFrames > 0 ? Math.min(100, (totalFrames / (fps * duration)) * 100) : 0

  const naturalnessScore = duration >= 2 && duration <= 300 ? 100 : duration < 2 ? (duration / 2) * 100 : 80

  const overallScore = (
    smoothnessScore * 0.25 +
    coverageScore * 0.3 +
    completenessScore * 0.25 +
    naturalnessScore * 0.2
  )

  let marketValue = 'Low'
  if (overallScore >= 90) marketValue = 'Premium'
  else if (overallScore >= 75) marketValue = 'High'
  else if (overallScore >= 60) marketValue = 'Medium'

  return {
    overallScore: Math.round(overallScore),
    smoothness: Math.round(smoothnessScore),
    coverage: Math.round(coverageScore),
    naturalness: Math.round(naturalnessScore),
    completeness: Math.round(completenessScore),
    marketValue
  }
}

export function generateAITags(metadata: any, videoFilename: string): AITags {
  const filename = videoFilename.toLowerCase()
  const jointCount = metadata.joint_count || 0
  const duration = metadata.duration || 0

  const activityType: string[] = []

  if (filename.includes('walk') || filename.includes('run')) {
    activityType.push('locomotion', 'walking')
  }
  if (filename.includes('dance')) {
    activityType.push('dance', 'performance', 'entertainment')
  }
  if (filename.includes('sport') || filename.includes('athletic')) {
    activityType.push('sports', 'athletics', 'fitness')
  }
  if (filename.includes('gesture')) {
    activityType.push('gestures', 'communication', 'interaction')
  }
  if (filename.includes('fight') || filename.includes('combat')) {
    activityType.push('combat', 'action', 'martial arts')
  }

  if (activityType.length === 0) {
    activityType.push('general motion', 'body movement')
  }

  const bodyParts: string[] = []
  if (jointCount >= 25) {
    bodyParts.push('full body', 'arms', 'legs', 'torso', 'head')
  } else if (jointCount >= 15) {
    bodyParts.push('upper body', 'arms', 'torso')
  } else if (jointCount >= 8) {
    bodyParts.push('core', 'torso')
  }

  let difficulty = 'intermediate'
  const qualityMetrics = calculateQualityScore(metadata)
  if (qualityMetrics.overallScore >= 85 && duration > 10) {
    difficulty = 'advanced'
  } else if (qualityMetrics.overallScore < 60 || duration < 3) {
    difficulty = 'beginner'
  }

  const useCase: string[] = []
  if (qualityMetrics.marketValue === 'Premium' || qualityMetrics.marketValue === 'High') {
    useCase.push('game development', 'VR/AR', 'animation', 'film production')
  }
  if (duration < 5) {
    useCase.push('UI/UX animation', 'avatar gestures')
  }
  if (activityType.includes('sports')) {
    useCase.push('fitness apps', 'sports simulation', 'training software')
  }
  if (activityType.includes('dance')) {
    useCase.push('music videos', 'virtual performances', 'motion graphics')
  }
  if (useCase.length === 0) {
    useCase.push('general animation', 'prototyping', 'educational content')
  }

  return {
    activityType,
    bodyParts,
    difficulty,
    useCase
  }
}

export function calculatePopularityScore(
  viewCount: number,
  licenseCount: number,
  qualityScore: number,
  ageInDays: number
): number {
  const viewScore = Math.min(50, viewCount / 10)

  const licenseScore = Math.min(30, licenseCount * 5)

  const qualityContribution = (qualityScore / 100) * 15

  const recencyBonus = ageInDays <= 7 ? 5 : ageInDays <= 30 ? 3 : 0

  const totalScore = viewScore + licenseScore + qualityContribution + recencyBonus

  return Math.round(Math.min(100, totalScore))
}

export function suggestPricing(qualityMetrics: MotionQualityMetrics, duration: number): {
  suggestedPrice: string
  priceRange: string
  reasoning: string
} {
  const basePrice = 0.01

  let multiplier = 1

  if (qualityMetrics.overallScore >= 90) multiplier = 5
  else if (qualityMetrics.overallScore >= 75) multiplier = 3
  else if (qualityMetrics.overallScore >= 60) multiplier = 1.5

  if (duration > 30) multiplier *= 1.5
  else if (duration > 60) multiplier *= 2

  const suggestedPrice = (basePrice * multiplier).toFixed(3)
  const minPrice = (basePrice * multiplier * 0.7).toFixed(3)
  const maxPrice = (basePrice * multiplier * 1.3).toFixed(3)

  let reasoning = `Based on ${qualityMetrics.marketValue.toLowerCase()} quality (${qualityMetrics.overallScore}/100)`
  reasoning += ` and ${duration.toFixed(1)}s duration. `

  if (qualityMetrics.overallScore >= 85) {
    reasoning += 'Premium quality motion data commands higher licensing fees.'
  } else if (qualityMetrics.overallScore >= 70) {
    reasoning += 'Professional quality suitable for commercial projects.'
  } else {
    reasoning += 'Good for prototyping and educational use.'
  }

  return {
    suggestedPrice: `${suggestedPrice} ETH`,
    priceRange: `${minPrice} - ${maxPrice} ETH`,
    reasoning
  }
}
