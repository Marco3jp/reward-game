import { Item } from "../asset/item";
import { Upgrade } from "../asset/upgrade";
import { IngameInterface } from "../ingame/ingame";

// 条件を持つようなアセット類の判定メソッドに渡す引数の型
export interface Context {
    ingame: IngameInterface
    assets: {
        upgrades: Upgrade[],
        items: Item[]
    }
}