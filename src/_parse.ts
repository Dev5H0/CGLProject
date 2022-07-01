import * as fs from 'fs'
import * as path from 'path'

type TVarContentType = string | number | boolean | (string|number|boolean)[]
type TVarTypes = string | 'txt' | 'num' | 'tof' | 'arr'
type TVarOps = string | 'set' | 'add' | 'sub'
type TVarOpTypes = string | 'perm' | 'temp'
type TFncOps = string | 'fnc' | 'run'
type TRouteOps = string | 'loc' | 'chs' | 'goto'
type TOperand = TVarOps | TFncOps | TRouteOps

class Game {
    chs:{[key:string]:unknown} = {}
    fnc:{[key:string]:CallableFunction} = {}
    loc:{[key:string]:unknown} = {}
    var:{[key:string]:TVarContentType} = {}

    constructor() {
        this.parseFile('use/test.cgl')
    }

    setVar(k:string, v:TVarContentType) { this.var[k] = v }
    getVar(k:string) { return this.var[k] }

    parseFile(filePath:string):void {
        let f:string[] = readFile(filePath).split(/\r?\n/)
        f.forEach((line:string) => {
            if (line.length == 0) return
            let _line = line.split(' ')
            // console.log(l)
            let opr:TOperand|string = _line[0]
            switch (opr) {
                case 'set':
                    let param:any[] = OpSet(_line)
                    this.setVar(param[0], param[1])
                break

                case 'add': break
                case 'sub': break
                default: break
            }
        })
    }
}

function OpSet(l:string[]) {
    let varType:TVarOpTypes = l[1]
    let _varTitle:string[] = l[2].replace('#', '').split(':')
    let varTitle:string = _varTitle[0]
    let varContentType:TVarTypes = _varTitle[1]
    let varContent:TVarContentType = l.slice(4).join(' ')
    switch (varContentType) {
        case 'txt': 
            varContent = varContent.trim().slice(1,-1)
            // varContent = varContent.replace('\\n', '\n') // BUG: Doesn't replace with a new line. 
        break

        case 'num': 
            varContent = new Number(varContent).valueOf()
        break

        case 'arr': 
            varContent = varContent.replace("', '", "' '").replace("','", "' '").replace("'  '", "' '")
            varContent = varContent.slice(2, -2).split("' '")
        break
    }
    return [varTitle, varContent]
}

function readFile(filePath:string='use/test.cgl'):string { return fs.readFileSync(path.join(__dirname, filePath), { encoding: 'utf-8' }) }

let game = new Game()
console.log(game.var, game.loc, game.chs, game.fnc)
