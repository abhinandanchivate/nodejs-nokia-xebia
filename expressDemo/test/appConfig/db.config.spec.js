import sinon from "sinon";
import proxyrequire from "proxyquire";
describe("checking DB Config ", () => {
  let connectStub, configGetStub, connectDB;
  // it : writing the test case
  // beforeEach (common part for the test suite which is required for each and every testcase): runs before each test case any kind of common setup is required for before the execution of testcase.
  beforeEach(() => {
    connectStub = sinon.stub();
    configGetStub = sinon
      .stub()
      .returns("mongodb://localhost:27017/dev_telecomassetsmngt");
    connectDB = proxyrequire("../../appconfig/db.config", {
      mongoose: {
        connect: connectStub,
      },
      config: {
        get: configGetStub,
      },
    }).default;
    // stub : it is used to replace the original function with the mock function
  });
  afterEach(() => {
    sinon.restore(); // Restore all stubs and spies
  });
});
