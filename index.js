// An array in programming is simply a list data
// [] - array literal
// "" '' - string literal
// `` - template literal
// {} - object literal 

// array start at zero-based becase if memory efficient but there are other programming language s that are 1 based for human readability

let studentNumbers = ['2020-1923', '2020-1964', '2020-1925'];
console.log(studentNumbers);

// the .length property can also be used with strings

let fullName = 'Raphael Alampay';
console.log(fullName.length);

//length property on strings shows the number of characters in a string. Spaces are counted as characters in strings.

console.log('studentNumbers.length');

student = studentNumbers.length-1;
console.log(student);

// another way by using decrementation
studentNumbers.length--;

console.log(fullName.length-1);
console.log(fullName.length--);


let theBeatles = ['John', 'Paul', 'Ringo', 'George'];
theBeatles.length++;
console.log(theBeatles);