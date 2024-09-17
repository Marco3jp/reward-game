// これパフォーマンスがわからん
// 場合によっては事前計算をしないといけないかもね～になってる
// overwitesがN個あると、0からある値までの計算、ある値からある値まで、をN回やることになるんでまあ確かにめんどい
// パソコンさんが頑張ってくれるかなあ

import { Economics } from "./economics";

interface Upgrade {
    name: string;
    economics: Economics
    // あるレベル以降のステータス
    // それまでのレベルはそれまでのステータスを使って計算する
    overwrites: {
        [level: number]: {
            economics: Economics
        }
    }
}