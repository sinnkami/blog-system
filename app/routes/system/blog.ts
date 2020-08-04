import express from "express";
import log4js from "../../lib/modules/log4js";
const logger = log4js.getLogger();

import EntryService from "../../lib/service/EntryService";
import { IUpdateEntryRequest } from "../../lib/definitions/routers/system/blog";
import CategoryService from "../../lib/service/CategoryService";
import Utility from "../../lib/modules/Utility";
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
	const page = Number(req.query.page) || 1;
	EntryService.getEntries(page)
		.then(function (value) {
			res.render("pages/system/blog", {
				contents: value.entryList,
				currentPage: page,
				maxPage: Math.ceil(value.entryCount / 10),
			});
		})
		.catch(function (err) {
			logger.error(err);
			next(404);
		});
});

router.get("/create", function (req, res, next) {
	CategoryService.getCategories().then(function (value) {
		res.render("pages/system/create", {
			categoryList: value,
		});
	}).catch(function (err) {
		logger.error(err);
		next(404);
	})
});

router.get("/edit", function (req, res) {
	res.render("pages/system/update");
});

router.post("/update", function (req, res, next) {
	const request: IUpdateEntryRequest = req.body;
	if (request.entryId && EntryService.getEntry(request.entryId)) {
		// EntryService.updateEntry();
	} else {
		EntryService.insertEntry(request)
			.then(function (value) {
				logger.info(`新規記事「${value.title}」が投稿されました。\n ${Utility.getDomain(req)}/blog/entry/${value.entryId}`);
				res.status(200).send(value);
			})
			.catch(function (err) {
				logger.error(err);
				next(500);
			});
	}
});

export = router;
