//generate recto.json and verso.json with Jupyter notebooks recto and verso in the word-to-json directory
import * as recto from './recto.json';
import * as verso from './verso.json';
import _ from 'lodash'

let combined = _.merge(recto, verso)
combined = _.orderBy(combined, ['date'], ['asc'])
let comboSort = []
//console.log(JSON.stringify(combined, null, 4))

_.forEach(combined, (section) => {
    //let sortNum = createSortNum(section.manuscript)
    //section.sortNum = sortNum
    //comboSort.push(section)
    console.log(section.manuscript, section.date, findMatchingList(section))
})

function findRecto(v) {
    let versoName = v.manuscript
    let rectoName = _.replace(versoName, "v", "r")
    let recto = _.find(combined, { 'manuscript': rectoName })
    if (recto) {
        console.log(versoName + " ------ " + recto.manuscript)
    }
    return recto
}

function createSortNum(manuscriptName) {    
    const regex = /.+?(?=])/
    let found = manuscriptName.match(regex)
    found = _.replace(found, "Ms-", "")
    found = _.replace(found, ",", "")
    found = _.replace(found, "v", "0")
    found = _.replace(found, "r", "0")
    found = _.replace(found, "[", "")
    return Number(found)    
}

function findMatchingList(item) {
    let result
    if (_.includes(item.manuscript, "v")) {
        result = _.filter(combined, {"date": item.date, "type": "recto"})
    }

    if (_.includes(item.manuscript, "r")) {
        result = _.filter(combined, {"date": item.date, "type": "verso"})
    }

    return result
}
