import { Context } from "../shared/context";
import { Formula } from "../shared/formula";

export interface Upgrade {
    id: string
    name: string
    // 購入に必要な価格以外に必要な条件とか判定するやつ
    required: (context: Context) => boolean
    stat: {
        [stepCount: number]: {
            clickReward?: {
                base?: number
                multiplier?: number // 何から得られたかは関係なく、基礎ステータスに対してのレートに加算される
            }
            idleReward?: {
                base?: number
                multiplier?: number
            }
        }
    }
    cost: {
        [stepCount: number]: number | Formula
    }
}