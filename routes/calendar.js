var express = require('express');
var router = express.Router();
var calendar = require('node-calendar');
var cal = new calendar.Calendar(calendar.SUNDAY);
var date = new Date();
var month = date.getMonth();
var day = date.getDate();
var year = date.getFullYear();
var daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
router.get('/', function (req, res) {
    var otherMonths = {
        prev: calendar.month_name[month],
        after: calendar.month_name[month + 2]
    };
    var monthCalendarPage = cal.monthdayscalendar(year, month + 1);
    res.render('calendar',
        {
            title: "Calendar Section",
            month: calendar.month_name[month + 1],
            day: day,
            year: year,
            monthArr: monthCalendarPage,
            dayArr: daysOfWeek,
            otherMonthObj: otherMonths
        });
});
router.get('/:month', function (req, res) {
    var isValidMonth = false;
    var monthNum = 0;
    var monthParam = req.params.month;
    var monthsOfYear = calendar.month_name;
    for (var i = 0; i < monthsOfYear.length; i++) {
        if (monthsOfYear[i] == monthParam) {
            monthNum = i;
            isValidMonth = true;
            break;
        }
    }
    if (isValidMonth) {
        var monthCalendarPage = cal.monthdayscalendar(year, monthNum);
        console.log(monthCalendarPage);
        res.render('calendar',
            {
                title: "Calendar Section",
                month: calendar.month_name[monthNum],
                day: null,
                year: year,
                monthArr: monthCalendarPage,
                dayArr: daysOfWeek
            });
    }
    else {
        res.render('error', {
            message: "Not a valid month",
            error: {
                status: res.status,
                stack: res.err
            }
        });
    }
});
module.exports = router;