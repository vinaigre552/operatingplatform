// 定义用户相关数据的ts类型
export interface loginFormData {
    username: string,
    password: string
}

export interface ResponseData {
    code: number,
    message: string,
    ok: boolean
}
// 登录接口返回数据
export interface loginResponseData extends ResponseData {
    data: string
}

// 获取用户信息返回数据
export interface userInfoResponseData extends ResponseData {
    data: {
        routes: string[],
        buttons: string[],
        roles: string[],
        name: string,
        avatar: string
    }
}