/* Ways to use Date constructor */
new Date(year, month, date?, hours?, mins?, sec?, milisec?);
new Date(1996, 2, 12, 13, 34, 56);// month starts from 0
/* For UTC time you have to go: */
new Date(Date.UTC(args));

new Date(dateTimeStr);
new Date('2004-03-12');




/* Date constructor methods */
Date.now()
Date.parse('1994-05-24');
