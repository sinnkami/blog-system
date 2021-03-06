const config = {

	// ログイン情報
	// XXX: ログイン処理は適宜変更しましょう
	username: "test",
	password: "test",

	port: 8080,
	locals: {},
	descriptions: ["テスト", "なんか", "書いた", "知らんけど", "( ・∇・)"],
	imageServerURL: "http://localhost:5000",
	menu: [
		{ name: "HOME", transition: "/", device: "" },
		{ name: "プロフィール", transition: "/profile", device: "mobile" },
		{ name: "ブログ", transition: "/blog", device: "" },
		{ name: "質問・お問い合わせ", transition: "", device: "" },
	],
	systemMenu: [
		{ name: "記事を書く", transition: "/system/blog/create", device: "" },
		{ name: "記事を編集する", transition: "/system/blog/edit", device: "" },
		{ name: "お問い合わせ等を確認する", transition: "/system/question", device: "" },
	],
	db: {
		password: "rootp",
	},

	twitter: {
		user: "@sinnkami_",
	},
	modules: {
		session: {
			cookie: {
				// ローカルホストではhttps通信では無い為、こうしないとセッションのやりとりがされない
				secure: false,
			},
		},
	},
};

const locals = {
	descriptions: config.descriptions,
	menu: config.menu,
	systemMenu: config.systemMenu,
};
config.locals = locals;

export = config;
