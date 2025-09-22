import mongoose from "mongoose";

class Quizdb {
  private uri: string;

  
  constructor(uri: string) {
    this.uri = uri;
  }


  private async sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }


  public async connect(): Promise<void> {
    if (mongoose.connection.readyState != 0) {
      console.log("Connection with database does already exist");
      return;
    }

    while (mongoose.connection.readyState === 0) {
      try {
        console.log("Trying to connect to db...");
        await mongoose.connect(this.uri);
        break;
      } catch (error) {
        console.error("Could not conncet to db: ", error);
        console.log("Retrying...");
        await this.sleep(5000);
      }
    }
  }


  public async disconnect() {
    try {
      await mongoose.disconnect();
    } catch (error) {
      console.error("Error when trying to disconnect from DB: ", error);
    }
  }
}

export default Quizdb;
