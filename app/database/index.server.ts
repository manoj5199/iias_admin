import { MongoClient } from "mongodb";

const uri = 'mongodb+srv://test:test123@cluster0.juyumwx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const mongoClient = new MongoClient(uri);

// await mongoClient.connect();

const db = mongoClient.db('iias-demo');

const nav_collection = db.collection('navigation');

const courses = db.collection('courses');

const blogs = db.collection('blogs');

const gallery = db.collection('gallery');

const customers = db.collection('customers');

export { nav_collection, courses, blogs, gallery, customers };