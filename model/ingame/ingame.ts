import { Item } from "../asset/item"
import { Upgrade } from "../asset/upgrade"

export interface IngameInterface {
    currentReward: number
    currentUpgrades: {
        upgrade: Upgrade
        upgradeStepCount: number
    }[]
    currentItems: Item[]
}