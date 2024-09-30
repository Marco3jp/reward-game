import { Context } from "../../../model/shared/context";

function rewardBasePerClick(context: Context): number {
    const byUpgrade = context.ingame.currentUpgrades.reduce((accumulator, currentUpgrade) => {
        let currentUpgradeRewardBasePerClick = 0;
        let currentPower = 0;
        for (let index = 1; index <= currentUpgrade.upgradeStepCount; index++) {
            currentPower = currentUpgrade.upgrade.stat[index]?.clickReward?.base ?? currentPower;
            currentUpgradeRewardBasePerClick += currentPower;
        }

        return accumulator + currentUpgradeRewardBasePerClick;
    }, 0);

    const byItem = context.ingame.currentItems.reduce((accumulator, currentItem) => {
        return accumulator + (currentItem.stat.clickReward?.base ?? 0);
    }, 0)

    return 1 + byUpgrade + byItem;
}

function rewardMultiplierPerClick(context: Context): number {
    const byUpgrade = context.ingame.currentUpgrades.reduce((accumulator, currentUpgrade) => {
        let currentUpgradeRewardMultiplierPerClick = 0;
        let currentPower = 0;
        for (let index = 1; index <= currentUpgrade.upgradeStepCount; index++) {
            currentPower = currentUpgrade.upgrade.stat[index]?.clickReward?.multiplier ?? currentPower;
            currentUpgradeRewardMultiplierPerClick += currentPower;
        }

        return accumulator + currentUpgradeRewardMultiplierPerClick;
    }, 0);

    const byItem = context.ingame.currentItems.reduce((accumulator, currentItem) => {
        return accumulator + (currentItem.stat.clickReward?.multiplier ?? 0);
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