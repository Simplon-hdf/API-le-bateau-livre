export default class NormalizedResponse {
    constructor(private readonly message: string, private readonly data: any) {}
  
    public toJSON() {
      return {
        message: this.message,
        data: this.data,
      };
    }
  }