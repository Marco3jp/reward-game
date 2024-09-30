import { Formula, isFormula, Operator } from '../model/shared/formula';
import { Upgrades } from './asset/upgrade';
import { rewardPerClick } from './formula/click';
import { rewardPerIdle } from './formula/idle';
import { Ingame } from './ingame';
import './style.css'

const ingame = new Ingame();
const context = { ingame, assets: { upgrades: Upgrades, items: [] } }

const tickQueue = [
    showCurrentReward,
    showCurrentRewardPower,
    showUpgrade,
    () => {
        ingame.currentReward += rewardPerIdle(context);
    }
];

function showCurrentReward() {
    const rewardElement = document.getElementById('currentReward');
    if (rewardElement) {
        rewardElement.innerText = `Reward: ${ingame.currentReward}`;
    }
}

function showCurrentRewardPower() {
    const rewardElement = document.getElementById('currentRewardPower');
    if (rewardElement) {
        rewardElement.innerText = `${rewardPerClick(context)}rewards/click ${rewardPerIdle(context)}rewards/sec`;
    }
}

function showUpgrade() {
    const upgradeElement = document.getElementById('upgrade');
    const upgrades = Upgrades.filter(upgradeElement => upgradeElement.required(context));
    if (upgradeElement) {
        upgradeElement.innerHTML = '';
        upgrades.forEach(upgrade => {
            const currentUpgrade = ingame.currentUpgrades.find(
                currentUpgrade => currentUpgrade.upgrade === upgrade
            );

            let upgradeCost = 0;
            if (currentUpgrade) {
                let nextCost = 0;
                let previousCost: Number | Formula = 0;
                // 次のレベルのコストを計算するので + 1 まで計算する感じ
                for (let index = 1; index <= currentUpgrade.upgradeStepCount + 1; index++) {
                    const cost = upgrade.cost[index];
                    if (cost) {
                        previousCost = cost;
                    }

                    if (previousCost && typeof previousCost === 'number') {
                        nextCost = previousCost;
                    } else if (isFormula(previousCost)) {
                        switch (previousCost.operator) {
                            case Operator.ADDITION:
                                nextCost += previousCost.argument;
                                break;
                            case Operator.MULTIPLICATION:
                                nextCost *= previousCost.argument;
                                break;
                            case Operator.DIVISION:
                                nextCost /= previousCost.argument;
                                break;
                            case Operator.SUBTRACTION:
                                nextCost -= previousCost.argument;
                                break;
                            default:
                                break;
                        }
                    }
                }
                upgradeCost = nextCost;
            } else {
                upgradeCost = typeof upgrade.cost[1] === 'number' ? upgrade.cost[1] : Number.MAX_SAFE_INTEGER;
            }

            const button = document.createElement('button');
            button.innerText = `${upgrade.name} required ${upgradeCost} reward`;
            
            if (currentUpgrade) {
                button.innerText = `(${currentUpgrade.upgradeStepCount}) ${button.innerText}`;
            }
            button.addEventListener('click', () => {
                if (ingame.currentReward >= upgradeCost) {
                    ingame.addUpgrade(upgrade);
                    ingame.currentReward -= upgradeCost;
                    showCurrentReward();
                    showUpgrade();
                }
            });
            upgradeElement.appendChild(button);
        });
    }
}


function tick() {
    tickQueue.forEach(f => f());
}

function gameloop() {
    setTimeout(() => {
        tick();
        setTimeout(gameloop, 1000);
    }, 1000)
}

gameloop();

document.querySelector("#app")?.addEventListener("click", () => {
    ingame.currentReward += rewardPerClick(context);
    showCurrentReward();
})