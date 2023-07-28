import request from 'supertest'

import app from '../../app'
import mongoose from 'mongoose'
import UserModel from '../models/user.model'
import { Md5 } from 'ts-md5'
import { LoginService } from '../services/login.service'
import BookModel from '../models/book.model'

process.env.NODE_ENV = 'test'
process.env.PORT = '3001'
process.env.MONGO_URL = 'mongodb://localhost:27017/project-testing'

let token: string | false | undefined = ''

const mockUserData = { username: 'test', name: 'test', password: Md5.hashStr('3323'), _id: '64c2f224fec367638dbea65c', __v: 0 }
const mockData = { name: 'test', code: 3323, _id: '64c2f224fec367638dbea65f', __v: 0 }
const mockCreateData = { name: 'test', code: 3323, _id: '64c2f224fec367638dbea65d', __v: 0 }
const loginData = { login: mockUserData.username, password: '3323' }
const createMockUserData = { username: 'test1', name: 'test', password: Md5.hashStr('3323'), _id: '64c2f224fec367638dbea65a', __v: 0 }

beforeAll(async () => {
  await UserModel.create(mockUserData)
  await BookModel.create(mockData)
  token = await LoginService.login(loginData)
})
afterAll(async () => {
  await mongoose.connection.db.dropDatabase()
  await mongoose.connection.close()
})
describe('Test login route', () => {
  test('login', async () => {
    const res = await request(app).post('/users/login').send(loginData)
    expect(res.status).toEqual(200)
  })
  test('create', async () => {
    const res = await request(app).post('/users').send(createMockUserData)
    expect(res.status).toEqual(201)
  })
})

describe('Test book routes', () => {
  test('get books', async () => {
    const res = await request(app).get('/books')
    expect(res.body).toEqual([mockData])
  })
  test('get book', async () => {
    const res = await request(app).get('/books/64c2f224fec367638dbea65f')
    expect(res.body).toEqual(mockData)
  })
  test('create book', async () => {
    const res = await request(app).post('/books').send(mockCreateData)
    expect(res.body).toEqual(mockCreateData)
  })
  test('delete book', async () => {
    const res = await request(app).delete('/books/64c2f224fec367638dbea65d')
    expect(res.status).toEqual(204)
  })
  test('update book', async () => {
    const res = await request(app).put('/books/64c2f224fec367638dbea65d')
    expect(res.status).toEqual(204)
  })
})

describe('Test rent routes', () => {
  test('rent a book', async () => {
    const res = await request(app).post('/books').send({ book: mockData._id }).set('Authorization', token?.toString() ?? '')
    expect(res.status).toEqual(201)
  })
})
