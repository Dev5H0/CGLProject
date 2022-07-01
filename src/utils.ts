export let text = {
    capitalize: (text:string):string => text[0].toUpperCase() + text.slice(1),
    getBetween: (text:string, start:string='{', end:string='}'):string|undefined => {
        let _regex = new RegExp(`/.*?${start}(.*?)${end}/`)
        let x = text.match(_regex)
        if (x) return x[1]
    }
}

export let array = {
    _removeAllX: <T,_>(data:T[], x:any=undefined, strict:boolean=false):any[] => {
        if (strict) return data.filter((i:T):any => { return i !== x })
        else return data.filter((i:T):any => { return i != x })
    },
    removeAllX: <T,_>(data:T[], x:any=undefined):any[] => data.filter((i:T):any => { return i != x }),
    removeAllXStrict: <T,_>(data:T[], x:any=undefined):any[] => data.filter((i:T):any => { return i !== x }),
    getLastItem: <T,_>(array:T[]):T => array[array.length],
    getAllButFirstItem: <T,_>(array:T[]):any => array.slice(1,-1),
    getAllBeforeNthItem:<T,_>(array:T[], n:number):any => array.slice(0, n),
    getAllAfterNthItem: <T,_>(array:T[], n:number):any => array.slice(n,-1),
    isEmpty: <T,_>(array:T[]):boolean => Array.isArray(array) && !array.length,
    isEqual: <T,_>(array1:T[], array2:T[]):boolean => JSON.stringify(array1) === JSON.stringify(array2),
    countBy: <T extends Record<string, string>, K extends keyof T>(arr: T[], prop: K): Record<string, number> => (arr.reduce((prev, curr) => ((prev[curr[prop]] = ++prev[curr[prop]] || 1), prev), {} as Record<string, number>)),
}

export let n = {
    getAverageR: (...num:number[]):number => n.getAverage(num),
    getAverage: (num:number[]):number => {
        let n:number = 0
        num.forEach((num:number) => {n += num})
        return n/num.length
    },
}

export type TNumRange = { min:number, max:number }

