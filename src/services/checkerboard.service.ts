import { ApiService } from "@/services/api.service";
import { Checkerboard } from "@/interfaces/checkboard.interface";

export class CheckerboardService {
  static async getAll() {
    return ApiService.get<Checkerboard>("/data.json");
  }
}
