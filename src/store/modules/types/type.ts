import type { RouteRecordRaw } from "vue-router";
import type {CategoryObj} from '@/api/product/attr/type'
export interface UserState {
    token: string | null;
    menuRoutes: RouteRecordRaw[],
    username: string,
    avatar: string
}

export interface CategoryState {
    c1Arr: CategoryObj [],
    c2Arr: CategoryObj [],
    c3Arr: CategoryObj [],
    c1Id: string | number,
    c2Id: string | number,
    c3Id: string | number
}