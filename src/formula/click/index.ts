import { Context } from "../../../model/shared/context";

function rewardBasePerClick(context: Context): number {
    const byUpgrade = context.ingame.currentUpgrades.reduce((accumulator, currentUpgrade) => {
        let currentUpgradeRewardBasePerClick = 0;
        // step 0はかならずあるように実装するので大丈夫らしいよ
        let currentPower = currentUpgrade.upgrade.stat[0].clickReward.base;
        for (let index = 0; index < currentUpgrade.upgradeStepCount; index++) {
            currentPower = currentUpgrade.upgrade.stat[index]?.clickReward.base ?? currentPower;
            currentUpgradeRewardBasePerClick += currentPower;
        }

        return accumulator + currentUpgradeRewardBasePerClick;
    }, 0);

    const byItem = context.ingame.currentItems.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.stat.clickReward.base;
    }, 0)

    return 1 + byUpgrade + byItem;
}

function rewardMultiplierPerClick(context: Context): number {
    const byUpgrade = context.ingame.currentUpgrades.reduce((accumulator, currentUpgrade) => {
        let currentUpgradeRewardMultiplierPerClick = 0;
        // step 0はかならずあるように実装するので大丈夫らしいよ
        let currentPower = currentUpgrade.upgrade.stat[0].clickReward.multiplier;
        for (let index = 0; index < currentUpgrade.upgradeStepCount; index++) {
            currentPower = currentUpgrade.upgrade.stat[index]?.clickReward.multiplier ?? currentPower;
            currentUpgradeRewardMultiplierPerClick += currentPower;
        }

        return accumulator + currentUpgradeRewardMultiplierPerClick;
    }, 0);

    const byItem = context.ingame.currentItems.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.stat.clickReward.multiplier;
    }, 0)

    return 1 + byUpgrade + byItem;
}

function standardRewardPerClick(context: Context): number {
    return rewardBasePerClick(context) * rewardMultiplierPerClick(context)
}

function specialRewardPerClick(_: Context): number {
    // WIP
    return 0;
}

export function rewardPerClick(context: Context) {
    return standardRewardPerClick(context) + specialRewardPerClick(context)
}