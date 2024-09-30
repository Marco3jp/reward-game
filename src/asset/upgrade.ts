import { Upgrade } from "../../model/asset/upgrade";
import { Context } from "../../model/shared/context";
import { Operator } from "../../model/shared/formula";

export const Upgrades: Upgrade[] = [{
    id: "upgrade-1",
    name: "Upgrade 1",
    required: (_: Context) => true,
    stat: {
        1: {
            clickReward: {
                base: 0.1,
            },
            idleReward: {
                base: 0.1,
            }
        },
        10: {
            clickReward: {
                base: 2,
            },
            idleReward: {
                base: 1,
            },
        },
        11: {
            clickReward: {
                base: 0.1,
            },
            idleReward: {
                base: 0.1,
            }
        },
        25: {
            clickReward: {
                base: 2,
            },
            idleReward: {
                base: 1,
            },
        },
        26: {
            clickReward: {
                base: 0.1,
            },
            idleReward: {
                base: 0.1,
            }
        },
        50: {
            clickReward: {
                base: 2,
            },
            idleReward: {
                base: 1,
            },
        },
        51: {
            clickReward: {
                base: 0.1,
            },
            idleReward: {
                base: 0.1,
            }
        },
    },
    cost: {
        1: 15,
        2: {
            operator: Operator.MULTIPLICATION,
            argument: 1.2
        },
        10: {
            operator: Operator.MULTIPLICATION,
            argument: 1.3
        },
        25: {
            operator: Operator.MULTIPLICATION,
            argument: 1.4
        },
        50: {
            operator: Operator.MULTIPLICATION,
            argument: 1.5
        }
    }
}]