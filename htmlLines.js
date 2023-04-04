export const htmlLines = {
    GameSelection: `
    <div class = 'GameTitle'>Tic Tac Toe</div>
    <div class = 'ButtonSet'>
        <button class = 'PvPBtn'>Player</button>
        <button class = 'CPUBtn'>Computer</button>
    </div>`,
    PVPTeamSelection: `
    <div class = 'GameTitle'>Tic Tac Toe</div>
    <div class = 'InputFieldContainer'>
        <div class ='InputField'>
            <div class ='InputTitle'>Player 1</div>
            <div class = 'TeamFieldContainer'>
                <div class ='TeamField'>
                    <div class = 'TeamSign'>X</div>
                    <input type = 'radio' id = 'x' name = 'Ply1GameType'></radio>
                </div>
                <div class ='TeamField'>
                    <div class ='TeamSign'>Y</div>
                    <input type = 'radio' id = 'y' name = 'Ply1GameType'></radio>
                </div>
            </div>
        </div>
        <div class ='InputField'>
            <div class ='InputTitle'>Player 2</div>
            <div class = 'TeamFieldContainer'>
                <div class ='TeamField'>
                    <div class = 'TeamSign'>X</div>
                    <input type = 'radio' id = 'x' name = 'Ply2GameType'></radio>
                </div>
                <div class ='TeamField'>
                    <div class ='TeamSign'>Y</div>
                    <input type = 'radio' id = 'y' name = 'Ply2GameType'></radio>
                </div>
            </div>
        </div>
    </div>
    <div class = 'ButtonSet'>
        <button class = 'BackBtn'>Back</button>
        <button class = 'ConfirmBtn'>Confirm</button>
    </div>`,
    CPUTeamSelection: `
    <div class = 'GameTitle'>Tic Tac Toe</div>
    <div class = 'TeamFieldContainer'>
        <div class ='TeamField'>
            <div class = 'TeamSign'>X</div>
            <input type = 'radio' id = 'x' name = 'GameType'></radio>
        </div>
        <div class ='TeamField'>
            <div class ='TeamSign'>Y</div>
            <input type = 'radio' id = 'y' name = 'GameType'></radio>
        </div>
    </div>
    <div class = 'ButtonSet'>
        <button class = 'BackBtn'>Back</button>
        <button class = 'ConfirmBtn'>Confirm</button>
    </div>`
};