const TREK_GRADIENTS = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
  'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)',
  'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
] as const

function gradientFor(seed: string) {
  let hash = 0
  for (let index = 0; index < seed.length; index += 1) {
    hash = ((hash << 5) - hash + seed.charCodeAt(index)) | 0
  }
  return TREK_GRADIENTS[Math.abs(hash) % TREK_GRADIENTS.length]
}

export function TripCoverMedia({
  coverImage,
  seed,
  className = '',
  alt = '',
}: {
  coverImage: string | null
  seed: string
  className?: string
  alt?: string
}) {
  if (coverImage) {
    return <img className={`trip-cover-media ${className}`} src={coverImage} alt={alt} />
  }

  return (
    <div
      className={`trip-cover-media trip-cover-gradient ${className}`}
      style={{ backgroundImage: gradientFor(seed) }}
      role="img"
      aria-label={alt || 'Trip cover'}
    />
  )
}
