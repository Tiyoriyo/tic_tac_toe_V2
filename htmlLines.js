export const htmlLines = {
    gameSelection: `
    <div class = 'gameTitle'>Tic Tac Toe</div>
    <div class = 'buttonSet'>
        <button class = 'pvpBtn'>Player</button>
        <button class = 'cpuBtn'>Computer</button>
    </div>`,
    pvpTeamSelection: `
    <div class = 'gameTitle'>Tic Tac Toe</div>
    <div class = 'inputFieldContainer'>
        <div class ='inputField'>
            <div class ='inputTitle'>Player 1</div>
            <div class = 'teamFieldContainer'>
                <div class ='teamField'>
                    <div class = 'teamSign'>X</div>
                    <input type = 'radio' id = 'x' name = 'ply1GameType'></radio>
                </div>
                <div class ='teamField'>
                    <div class ='teamSign'>O</div>
                    <input type = 'radio' id = 'o' name = 'ply1GameType'></radio>
                </div>
            </div>
        </div>
        <div class ='inputField'>
            <div class ='inputTitle'>Player 2</div>
            <div class = 'teamFieldContainer'>
                <div class ='teamField'>
                    <div class = 'teamSign'>X</div>
                    <input type = 'radio' id = 'x' name = 'ply2GameType'></radio>
                </div>
                <div class ='teamField'>
                    <div class ='teamSign'>O</div>
                    <input type = 'radio' id = 'o' name = 'ply2GameType'></radio>
                </div>
            </div>
        </div>
    </div>
    <div class = 'buttonSet'>
        <button class = 'backBtn'>Back</button>
        <button class = 'confirmBtn'>Confirm</button>
    </div>`,
    cpuTeamSelection: `
    <div class = 'gameTitle'>Tic Tac Toe</div>
    <div class = 'teamFieldContainer'>
        <div class ='teamField'>
            <div class = 'teamSign'>X</div>
            <input type = 'radio' id = 'x' name = 'gameType'></radio>
        </div>
        <div class ='teamField'>
            <div class ='teamSign'>O</div>
            <input type = 'radio' id = 'o' name = 'gameType'></radio>
        </div>
    </div>
    <div class = 'buttonSet'>
        <button class = 'backBtn'>Back</button>
        <button class = 'confirmBtn'>Confirm</button>
    </div>`
};