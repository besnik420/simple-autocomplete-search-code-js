var googleStrings = "2, Skovvænget, Christiansfeld, Kolding Municipality, Region of Southern Denmark, 6070, Denmark";
var inputString = " Skovvæget Municipalty adfas muni 6070  2";
var integers = [];
var largestInt = 0;
var uniformStrings = [];
var splitGoogleStrings = SplitGoogleStrings();
var splitInputString = SplintInputString();
var integers = GetInegers();
var uniformStrings = GetUniformStrings(); // this is the return string !!

function GetUniformStrings() {
    let tmpArr = [];
    var C = 0;
    for (let i = 0; i < splitInputString.length; i++) {
        if (splitInputString[i].length > 1)
            for (let j = 0; j < splitGoogleStrings.length; j++) {
                if (splitGoogleStrings[j].length > 1) {
                    C++;
                    var compValue = CompareT(splitInputString[i], splitGoogleStrings[j]);
                    var flag = false;
                    if (compValue > 0.6 || compValue < -0.6) {
                        flag = true;
                        tmpArr.push(splitInputString[i]);
                    }
                    //console.log(splitInputString[i] + " ", splitGoogleStrings[j] + " : "  + flag+  "   " + compValue);
                }
            }
    }
    //return tmpArr;
    //return removeDuplicates(tmpArr);
    var newArray = removeDuplicates(tmpArr);
    let maxWords = 0;
    for (let i = 0; i < splitGoogleStrings.length; i++) {
        //console.log("f"+ newArray);
        if (splitGoogleStrings[i].length > 1) {
            if (maxWords >= 0) {
                if (CheckPresenceString(splitGoogleStrings[i], newArray) != true) {
                    newArray.push(splitGoogleStrings[i]);
                    maxWords--;
                }
            }
        }
    }
    var intFlag = false;
    for (let index = 0; index < newArray.length; index++) {
        let FG = parseInt(newArray[index]);
        if (FG)
            if (largestInt == FG) {
                intFlag = true;
            }
    }
    if (!intFlag) {
        newArray.push(largestInt);
    }
    return newArray;
}

function CheckPresenceString(str, inpurArray) {
    for (let index = 0; index < inpurArray.length; index++) {
        if (inpurArray[index].length > 1) {
            var compareVal = CompareT(str, inpurArray[index]);
            if (compareVal > .5 || compareVal < -.5) {
                return true;
            }
        }
    }
    return false;
}

function removeDuplicates(arr) {
    return arr.filter((item,
        index) => arr.indexOf(item) === index);
}

function CompareT(strA, strB) {
    var SA = strA.toLowerCase();
    var SB = strB.toLowerCase();
    for (var result = 0, i = SA.length; i--;) {
        if (typeof SB[i] == 'undefined' || SA[i] == SB[i]);
        else if (SA[i].toLowerCase() == SB[i].toLowerCase())
            result++;
        else
            result += 4;
    }
    return 1 - (result + 4 * Math.abs(SA.length - SB.length)) / (2 * (SA.length + SB.length));
}

function SplintInputString() {
    let tempIString = inputString.split(/\s+/);
    //for (let index = 0; index < tempIString.length; index++) {
    //    tempIString[index] = tempIString[index].toLowerCase();        
    //}
    //console.log(tempIString);
    return tempIString;
}

function SplitGoogleStrings() {
    var TR = '';
    var tmpSplitArray = googleStrings.split(/[;,.]/);
    for (let i = 0; i < tmpSplitArray.length; i++) {
        TR += " " + tmpSplitArray[i] + " ";
        var tempString = tmpSplitArray[i];
        tempString = tempString.replace(/\s+/g, "");
        tmpSplitArray[i] = tempString;
    }
    //console.log(TR);
    return TR.split(/\s+/);;
}

function GetInegers(inputString) {
    var ints = [];
    for (let i = 0; i < splitGoogleStrings.length; i++) {
        var G = parseInt(splitGoogleStrings[i]);
        if (G) {
            if (G > largestInt) largestInt = G;
            ints.push(G);
        }
    }
    return ints;
}
