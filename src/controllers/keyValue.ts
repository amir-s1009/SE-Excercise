import {
  getUserByPhoneNumberPasswordService,
  signupUserService,
  userAlreadyExistsService,
} from "../services/keyValue";
import { TControllerProps, TJWT } from "../types/types";
import { response } from "../utils/response";
import {
  loginValidator,
  resetPasswordValidator,
  signupValidator,
} from "../validators/keyValue";
import { loginResponse } from "./type.auth";
import { signJWT } from "../utils/signJWT";
import { Role } from "@prisma/client";

export async function loginController({ req, res }: TControllerProps) {
  try {
    // Ensure body exists
    if (!req.body) {
      return response(res, { code: 400, message: "بدنه درخواست خالی است" });
    }

    const body = req.body as loginValidator["body"];

    // Validate required fields (extra safeguard in case validator is skipped)
    if (!body.phoneNumber || !body.password) {
      return response(res, {
        code: 400,
        message: "شماره تلفن و رمز عبور الزامی است",
      });
    }

    // Fetch user from DB
    const user = await getUserByPhoneNumberPasswordService({ body });
    if (!user) {
      return response(res, {
        code: 404,
        message: "چنین کاربری در سیستم یافت نشد",
      });
    }

    // Build JWT payload
    const payload: TJWT = {
      id: user.id,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role as Role,
    };

    // Sign JWT tokens
    const { accessToken, refreshToken } = await signJWT(payload);

    // Send response
    return response<loginResponse>(res, {
      code: 200,
      message: "توکن شما با موفقیت ایجاد شد",
      data: { accessToken, refreshToken },
    });
  } catch (err) {
    console.error("LoginController Error:", err);
    return response(res, {
      code: 500,
      message: "خطای سرور رخ داده است",
    });
  }
}

export async function signupController({
  req,
  res,
}: TControllerProps) {
  try {
    // Ensure request body exists
    if (!req.body) {
      return response(res, { code: 400, message: "بدنه درخواست خالی است" });
    }

    const body = req.body as signupValidator["body"];

    // Basic field validation in case validator is bypassed
    if (!body.phoneNumber || !body.password || !body.email || !body.firstName || !body.lastName) {
      return response(res, { code: 400, message: "تمام فیلدهای ضروری باید پر شوند" });
    }

    // Check if user already exists
    const userExists = await userAlreadyExistsService({ body });
    if (userExists) {
      return response(res, {
        code: 403,
        message: "کاربر قبلا در سیستم ثبت نام کرده است.",
      });
    }

    // Create new user
    const user = await signupUserService({ body });
    if (!user) {
      return response(res, { code: 500, message: "خطای ایجاد کاربر رخ داده است" });
    }

    // Build JWT payload
    const payload: TJWT = {
      id: user.id,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role as Role,
    };

    // Sign JWT tokens
    const { accessToken, refreshToken } = await signJWT(payload);

    // Send success response
    return response<loginResponse>(res, {
      code: 201,
      message: "حساب کاربری شما با موفقیت ایجاد شد.",
      data: { accessToken, refreshToken },
    });
  } catch (err) {
    console.error("SignupController Error:", err);
    return response(res, {
      code: 500,
      message: "خطای سرور رخ داده است",
    });
  }
}


// export async function forgetPasswordController({
//   req,
//   res,
// }: TControllerProps): Promise<void> {
//   try{
//     const body = req.body as resetPasswordValidator["body"];

//   }
//   catch{
//       response(res, {
//         code:500,
//         message:"خطای سرور رخ داده است."
//       })
//     }
//   }
// }
