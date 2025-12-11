import { KeyValueService } from "../services/keyValue";
import { TControllerProps } from "../types/types";
import { response } from "../utils/response";

class KeyValueController {
  public static getKeyValueListController({ req, res }: TControllerProps) {
    try {
      const data = KeyValueService.getAllKeyValues();
      return response(res, {
        code: 200,
        message: "The list of keyValues sent.",
        data,
      });
    } catch (err) {
      return response(res, {
        code: 500,
        message: (err as any).message || "A problem has rised!",
      });
    }
  }

  public static getKeyValueByKeyController({ req, res }: TControllerProps) {
    try {
      const key = req.params.key as string;
      const data = KeyValueService.getKeyValueByKey(key);
      return response(res, {
        code: 200,
        message: "The keyValue data sent.",
        data,
      });
    } catch (err) {
      return response(res, {
        code: 500,
        message: (err as any).message || "A problem has rised!",
      });
    }
  }

  public static createKeyValueController({ req, res }: TControllerProps) {
    try {
      const body = req.body as KeyValue;
      const data = KeyValueService.createKeyValue(body);
      return response(res, {
        code: 201,
        message: "The keyValue has been created.",
        data,
      });
    } catch (err) {
      return response(res, {
        code: 500,
        message: (err as any).message || "A problem has rised!",
      });
    }
  }

  public static deleteKeyValueController({ req, res }: TControllerProps) {
    try {
      const key = req.params.key as string;
      const data = KeyValueService.deleteKeyValue(key);
      return response(res, {
        code: 204,
        message: "The keyValue has been deleted.",
        data,
      });
    } catch (err) {
      return response(res, {
        code: 500,
        message: (err as any).message || "A problem has rised!",
      });
    }
  }
}
