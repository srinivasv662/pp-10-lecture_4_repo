// input -> ??
let fs = require("fs");
let input = process.argv.slice(2);
console.log(input);
let options = [];
let filePaths = [];

// to extract options and filePaths
for(let i = 0; i < input.length; i++){
    
    //first character
    // let firstChar = input[i].charAt(0);
    // if(firstChar == "-"){
    //     options.push(input[i]);
    // } else{
    //     filePaths.push(input[i]);
    // }

    if(input[i] == "-s" || input[i] == "-b" || input[i] == "-n"){
        options.push(input[i]);
    } else{
        filePaths.push(input[i]);
    }
}

// console.log("Options",options);
// console.log("FilePaths",filePaths);
//to check whether files exists or not
for(let i = 0; i < filePaths.length; i++){
    let isFilePresent = fs.existsSync(filePaths[i]);
    if(isFilePresent == false){
        console.log("filepath", filePaths[i], "does not exists. Kindly check Path");
        return;
    }
}

//to read content from filePaths 
let totalContent = "";
for(let i = 0; i < filePaths.length; i++){
    let contentOfCurrent = fs.readFileSync(filePaths[i]);
    //after every file's content -> add next line to new file contents

    // if(i == filePaths.length - 1){
    //     totalContent +=  contentOfCurrent            // to remove lastline number in -n 
    // }else                                   
        totalContent +=  contentOfCurrent + "\r\n";
    
}

// totalContent = totalContent.replace(/(\r\n|\n|\r)/gm, "");  ->my
// totalContent = totalContent.replace(/(\r\n|\n\r)/gm, "");   ->my

let isSOption = options.includes("-s");
if(isSOption){
    // let outputArr = totalContent.split("\n");
    // let outputArr = totalContent.split("\r");
    // let outputArr = totalContent.split("\r\n");

    //split on the basis of line breaks
    let outputArr = totalContent.split("\r\n");
    // console.log(outputArr);
    let tempArr = [];
    for(let i = 0; i < outputArr.length; i++){
        if(outputArr[i] !== ""){
            tempArr.push(outputArr[i]);
        }
    }

    totalContent =  tempArr.join("\r\n");
}

// let isNOption = options.includes("-n");        // -> my
// if(isNOption == true){
//     let outputArr = totalContent.split("\n");
//     // console.log(outputArr);
//     let count = 1;
//     for(let i = 1; i < outputArr.length; i++){

//     }
// }                                               // -> my


//-n and -b are mutually exclusive
let isNOption = options.includes("-n");
let isBOption = options.includes("-b");

let finalOption;
if(isNOption == true){
    if(isBOption == true){
        let idxB = options.indexOf("-b");
        let idxN = options.indexOf("-n");
        finalOption = idxB < idxN? "-b" : "-n";
    } else{
        finalOption = "b";
    }
} else if(isBOption == true){
    finalOption = "-b";
}

if(finalOption == "-n"){
    let count = 1;
    let contentArr = totalContent.split("\r\n");
    for(let i = 0; i < contentArr.length; i++){
        contentArr[i] = count + ". " +  contentArr[i];
        count++;
    }
    totalContent =  contentArr.join("\r\n");
}

// -b -> numbering to non empty lines
// let isBOption = options.includes("-b");      //from my
// if(isBOption){
//     let count = 1;
//     let contentArr = totalContent.split("\r\n");
//     // console.log(contentArr);
//     for(let i = 0; i < contentArr.length; i++){
//         if(contentArr[i] !== ''){
//             contentArr[i] = count + ". " + contentArr[i];
//             count++;
//         }
//     }
//     totalContent = contentArr.join("\r\n");
    
// }                                               //to my


if(finalOption == "-b"){
    let count = 1;
    let contentArr = totalContent.split("\r\n");
    for(let i = 0; i < contentArr.length; i++){
        if(contentArr[i] != ""){
            contentArr[i] = count + ". " + contentArr[i];
            count++;
        }
    }
    totalContent = contentArr.join("\r\n");
}


console.log(totalContent);



// \r = CR (Carriage Return) → Used as a new line character in Mac OS before X
// \n = LF (Line Feed) → Used as a new line character in Unix/Mac OS X
// \r\n = CR + LF → Used as a new line character in Windows
// Example of \r -> 
// In java
// String str = "I am fine \r";
//		System.out.println(str);       o/p: I am fine    here \r sets to beginning of the charctere in the same line
// 
// String str = "I am fine \rGoo";
// System.out.println(str);            o/p: Goom fine    here \r sets to beginning but along with "Goo" and overides that many characters
// 
// r\n\ -> first sets to beginning of the line and then goes to nextLine without affecting the content in the previous line
//