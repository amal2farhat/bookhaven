import { Router } from 'express';
import { createbook,upload,AllBook,updatebook,deletebook ,getbookbyid,getdetailsbookbyid} from '../controllers/book.js';

const router = Router();





router.get("/allbooks", AllBook);

router.post("/createbook",upload.single('image'),createbook);
router.delete("/deletebook/:id", deletebook);
router.get("/getbook/:id",getbookbyid),
router.get("/getdetailsbook/:id",getdetailsbookbyid),
router.put("/updatebook/:id",upload.single('image'),updatebook);
//router.delete("/deletebook/:id",
//  router.get("/getbook/:id",
export default router;
