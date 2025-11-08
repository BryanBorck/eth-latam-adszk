export interface Advertisement {
  id: string
  title: string
  description: string
  imageUrl: string
  category: string
  price?: string
  location?: string
  // Add more fields as needed from SDK
}

export type SwipeDirection = 'left' | 'right'

export interface SwipeAction {
  adId: string
  direction: SwipeDirection
  timestamp: Date
}

