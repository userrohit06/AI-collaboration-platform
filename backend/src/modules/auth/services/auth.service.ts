import { HTTP_STATUS } from "../../../shared/constants/http-status";
import { AppError, ERROR_CODES } from "../../../shared/errors";
import { userService } from "../../user/servicess/user.service";
import { RegisterDto } from "../types/auth.types";

class AuthService {
  async register(registerDto: RegisterDto) {
    const emailExists = await userService.checkEmailExists(registerDto.email);

    if (emailExists) {
      throw new AppError(
        HTTP_STATUS.CONFLICT,
        "Email already exists",
        ERROR_CODES.USER_ALREADY_EXISTS,
      );
    }

    const user = await userService.createUser(registerDto);
    return user;
  }
}

export const authService = new AuthService();
