// seed.js
// =============================================================================
//  Seed the database with realistic test data.
//  Run with: npm run seed
//
//  Required minimum:
//    - 2 users
//    - 4 projects (split across the users)
//    - 5 tasks (with embedded subtasks and tags arrays)
//    - 5 notes (some attached to projects, some standalone)
//
//  Use the bcrypt module to hash passwords before inserting users.
//  Use ObjectId references for relationships (projectId, ownerId).
// =============================================================================

require('dotenv').config();
const bcrypt = require('bcryptjs');
const { connect } = require('./db/connection');

(async () => {
  const db = await connect();

  // OPTIONAL: clear existing data so re-seeding is idempotent
  await db.collection('users').deleteMany({});
  await db.collection('projects').deleteMany({});
  await db.collection('tasks').deleteMany({});
  await db.collection('notes').deleteMany({});

  // =============================================================================
  //  TODO: Insert your seed data below.
  const password1= await bcrypt.hash('password123',10)
  const password2= await bcrypt.hash('password789',10)
  //  Hints:
  //    - Hash passwords:   const hash = await bcrypt.hash('password123', 10);
  //    - Capture inserted ids:
  const u1 = await db.collection('users').insertOne({ email:"Tahaqureshi68@gmail.com",passwordHash:password1,name:"Taha",createdAt: new Date() });
  
  const u2= await db.collection('users').insertOne({ email:"pashaDON@gmail.com",passwordHash:password2,name:"Pasha DON",createdAt: new Date() });
  
  const user1 = u1.insertedId;
  const user2 = u2.insertedId;

  const project1= await db.collection('projects').insertOne({ownerId:user1,name:"LexAI",description:"Lawyer GOATED",archived:false,createdAt:new Date()})
  const project2= await db.collection('projects').insertOne({ownerId:user1,name:"PASHA PROJECT",description:"PASHAAAAAA",archived:true,createdAt:new Date()})
  const project3= await db.collection('projects').insertOne({ownerId:user2,name:"1000 bande corolla mei ",description:"ANAS BHAI GOATED",archived:false,createdAt:new Date()})
  const project4= await db.collection('projects').insertOne({ownerId:user2,name:"GHOST DIstribution system",archived:false,createdAt:new Date()})


  const p1=project1.insertedId
  const p2=project2.insertedId
  const p3=project3.insertedId
  const p4=project4.insertedId

 await db.collection('tasks').insertMany([
    {
      ownerId: user1Id,
      projectId: p1Id,
      title: "Write report",
      status: "todo",
      priority: 3,
      tags: ["writing", "urgent"],
      subtasks: [
        { title: "Outline", done: true },
        { title: "Draft", done: false }
      ],
      dueDate: new Date(),
      createdAt: new Date()
    },
    {
      ownerId: user1Id,
      projectId: p1Id,
      title: "Implement queries",
      status: "in-progress",
      priority: 5,
      tags: ["coding"],
      subtasks: [
        { title: "Query 1-5", done: true },
        { title: "Query 6-15", done: false }
      ],
      createdAt: new Date()
    },
    {
      ownerId: user1Id,
      projectId: p2Id,
      title: "LEX AI new model",
      status: "done",
      priority: 2,
      tags: ["SE project"],
      subtasks: [
        { title: "VECTOR DB", done: true },
        { title: "CORRECT ANSWER", done: false }
      ],
      createdAt: new Date()
    },
    {
      ownerId: user2Id,
      projectId: p3Id,
      title: "Build API",
      status: "todo",
      priority: 4,
      tags: ["backend"],
      subtasks: [
        { title: "Routes", done: false }
      ],
      createdAt: new Date()
    },
    {
      ownerId: user2Id,
      projectId: p4Id,
      title: "Play ranked match",
      status: "in-progress",
      priority: 1,
      tags: ["gaming"],
      subtasks: [],
      createdAt: new Date()
    }
  ]);

    await db.collection('notes').insertOne(
    {
      ownerId: user2,
      projectId: p3,
      title: "LEXAI krlo",
      body: "Remember aggregation pipelines",
      tags: [],
      createdAt: new Date()
    })
     await db.collection('notes').insertOne(
    {
      ownerId: user2,
      projectId: p4,
      title: "Pakistan MENTIONED !!!!!!",
      body: "ye nahi likhna mene",
      tags: ["susti mar rhi"],
      pinned:true,
      createdAt: new Date()
    })
     await db.collection('notes').insertOne(
    {
      ownerId: user2,
      projectId: p2,
      title: "DB Notes",
      body: "Remember aggregation pipelines",
      tags: ["study"],
      createdAt: new Date()
    })
     await db.collection('notes').insertOne(
    {
      ownerId: user1,
      projectId: p2,
      title: "SE PROJECT",
      body: "SE ka project",
      tags: ["Project"],
      createdAt: new Date()
    })
     await db.collection('notes').insertOne(
    {
      ownerId: user1,
      projectId: p1,
      title: "DB ki assignment",
      body: "Assignment 2",
      tags: ["study"],
      createdAt: new Date()
    })
    


  //    - Use those ids when inserting projects/tasks/notes.
  //    - Demonstrate schema flexibility: include at least one optional field
  //      on SOME documents but not all (e.g. dueDate on some tasks only).
  //
  //  Sample task shape:
  //    {
  //      ownerId: <ObjectId>,
  //      projectId: <ObjectId>,
  //      title: "Write report introduction",
  //      status: "todo",
  //      priority: 3,
  //      tags: ["writing", "urgent"],
  //      subtasks: [
  //        { title: "Outline sections", done: true },
  //        { title: "Draft", done: false }
  //      ],
  //      createdAt: new Date()
  //    }
  // =============================================================================

  console.log('TODO: implement seed.js');
  process.exit(0);
})();
