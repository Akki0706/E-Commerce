// const express = require("express");
// const router = express.Router();
// const Category = require("./../db/category");
// const { addCategory, getCategories, updateCategory, deleteCategory, getCategoryById } = require("../handlers/category-handler");
// router.post("", async (req, res) => {
//     let model = req.body;

//     let result = await addCategory(model);
//     res.send(result);
// });

// router.get("", async (req, res) => {
//     let result = await getCategories();
//     res.send(result);
// });


// router.get("/:id", async (req, res) => {
//     try {
//         const id = req.params["id"];
//         const result = await getCategoryById(id);
//         if (!result) {
//             return res.status(404).send({ message: "Category not found" });
//         }
//         res.send(result);
//     } catch (error) {
//         res.status(500).send({ error: error.message });
//     }
// });


// router.put("/:id", async (req, res) => {
//     let model = req.body;
//     let id = req.params["id"];
//     await updateCategory(id, model);
//     res.send({ message: "Updated" });
// });

// router.delete("/:id", async (req, res) => {
//     let id = req.params["id"];
//     await deleteCategory(id);
//     res.send({ message: " deleted" });
// });

// module.exports = router;




// const express = require("express");
// const router = express.Router();
// const { verifyToken } = require("../middlewares/auth");
// const { addCategory, getCategories, updateCategory, deleteCategory, getCategoryById } = require("../handlers/category-handler");

// router.post("", verifyToken, async (req, res) => {
//     let model = req.body;
//     let result = await addCategory(model);
//     res.send(result);
// });

// router.get("", verifyToken, async (req, res) => {
//     let result = await getCategories();
//     res.send(result);
// });

// router.get("/:id", verifyToken, async (req, res) => {
//     try {
//         const id = req.params["id"];
//         const result = await getCategoryById(id);
//         if (!result) {
//             return res.status(404).send({ message: "Category not found" });
//         }
//         res.send(result);
//     } catch (error) {
//         res.status(500).send({ error: error.message });
//     }
// });

// router.put("/:id", verifyToken, async (req, res) => {
//     let model = req.body;
//     let id = req.params["id"];
//     await updateCategory(id, model);
//     res.send({ message: "Updated" });
// });

// router.delete("/:id", verifyToken, async (req, res) => {
//     let id = req.params["id"];
//     await deleteCategory(id);
//     res.send({ message: "Deleted" });
// });

// module.exports = router;



// const express = require("express");
// const router = express.Router();
// const { verifyToken } = require("../middleware/auth-middleware.js"); // Corrected path
// const Category = require("./../db/category");
// const { addCategory, getCategories, updateCategory, deleteCategory, getCategoryById } = require("../handlers/category-handler");

// // Apply verifyToken middleware to all routes
// router.use(verifyToken);

// router.post("", async (req, res) => {
//     let model = req.body;
//     let result = await addCategory(model);
//     res.send(result);
// });

// router.get("", async (req, res) => {
//     let result = await getCategories();
//     res.send(result);
// });

// router.get("/:id", async (req, res) => {
//     try {
//         const id = req.params["id"];
//         const result = await getCategoryById(id);
//         if (!result) {
//             return res.status(404).send({ message: "Category not found" });
//         }
//         res.send(result);
//     } catch (error) {
//         res.status(500).send({ error: error.message });
//     }
// });

// router.put("/:id", async (req, res) => {
//     let model = req.body;
//     let id = req.params["id"];
//     await updateCategory(id, model);
//     res.send({ message: "Updated" });
// });

// router.delete("/:id", async (req, res) => {
//     let id = req.params["id"];
//     await deleteCategory(id);
//     res.send({ message: " deleted" });
// });

// module.exports = router;




const express = require("express");
const router = express.Router();
const Category = require("./../db/category");
const { addCategory, getCategories, updateCategory, deleteCategory, getCategoryById } = require("../handlers/category-handler");

router.post("", async (req, res) => {
    try {
        let model = req.body;
        let result = await addCategory(model);
        res.send(result);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

router.get("", async (req, res) => {
    try {
        let result = await getCategories();
        res.send(result);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const id = req.params["id"];
        const result = await getCategoryById(id);
        if (!result) {
            return res.status(404).send({ message: "Category not found" });
        }
        res.send(result);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        let model = req.body;
        let id = req.params["id"];
        await updateCategory(id, model);
        res.send({ message: "Updated successfully" });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        let id = req.params["id"];
        await deleteCategory(id);
        res.send({ message: "Deleted successfully" });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

module.exports = router;