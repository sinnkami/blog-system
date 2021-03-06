import SQL from "./SQL";

import squel from "squel";
const squelMysql = squel.useFlavour("mysql");

import { IEntryCategory, IFrequentUseCategory } from "../definitions/database/EntryCategory";

const TABLE_NAME = "EntryCategory";

class EntryCategory extends SQL {
	constructor() {
		super();
		this.tableName = TABLE_NAME;
	}

	public async get(): Promise<IEntryCategory[]> {
		const sql = squelMysql
			.select()
			.from(this.tableName)
			.toString();
		const results = await this.select(sql);
		return results;
	}

	public async getById(id: number): Promise<IEntryCategory> {
		const sql = squelMysql
			.select()
			.from(this.tableName)
			.where("entryId = ?", id)
			.toString();
		const results = await this.select(sql);
		return results[0];
	}

	public async getByCategoryId(id: number): Promise<IEntryCategory[]> {
		const sql = squelMysql
			.select()
			.from(this.tableName)
			.where("categoryId = ?", id)
			.toString();
		const results = await this.select(sql);
		return results;
	}

	public async getFrequentUseCategory(limit: number): Promise<IFrequentUseCategory[]>{
		const sql = squelMysql
			.select()
			.field("categoryId")
			.field("count(*)", "count")
			.from(this.tableName)
			.group("categoryId")
			.order("count", false)
			.limit(limit)
			.toString();
		const results = this.select(sql);
		return results;

	}

	public async insertEntry(entryId: number, categoryId: number): Promise<IEntryCategory> {
		const sql = squelMysql
			.insert()
			.into(this.tableName)
			.set("entryId", entryId)
			.set("categoryId", categoryId)
			.toString();
		const result = await this.insert(sql);
		return this.getById(result.insertId);
	}

	public async updateEntry(entryId: number, categoryId: number): Promise<IEntryCategory> {
		const sql = squelMysql
			.update()
			.table(this.tableName)
			.set("entryId", entryId)
			.set("categoryId", categoryId)
			.toString();
		await this.update(sql);
		return this.getById(entryId);
	}
}

export default new EntryCategory();