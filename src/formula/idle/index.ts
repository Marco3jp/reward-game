import { Context } from "../../../model/shared/context";

function rewardBasePerIdle(context: Context): number {
    const byUpgrade = context.ingame.currentUpgrades.reduce((accumulator, currentUpgrade) => {
        let currentUpgradeRewardBasePerIdle = 0;
        // step 0はかならずあるように実装するので大丈夫らしいよ
        let currentPower = currentUpgrade.upgrade.stat[0].idleReward.base;
        for (let index = 0; index < currentUpgrade.upgradeStepCount; index++) {
            currentPower = currentUpgrade.upgrade.stat[index]?.idleReward.base ?? currentPower;
            currentUpgradeRewardBasePerIdle += currentPower;
        }

        return accumulator + currentUpgradeRewardBasePerIdle;
    }, 0);

    const byItem = context.ingame.currentItems.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.stat.idleReward.base;
    }, 0)

    return 1 + byUpgrade + byItem;
}

function rewardMultiplierPerIdle(context: Context): number {
    const byUpgrade = context.ingame.currentUpgrades.reduce((accumulator, currentUpgrade) => {
        let currentUpgradeRewardMultiplierPerIdle = 0;
        // step 0はかならずあるように実装するので大丈夫らしいよ
        let currentPower = currentUpgrade.upgrade.stat[0].idleReward.multiplier;
        for (let index = 0; index < currentUpgrade.upgradeStepCount; index++) {
            currentPower = currentUpgrade.upgrade.stat[index]?.idleReward.multiplier ?? currentPower;
            currentUpgradeRewardMultiplierPerIdle += currentPower;
        }

        return accumulator + currentUpgradeRewardMultiplierPerIdle;
    }, 0);

    const byItem = context.ingame.currentItems.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.stat.idleReward.multiplier;
    }, 0)

    return byUpgrade + byItem;
}

function standardRewardPerIdle(context: Context): number {
    return rewardBasePerIdle(context) * rewardMultiplierPerIdle(context)
}

function specialRewardPerIdle(_: Context): number {
    return 0;
}

export function rewardPerIdle(context: Context) {
    return standardRewardPerIdle(context) + specialRewardPerIdle(context)
}