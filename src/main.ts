import { rewardPerClick } from './formula/click';
import { rewardPerIdle } from './formula/idle';
import { Ingame } from './ingame';
import './style.css'

const ingame = new Ingame();
const context = { ingame, assets: { upgrades: [], items: [] } }

const tickQueue = [
    showCurrentReward,
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