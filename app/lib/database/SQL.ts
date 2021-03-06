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

		// MEMO: redis使った場合に複数IDだったらどうするか迷ってたけど、alias用のキーを追加すれば解決な気がした
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
			})
			.catch((err) => {
				logger.error(err);
			});
	}

	public async select(sql: string): Promise<any | any[]> {
		logger.debug(sql);
		return this.connection.query(sql);
	}

	public async insert(sql: string): Promise<any | any[]> {
		logger.debug(sql);
		return this.connection.query(sql);
	}

	public async update(sql: string): Promise<any | any[]> {
		logger.debug(sql);
		return this.connection.query(sql);
	}

	public async delete(sql: string): Promise<any | any[]> {
		logger.debug(sql);
		return this.connection.query(sql);
	}
}

export default SQL;
