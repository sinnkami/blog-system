import path from "path";

const dirName = __dirname.replace(/config/g, "");
console.log(dirName);

import log4js from "log4js";
import ResponseLog from "../lib/class/ResponseLog";

log4js.addLayout("customLogFile", () => {
	return (logEvent): string => {
		ResponseLog.init(logEvent);
		return ResponseLog.text(true);
	};
});

log4js.addLayout("customConsole", () => {
	return (logEvent): string => {
		ResponseLog.init(logEvent);
		return ResponseLog.text(false);
	};
});

const config = {
	locals: {},
	title: "otouhu-blog",
	overview: "豆腐って美味しいよね",
	descriptions: "豆腐（とうふ）は、大豆の搾り汁（豆乳）を凝固剤（にがり、その他）によって固めた加工食品である。",
	dateFormat: "YYYY/MM/DD HH時mm分",
	port: 3000,
	view: {
		path: path.join(dirName, "views"),
		engine: "pug",
	},
	favicon: {
		use: false,
		path: path.join(dirName, "public", "favicon.ico"),
	},

	modules: {
		log4js: {
			configure: {
				appenders: {
					console: {
						type: "console",
						layout: {
							type: "customConsole",
						},
					},
					accsessLogFile: {
						type: "dateFile",
						filename: "logs/access.log",
						pattern: "-yyyy-MM-dd",
						layout: {
							type: "customLogFile",
						},
					},
					errorLogFile: {
						type: "dateFile",
						filename: "logs/error.log",
						pattern: "_yyyy-MM-dd",
						layout: {
							type: "customLogFile",
						},
					},
					accsess: {
						type: "logLevelFilter",
						appender: "accsessLogFile",
						level: "info",
					},
					error: {
						type: "logLevelFilter",
						appender: "errorLogFile",
						level: "error",
					},
					system: {
						type: "logLevelFilter",
						appender: "console",
						level: "all",
					},
				},
				categories: {
					default: {
						appenders: ["system", "accsess", "error"],
						level: "all",
						enableCallStack: true,
					},
				},
				replaceConsole: true,
			},
			connectLoggerOptions: {
				level: "all",
				statusRules: [
					{ from: 200, to: 399, level: "info" },
					{ from: 400, to: 499, level: "warn" },
					{ from: 500, to: 599, level: "error" },
				],
				context: true,
			},
		},
		session: {
			secret: "secret",
			cookie: {
				secure: true, //httpsの場合はtrue
				maxAge: null,
			},
		},
	},

	public: {
		path: path.join(dirName, "public"),
		useNodeModules: [
			path.join(dirName, "node_modules", "jquery", "dist"),
			path.join(dirName, "node_modules", "slicknav", "dist"),
			path.join(dirName, "node_modules", "summernote", "dist"),
			path.join(dirName, "node_modules", "bootstrap", "dist"),
			path.join(dirName, "node_modules", "bootstrap-navbar-sidebar", "dist"),
		],
	},

	twitter: {
		user: "",
		cardType: "summary_large_image",
	},

	db: {
		type: "mysql",
		host: "localhost",
		user: "root",
		password: "",
		name: "sinnkami-web",
		connectionLimit: 10,
	},

	limit: {
		category: 5,
		entries: 10,
		latestEntries: 5,
	},

	menu: {},
	systemMenu: {},
	imageServerURL: null,
};

const locals = {
	title: config.title,
	overview: config.overview,
	descriptions: config.descriptions,
};
config.locals = locals;

export = config;
