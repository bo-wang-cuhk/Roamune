export type Trip = {
  id: string
  title: string
  destination: string
  startDate: string
  endDate: string
  coverImage: string | null
  notes: string
  createdAt: string
  updatedAt: string
}

export type TripDraft = Pick<
  Trip,
  'title' | 'destination' | 'startDate' | 'endDate' | 'coverImage' | 'notes'
>

export type TripUpdate = Partial<TripDraft>

