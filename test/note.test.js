/* eslint-disable node/handle-callback-err */
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const faker = require("faker");
const noteInputs = require("..//test/note.test.json");

chai.use(chaiHttp);
chai.should();

describe("create note api for positive and negative test case", () => {
  it("GivenNotesDetails_When_Note_Created_Successfully", (done) => {
    const token = noteInputs.notes.loginValidToken;
    const createNotes = {
      title: faker.lorem.word(),
      description: faker.lorem.sentence()
    };
    chai
      .request(server)
      .post("/createnotes")
      .set({ authorization: token })
      .send(createNotes)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(201);
        res.body.should.have
            .property("message")
            .eql("Successfully inserted note");
        done();
      });
  });
  it("GivenNotesDetails_When_Your_Token_Is_Invalid", (done) => {
    const token = noteInputs.notes.TokenInvalid;
    const createNotes = {
      title: faker.lorem.word(),
      description: faker.lorem.sentence()
    };
    chai
      .request(server)
      .post("/createnotes")
      .set({ authorization: token })
      .send(createNotes)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(400);
        done();
      });
  });
});  
describe("get all note api for positive and negative test case", () => {
  it("GivenGetAllNotesDetails_When_Note_Get_Successfully", (done) => {
    const token = noteInputs.notes.loginValidToken;
    chai
      .request(server)
      .get("/getnotes")
      .set({ authorization: token })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(200);
        done();
      });
  });
  it("GivenGetAllNotesDetails_When_Token_Is_Invalid", (done) => {
    const token = noteInputs.notes.TokenInvalid;
    chai
      .request(server)
      .get("/getnotes")
      .set({ authorization: token })

      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(400);
        done();
      });
  });
  it("GivenGetAllNotesDetails_When_Token_Has_Empty", (done) => {
    const token = noteInputs.notes.EmptyToken;
    chai
      .request(server)
      .get("/getnotes")
      .set({ authorization: token })

      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(401);
        done();
      });
  });
});

describe("get note by id api for positive and negative test case", () => {
  it("GivenGetNoteByIdDetails_When_Note_Get_Successfully", (done) => {
    const token = noteInputs.notes.loginValidToken;
    const id = noteInputs.notes.GetById;
    chai
      .request(server)
      .get(`/getnotesbyid/${id}`)
      .set({ authorization: token })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(200);
        done();
      });
  });
  it("GivenGetNoteByIdDetails_When_Token_Is_Invalid", (done) => {
    const token = noteInputs.notes.TokenInvalid;
    const id = noteInputs.notes.GetById;
    chai
      .request(server)
      .get(`/getnotesbyid/${id}`)
      .set({ authorization: token })

      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(400);
        done();
      });
  });
  it("GivenGetNoteByIdDetails_When_Token_Is_Empty", (done) => {
    const token = noteInputs.notes.EmptyToken;
    const id = noteInputs.notes.GetById;
    chai
      .request(server)
      .get(`/getnotesbyid/${id}`)
      .set({ authorization: token })

      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(401);
        done();
      });
  });
  it("GivenGetNoteByIdDetails_When_Id_Has_Empty", (done) => {
    const token = noteInputs.notes.loginValidToken;
    const id = noteInputs.notes.EmptyId;
    chai
      .request(server)
      .get(`/getnotesbyid/${id}`)
      .set({ authorization: token })

      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(404);
        done();
      });
  });
});

describe("update note by id api for positive and negative test case", () => {
  it("GivenUpdateNoteByIdDetails_When_Note_Get_Successfully", (done) => {
    const token = noteInputs.notes.loginValidToken;
    const id = noteInputs.notes.UpdateById;
    const updateNote = {
      title: faker.lorem.word(),
      description: faker.lorem.sentence()
    };
    chai
      .request(server)
      .put(`/updatenotes/${id}`)
      .set({ authorization: token })
      .send(updateNote)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(201);
        done();
      });
  });
  it("GivenUpdateNoteByIdDetails_When_Token_Is_Invalid", (done) => {
    const token = noteInputs.notes.TokenInvalid;
    const id = noteInputs.notes.UpdateById;
    const updateNote = {
      title: faker.lorem.word(),
      description: faker.lorem.sentence()
    };
    chai
      .request(server)
      .put(`/updatenotes/${id}`)
      .set({ authorization: token })
      .send(updateNote)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(400);
        done();
      });
  });
  it("GivenUpdateNoteByIdDetails_When_Token_Has_Empty", (done) => {
    const token = noteInputs.notes.EmptyToken;
    const id = noteInputs.notes.UpdateById;
    const updateNote = {
      title: faker.lorem.word(),
      description: faker.lorem.sentence()
    };
    chai
      .request(server)
      .put(`/updatenotes/${id}`)
      .set({ authorization: token })
      .send(updateNote)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(401);
        done();
      });
  });
  
  it("GivenUpdateNoteByIdDetails_When_Id_Has_Empty", (done) => {
    const token = noteInputs.notes.loginValidToken;
    const id = noteInputs.notes.UpdateById_EmptyId;
    const updateNote = {
      title: faker.lorem.word(),
      description: faker.lorem.sentence()
    };
    chai
      .request(server)
      .put(`/updatenotes/${id}`)
      .set({ authorization: token })
      .send(updateNote)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(404);
        done();
      });
  });
});

describe("delete note by id api for positive and negative test case", () => {
  it("GivenDeleteNoteByIdDetails_When_Note_Deleted_Successfully", (done) => {
    const token = noteInputs.notes.loginValidToken;
    const id = noteInputs.notes.DeleteById;
    chai
      .request(server)
      .delete(`/deletenotes/${id}`)
      .set({ authorization: token })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(200);
        done();
      });
  });
  it("GivenGetNoteByIdDetails_When_Token_Is_Invalid", (done) => {
    const token = noteInputs.notes.TokenInvalid;
    const id = noteInputs.notes.DeleteById;
    chai
      .request(server)
      .delete(`/deletenotes/${id}`)
      .set({ authorization: token })

      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(400);
        done();
      });
  });
  it("GivenGetNoteByIdDetails_When_Token_Has_Empty", (done) => {
    const token = noteInputs.notes.EmptyToken;
    const id = noteInputs.notes.DeleteById;
    chai
      .request(server)
      .delete(`/deletenotes/${id}`)
      .set({ authorization: token })

      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(401);
        done();
      });
  });
  
  it("GivenGetNoteByIdDetails_When_Id_Has_Empty", (done) => {
    const token = noteInputs.notes.loginValidToken;
    const id = noteInputs.notes.DeleteById_EmptyId;
    chai
      .request(server)
      .delete(`/deletenotes/${id}`)
      .set({ authorization: token })

      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(404);
        done();
      });
  });
});