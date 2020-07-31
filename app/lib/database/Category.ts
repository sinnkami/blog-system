import SQL from "./SQL";

import squel from "squel";
const squelMysql = squel.useFlavour("mysql");

import { ICategory } from "../definitions/database/Category";

const TABLE_NAME = "Category";

class Category extends SQL {
	constructor() {
		super();
		this.tableName = TABLE_NAME;
	}

	async get(): Promise<ICategory[]> {
		const sql = squelMysql
			.select()
			.from(this.tableName)
			.toString();
		const results = await this.select(sql);
		return results;
	}

	async getById(id: number): Promise<ICategory> {
		const sql = squelMysql
			.select()
			.from(this.tableName)
			.where("categoryId = ?", id)
			.toString();
		const results = await this.select(sql);
		return results[0];
	}

	async getByName(name: string): Promise<ICategory[]> {
		const sql = squelMysql
			.select()
			.from(this.tableName)
			.where("name = ?", name)
			.toString();
		const results = await this.select(sql);
		return results;
	}

	async getCategoryListByLimit(limit: number): Promise<ICategory[]> {
		const sql = squelMysql
			.select()
			.fields(["name"])
			.from(this.tableName)
			.limit(limit)
			.group("name")
			.toString();
		const results = await this.select(sql);
		return results;
	}
}

export default new Category();
