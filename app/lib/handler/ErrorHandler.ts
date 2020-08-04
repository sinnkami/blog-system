/*============================================================================*/
/* ■ ErrorHandler
/*----------------------------------------------------------------------------*/
/*  エラーが飛んで来たときにエラー番号によって送るデータを設定するハンドラ
/*============================================================================*/

import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import HttpException from "../class/Exception/HttpException";

class ErrorHandler {
	public static process(callback: ErrorRequestHandler): ErrorRequestHandler {
		return (error: string, req: Request, res: Response, next: NextFunction): ErrorRequestHandler => {
			// set locals, only providing error in development
			const errorContent = req.app.get("env") === "development" ? this.errorContents(error) : {};
			return callback(errorContent, req, res, next);
		};
	}

	public static errorContents(data: string): HttpException {
		const error = new HttpException(data);
		// TODO: enum型に設定する
		switch (data) {
			// 400番台
			case "Bad Request":
				error.status = 400;
				error.title = "不正なリクエストです";
				error.message = "";
				return error;
			case "Unauthorized":
				error.status = 401;
				error.title = "許可されていない行為です";
				error.message = "権限を所持していません。";
				return error;
			case "NotFound":
				error.status = 404;
				error.title = "そのようなページは存在しません";
				error.message = "URLが間違っているか、対象のページが削除された可能性があります。";
				return error;

			// 500番台
			case "InternalServer":
				error.status = 500;
				error.title = "サーバーでエラーが発生しました";
				error.message = "管理者へお問い合わせ下さい";
				return error;
			case "NotImplemented":
				error.status = 501;
				error.title = "未実装です。";
				error.message = "実装まで今しばらくお待ちください。";
				return error;


			// 独自エラー
			case "FailedToPostEntry":
				error.status = 500;
				error.title = "記事の投稿に失敗しました。"
				return error;

			default:
				return error;
		}
	}
}

export default ErrorHandler;
