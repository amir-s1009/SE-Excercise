import { Router } from "express";
import { Request, Response } from "express";
import { KeyValueController } from "../controllers/keyValue";

const router = Router();

router.get("/getKeyValueList", async (req: Request, res: Response) => {
  await KeyValueController.getKeyValueListController({ req, res });
});
router.get("/getKeyValue/:key", async (req: Request, res: Response) => {
  await KeyValueController.getKeyValueByKeyController({ req, res });
});
router.post("/createKeyValue", async (req: Request, res: Response) => {
  await KeyValueController.createKeyValueController({ req, res });
});
router.delete("/deleteKeyValue/:key", async (req: Request, res: Response) => {
  await KeyValueController.deleteKeyValueController({ req, res });
});

export default router;
