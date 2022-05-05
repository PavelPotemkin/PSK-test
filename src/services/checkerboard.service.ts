import { ApiService } from "@/services/api.service";
import { ICheckerboard } from "@/interfaces/checkerboard.interface";

export class CheckerboardService {
  static async getAll() {
    return ApiService.get<ICheckerboard>("/data.json");
  }
}
