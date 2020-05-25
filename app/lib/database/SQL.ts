/* eslint-disable @typescript-eslint/no-explicit-any */
import config from "config";
import mysql, { Connection } from "promise-mysql";

import log4js from "../modules/log4js";
const logger = log4js.getLogger();

class SQL {
	protected tableName = "";
	private connection!: Connection;

	constructor() {
		// TODO: キャッシュして高速化を図りたい
		// TODO: コネクションプールを使用してパフォーマンスを良くしたい
		mysql
			.createConnection({
				host: config.get("db.host"),
				user: config.get("db.user"),
				password: config.get("db.password"),
				database: config.get("db.name"),
				insecureAuth: true,
			})
			.then((connection) => {
				this.connection = connection;
			});
	}

	async select(sql: string): Promise<any[]> {
		logger.debug(sql);
		return this.connection.query(sql);
	}

	async insert(sql: string): Promise<any[]> {
		logger.debug(sql);
		return this.connection.query(sql);
	}

	async update(sql: string): Promise<any[]> {
		logger.debug(sql);
		return this.connection.query(sql);
	}

	async delete(sql: string): Promise<any[]> {
		logger.debug(sql);
		return this.connection.query(sql);
	}
}

export default SQL;
