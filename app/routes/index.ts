import passport from "passport";
import express from "express";
const router = express.Router();

/* GET home page. */
router.get("/", function(req, res) {
	res.render("pages/index");
});

router.get("/login", function(req, res) {
	res.render("pages/system/login");
});

router.post(
	"/login",
	passport.authenticate("local", {
		successRedirect: "/",
		failureRedirect: "/login",
	})
);

export = router;
