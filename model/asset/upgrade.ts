// これパフォーマンスがわからん
// 場合によっては事前計算をしないといけないかもね～になってる
// overwitesがN個あると、0からある値までの計算、ある値からある値まで、をN回やることになるんでまあ確かにめんどい
// パソコンさんが頑張ってくれるかなあ

import { Context } from "./shared/context";
import { Formula } from "./shared/formula";

export interface Upgrade {
    id: string
    name: string
    // 購入に必要な価格以外に必要な条件とか判定するやつ
    required: (context: Context) => boolean
    stat: {
        base: {
            clickReward: number
            idleReward: number
        },
        step: {
            [level: number]: {
                clickReward: number | Formula
                idleReward: number | Formula
            }
        }
    }
    cost: {
        buy: number,
        step: {
            [level: number]: number | Formula
        }
    }
}