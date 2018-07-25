
//acquiring xlsx module
var XLSX = require('xlsx');

//acquiring file system module
var fs =  require('fs');

//acquiring maximum from  wink-statistics module
var  sum = require('wink-statistics').streaming.sum;
var  max = require('wink-statistics').streaming.max;
var  min = require('wink-statistics').streaming.min;
var prob = require('wink-statistics').probability.range4CI;


var workbook = XLSX.readFile('crime_record.xlsx');
var sheet_name_list = workbook.SheetNames;
var  data  = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

var crime =[];
var  data_total =[];
var	 summation = sum();
var  maximum = max();
var minimum = min();


for (key in data)
{
	crime.push(data[key].Violation);
	data_total.push(+data[key].y_2006);
	summation.compute(+data[key].y_2006);
	maximum.compute(+data[key].y_2006);
	if((+data[key].y_2006)!= 0 )
	{
	minimum.compute(+data[key].y_2006);
	}
			
}

console.log(`\n total crime happening in  Canada on the year 2006 is ${summation.value()} `);
console.log(`\n crime that happened in  record numbers on the year 2006 is ${maximum.value()}.`);
console.log(`\n crime that recorded minimal  on the year 2006 is ${minimum.value()}.`);

var max_key =[];
var min_key = [];
var zero_key = [];

console.log('\n list of crime that has not been recored in canada during the year 2006 are as follows');

for (key in data_total)
{
	if (data_total[key] == 0)
	{
		zero_key.push(key);
	}
	if (data_total[key]==maximum.value())
	{
		max_key.push(key);
	}

	if(data_total[key]==minimum.value())

	{
		min_key.push(key);
	}	

}

console.log("\n crime that never occur in the year 2006");

for(var i=0 ;i<zero_key.length;i++)
{
	key = zero_key[i];
	console.log(crime[key]);
}
 
console.log(" \n crime that occur minimal in the year 2006");

for(var i=0 ;i<min_key.length;i++)
{
	key = min_key[i];
	console.log(crime[key]);
} 

console.log(" \n crime that heavily occur in the year 2006");

for(var i=0 ;i<max_key.length;i++)
{
	key = max_key[i];
	console.log(crime[key]);
}


console.log(`\n the probability of occuring maximum crime is `);
console.log(prob(maximum.value(),summation.value()));

console.log(`\n the probability of occuring minimum crime is `);
console.log(prob(minimum.value(),summation.value()));



