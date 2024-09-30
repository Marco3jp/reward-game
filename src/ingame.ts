import { Item } from "../model/asset/item";
import { Upgrade } from "../model/asset/upgrade";
import { IngameInterface } from "../model/ingame/ingame";

export class Ingame implements IngameInterface {
    currentReward: number;
    currentUpgrades: { upgrade: Upgrade; upgradeStepCount: number; }[];
    currentItems: Item[];

    constructor() {
        this.currentReward = 0;
        this.currentUpgrades = [];
        this.currentItems = [];
    }

    addUpgrade(upgrade: Upgrade) {
        this.currentUpgrades.push({ upgrade: upgrade, upgradeStepCount: 1 });
    }

    stepUpgrade(upgrade: Upgrade, step: number = 1) {
        const currentUpgrade = this.currentUpgrades.find(
            currentUpgrade => currentUpgrade.upgrade === upgrade
        );
        if (currentUpgrade) {
            currentUpgrade.upgradeStepCount += step;
        }
    }

    addItems(item: Item) {
        this.currentItems.push(item);
    }
}