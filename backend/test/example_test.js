const chai = require("chai");
const sinon = require("sinon");
const mongoose = require("mongoose");

const Energy = require("../models/Energy");
const {
  addEnergy,
  getEnergy,
  updateEnergy,
  deleteEnergy
} = require("../controllers/energyController");

const { expect } = chai;

afterEach(() => {
  sinon.restore();
});

describe("AddEnergy Function Test", () => {
  it("should create a new energy entry successfully", async () => {
    const userId = new mongoose.Types.ObjectId();

    const req = {
      user: { id: userId },
      body: {
        applianceName: "Air Conditioner",
        usage: 12,
        unit: "kWh",
        date: "2030-01-01"
      }
    };

    const createdEnergy = {
      _id: new mongoose.Types.ObjectId(),
      applianceName: "Air Conditioner",
      usage: 12,
      unit: "kWh",
      date: "2030-01-01",
      userId
    };

    const createStub = sinon.stub(Energy, "create").resolves(createdEnergy);

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };

    await addEnergy(req, res);

    expect(createStub.calledOnce).to.be.true;
    expect(res.status.calledWith(201)).to.be.true;
    expect(res.json.calledOnce).to.be.true;
  });

  it("should return 500 if an error occurs", async () => {
    const userId = new mongoose.Types.ObjectId();

    sinon.stub(Energy, "create").throws(new Error("DB Error"));

    const req = {
      user: { id: userId },
      body: {
        applianceName: "Air Conditioner",
        usage: 12,
        unit: "kWh",
        date: "2030-01-01"
      }
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };

    await addEnergy(req, res);

    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.called).to.be.true;
  });
});

describe("UpdateEnergy Function Test", () => {
  it("should update energy entry successfully", async () => {
    const userId = new mongoose.Types.ObjectId();
    const energyId = new mongoose.Types.ObjectId();

    const existingEnergy = {
      _id: energyId,
      applianceName: "Old Fan",
      usage: 3,
      unit: "kWh",
      date: "2030-01-01",
      userId,
      save: sinon.stub().resolvesThis()
    };

    sinon.stub(Energy, "findOne").resolves(existingEnergy);

    const req = {
      user: { id: userId },
      params: { id: energyId.toString() },
      body: {
        applianceName: "New Fan",
        usage: 10,
        unit: "kWh",
        date: "2030-01-01"
      }
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };

    await updateEnergy(req, res);

    expect(existingEnergy.applianceName).to.equal("New Fan");
    expect(existingEnergy.usage).to.equal(10);
    expect(existingEnergy.unit).to.equal("kWh");
    expect(res.json.calledOnce).to.be.true;
  });

  it("should return 404 if energy entry is not found", async () => {
    const userId = new mongoose.Types.ObjectId();

    sinon.stub(Energy, "findOne").resolves(null);

    const req = {
      user: { id: userId },
      params: { id: new mongoose.Types.ObjectId().toString() },
      body: {}
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };

    await updateEnergy(req, res);

    expect(res.status.calledWith(404)).to.be.true;
    expect(res.json.called).to.be.true;
  });

  it("should return 500 on error", async () => {
    const userId = new mongoose.Types.ObjectId();

    sinon.stub(Energy, "findOne").throws(new Error("DB Error"));

    const req = {
      user: { id: userId },
      params: { id: new mongoose.Types.ObjectId().toString() },
      body: {}
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };

    await updateEnergy(req, res);

    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.called).to.be.true;
  });
});

describe("GetEnergy Function Test", () => {
  it("should return energy entries for the given user", async () => {
    const userId = new mongoose.Types.ObjectId();

    const entries = [
      {
        _id: new mongoose.Types.ObjectId(),
        applianceName: "Fan",
        usage: 5,
        unit: "kWh",
        date: "2030-01-01",
        userId
      },
      {
        _id: new mongoose.Types.ObjectId(),
        applianceName: "Fridge",
        usage: 8,
        unit: "kWh",
        date: "2030-01-01",
        userId
      }
    ];

    const findStub = sinon.stub(Energy, "find").resolves(entries);

    const req = {
      user: { id: userId }
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };

    await getEnergy(req, res);

    expect(findStub.calledOnce).to.be.true;
    expect(res.json.calledWith(entries)).to.be.true;
  });

  it("should return 500 on error", async () => {
    const userId = new mongoose.Types.ObjectId();

    sinon.stub(Energy, "find").throws(new Error("DB Error"));

    const req = {
      user: { id: userId }
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };

    await getEnergy(req, res);

    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.called).to.be.true;
  });
});

describe("DeleteEnergy Function Test", () => {
  it("should delete an energy entry successfully", async () => {
    const userId = new mongoose.Types.ObjectId();
    const energyId = new mongoose.Types.ObjectId();

    const energy = {
      _id: energyId,
      userId,
      deleteOne: sinon.stub().resolves()
    };

    sinon.stub(Energy, "findOne").resolves(energy);

    const req = {
      user: { id: userId },
      params: { id: energyId.toString() }
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };

    await deleteEnergy(req, res);

    expect(res.json.calledOnce).to.be.true;
  });

  it("should return 404 if energy entry is not found", async () => {
    const userId = new mongoose.Types.ObjectId();

    sinon.stub(Energy, "findOne").resolves(null);

    const req = {
      user: { id: userId },
      params: { id: new mongoose.Types.ObjectId().toString() }
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };

    await deleteEnergy(req, res);

    expect(res.status.calledWith(404)).to.be.true;
    expect(res.json.called).to.be.true;
  });

  it("should return 500 if an error occurs", async () => {
    const userId = new mongoose.Types.ObjectId();

    sinon.stub(Energy, "findOne").throws(new Error("DB Error"));

    const req = {
      user: { id: userId },
      params: { id: new mongoose.Types.ObjectId().toString() }
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };

    await deleteEnergy(req, res);

    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.called).to.be.true;
  });
});