import * as fs from 'fs'
import * as path from 'path'
import {text, array} from './utils'
function readFile(filePath:string='use/var.cgl'):string {
    const fileContents = fs.readFileSync(path.join(__dirname, filePath), { encoding: 'utf-8' })
    // console.log(fileContents)
    return fileContents
}

let game:{chs:{[key:string]:unknown}, fnc:{[key:string]:CallableFunction}, loc:{[key:string]:unknown}, var:{[key:string]:{title:string, content:(string|number|boolean|string[])}}} = {
    chs: {},
    fnc: {},
    loc: {},
    var: {},
}

function parseVar() {
    readFile('use/var.cgl').split('\n').forEach((val1:string) => {
        let vArr = val1.replace('\\r','').split(' ')
        if (vArr[0] == 'perm') {
            const vArr1:string[] = vArr[1].split(':')
            const varTitle:string = vArr1[0]
            const varType:string = vArr1[1]
            const varContent = vArr.slice(3)
            game.var[varTitle] = {title:varTitle, content:varContent}
        }
        else if (vArr[0] == 'temp') {
            const vArr1:string[] = vArr[1].split(':')
            const varTitle:string = vArr1[0]
            const varType:string = vArr1[1]
            const varContent = array.getAllAfterNthItem(vArr1, 3)
            switch (varType) {
                case 'txt': game.var[varTitle] = {title:varTitle, content:varContent}
                break

                case 'num': game.var[varTitle] = {title:varTitle, content:varContent}
                break

                case 'tof': game.var[varTitle] = {title:varTitle, content:varContent}
                break

                case 'arr': game.var[varTitle] = {title:varTitle, content:varContent}
                break
            }
        }
    })
}

function parseFnc() {
    let fileText = readFile('use/fnc.cgl')
    fileText.split('\n').forEach((val:string) => {
        let vArr = val.split(' ')
        console.log(vArr)
        if (vArr[0] != 'fnc') return
        let fncTitle = vArr[1]
    })
    let fnc = text.getBetween(fileText, '{', '}')
    console.log(fileText)
}

parseVar()
parseFnc()
console.log(game)