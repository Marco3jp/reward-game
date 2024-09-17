// コストとその報酬を表現するモデル
export interface Economics {
    reward: {
        baseValue: number;
        ratio: number;
    },
    cost: {
        baseValue: number;
        ratio: number;
    }
    // ↓こんなのがあってもいいかなとは思っている
    // sideEffect: (context: Context) => void;
    // サイドエフェクトの適用タイミングのコントロールとかも必要そうでけっこう大変だな～って他人事のように思っている
} 