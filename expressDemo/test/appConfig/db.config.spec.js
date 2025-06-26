import { describe, it, expect, vi, afterEach } from "vitest";
import connectDB from "../../appconfig/db.config.js";

describe("connectDB()", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should connect to MongoDB with the correct URI", async () => {
    // Arrange
    const fakeURI = "mongodb://localhost:27017/test_assets_db";
    const connectStub = vi.fn().mockResolvedValue();
    const configStub = {
      get: vi.fn().mockReturnValue(fakeURI),
    };

    // Act
    await connectDB({ connect: connectStub }, configStub);

    // Assert
    expect(configStub.get).toHaveBeenCalledWith("MONGO_URI");
    expect(connectStub).toHaveBeenCalledWith(fakeURI, {
      useNewUrlParser: true,
    });
  });

  it("should log error and exit process on connection failure", async () => {
    const fakeURI = "invalid_uri";
    const errorMessage = "Connection failed";
    const connectStub = vi.fn().mockRejectedValue(new Error(errorMessage));
    const configStub = {
      get: vi.fn().mockReturnValue(fakeURI),
    };
    const exitStub = vi.spyOn(process, "exit").mockImplementation(() => {});

    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    await connectDB({ connect: connectStub }, configStub);

    expect(connectStub).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledWith(
      "DB Connection Failed:",
      expect.objectContaining({ message: errorMessage })
    );
    expect(exitStub).toHaveBeenCalledWith(1);
  });
});
