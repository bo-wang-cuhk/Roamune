import 'fake-indexeddb/auto'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { closeDatabase } from '../src/db/db'
import { DATABASE_NAME } from '../src/db/schema'
import { tripRepository } from '../src/repo/tripRepository'

const draft = {
  title: 'Kyoto in autumn',
  destination: 'Kyoto, Japan',
  startDate: '2026-11-02',
  endDate: '2026-11-08',
  coverImage: null,
  notes: 'Walk the Philosopher’s Path.',
}

function deleteDatabase() {
  return new Promise<void>((resolve, reject) => {
    const request = indexedDB.deleteDatabase(DATABASE_NAME)
    request.onsuccess = () => resolve()
    request.onerror = () => reject(request.error)
  })
}

beforeEach(async () => {
  await closeDatabase()
  await deleteDatabase()
})

afterEach(async () => {
  await closeDatabase()
})

describe('tripRepository', () => {
  it('creates and reads a persistent trip with generated metadata', async () => {
    const created = await tripRepository.createTrip(draft)
    expect(created.id).toBeTruthy()
    expect(created.createdAt).toBeTruthy()
    expect(created.updatedAt).toBe(created.createdAt)
    expect(await tripRepository.getTrip(created.id)).toEqual(created)
    expect(await tripRepository.getAllTrips()).toEqual([created])
  })

  it('updates mutable fields without changing identity or createdAt', async () => {
    const created = await tripRepository.createTrip(draft)
    const updated = await tripRepository.updateTrip(created.id, { title: 'Kyoto, slowly' })
    expect(updated.id).toBe(created.id)
    expect(updated.createdAt).toBe(created.createdAt)
    expect(updated.title).toBe('Kyoto, slowly')
    expect(updated.destination).toBe(created.destination)
  })

  it('deletes a trip', async () => {
    const created = await tripRepository.createTrip(draft)
    await tripRepository.deleteTrip(created.id)
    expect(await tripRepository.getTrip(created.id)).toBeUndefined()
  })

  it('rejects an invalid date range', async () => {
    await expect(tripRepository.createTrip({ ...draft, endDate: '2026-10-01' })).rejects.toThrow('End date')
  })
})

